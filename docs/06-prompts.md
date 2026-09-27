# TYKHO Care — промпты для Lovable по порядку

> Копируйте по одному. После каждого — проверить результат, сделать **bookmark**, посмотреть **Usage**.
> Тексты, отступы, мелкие цвета — через **Visual Edits** (дешевле промпта).
> Все промпты ссылаются на файлы в репозитории: `docs/…` и `design-system/…` — Lovable читает их сам.
> Оценка кредитов ориентировочная.

---

## Этап 0 · Подготовка (0 кредитов, делает Claude через GitHub)
- `design-system/dist/lovable-index.css` → `src/index.css`
- токены → `tailwind.config.ts`
- папка `docs/` с файлами 02–05 этого пакета
- Project Knowledge ← `01-project-knowledge.md` (вставляете вы в Settings → Knowledge)

---

## Этап 1 · План (Plan / Chat mode, ~1–2)

**P1 — план без кода**
```text
Read docs/02-product-brief.md, docs/03-screens-content.md, docs/04-logic-and-data.md and design-system/README.md.
Don't write code yet. Give me: 1) the build order you'd follow, 2) the component list, 3) the routes, 4) risks and open questions. Keep it short.
```

---

## Этап 2 · Дизайн-система в коде (~3–5)

**P2 — styleguide**
```text
Design tokens are already in src/index.css and tailwind.config.ts — use only them, no hex, no default Tailwind colours.
Style: minimalist monochrome blue, shape-first, a touch of frosted glass (see design-system/README.md §3–4).
Page background = bg-orbs. Cards, choice cards, slots and chips use .glass; sticky bar, care-card, icon buttons and date chips use .glass-strong.
Restyle shadcn Button (56px pill, primary = dark ink), Input (56px pill), Textarea (radius 20), Badge (pill), Card (radius 32, no border).
Create src/components/tykho/: ChoiceCard, ProgressRing, PlanCard (solid brand block with why-rows), SlotCard, DateChip, CareChip, StickyActionBar, StoryStep, AutomationTimeline, VisitRow, AttentionItem, CareCard, DotMatrix, Toast, ThemeToggle.
Support light and dark themes (prefers-color-scheme + .dark/.light) with the ThemeToggle.
Build /styleguide showing every component in all states (default, hover, selected, disabled, loading, error) in both themes. Do not build booking screens yet.
```
📎 Приложить: скриншоты из `references/` (только наша дизайн-система).

---

## Этап 3 · Экраны родителя на mock-данных (~9–15)

**P3 — Welcome + Comfort Check**
```text
Build the parent screens P-01 Welcome (route /) and P-02 Comfort Check (/book/check, 5 steps + step 0) exactly as described in docs/03-screens-content.md — same blocks, same order, same English copy verbatim, all listed states.
Mobile 375 first, max width 440 centred. Use the TYKHO components from /styleguide. Keep answers in React state (no backend yet). Mock data from docs/05-seed-data.json.
```

**P4 — Recommended Visit + Pick a Time**
```text
Build P-03 Recommended Visit (/book/plan) and P-04 Pick a Time (/book/time) from docs/03-screens-content.md.
Implement the recommendation rules and why-reasons from docs/04-logic-and-data.md §3 and the slot filter §4 as pure TypeScript functions in src/lib/matching.ts, running on mock data for now.
PlanCard is the only solid blue block. Show max 3 slots, each with a reason. Include loading, conflict and no-match (join waitlist) states.
```

**P5 — Details + Confirmed**
```text
Build P-05 Booking Details (/book/details) and P-06 Confirmed (/book/confirmed/:id) from docs/03-screens-content.md.
Only 3 text fields in the whole flow. Confirmed shows the "What will happen" story and the AutomationTimeline. Keep everything on mock data.
```

---

## Этап 4 · Экраны Ани (~5–8)

**P6 — Owner Today + Care-card**
```text
Build O-01 Sign in (UI only for now), O-02 Today (/owner) and O-03 Booking detail with care-card (/owner/booking/:id) from docs/03-screens-content.md.
Desktop 1280 with 8+4 columns, mobile stacked. Only one AttentionItem is a solid block. Use VisitRow, CareCard, DotMatrix ("Handled for you") and DateChip. Mock data from docs/05-seed-data.json (today = Tue 6 Oct 2026, include Mila's booking from demo_state_after_parent_flow).
```

➡️ **Checkpoint:** весь UI готов на mock-данных. Bookmark. Можно записать кусок process-видео.

---

## Этап 5 · Lovable Cloud (~10–15)

**P7 — схема и seed**
```text
Enable Lovable Cloud. Before building, show me the migration plan.
Create the tables, constraints and RLS from docs/04-logic-and-data.md §1 (including the no-double-booking constraint and token-only access for parents). Seed them from docs/05-seed-data.json (without Mila's booking). Owner auth with Lovable Cloud Auth, role owner.
```

**P8 — подключить флоу к данным**
```text
Replace the mock data with Lovable Cloud:
- Edge functions / RPC: get_recommendation, get_slots, create_booking (atomic re-check inside a transaction), get_booking_by_token, update_booking_by_token, accept_offer_by_token — as in docs/04-logic-and-data.md.
- Move src/lib/matching.ts logic server-side for get_slots.
- create_booking upserts the care_profile and returns the manage_token.
- Owner screens read real bookings; status buttons (arrived / completed / no-show) work.
Keep all UI states. Test the conflict case: two bookings for the same slot.
```

---

## Этап 6 · Автоматизации (~10–15)

**P9 — письма (Resend)**
```text
Add email via Resend in an edge function. The API key is in Secrets as RESEND_API_KEY — never expose it to the client.
Implement E-01 confirmation (parent), E-02 new booking brief (owner) and E-03 T-24h reconfirm from docs/03-screens-content.md §3, driven by notification_events (docs/04-logic-and-data.md §5). If sending fails, the booking stays saved and the error is logged.
```

**P10 — задания по расписанию + manage**
```text
Add an hourly scheduled job that sends due notification_events and expires waitlist offers.
Build P-07 Manage visit (/manage/:token) with confirm / reschedule / cancel, and P-08 Waitlist offer (/offer/:token) from docs/03-screens-content.md. Cancelling creates a waitlist offer automatically (E-04). Expired or invalid tokens show a generic message with no data.
Owner "Needs attention" follows docs/04-logic-and-data.md §6.
```

---

## Этап 7 · Проверка и публикация (~5–10)

**P11 — QA пограничных случаев**
```text
Walk through these cases and fix what breaks: slot taken during booking; email send fails; expired manage token; no matching slots → waitlist; cancellation → waitlist offer → accept; dark theme on every screen; 375px width everywhere; keyboard focus visible. Report what you changed.
```

**P12 — безопасность**
```text
Run the security scan. Review RLS on every table against docs/04-logic-and-data.md §1. Fix critical and high issues only; list anything you left.
```

Затем: **Publish** → открыть в режиме инкогнито → пройти флоу целиком → записать видео.

---

## Бюджет

| Этап | Кредиты |
|---|---|
| 1 План | 1–2 |
| 2 Styleguide | 3–5 |
| 3 Родитель | 9–15 |
| 4 Аня | 5–8 |
| 5 Cloud | 10–15 |
| 6 Автоматизации | 10–15 |
| 7 QA + security | 5–10 |
| **Итого** | **≈ 45–70** + резерв на правки |
