# Первый промпт — создание проекта в Lovable

📎 Приложить картинки: `references/00-style-reference.webp`, `01-shot-flow-light.png`, `05-shot-components.png`.

```text
Create a new app called TYKHO Care — a mobile-first booking web app for a solo sensory-friendly children's hairstylist in Odesa. In this first step set up ONLY the design system and a styleguide. No booking screens, no backend yet.

Stack: React + Vite + TypeScript + Tailwind + shadcn/ui + lucide-react.

1. DESIGN TOKENS — use these files from my public GitHub repo exactly as they are:
- src/index.css = https://raw.githubusercontent.com/trusovanaty/Tykho/main/design-system/dist/lovable-index.css
- Tailwind theme.extend = https://raw.githubusercontent.com/trusovanaty/Tykho/main/design-system/dist/tailwind.preset.cjs (merge into tailwind.config.ts; our borderRadius sm 12 / md 20 / lg 24 / xl 32 must override shadcn's radius defaults; keep the animate plugin)
- Specs = https://raw.githubusercontent.com/trusovanaty/Tykho/main/design-system/README.md
If you can't open the links, use these values: font Manrope (300 for display and numbers, 400–600 for UI); light bg #F4F9FE with gradient #EAF3FD→#F4F9FE and 3 soft blue radial orbs; card #FFFFFF; text #13182B; secondary #5C6680; soft blue #EAF3FD (text #213F88); mid blue #C8DCF7; interactive blue #3563CF; solid blue #3F6BD6 with white text; primary button dark ink #13182B; error #B8475A. Dark theme: bg #0A1022, card #121A30, text #EAF1FB, secondary #A3AEC7, interactive #A3C1F0, soft #16223F, primary button #EAF1FB with #0A1022 text. Glass: white 58% (.glass) / 78% (.glass-strong) + blur 24 + saturate 140% + 1px white inner edge; dark glass rgb(26 36 64 / .52).
Never use hex or default Tailwind colours in components — only these tokens.

2. STYLE (see attached reference): minimalist, calm, premium. ONE hue — blue in tonal steps — plus ink. Shape carries meaning. Frosted glass cards over soft sky orbs, soft diffused shadows, no card borders.
- Buttons & inputs: 56px pills. Primary button = dark ink pill, one per screen.
- Icon buttons: 48px glass circles. Date chips: 56px circles, selected = dark.
- Cards radius 32; choice & slot cards radius 24, min height 64.
- Selection = soft blue fill + 1.5px blue ring + filled check circle.
- Progress = thin ring with "3/5" inside, not a bar.
- ONE solid blue (#3F6BD6) block per screen at most.
- lucide icons, stroke 1.5. Nothing below 15px except chips (13px). Tabular numbers.
- Motion 150–420ms, cubic-bezier(0.22,0.8,0.26,1), no bounce; respect prefers-reduced-motion and prefers-reduced-transparency.

3. THEMES: light + dark. Follow prefers-color-scheme, allow override with .dark / .light on <html>, add a ThemeToggle (glass pill, top-right).

4. COMPONENTS in src/components/tykho/: ChoiceCard, ProgressRing, PlanCard (the solid blue block with glass "why" rows), SlotCard, DateChip, CareChip, StickyActionBar (glass-strong), StoryStep, AutomationTimeline, VisitRow, AttentionItem (solid blue block), CareCard, DotMatrix, Toast (dark pill), ThemeToggle. Restyle shadcn Button, Input, Textarea (radius 20), Badge (pill) and Card to match.

5. PAGES:
- "/" — a simple placeholder: TYKHO wordmark, headline "Haircuts, at your child's pace.", one dark pill button "Start the comfort check" (no action yet).
- "/styleguide" — every token (colour scale, type scale, radii, glass levels) and every component in all states (default, hover, selected, disabled, loading, error, taken), in both themes, using sample content about Mila, 6 and stylist Anya.

Do not build the booking flow, owner dashboard or any backend yet.
```

## После генерации
1. Открыть `/styleguide`, переключить тему, сравнить с `design-system-preview.html`.
2. Мелочи — через Visual Edits.
3. Подключить GitHub → написать Claude «готово»: он сверит `src/index.css` и `tailwind.config.ts` с эталоном из `design-system/dist/` и поправит расхождения без кредитов.
4. Вставить `01-project-knowledge.md` в Settings → Knowledge.
5. Дальше — `06-prompts.md` с **P3** (P1 и P2 уже покрыты этим промптом).
