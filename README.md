> **TYKHO Care — Lovable Challenge.** Project docs for Lovable are in [`docs/`](docs/) (knowledge, brief, screens, logic & data, seed, prompts, references). The design system lives here in the root and as a copy in [`design-system/`](design-system/).

# TYKHO Care — Design System v2.1

> Минималистичная монохромная система для TYKHO — сенсорно-дружественной записи к детскому мастеру в Одессе.
> **Один синий в тональных шагах · форма важнее цвета · стекло на ледяном небе · светлая и тёмная тема.**
> Три слоя токенов (ui-ux-pro-max): primitive → semantic → component. Контекст проекта: `../icp.md`, `../sitemap-ia-content.md`, `../Project Knowledg`.

```
v2.1/
├── README.md                  ← эта документация
├── tokens.json                ← единственный источник правды (v2.1)
├── design-system-preview.html ← визуальное превью, светлая/тёмная тема (открывается двойным кликом)
├── build.cjs                  ← node build.cjs → dist/
├── build-preview.cjs          ← node build-preview.cjs → design-system-preview.html (иконки из ./icons)
├── preview.template.html      ← шаблон превью
├── icons/                     ← lucide SVG для превью
└── dist/
    ├── tokens.css             ← все 3 слоя как CSS-переменные
    ├── lovable-index.css      ← готовый src/index.css для Lovable (light + dark)
    └── tailwind.preset.cjs    ← пресет Tailwind
```

---

## 1. Принципы

| # | Принцип | Почему для TYKHO | Как закреплено |
|---|---|---|---|
| 1 | **Один цвет** | Синий — среди самых предпочитаемых у детей с РАС; вторая гамма = лишний стимул | Шкала `blue` 50–900 + `ink`. Единственное исключение — `danger` только для ошибок форм |
| 2 | **Форма несёт смысл** | Родитель на взводе считывает форму быстрее цвета | Действия — пилюли, иконки и даты — круги, карточки 32px, выбор — тонкое кольцо |
| 3 | **Один сплошной блок на экран** | Глаз сразу находит главное, остальное молчит | `brand-solid` — только рекомендация (родитель) или «Needs you» (Аня) |
| 4 | **Тишина по умолчанию** | Сенсорная нагрузка | Light 300 для крупного текста, много воздуха, мягкие рассеянные тени, стекло вместо рамок, motion ≤ 420ms без bounce |
| 5 | **Объясняй каждое решение** | «Почему это время?» | Why-строки внутри блока рекомендации, строка причины в каждом слоте |
| 6 | **Выбирай, а не печатай** | Анкеты выматывают | Choice-карточки 64px; 3 текстовых поля на весь флоу |
| 7 | **Читается на расстоянии руки** | Аня смотрит care-card у кресла | body 17px, минимум 15px, строки care-card 52px |

---

## 2. Архитектура токенов

```
PRIMITIVE        SEMANTIC                       COMPONENT
ink.900 ───────► color.primary ──────────────► button.primary-bg (тёмная пилюля), date-chip.selected-bg
blue.600 ──────► color.brand ────────────────► choice.selected-ring, progress-ring.fill, links, ring
blue.500 ──────► color.brand-solid ──────────► plan.bg, attention.bg  (ОДИН на экран)
blue.100 ──────► color.brand-soft ───────────► choice.selected-bg, badge.soft, story-step.dot
blue.200 ──────► color.brand-mid ────────────► badge.mid (Quiet hours), dot-matrix.off
blue.50  ──────► color.background + effect.background-gradient
white 58/78% ──► effect.glass / glass-strong ─► choice, slot, card, visit / sticky-bar, care-card, icon-button
orbs ──────────► effect.orbs ────────────────► фон страницы и экранов
```

- Компоненты ссылаются только на semantic/component токены — никогда на hex.
- Тёмная тема переопределяет только semantic-слой (`dark.semantic`) — компоненты не меняются.

---

## 3. Токены

### 3.1 Палитра (primitive)

| Шкала | Значения | Роль |
|---|---|---|
| **blue** | 50 `#F4F9FE` · 100 `#EAF3FD` · 150 `#DCEAFB` · 200 `#C8DCF7` · 300 `#A3C1F0` · 400 `#7A9FE8` · **500 `#3F6BD6`** · **600 `#3563CF`** · 700 `#2A50AE` · 800 `#213F88` · 900 `#172C5E` | Весь цвет системы |
| **ink** | 900 `#13182B` · 700 `#2A3147` · 500 `#5C6680` · 400 `#939BB0` · 300 `#C9D2E2` · 200 `#E1E9F4` | Текст, тёмная кнопка, dot-паттерн, линии |
| **night** | 950 `#0A1022` · 900 `#121A30` · 850 `#1A2440` · 800 `#26314F` · text `#EAF1FB` · muted `#A3AEC7` | Тёмная тема |
| **alert** | 600 `#B8475A` · 50 `#FCEEF0` · 300 `#F0A7B3` | **Только** ошибки форм и подтверждение отмены |
| gradient | light `#EAF3FD → #F4F9FE` · dark `#111C3A → #0A1022` · hero `#C8DCF7 → #7A9FE8` | Фон-небо, плитка-изображение |
| glass | light 58% / strong 78% · dark `rgb(26 36 64 / .52)` / strong `.78` · blur 24 · saturate 140% | Матовое стекло поверх сфер |
| orbs | 3 радиальные сферы blue.400/300/200 (dark — приглушённые blue.500/600) | Фон, который размывает стекло |

### 3.2 Semantic — цвет (light / dark)

| Токен | Light | Dark | Контраст |
|---|---|---|---|
| `background` | blue.50 + gradient | night.950 + gradient | — |
| `surface` / `surface-muted` | white / blue.100 | night.900 / night.850 | — |
| `border` / `border-strong` | ink.200 / ink.300 | night.800 / night.subtle | — |
| `foreground` | ink.900 | night.text | **16.6 : 1** / 16.6 : 1 |
| `foreground-muted` | ink.500 | night.muted | **5.4 : 1** / 8.5 : 1 |
| `foreground-subtle` | ink.400 | night.subtle | декор / disabled, не текст |
| `primary` (кнопка) | ink.900, текст white | night.text, текст night.950 | **17.6 : 1** / 16.6 : 1 |
| `brand` | blue.600 | blue.300 | **5.2 : 1** на фоне / 10.3 : 1 |
| `brand-solid` | blue.500, текст white | blue.500, текст white | **4.9 : 1** — текст ≥ 17px, 500 |
| `brand-soft` / fg | blue.100 / blue.800 | blue.deeper / blue.200 | **8.8 : 1** / 11.3 : 1 |
| `brand-mid` / fg | blue.200 / blue.800 | blue.deep / blue.200 | **7.1 : 1** / 9.6 : 1 |
| `danger` on `danger-soft` | alert.600 / alert.50 | alert.300 / alert.deep | **4.6 : 1** / 7.9 : 1 |
| `pattern` (dot-matrix) | ink.900 | blue.300 | — |
| `visit-quiet / meet / home / regular` | blue.200 / blue.100 / blue.400 / ink.200 | blue.300 / blue.150 / blue.500 / night.subtle | всегда + подпись |

### 3.3 Типографика — Manrope (одно семейство)

| Роль | Размер / строка | Вес | Tracking | Tailwind |
|---|---|---|---|---|
| Numeral (время, счётчики) | 48/52 | **300** | −3% | `text-numeral` |
| Display | 40/44 → 56/60 | **300** | −3% | `text-display md:text-display-lg` |
| H1 (вопрос, заголовок экрана) | 30/36 | 400 | −2% | `text-h1` |
| H2 | 22/28 | 500 | −2% | `text-h2` |
| H3 | 18/24 | 600 | — | `text-h3` |
| Body | 17/26 | 400 | — | `text-body` |
| Small | 15/22 — **минимум для текста** | 400 | — | `text-small` |
| Caption | 13/18 — только чипы и бейджи | 500 | — | `text-caption` |

Цифры — tabular (`font-feature-settings: 'tnum'` на body). Без uppercase-eyebrow: вместо него caption 13/500 muted.

### 3.4 Форма, пространство, эффекты

| Группа | Значения |
|---|---|
| **Radius** | `sm` 12 · `md` 20 (textarea) · `lg` 24 (choice, slot, inner card) · `xl` 32 (карточки, plan, care-card) · `full` (кнопки, инпуты, чипы, бейджи, даты, иконки) |
| **Targets** | `min` 44 · `icon` 48 (круглая кнопка) · `control` 56 (пилюля, инпут) · `choice` 64 · date-chip 56 |
| **Space** | page-x 20 · stack 8 / 12 / 24 · card 20 / 24 · section 40 / 56 (шаг 4px) |
| **Shadow** | `soft` 0 8 24 blue/8% — все карточки · `float` 0 16 40 blue/14% — телефон, toast · `bar` — sticky bar. Тёмная тема — чёрные 35–45%. **Карточки без рамок.** |
| **Glass** | **glass** white 58% — карточки, choice, slot, visit, чипы · **glass-strong** 78% — sticky bar, care-card, круглые кнопки и даты · blur 24 + saturate 140% · светлая кромка: inset 1px white 70% + верхний 1px white 90% (вместо рамок) · dark: `rgb(26 36 64/.52)` + кромка white 8% · `prefers-reduced-transparency` → сплошная карточка |
| **Sky orbs** | 3 мягкие радиальные сферы blue 400/300/200 поверх градиента фона — стеклу нужно что размывать. Tailwind: `bg-page` или класс `.bg-orbs` |
| **Motion** | fast 150 · base 240 · reveal 420 · ease `cubic-bezier(0.22,0.8,0.26,1)`; `prefers-reduced-motion` глушит всё |
| **Layout** | flow 440 · owner 1200 · measure 60ch |

---

## 4. Компоненты

Приоритет состояний: **disabled → loading → active → focus → hover → default.** Focus: `ring-2 ring-ring ring-offset-2`.

### 4.1 Button — всегда пилюля

| Variant | Bg | Text | Когда |
|---|---|---|---|
| **primary** | `primary` (ink; dark — светлая) | `primary-foreground` | Одна на экран: Start, Continue, Confirm |
| **secondary** | `surface` + `shadow-soft` | foreground | Change, Move to another time |
| **link** | — | `brand`, 600 | «Start with a Meet & Greet» |
| **danger** | transparent + кольцо 1.5px `danger` | `danger` | Cancel visit (только с подтверждением) |

| State | Primary |
|---|---|
| default | ink.900 |
| hover | ink.700 |
| active | blue.900 + `scale(.98)` |
| disabled | surface-muted / foreground-subtle, без opacity |
| loading | спиннер + глагол («Holding your time…»), ширина фиксирована |

Height 56, padding-x 32, 17/500. Mobile — full-width в StickyActionBar.

### 4.2 IconButton — круг

48×48, `surface` + `shadow-soft`, иконка 20. Вариант **dark**: `primary` фон — для одного главного инструмента (фильтр). Back, +/−, calendar.

### 4.3 ChoiceCard

| State | Bg | Кольцо | Иконка | Check |
|---|---|---|---|---|
| default | surface + shadow-soft | — | круг 40 `surface-muted` | пустой круг 24, кольцо border-strong |
| hover | surface | — | — | — |
| **selected** | `brand-soft` | inset 1.5px `brand` | круг `brand`, иконка белая | заполненный круг `brand` + ✓ |
| disabled | transparent | 1px border | subtle | — |

min-height 64, radius 24, label 17/500, hint 15 muted. `role="checkbox"` / `radio`, стрелки + Space.

### 4.4 ProgressRing

56px, stroke 3, track `brand-soft`, fill `brand`, в центре «3/5» 13/600. Большой вариант 140px — галочка на экране «You're booked». Вместо полоски и номеров-кружков.

### 4.5 PlanCard — тот самый сплошной блок

`brand-solid` фон, белый текст, radius 32, padding 22, мягкий радиальный блик в углу.
- caption «Our suggestion for Mila» (85% opacity) → **30/300** название визита → мета 15px.
- **Why-строки**: `plan.row-bg` (white 14%), radius 18, иконка в круге white 20%, «**Sound is hard** — scissors only, no dryer».
- На экране рекомендации это единственный синий блок; кнопка — тёмная пилюля.

### 4.6 SlotCard

| State | Вид |
|---|---|
| default | surface + shadow-soft, radius 24; время **22/300**, дата 15/500, причина 13 muted |
| selected | `brand-soft` + inset-кольцо 1.5px `brand` |
| best | бейдж `mid` «Best» справа |
| taken | transparent + 1px border, текст subtle, `aria-disabled` |

### 4.7 DateChip

Круг 56, число 17/600 + день 11 muted. Selected — `primary` (тёмный круг), недоступный — только контур. Лента дат горизонтальная, как в референсе.

### 4.8 Badge & Chip — пилюли

- **Badge** 28px: `soft` (Confirmed, No other guests) · `mid` (Quiet hours, Best) · `solid` ink (New) · `outline` (Home visit, Not confirmed, Offer sent) · `danger` (Cancelled). Иконка 14.
- **Chip** 32px: surface + inset 1px border, 13/500, иконка 14 — care-чипы «Dim lights», «Scissors only».

### 4.9 Input

Пилюля 56, surface, inset 1px border, padding 22. Focus: кольцо 1.5px `brand` + halo 4px brand/15%. Error: кольцо `danger` + текст 15px с иконкой. Textarea — radius 20, 112px. Label 15/500 над полем.

### 4.10 Toast — пилюля

`inverse` фон, 56px, иконка + текст 15 + действие-пилюля white/12%. Над sticky bar, `motion.base`.

### 4.11 StickyActionBar

Glass 72% + blur 20 + `shadow-bar`, padding 14/20 + safe-area. Одна primary-пилюля.

### 4.12 StoryStep & AutomationTimeline

- **Story**: круги 32 `brand-soft` с номером, соединены линией 1.5px `brand-mid`, текст 15/22. Внутри белой карточки 28px.
- **Timeline**: выполнено — CircleCheck `brand`; ожидает — Clock subtle; время справа 13 muted.

### 4.13 Owner — AttentionItem

Сплошной `brand-solid` блок, radius 24, иконка Bell, заголовок 600 + подпись. Две пилюли: белая («Send a nudge») и white/16% («Mark confirmed»). **Один на экран.** Если исключений больше — список «+2 more» ниже, уже не сплошной.

### 4.14 Owner — VisitRow

Карточка surface radius 24: время **22/300** · имя 500 + бейдж New · точка `visit-*` + тип · до 3 care-чипов · статус-бейдж справа. Buffer — строка с пунктиром «Buffer · 15 min». Отменённый — opacity 70% + зачёркнутое имя.

### 4.15 Owner — CareCard

Surface radius 32, заголовок **30/300** «Mila, 6», строки 52px: иконка в круге `brand-soft` · категория 15 muted · значение **17/600**. Читается с расстояния руки, в тёмной теме — «Studio Dim».

### 4.16 DotMatrix — фирменный мотив

Сетка точек 10px / gap 6: `on` = `pattern` (ink; dark — blue.300), `off` = `brand-mid`. Используется для «Handled for you»: **каждая тёмная точка — одно подтверждение, для которого Ане не пришлось писать сообщение.** Рядом numeral 48/300. Никаких графиков.

### 4.17 Feedback states

| State | Паттерн |
|---|---|
| loading | skeleton тех же форм, `surface-muted`, мягкий pulse + глагол |
| empty | круг 56 `brand-soft` с иконкой · H3 · строка · одна пилюля |
| error | нейтральная карточка + что дальше; `danger` — только у поля ввода |
| conflict | toast-пилюля + подсветка следующего слота |
| expired | карточка без чужих данных + «Message Anya» |

---

## 5. Иконки

lucide-react, **stroke 1.5** (тоньше — как в референсе), 14 · 16 · 20. Звук `Volume2` · тишина `VolumeX` · прикосновения `Hand` · зеркало `FlipHorizontal2` · ножницы `Scissors` · выезд `House` · свет `SunDim` · без разговоров `MessageCircleOff` · планшет `Tablet` · игрушка `Heart` · на коленях `Users` · перерывы `Pause` · нет гостей `UserX` · время `Clock` · календарь `CalendarDays` · внимание `Bell` · готово `CircleCheck`.

---

## 6. Контент

| Используем | Не используем |
|---|---|
| quiet, gentle, calm, at your child's pace | diagnosis, patient, treatment, special needs в заголовках |
| Имя ребёнка: «What helps Mila settle?» | «the child» |
| «Bad morning? Move it in one tap» | «Late cancellations will be charged» |
| Глагол в loading: «Holding your time…» | «Loading…» |

Без эмодзи, пазлов, радуг, мультяшек, медицинских символов, стоковых фото плачущих детей.

---

## 7. Доступность

- Все текстовые пары ≥ 4.5 : 1 (белый на `brand-solid` — 4.9 : 1, только ≥ 17px/500).
- Targets ≥ 44, основные 48–64.
- Статус = форма + цвет + слово (кольцо, заливка, иконка, подпись).
- Полная клавиатурная навигация, видимый focus-ring.
- `prefers-reduced-motion` и `prefers-color-scheme` уважаются.
- Текст ≥ 15px (кроме чипов 13/500).

---

## 8. Интеграция с Lovable

1. **0 кредитов:** в Code mode заменить `src/index.css` на `dist/lovable-index.css`; положить `dist/tailwind.preset.cjs` в корень и добавить `presets: [require('./tailwind.preset.cjs')]` в `tailwind.config.ts`.
2. **Project Knowledge:** вставить блок из §9.
3. **Первый промпт:**

```text
Design tokens are already in src/index.css and tailwind.preset.cjs — use only them, no hex, no default Tailwind colors.
Style: minimalist monochrome blue, shape-first, a touch of frosted glass. Page background = soft sky orbs + gradient (class bg-orbs). Cards, choice cards, slots and chips use the .glass utility (white 58% + blur 24 + saturate 140% + 1px light edge, no borders); sticky bar, care-card, icon buttons and date chips use .glass-strong. Buttons and inputs are 56px pills; icon buttons are 48px circles; cards radius 32. Font Manrope; big text and numbers in weight 300.
Restyle shadcn Button (pill, primary = dark ink), Input (pill), Textarea (radius 20), Badge (pill), Card (radius 32, shadow-soft, no border).
Create src/components/tykho/: ChoiceCard, ProgressRing, PlanCard (solid brand block with why-rows), SlotCard, DateChip, CareChip, StickyActionBar (glass), StoryStep, AutomationTimeline, VisitRow, AttentionItem (solid brand block), CareCard, DotMatrix, Toast (pill).
Support light and dark themes (prefers-color-scheme + .dark/.light) with a theme toggle.
Build a /styleguide page with every component in all states in both themes. Do not build booking screens yet.
```

4. **Проверка хардкода после GitHub sync:**

```bash
node "%USERPROFILE%/.claude/plugins/cache/ui-ux-pro-max-skill/ui-ux-pro-max/2.13.0/.claude/skills/design-system/scripts/validate-tokens.cjs" --dir src/
```

---

## 9. Knowledge block — Lovable Project Knowledge

```text
DESIGN SYSTEM — TYKHO Care v2 (monochrome blue, shape-first)
Stack: shadcn/ui + Tailwind (tailwind.preset.cjs) + lucide-react stroke 1.5. Use only CSS variables/Tailwind tokens; never hex or default Tailwind colors.
Feel: minimalist, calm, premium. ONE hue — blue in tonal steps — plus ink. Shape carries meaning, not colour. Icy sky gradient with 3 soft blue orbs behind; frosted glass cards (white 58% + blur 24 + saturate 140% + 1px white edge + soft shadow, no borders); glass-strong 78% for bars, care-card, icon buttons. Solid blue block and dark button stay opaque. Respect prefers-reduced-transparency.
Colours (light): bg #F4F9FE with gradient #EAF3FD→#F4F9FE; card #FFFFFF; text #13182B; secondary #5C6680; soft blue #EAF3FD (text #213F88); mid blue #C8DCF7; interactive blue #3563CF (rings, progress, links, focus); solid blue #3F6BD6 with white text (ONE solid block per screen: the recommendation for parents, "needs you" for Anya); primary button = dark ink #13182B pill with white text. Errors only: #B8475A. Dark theme: bg #0A1022, card #121A30, text #EAF1FB, secondary #A3AEC7, interactive #A3C1F0, soft #16223F, primary button light #EAF1FB with #0A1022 text; follow prefers-color-scheme, allow .dark/.light.
Shape: buttons & inputs 56px pills; icon buttons 48px circles; date chips 56px circles (selected = dark); cards radius 32; choice/slot cards radius 24, min 64px; badges & chips are pills. Selection = soft blue fill + 1.5px blue ring + filled check circle. Progress = thin ring "3/5", not a bar.
Type: Manrope only. Numbers & display weight 300 (numeral 48/52, display 40/44, H1 30/36 400, H2 22/28 500, H3 18/24 600, body 17/26, small 15/22, caption 13/18 500). Tabular figures. Nothing below 15px except chips.
Motif: dot matrix (10px dots) — each dark dot = one booking confirmed without a message.
Rules: one filled button per parent screen, in a glass sticky bar on mobile. Every recommendation and slot shows a "why". Status = shape + colour + word. No second hue, no yellow, no big blue fills, no emoji/cartoons/puzzles/medical imagery, no bounce/confetti. Motion 150–420ms cubic-bezier(0.22,0.8,0.26,1), respect prefers-reduced-motion. Every screen has loading, empty, error, conflict states.
```

---

## 10. Changelog

- **v2.1 · 27.09.2026** — гласморфизм: два уровня стекла, светлая кромка, небесные сферы на фоне, fallback для reduced-transparency.
- **v2.0 · 27.09.2026** — полный редизайн по референсу: монохромный синий, форма важнее цвета, Manrope light, пилюли/круги, стекло на градиенте, DotMatrix, ProgressRing, DateChip; светлая и тёмная темы; архив v1 — в `../design-system/tokens.v1.json`.
- v1.0–1.4 — пастельные палитры (teal → cobalt + tints), см. `../design-system/tokens.v1.json`.
