# TYKHO Care

Sensory-friendly haircut booking for a solo children's stylist in Odesa — Lovable Challenge project.

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
