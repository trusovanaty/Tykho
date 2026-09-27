# TYKHO Care — Logic, data & automations

Backend: Lovable Cloud (Postgres + Auth + Edge Functions + scheduled jobs). Email: Resend via an Edge Function (API key in Secrets — never in the browser). Timezone: **Europe/Kyiv** for all slot logic and display.

---

## 1. Data model

| Table | Key fields | Notes |
|---|---|---|
| `families` | id, parent_name, phone, email, created_at | Phone OR email required |
| `children` | id, family_id → families, first_name, age | First name only |
| `care_profiles` | id, child_id → children (unique), triggers text[], last_cut, tools, calmest_place, area, settles_with text[], notes, updated_at | One per child, updated on every booking |
| `visit_types` | id, slug, name, duration_min, buffer_min, price_uah, location (`studio`/`home`), quiet_only bool | Seeded, 4 rows |
| `availability` | id, weekday (0–6), start_time, end_time, kind (`quiet`/`regular`/`home`), area (nullable) | Anya's weekly template |
| `bookings` | id, child_id, visit_type_id, starts_at timestamptz, ends_at, buffer_until, status, manage_token (random 32+ chars, unique), reason text, created_at | status: `confirmed` · `reconfirmed` · `arrived` · `completed` · `no_show` · `cancelled` |
| `waitlist_entries` | id, child_id, visit_type_id, area, status (`waiting`/`offered`/`accepted`/`expired`), offered_booking_slot timestamptz, offer_token, offer_expires_at | |
| `notification_events` | id, booking_id, type (`confirmation`/`owner_brief`/`reconfirm_24h`/`waitlist_offer`/`morning_brief`), scheduled_at, sent_at, status, error | Drives the "What happens next" timeline |

**Constraint against double booking:** exclusion constraint (or unique index + transaction) on bookings where status not in (`cancelled`) over `tstzrange(starts_at, buffer_until)`. Booking creation happens in ONE edge function / RPC that re-checks availability inside a transaction.

### Security (RLS)
- Parents are **not** logged in. All parent reads/writes go through edge functions / security-definer RPCs: `get_recommendation`, `get_slots`, `create_booking`, `get_booking_by_token`, `update_booking_by_token`, `accept_offer_by_token`.
- Token endpoints return only that booking's data. Expired/invalid token → generic message, no data.
- Owner (Anya) signs in with Lovable Cloud Auth; RLS: only role `owner` can select/update all tables.
- `care_profiles`, `families`, `children` are never readable by anonymous clients.

---

## 2. Comfort check → answers

| Q | Field | Type | Options (value) |
|---|---|---|---|
| 0 | child first_name, age | text + chips 3–12 | — |
| 1 | `triggers` | multi | `sound`, `touch`, `waiting`, `mirror`, `cape`, `new_places`, `none` (exclusive) |
| 2 | `last_cut` | single | `fine`, `hard_ok`, `had_to_stop`, `never_salon` |
| 3 | `tools` | single | `scissors_only`, `quiet_clippers_ok`, `any`, `not_sure` (→ treat as scissors_only) |
| 4 | `calmest_place` (+ `area` if home) | single | `studio`, `home`, `either`; area: `arcadia`, `tairova`, `fontanka`, `other` |
| 5 | `settles_with` | multi | `tablet`, `toy`, `lap`, `breaks`, `dim_lights`, `quiet` |

## 3. Recommendation rules (deterministic, no AI)

Evaluate in order, first match wins:
1. `last_cut = had_to_stop` → **Meet & Greet** (alternative offered: Quiet First Cut)
2. `calmest_place = home` AND `area ≠ other` → **Home Visit Cut**
3. `triggers ∩ {sound, touch, waiting, new_places} ≠ ∅` OR `last_cut = never_salon` → **Quiet First Cut** (alternative offered: start with a 20-min Meet & Greet)
4. otherwise → **Calm Regular**

Returning child with a `completed` booking whose after-visit note is "went well" → default to **Calm Regular** unless rule 1–2 fires.

**Why-reasons** (show 2–3, each tied to an answer):
| Answer | Reason text |
|---|---|
| sound | **Sound is hard** → quiet hours only, scissors, no dryer |
| touch | **Being touched** → Anya says what she'll do before touching |
| mirror | **The mirror** → Anya turns the chair away from it |
| waiting | **Waiting is hard** → no other guests, straight in |
| new_places / never_salon | **First salon visit** → 60 minutes, with time for breaks |
| had_to_stop | **Last time was hard** → a 20-minute hello first, no haircut |
| home | **Calmest at home** → Anya comes to you |

**Care-card** is generated from answers: Sound / Touch / Mirror / Light / Talk / Settles with / Breaks + parent's free-text note + "First 5 minutes" line.

## 4. Slot filter → top 3

1. Build candidate slots for the next 14 days from `availability` in 15-minute steps.
2. Keep slots where the visit type is allowed: Quiet First Cut → `kind = quiet`; Home Visit → `kind = home` and `area` matches; Meet & Greet / Calm Regular → `quiet` or `regular`.
   **Alternative:** if `calmest_place = either` and `area` is in the home-visit zone, also include `home` slots in that area as **Home Visit Cut** (the slot card shows "Home visit · {Area} · ₴1,150"). This is how Mila gets "Thu 8 Oct · Anya is nearby that day".
3. Remove overlaps with existing non-cancelled bookings including their `buffer_until`; the new slot must also fit its own buffer.
4. Remove slots starting < 12 hours from now.
5. Score: quiet-hours slot +3 · first slot of the day +2 · no booking in the previous 30 min +1 · earlier date +1 per day closer (max +3).
6. Return top 3, each with a `reason` string ("First of the day — calmest studio", "Quiet morning, 15-min buffer after", "Anya is nearby that day").
7. None → "No quiet times in the next 2 weeks" + Join waitlist.

## 5. Booking lifecycle & automations

| Trigger | Action |
|---|---|
| `create_booking` succeeds | status `confirmed`; generate `manage_token`; upsert care_profile; queue `confirmation` (now) + `owner_brief` (now) + `reconfirm_24h` (starts_at − 24h) |
| Scheduled job (hourly) | Send due `notification_events`; mark `sent_at` or `error` (booking stays saved if email fails) |
| Parent taps "Yes, we're coming" | status `reconfirmed` |
| Reconfirm not received by starts_at − 3h | Owner "Needs attention": "{child} hasn't confirmed" |
| Parent reschedules | New slot chosen via same filter; old slot kept until the new one is saved (transaction); new reminder scheduled |
| Parent cancels (≥ 2h before) | status `cancelled` → find first `waiting` entry with same visit type (and area for home) → status `offered`, `offer_expires_at = now + 2h`, queue `waitlist_offer` |
| Offer accepted | create booking for that child; entry `accepted` |
| Offer expired (job) | entry back to `waiting`, offer next family |
| Owner marks arrived / completed / no-show | status update; completed → optional after-visit note |

## 6. Owner "Needs attention" (max 3, most urgent first)
1. Unconfirmed visit within 3 hours
2. Waitlist offer expired with no taker (slot still empty today/tomorrow)
3. Email delivery error

## 7. "Handled for you" metrics (owner, this week)
- bookings confirmed without a message = bookings created via the flow
- DMs saved ≈ bookings × 12 messages × 1.5 min → shown as "~3 h"
- slots refilled from waitlist = accepted offers
- care questions asked twice = 0 (care-profile reused)
