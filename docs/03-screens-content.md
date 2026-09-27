> **For Lovable:** this file defines every screen — blocks top to bottom, primary action, states and FINAL UI copy. Use the English copy verbatim. Structure notes are in Russian.
> Emoji in this file are placeholders — render them as lucide icons (see design-system/README.md §5). Visual style comes from the TYKHO design system v2.1, not from this file.
> Seed dates: Tue 6 Oct · Wed 7 Oct · Thu 8 Oct 2026.

# TYKHO Care — Sitemap, IA и контент

> Основа для промптов в Lovable. Язык интерфейса — **английский** (жюри), пояснения — русский.
> Опирается на [icp.md](icp.md), `Project Knowledg` и `tykho-lovable-plan.pptx`. Дата: 27.09.2026.

**Приоритеты:** **P0** — без этого нет демо · **P1** — усиливает owner-effort story · **P2** — если останутся кредиты.

---

## 0. Бизнес-бриф (для контента и seed-данных)

| | |
|---|---|
| **Бизнес** | TYKHO Care — sensory-friendly haircuts for children |
| **Владелица** | Anya Koval, solo stylist, 11 years in hair, 4 years with neurodivergent kids |
| **Локация** | Quiet studio in Arcadia, Odesa + home visits in Arcadia, Fontanka road, Tairova |
| **Расписание** | Tue–Wed: studio, 09:00–10:45 = **quiet hours** (no other guests) · Thu–Fri: home visits (grouped by district) · Sat: studio, regular visits |
| **Quirks** | 70% of inquiries come via Instagram DMs · high-support visits need 15-min buffer · some kids need a meet & greet first · last-minute cancellations are "honest" (bad morning) → she doesn't charge, but the slot burns |
| **One-liner** | *TYKHO turns a parent's worried "can we come to you?" into a sensory-matched, confirmed haircut — without a single scheduling message for the stylist.* |

### Типы визитов (правило matching)

| Visit type | Длит. + буфер | Цена | Где | Когда рекомендуем |
|---|---|---|---|---|
| **Meet & Greet** | 20 мин + 10 | ₴250 (засчитывается в стрижку) | Studio | В прошлый раз пришлось остановиться (или родитель выбрал сам) |
| **Quiet First Cut** | 60 мин + 15 | ₴850 | Studio, quiet hours only | Первый визит + чувствительность к звуку / прикосновениям / ожиданию |
| **Home Visit Cut** | 60 мин + 15 + дорога | ₴1,150 | Home, район из зоны выезда | «Спокойнее всего дома» или «новые места — сложно» |
| **Calm Regular** | 45 мин + 0 | ₴650 | Studio, any slot | Возвращающийся клиент, прошлый визит прошёл нормально |

**Логика рекомендации (детерминированная, без AI):**
1. `last_cut = had_to_stop` → **Meet & Greet** (альтернатива: Quiet First Cut)
2. `calmest = home` → **Home Visit Cut**
3. есть хотя бы один триггер из `sound, touch, waiting, new_places` или `last_cut = never_salon` → **Quiet First Cut** (альтернатива: Meet & Greet)
4. иначе → **Calm Regular**

**Фильтр слотов:** тип визита → допустимые дни/часы → буфер свободен → для home: район совпадает с днём выезда → сортировка по «тишине» (quiet hours выше) и ближайшей дате → **показываем топ-3**.

---

## 1. Sitemap

```
TYKHO Care
│
├── PARENT (public, mobile 375 first)
│   ├── /                         Welcome                          P0
│   ├── /book/check               Comfort Check (5 steps)          P0
│   ├── /book/plan                Recommended Visit                P0
│   ├── /book/time                Pick a Time (3 best slots)       P0
│   │     └── [state] No match → Join waitlist                     P1
│   ├── /book/details             Booking Details                  P0
│   ├── /book/confirmed/:id       You're booked + What will happen P0
│   ├── /manage/:token            Manage visit (confirm/move/cancel) P1
│   │     ├── /reschedule         Pick a new time                  P1
│   │     └── /cancel             Cancel (gentle)                  P1
│   ├── /offer/:token             Waitlist offer (slot freed)      P1
│   └── /waitlist/joined          On the waitlist                  P1
│
├── OWNER (auth, desktop 1280 + mobile)
│   ├── /owner/login              Sign in                          P0
│   ├── /owner                    Today                            P0
│   ├── /owner/booking/:id        Booking detail + Care-card       P0
│   ├── /owner/week               Week view                        P1
│   ├── /owner/waitlist           Waitlist                         P1
│   └── /owner/settings           Availability & visit rules       P2
│
└── SYSTEM (email + jobs)
    ├── Booking confirmed (parent)                                 P0
    ├── New booking brief (owner)                                  P1
    ├── T-24h reconfirm (parent)                                   P1
    ├── Waitlist offer (parent)                                    P1
    └── Morning brief (owner, 07:30)                               P2
```

### Главные флоу

**Parent happy path:** Welcome → Check (5) → Plan → Time → Details → Confirmed
**Parent self-service:** Email → Manage → Reschedule / Cancel → (слот уходит в waitlist)
**Waitlist:** Cancel → система находит совместимого ребёнка → Offer email → Offer page → Accept → Confirmed
**Owner:** Today → Needs attention → Booking detail / Care-card → статус Arrived / Completed / No-show

---

## 2. IA и контент по экранам

Формат каждого экрана: **цель · блоки (сверху вниз) · primary action · состояния · тексты**.

---

### P-01 · Welcome `/`

**Цель:** за 5 секунд родитель понимает «здесь понимают моего ребёнка» и начинает проверку.

**Блоки:**
1. Header: логотип TYKHO · ссылка «For Anya» (owner login, ненавязчиво)
2. Hero: заголовок, подзаголовок, primary CTA, мета-строка
3. «What's different here» — 3 строки с иконками (не карточки-фичи)
4. Цитата родителя
5. Мини-блок о мастере: фото, имя, 1 строка
6. Footer: адрес студии, зона выездов, «Questions? Message Anya»

**Primary action:** Start the comfort check

**Тексты:**

> **Haircuts, at your child's pace.**
> Tell us what makes haircuts hard. We'll find the gentlest way in — and only show times that fit.
>
> [ **Start the comfort check** ] · *5 quick questions · about 1 minute · no diagnosis needed*

**What's different here**
- **Quiet hours** — Tuesday and Wednesday mornings, no other guests in the studio.
- **Scissors or quiet clippers** — you choose, we never surprise.
- **Home visits** — in Arcadia, Fontanka road and Tairova.

**Quote**
> "For the first time, Mila walked out smiling. Nobody had to hold her."
> — Iryna, Mila's mum

**About**
> **Anya Koval** · 11 years in hair, 4 with children who find salons hard. One chair, one child at a time.

**Footer:** Quiet studio · 12 Henuezka St, Arcadia, Odesa · Home visits Thu–Fri · Questions? Message Anya →

---

### P-02 · Comfort Check `/book/check`

**Цель:** за 60 сек собрать данные для matching и care-card, не превращаясь в медицинскую анкету.

**Блоки (общие для всех шагов):**
1. Top bar: ← Back (круглая кнопка 48) · ProgressRing «1/5» справа
2. Вопрос (H1) + подсказка (1 строка)
3. Карточки-ответы (большие, 56px+, иконка + текст), single или multi
4. Sticky bottom: Continue (disabled до выбора)

**Шаг 0 — перед вопросами (часть экрана 1):** имя ребёнка + возраст (chips 3–12). Одно текстовое поле — единственное на всём чеке.

> **Who's the haircut for?**
> Just a first name is enough.
> [ First name ] · Age: 3 4 5 6 7 8 9 10 11 12+

**Q1 — multi**
> **What makes haircuts hardest?**
> Pick everything that sounds familiar.
- 🔊 **The buzzing sound** — clippers, dryers, noise
- ✋ **Being touched** — head, ears, neck
- ⏳ **Waiting** — busy rooms, other people
- 🪞 **The mirror** — seeing themselves
- 🧣 **Itchy hair & the cape**
- 🚪 **New places and faces**
- ➖ *Nothing in particular*

**Q2 — single**
> **How did the last haircut go?**
- **Fine, mostly** — a bit restless, but okay
- **Hard, but we got through**
- **We had to stop halfway**
- **We've only cut at home** / never been to a salon

**Q3 — single**
> **Scissors or clippers?**
> We'll only use what you choose.
- **Scissors only**
- **Quiet clippers are okay**
- **Whatever works**
- **Not sure yet** — *we'll try scissors first*

**Q4 — single**
> **Where does {Mila} feel calmest?**
- **A quiet studio with no one else** 
- **At home** — *you'll pick your area next*
- **Either is fine**

*(если Home → inline выбор района: Arcadia · Fontanka road · Tairova · Other area)*

**Q5 — multi**
> **What helps {Mila} settle?**
> Anya will have it ready.
- 📱 **Their own show or tablet**
- 🧸 **Holding a favourite toy**
- 🤱 **Sitting on my lap**
- ⏸️ **Short breaks**
- 💡 **Dim lights**
- 🤫 **Quiet — no chatting**

**Primary action:** Continue → на последнем шаге **See our suggestion**

**Состояния:** не выбрано (Continue disabled) · Other area → подсказка «We'll suggest the studio instead — or join the waitlist for your area».

**Микро-текст внизу:** *Your answers go only to Anya. You can change them anytime.*

---

### P-03 · Recommended Visit `/book/plan`

**Цель:** объяснить, *почему* этот формат, — главный «вау» момент: ответы схлопываются в план.

**Блоки:**
1. Eyebrow + заголовок
2. **Plan card** (главный объект): тип визита, длительность, место, цена
3. «Why this fits Mila» — 3 строки, каждая привязана к ответу
4. «What Anya will prepare» — чипы (они же потом станут care-card)
5. Вторичная ссылка: другие варианты
6. Sticky: See 3 best times

**Тексты (seed Mila):**

> *Our suggestion for Mila*
> **A quiet first visit is the gentlest way in.**

**Plan card**
> **Quiet First Cut**
> 60 min · Studio during quiet hours · No other guests
> ₴850 · pay after the visit

**Why this fits Mila**
- 🔊 **Sound is hard** → quiet hours only, scissors, no dryer
- 🪞 **The mirror** → Anya will turn the chair away from it
- 🌱 **First salon visit** → 60 minutes, with time for breaks

**What Anya will prepare**
`Dim lights` `Scissors only` `No mirror` `No chatting` `Tablet stand ready`

[ **See 3 best times** ]
*Not quite right?* → Start with a 20-min Meet & Greet instead · Prefer a home visit

---

### P-04 · Pick a Time `/book/time`

**Цель:** показать не весь календарь, а 3 подходящих слота с понятной причиной.

**Блоки:**
1. Заголовок + мини-сводка плана (тип · длительность), кнопка Change
2. 3 slot cards: дата, время, бейджи, «why this slot»
3. Ссылка «None of these work?» → waitlist
4. Sticky: Continue (после выбора)

**Тексты:**

> **Three times that fit Mila**
> We hid the ones that don't — busy hours, loud days, no buffer.

| Slot | Бейджи | Why |
|---|---|---|
| **Tue, 6 Oct · 09:00** ★ Best match | `Quiet hours` `No other guests` | First visit of the day — calmest studio |
| **Wed, 7 Oct · 09:00** | `Quiet hours` `No other guests` | Quiet morning, 15-min buffer after |
| **Thu, 8 Oct · 10:00** | `Home visit` `Arcadia` | Anya is nearby that day |

> *None of these work?* **Join the waitlist** — we'll message you when a quiet time opens.

**Состояния:**
- **Loading:** 3 skeleton-карточки, «Finding calm times…»
- **Conflict** (слот заняли, пока выбирали): toast «Someone just took that time. Here's the next best one.» → подсветка следующего слота
- **No match:** иллюстрация-линия + «No quiet times in the next 2 weeks. Join the waitlist and you'll be first to know.» [ Join the waitlist ]

---

### P-05 · Booking Details `/book/details`

**Цель:** минимум контактов + одна «мягкая» деталь для care-card.

**Блоки:**
1. Сводка: Quiet First Cut · Tue 6 Oct, 09:00 · Studio, Arcadia (Edit)
2. Your name
3. Phone (Viber/Telegram) **или** email — один обязательный
4. «Anything else Anya should know?» — optional textarea с placeholder-примерами
5. Политика переноса — 1 строка
6. Primary: Confirm booking

**Тексты:**

> **Almost done**
> Anya will see this before your visit — no need to explain twice.

- **Your name** — *Iryna*
- **Phone or email** — *for your confirmation and one reminder*
- **Anything else Anya should know?** *(optional)*
  placeholder: *e.g. "She likes to hold her bunny. Please say what you'll do before touching."*

> 💛 **Bad morning? Move it in one tap** — free rescheduling up to 2 hours before.

[ **Confirm booking** ]

**Состояния:** валидация inline («Add a phone or email so we can confirm») · submitting («Holding your time…») · conflict → возврат на P-04 с тостом.

---

### P-06 · Confirmed `/book/confirmed/:id`

**Цель:** спокойствие + подготовка + доказательство автоматизации (timeline).

**Блоки:**
1. Статус + заголовок (мягкая анимация «план → подтверждение»)
2. Visit card: дата, время, адрес, тип; Add to calendar
3. **«What will happen»** — social story из 5 шагов (можно показать ребёнку)
4. **«What happens next»** — timeline автоматизации
5. Manage visit (ссылка)

**Тексты:**

> ✓ **You're booked.**
> Tuesday, 6 October · 09:00 · Quiet First Cut
> 12 Henuezka St, Arcadia · the door with the green bench
> [ Add to calendar ] [ Manage visit ]

**What will happen — show this to Mila**
1. We ring the bell. Anya opens the door. Nobody else is there.
2. Mila can look around first. No rush.
3. She sits wherever feels okay — the big chair or on Mum's lap.
4. Anya shows the scissors before using them. No buzzing.
5. When it's done, Mila picks a sticker. Then home.

**What happens next**
- ✓ Confirmation sent to Iryna — *just now*
- ✓ Anya has Mila's care-card — *just now*
- ◷ Reminder with one-tap confirm — *Mon, 5 Oct · 09:00*
- ◷ Visit — *Tue, 6 Oct · 09:00*

*No messages needed. If plans change, use the link in your email.*

---

### P-07 · Manage visit `/manage/:token` (P1)

**Цель:** перенос/отмена без звонка; отменённый слот уходит в waitlist.

**Блоки:** visit card · 3 действия · политика одной строкой.

> **Mila's visit**
> Tue, 6 Oct · 09:00 · Quiet First Cut
>
> [ **Yes, we're coming** ] · [ Move to another time ] · [ Cancel visit ]
> *Free to move or cancel up to 2 hours before. After that, just message Anya.*

**Reschedule** → тот же P-04 с 3 слотами + «Your current time is kept until you pick a new one.»

**Cancel:**
> **Cancel Mila's visit?**
> That's okay — some days just aren't the day.
> Reason *(optional)*: Tough morning · Unwell · Plans changed · Other
> [ Cancel visit ] [ Keep it ]

**Cancelled:**
> **Visit cancelled.** Your time will go to another family on the waitlist.
> [ Book another time ]

**Состояния:** expired token → «This link has expired. Message Anya or book a new time.» (без показа чужих данных).

---

### P-08 · Waitlist offer `/offer/:token` (P1)

> **A quiet time just opened for Timur**
> Tue, 6 Oct · 15:00 · Calm Regular · Studio
> It matches what you told us: *scissors only, short breaks.*
> [ **Take this time** ] [ Not this time ]
> *Held for you for 2 hours.*

**Состояния:** taken → «Someone else was quicker this time. You're still on the list.» · accepted → P-06.

**Waitlist joined:**
> **You're on the list.** We'll only message you when a time fits Mila's plan — never for anything else.

---

### O-01 · Sign in `/owner/login`

> **Good morning, Anya.**
> [ Email ] [ Password ] [ Sign in ]

---

### O-02 · Today `/owner` — главный экран владелицы

**Цель:** за 5 секунд ответить не «что в календаре», а «что требует моего внимания».

**Блоки (desktop: 2 колонки; mobile: стек):**
1. Header: дата · «4 visits · 1 needs you»
2. **Needs attention** (только исключения, максимум 3)
3. **Timeline дня** — карточки визитов с 1-строчным care-summary
4. Правая колонка: **Handled for you** (impact) + Waitlist activity

**Тексты (seed, Tue 6 Oct):**

> **Tuesday, 6 October**
> 4 visits today · 1 needs you

**Needs attention**
- ⚠️ **Timur, 8 hasn't confirmed** 11:00 · Reminder sent yesterday · [ Send a nudge ] [ Mark confirmed ]

**Today**

| Time | Child | Visit | Care summary | Status |
|---|---|---|---|---|
| 09:00 | **Mila, 6** · NEW | Quiet First Cut · 60 min | 🔊 Sound · Scissors only · No mirror · Dim lights | Confirmed |
| 10:00 | — | *Buffer · 15 min* | | |
| 11:00 | **Timur, 8** | Calm Regular · 45 min | Breaks every 10 min · Own tablet | Not confirmed |
| 13:00 | **Sofia, 4** | Meet & Greet · 20 min | First time out · Sits on mum's lap | Confirmed |
| 15:00 | ~~Danylo, 7~~ | Calm Regular | *Cancelled 08:12 · Offered to waitlist → Mark, 7* | Offer sent |

**Handled for you this week**
- **14** bookings confirmed without a message
- **~3 h** of DMs saved
- **2** cancelled slots refilled from the waitlist
- **0** care questions asked twice

**Состояния:** empty day → «No visits today. Enjoy the quiet.» · loading skeleton · offline → «Showing your last saved schedule».

**Статусы визита:** Confirmed · Not confirmed · Arrived · Completed · No-show · Cancelled · Offer sent.

---

### O-03 · Booking detail + Care-card `/owner/booking/:id`

**Цель:** всё, что нужно для визита, читается за 5 секунд — без переписки и заметок.

**Блоки:**
1. Header: Mila, 6 · Quiet First Cut · Tue 6 Oct 09:00 · статус + действия (Arrived / Completed / No-show)
2. **Care-card** (главный объект, можно показать на телефоне у кресла)
3. «In Iryna's words» — свободный текст родителя
4. Contact: Iryna · Viber · Email (кнопки, без переписки внутри)
5. History: first visit / past visits + заметка после визита
6. Timeline автоматизации (confirmation sent, reminder scheduled…)

**Care-card (seed):**

> **Mila, 6 · first salon visit**
>
> | | |
> |---|---|
> | 🔊 **Sound** | Very sensitive — no clippers, no dryer |
> | ✋ **Touch** | Say what you'll do before touching |
> | 🪞 **Mirror** | Turn the chair away |
> | 💡 **Light** | Dim |
> | 🗣 **Talk** | Quiet, no small talk |
> | 🧸 **Settles with** | Her bunny · her own show |
> | ⏸ **Breaks** | Yes, if she asks |
>
> **First 5 minutes:** let her look around. No cape until she's seated.

**In Iryna's words**
> "She likes to hold her bunny. Please say what you'll do before touching."

**After-visit note (P1):** [ How did it go? ] → 3 chips (Went well · Needed breaks · Stopped early) + заметка → обновляет рекомендацию для следующего визита.

---

### O-04 · Week `/owner/week` (P1)

Сетка Tue–Sat, цвет по типу визита, полосы quiet hours и buffer, дни выездов с подписью района. Клик → O-03.
> **This week** · 17 visits · 3 home visits (Thu: Arcadia · Fri: Tairova)

### O-05 · Waitlist `/owner/waitlist` (P1)

> **Waitlist** · 5 families
> Each one gets an offer automatically when a matching time opens.

| Child | Needs | Area | Status |
|---|---|---|---|
| Mark, 7 | Calm Regular · scissors only | Studio | Offer sent · 1h 40m left |
| Ella, 5 | Quiet First Cut | Studio | Waiting |
| Artem, 9 | Home Visit | Tairova | Waiting — Fri |

### O-06 · Settings `/owner/settings` (P2)

Quiet hours · дни выездов и районы · длительность и цена типов визитов · буферы · политика переноса · текст «About Anya».

---

## 3. Email / уведомления

**E-01 · Booking confirmed → parent (P0)**
> Subject: **Mila's visit is booked — Tue, 6 Oct at 09:00**
> Hi Iryna, you're all set. Quiet First Cut · 60 min · no other guests.
> 12 Henuezka St, Arcadia — the door with the green bench.
> Anya already has everything you told us. No need to explain again.
> [ What will happen — show Mila ] [ Manage visit ]

**E-02 · New booking brief → owner (P1)**
> Subject: **New: Mila, 6 · Tue 09:00 · Quiet First Cut**
> 🔊 Sound · Scissors only · No mirror · Dim lights
> First salon visit. Settles with her bunny.
> [ Open care-card ]

**E-03 · T-24h reconfirm → parent (P1)**
> Subject: **Tomorrow at 09:00 — still good for Mila?**
> [ Yes, we're coming ] [ Move it ] [ Cancel ]
> Tough morning tomorrow? Moving is free until 07:30.

**E-04 · Waitlist offer → parent (P1)**
> Subject: **A quiet time just opened for Timur**
> Tue, 6 Oct · 15:00 · matches Timur's plan. Held for you for 2 hours.
> [ Take this time ]

**E-05 · Morning brief → owner (P2)**
> Subject: **Today: 4 visits · 1 needs you**

---

## 4. Seed-данные

**Parent / child (главный сценарий):** Iryna K. · Mila, 6 · triggers: sound, mirror · last cut: at home only · tools: scissors only · calmest: quiet studio · settles: tablet, favourite toy, dim lights, quiet.

**Прочие дети:** Timur, 8 (Calm Regular, breaks, own tablet) · Sofia, 4 (Meet & Greet, lap) · Danylo, 7 (cancelled) · Mark, 7 (waitlist, scissors only) · Ella, 5 · Artem, 9 (home, Tairova).

**Слоты:** Tue 6 Oct 09:00 / Wed 7 Oct 09:00 / Thu 8 Oct 10:00 (home, Arcadia) + занятые и «шумные» слоты Sat, чтобы было что отфильтровать.

## 5. Данные (для Build 02)

`families` (parent_name, contact) · `children` (name, age, family_id) · `care_profiles` (child_id, triggers[], tools, calmest_place, area, settles_with[], notes) · `visit_types` (name, duration, buffer, price, location, rules) · `availability` (day, start, end, kind: quiet/regular/home, area) · `bookings` (child_id, visit_type_id, start, status, manage_token) · `waitlist_entries` (child_id, visit_type_id, area, status, offer_expires_at) · `notification_events` (booking_id, type, scheduled_at, sent_at).

## 6. Сквозные UX-правила

- Mobile 375 первым, tap targets ≥ 44px, один primary action на экран.
- Карточки-выборы вместо полей; единственные текстовые поля — имя ребёнка, контакт, «anything else».
- Каждая рекомендация и каждый слот объясняют *почему*.
- Язык комфорта, не медицины: никаких «diagnosis», «patient», «special needs» в заголовках, символов-пазлов.
- Каждый экран имеет loading / empty / error / conflict состояние.
- Owner видит только исключения; всё рутинное — в «Handled for you».
