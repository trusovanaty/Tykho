# TYKHO Care — Product brief (MVP for Lovable Challenge)

**Deadline:** submission by Oct 1, 11:59pm PDT (Oct 2, 09:59 Odesa). Personal feature freeze: Oct 1, 18:00 Odesa.

## Problem
Anya Koval is a solo sensory-friendly children's hairstylist in Odesa. 70% of inquiries arrive as Instagram DMs ("Do you have anything quiet?", "He can't use clippers", "Can we come when no one else is there?"). Every booking takes 10–15 messages before she can open her calendar. Parents re-explain triggers every time. Last-minute "bad morning" cancellations burn expensive quiet slots, and she has no time to message the waitlist. A generic calendar doesn't know that an open hour isn't always the right hour.

## Solution
A booking flow that understands the child first (60-second comfort check), recommends the gentlest visit type, shows only 3 compatible times, confirms instantly, and turns the parent's answers into a care-card for Anya. Reminders, rescheduling and waitlist refill run on their own.

## Users & success
| User | Success looks like |
|---|---|
| Parent | Booked in under 2 minutes without messaging; feels understood; knows exactly what will happen |
| Anya | Zero scheduling messages; reads a care-card in 5 seconds; sees only exceptions; cancelled slots refill themselves |

## MVP scope (must ship)
1. Parent: Welcome, Comfort Check (5 questions), Recommended Visit with "why", Pick a Time (3 best slots), Booking Details, Confirmed with "What will happen" story + automation timeline.
2. Matching engine: deterministic rules → visit type; slot filter → top 3 (see 04-logic-and-data.md).
3. Real booking in Lovable Cloud with no double booking and a secure manage token.
4. Owner (auth): Today with "Needs attention", visit timeline, booking detail + care-card, status changes (arrived / completed / no-show).
5. Self-service manage page: confirm / reschedule / cancel.
6. Automations: confirmation email, T-24h reconfirm email, owner new-booking brief, waitlist offer on cancellation.
7. Light + dark theme, all loading / empty / error / conflict states.

## Nice to have (only if credits remain)
Week view · Waitlist page for owner · Settings (quiet hours, visit types) · Morning brief email · After-visit note that tunes the next recommendation.

## Out of scope
Payments/Stripe · SMS · AI chat · Multi-staff roles · Marketplace · Native app · Multilingual UI · Analytics.

## Acceptance criteria
- A parent completes Welcome → Confirmed on a 375px screen with only 3 text fields.
- The recommendation always shows at least 2 "why" reasons tied to the parent's answers.
- Never more than 3 slots; each slot shows a reason; a taken slot triggers the conflict toast and the next best slot.
- Two parents cannot book the same slot (atomic check).
- The owner sees the new booking and its care-card without any manual step.
- Cancelling through the manage link frees the slot and creates a waitlist offer automatically.
- Emails never expose API keys to the browser; manage links reveal no other family's data.
- Every screen passes WCAG AA contrast and works in light and dark themes.

## Demo story (video ≤ 2:40)
0:00 problem (DM screenshots) → 0:15 parent flow for Mila, 6 → 1:05 owner reveal: care-card appears → 1:45 automation: cancel → waitlist offer → 2:15 outcome ("14 bookings, zero messages") + public link.
