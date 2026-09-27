PROJECT: TYKHO Care — sensory-friendly haircut booking

WHAT IT IS
Mobile-first booking web app for Anya Koval, a solo sensory-friendly children's hairstylist in Odesa, Ukraine (quiet studio in Arcadia + home visits). Built for the Lovable Challenge.
One-liner: TYKHO turns a parent's worried "can we come to you?" into a sensory-matched, confirmed haircut — without a single scheduling message for the stylist.
Core idea: an available slot is not always the right slot. TYKHO first understands the child's comfort needs, recommends the right visit type, and shows only 3 compatible times.

USERS
1. Parent (usually the mum, 29–42, on a phone, anxious). Child 3–10 with autism, ADHD or sensory sensitivity. Pains: meltdowns, clippers, being refused, re-explaining triggers every time. Wants: to feel understood, predictability, a calm time with no other guests, easy rescheduling on a bad morning.
2. Anya, the owner (solo, 28–42). Pains: 10–15 DMs per booking, the same questions again and again, no-shows and burnt slots, forgetting a child's triggers, home visits scattered across the city. Wants: bookings that confirm themselves, a short care-card per child, exceptions only.

BUSINESS RULES
- Quiet hours: Tue & Wed 09:00–10:30, studio, no other guests. Regular studio: Sat. Home visits: Thu (Arcadia) & Fri (Tairova, Fontanka road).
- Visit types: Meet & Greet 20 min + 10 buffer ₴250 · Quiet First Cut 60 + 15 ₴850 (quiet hours only) · Home Visit Cut 60 + 15 + travel ₴1,150 · Calm Regular 45 + 0 ₴650. Pay after the visit; no deposit.
- Free rescheduling/cancel up to 2 hours before. A cancelled slot is offered to a compatible waitlisted family automatically (held 2 hours).

FLOWS
Parent: Welcome → Comfort Check (5 card questions) → Recommended Visit → Pick a Time (3 best slots) → Booking Details → Confirmed ("What will happen" story + automation timeline). Self-service: manage link → confirm / reschedule / cancel. Waitlist offer page.
Owner (Anya): Sign in → Today (needs attention + timeline) → Booking detail with care-card → Week → Waitlist.

DESIGN SYSTEM (TYKHO v2.1 — tokens already in src/index.css + tailwind preset)
Stack: shadcn/ui + Tailwind + lucide-react stroke 1.5. Use only tokens; never hex or default Tailwind colours.
Feel: minimalist, calm, premium. ONE hue — blue in tonal steps — plus ink. Shape carries meaning. Icy sky gradient with soft blue orbs; frosted glass cards (.glass: white 58% + blur 24 + 1px light edge, no borders); .glass-strong for bars, care-card, icon buttons.
Colours: text #13182B, secondary #5C6680, soft blue #EAF3FD, mid #C8DCF7, interactive blue #3563CF (rings, progress, links, focus), solid blue #3F6BD6 with white text = ONE solid block per screen (the recommendation for parents, "needs you" for Anya). Primary button = dark ink pill. Errors only #B8475A. Dark theme follows prefers-color-scheme (+ .dark/.light toggle).
Shape: buttons & inputs 56px pills; icon buttons 48px circles; date chips 56px circles (selected = dark); cards radius 32; choice/slot cards radius 24, min 64px; badges & chips are pills. Selection = soft blue fill + 1.5px blue ring + filled check circle. Progress = thin ring "3/5".
Type: Manrope only. Display & numbers weight 300; H1 30/36; body 17/26; nothing below 15px except chips. Tabular figures.
Motif: dot matrix — each dark dot = one booking confirmed without a message.

UX RULES
- Mobile 375 first for parents; owner desktop 1280 + mobile.
- One filled button per parent screen, inside a glass sticky bar.
- Card choices instead of inputs; only 3 text fields in the whole flow (child first name, phone/email, "anything else").
- Every recommendation and every slot explains WHY.
- Use the child's name in headings. Language of comfort: quiet, gentle, at your child's pace. Never: diagnosis, patient, treatment, "special needs" in headings, puzzle pieces, cartoons, medical imagery, emoji in UI, yellow.
- Status = shape + colour + word. Every screen has loading, empty, error and conflict states. Motion 150–420ms, no bounce/confetti, respect prefers-reduced-motion.

SOURCE FILES IN THE REPO
docs/02-product-brief.md · docs/03-screens-content.md (screens, blocks, states, final UI copy — use copy verbatim) · docs/04-logic-and-data.md · docs/05-seed-data.json · design-system/README.md
