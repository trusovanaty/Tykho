# TYKHO Care

Sensory-friendly haircut booking for a solo children's stylist in Odesa — Lovable Challenge project.

## Project docs

Lovable reads these from the repo — prompts reference them directly.

| File | What it is |
|---|---|
| [`docs/01-project-knowledge.md`](docs/01-project-knowledge.md) | Paste into Lovable → Settings → Knowledge |
| [`docs/02-product-brief.md`](docs/02-product-brief.md) | Problem, MVP scope, out of scope, acceptance criteria, demo story |
| [`docs/03-screens-content.md`](docs/03-screens-content.md) | Sitemap, per-screen IA, states and final UI copy |
| [`docs/04-logic-and-data.md`](docs/04-logic-and-data.md) | Data model, RLS, recommendation rules, slot filter, automations |
| [`docs/05-seed-data.json`](docs/05-seed-data.json) | Demo seed (Tue 6 – Sat 10 Oct 2026, Europe/Kyiv) |
| [`docs/06-prompts.md`](docs/06-prompts.md) | Step-by-step Lovable prompts |
| [`docs/references/`](docs/references/) | Style reference + design-system screenshots (light/dark) |

## Design system v2.1

Everything lives in [`design-system/`](design-system/):

| File | What it is |
|---|---|
| [`README.md`](design-system/README.md) | Principles, tokens, 17 component specs, Lovable Knowledge block & first prompt |
| [`tokens.json`](design-system/tokens.json) | Source of truth — primitive → semantic → component, light + dark |
| [`dist/lovable-index.css`](design-system/dist/lovable-index.css) | Drop-in `src/index.css` for Lovable (shadcn HSL vars, glass, orbs, dark theme) |
| [`dist/tailwind.preset.cjs`](design-system/dist/tailwind.preset.cjs) | Tailwind preset |
| [`design-system-preview.html`](design-system/design-system-preview.html) | Static visual preview (open locally) |

Rebuild after editing tokens:

```bash
cd design-system
node build.cjs
node build-preview.cjs
```
