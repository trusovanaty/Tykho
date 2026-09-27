#!/usr/bin/env node
/**
 * TYKHO design system build — v2 (monochrome blue)
 *   node build.cjs
 * Reads tokens.json and writes:
 *   dist/tokens.css          — all three layers as CSS variables (ui-ux-pro-max generator)
 *   dist/lovable-index.css   — drop-in src/index.css for Lovable (shadcn HSL channels, light + dark)
 *   dist/tailwind.preset.cjs — theme.extend for tailwind.config
 */
const fs = require('fs');
const path = require('path');
const { execFileSync } = require('child_process');

const ROOT = __dirname;
const DIST = path.join(ROOT, 'dist');
const tokens = JSON.parse(fs.readFileSync(path.join(ROOT, 'tokens.json'), 'utf8'));
fs.mkdirSync(DIST, { recursive: true });

// 1. tokens.css via the skill's generator
const GENERATOR = path.join(
  process.env.USERPROFILE || process.env.HOME,
  '.claude/plugins/cache/ui-ux-pro-max-skill/ui-ux-pro-max/2.13.0/.claude/skills/design-system/scripts/generate-tokens.cjs'
);
if (fs.existsSync(GENERATOR)) {
  execFileSync('node', [GENERATOR, '--config', path.join(ROOT, 'tokens.json'), '-o', path.join(DIST, 'tokens.css')], { stdio: 'inherit' });
}

// helpers
const get = (p) => p.split('.').reduce((o, k) => o?.[k], tokens);
function resolve(v) {
  if (typeof v !== 'string' || !v.startsWith('{')) return v;
  const t = get(v.slice(1, -1));
  return resolve(t?.$value ?? v);
}
function hsl(hex) {
  const [r, g, b] = [1, 3, 5].map((i) => parseInt(hex.slice(i, i + 2), 16) / 255);
  const max = Math.max(r, g, b), min = Math.min(r, g, b), l = (max + min) / 2;
  let h = 0, s = 0;
  if (max !== min) {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    h = max === r ? (g - b) / d + (g < b ? 6 : 0) : max === g ? (b - r) / d + 2 : (r - g) / d + 4;
    h *= 60;
  }
  return `${Math.round(h)} ${Math.round(s * 100)}% ${Math.round(l * 100)}%`;
}

// shadcn / Tailwind name ← TYKHO semantic color name
const MAP = {
  background: 'background', foreground: 'foreground',
  card: 'surface', 'card-foreground': 'foreground',
  popover: 'surface', 'popover-foreground': 'foreground',
  primary: 'primary', 'primary-foreground': 'primary-foreground',
  'primary-hover': 'primary-hover', 'primary-active': 'primary-active',
  secondary: 'surface-muted', 'secondary-foreground': 'foreground',
  muted: 'surface-muted', 'muted-foreground': 'foreground-muted',
  subtle: 'foreground-subtle',
  accent: 'brand-soft', 'accent-foreground': 'brand-soft-foreground',
  brand: 'brand', 'brand-hover': 'brand-hover', 'brand-foreground': 'brand-foreground',
  'brand-solid': 'brand-solid', 'brand-solid-foreground': 'brand-solid-foreground',
  'brand-soft': 'brand-soft', 'brand-soft-foreground': 'brand-soft-foreground',
  'brand-mid': 'brand-mid', 'brand-mid-foreground': 'brand-mid-foreground',
  destructive: 'danger', 'destructive-soft': 'danger-soft', 'destructive-foreground': 'danger-foreground',
  border: 'border', 'border-strong': 'border-strong', input: 'border', ring: 'ring',
  pattern: 'pattern',
  inverse: 'inverse', 'inverse-foreground': 'inverse-foreground',
  'visit-quiet': 'visit-quiet', 'visit-meet': 'visit-meet', 'visit-home': 'visit-home', 'visit-regular': 'visit-regular',
};
const EFFECTS = ['background-gradient', 'hero-gradient', 'orbs', 'glass', 'glass-strong', 'glass-border', 'glass-highlight', 'glass-blur', 'glass-saturate', 'shadow-soft', 'shadow-float', 'shadow-bar'];

const light = { color: tokens.semantic.color, effect: tokens.semantic.effect };
const dark = {
  color: { ...light.color, ...tokens.dark.semantic.color },
  effect: { ...light.effect, ...tokens.dark.semantic.effect },
};
const colorBlock = (set) => Object.entries(MAP).map(([k, s]) => `    --${k}: ${hsl(resolve(set.color[s].$value))};`).join('\n');
const effectBlock = (set) => EFFECTS.map((k) => `    --${k}: ${resolve(set.effect[k].$value)};`).join('\n');

function flat(obj, prefix, out = []) {
  for (const [k, v] of Object.entries(obj)) {
    if (k.startsWith('$')) continue;
    if (v && typeof v === 'object' && v.$value === undefined) flat(v, [...prefix, k], out);
    else if (v?.$value !== undefined) out.push([`--${[...prefix, k].join('-')}`, resolve(v.$value)]);
  }
  return out;
}
const S = tokens.semantic;
const scalar = [...flat(S.text, ['text']), ...flat(S.space, ['space']), ...flat(S.target, ['target']),
  ...flat(S.motion, ['motion']), ...flat(S.layout, ['layout'])];

const css = `/* TYKHO Care v2 — src/index.css for Lovable. Generated from design-system/tokens.json — do not edit by hand. */
@import url('https://fonts.googleapis.com/css2?family=Manrope:wght@300;400;500;600&display=swap');

@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
  :root {
    /* Color — HSL channels (shadcn convention) */
${colorBlock(light)}
    --radius: 1.5rem;

    /* Effects */
${effectBlock(light)}

    /* Type, space, targets, motion, layout */
${scalar.map(([k, v]) => `    ${k}: ${v};`).join('\n')}
  }

  /* Dark theme — forced with .dark on <html> */
  .dark {
${colorBlock(dark)}
${effectBlock(dark)}
    color-scheme: dark;
  }
}

/* Dark theme — automatic, unless the user forced .light */
@media (prefers-color-scheme: dark) {
  :root:not(.light) {
${colorBlock(dark)}
${effectBlock(dark)}
    color-scheme: dark;
  }
}

@layer base {
  * { @apply border-border; }
  html { -webkit-text-size-adjust: 100%; }
  body {
    @apply text-foreground font-sans antialiased;
    background: hsl(var(--background));
    background-image: var(--orbs), var(--background-gradient);
    background-attachment: fixed;
    font-size: var(--text-body-size);
    line-height: var(--text-body-lh);
    font-feature-settings: 'tnum' 1;
  }
  h1, h2, .font-display {
    font-weight: 300;
    letter-spacing: var(--text-heading-tracking);
  }
  :focus-visible { @apply outline-none ring-2 ring-ring ring-offset-2 ring-offset-background; }

  @media (prefers-reduced-motion: reduce) {
    *, *::before, *::after { animation-duration: 0.01ms !important; transition-duration: 0.01ms !important; }
  }
}

@layer components {
  /* Frosted glass: translucent fill + blur + 1px light edge. Only over the orb/gradient background. */
  .glass, .glass-strong {
    background: var(--glass);
    -webkit-backdrop-filter: blur(var(--glass-blur)) saturate(var(--glass-saturate));
    backdrop-filter: blur(var(--glass-blur)) saturate(var(--glass-saturate));
    box-shadow: inset 0 0 0 1px var(--glass-border), inset 0 1px 0 var(--glass-highlight), var(--shadow-soft);
  }
  .glass-strong { background: var(--glass-strong); }
  .bg-orbs { background-image: var(--orbs), var(--background-gradient); }
  @media (prefers-reduced-transparency: reduce) {
    .glass, .glass-strong { background: hsl(var(--card)); -webkit-backdrop-filter: none; backdrop-filter: none; }
  }
}
`;
fs.writeFileSync(path.join(DIST, 'lovable-index.css'), css);

// tailwind preset
const GROUPS = ['primary', 'destructive', 'card', 'popover', 'secondary', 'muted', 'accent', 'inverse', 'visit', 'border', 'brand'];
const colors = {};
for (const k of Object.keys(MAP)) {
  const [base, ...rest] = k.split('-');
  if (GROUPS.includes(base) && (rest.length || Object.keys(MAP).some((x) => x.startsWith(base + '-')))) {
    colors[base] = colors[base] || {};
    colors[base][rest.length ? rest.join('-') : 'DEFAULT'] = `hsl(var(--${k}))`;
  } else colors[k] = `hsl(var(--${k}))`;
}
const R = (p) => resolve(`{primitive.${p}}`);
const T = (p) => resolve(`{semantic.${p}}`);
const preset = {
  darkMode: ['class'],
  theme: {
    extend: {
      fontFamily: { sans: ['Manrope', 'system-ui', 'sans-serif'] },
      colors,
      borderRadius: { sm: R('radius.sm'), md: R('radius.md'), lg: R('radius.lg'), xl: R('radius.xl'), full: R('radius.full') },
      boxShadow: { soft: 'var(--shadow-soft)', float: 'var(--shadow-float)', bar: 'var(--shadow-bar)' },
      backgroundImage: { page: 'var(--orbs), var(--background-gradient)', hero: 'var(--hero-gradient)' },
      fontSize: {
        numeral: [T('text.numeral-size'), { lineHeight: T('text.numeral-lh'), fontWeight: '300', letterSpacing: T('text.display-tracking') }],
        display: [T('text.display-size'), { lineHeight: T('text.display-lh'), fontWeight: '300', letterSpacing: T('text.display-tracking') }],
        'display-lg': [T('text.display-size-lg'), { lineHeight: T('text.display-lh-lg'), fontWeight: '300', letterSpacing: T('text.display-tracking') }],
        h1: [T('text.h1-size'), { lineHeight: T('text.h1-lh'), fontWeight: '400', letterSpacing: T('text.heading-tracking') }],
        h2: [T('text.h2-size'), { lineHeight: T('text.h2-lh'), fontWeight: '500', letterSpacing: T('text.heading-tracking') }],
        h3: [T('text.h3-size'), { lineHeight: T('text.h3-lh'), fontWeight: '600' }],
        body: [T('text.body-size'), { lineHeight: T('text.body-lh') }],
        small: [T('text.small-size'), { lineHeight: T('text.small-lh') }],
        caption: [T('text.caption-size'), { lineHeight: T('text.caption-lh'), fontWeight: '500' }],
      },
      spacing: { 'page-x': T('space.page-x'), target: T('target.min'), icon: T('target.icon'), control: T('target.control'), choice: T('target.choice') },
      minHeight: { target: T('target.min'), control: T('target.control'), choice: T('target.choice') },
      maxWidth: { flow: T('layout.flow-max'), owner: T('layout.owner-max'), measure: T('layout.measure') },
      transitionTimingFunction: { calm: T('motion.ease') },
      transitionDuration: { fast: T('motion.fast'), calm: T('motion.base'), reveal: T('motion.reveal') },
    },
  },
};
fs.writeFileSync(
  path.join(DIST, 'tailwind.preset.cjs'),
  `// TYKHO Care v2 — Tailwind preset. Generated from tokens.json.\n// tailwind.config.ts: presets: [require('./tailwind.preset.cjs')]\nmodule.exports = ${JSON.stringify(preset, null, 2)};\n`
);
console.log('Generated: dist/lovable-index.css, dist/tailwind.preset.cjs');
