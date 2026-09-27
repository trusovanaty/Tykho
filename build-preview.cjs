#!/usr/bin/env node
/**
 * Builds design-system-preview.html from preview.template.html:
 *  - inlines lucide icons as static SVG ({{i:name:size[:class]}}), no runtime JS needed
 *  - injects dark-theme variables resolved from tokens.json
 *   node build-preview.cjs [iconDir]   (default: ./icons)
 */
const fs = require('fs');
const path = require('path');
const ROOT = __dirname;
const ICONS = process.argv[2] || path.join(ROOT, 'icons');
const tokens = JSON.parse(fs.readFileSync(path.join(ROOT, 'tokens.json'), 'utf8'));

const get = (p) => p.split('.').reduce((o, k) => o?.[k], tokens);
const resolve = (v) => (typeof v === 'string' && v.startsWith('{') ? resolve(get(v.slice(1, -1))?.$value ?? v) : v);
const D = { ...tokens.semantic.color, ...tokens.dark.semantic.color };
const E = { ...tokens.semantic.effect, ...tokens.dark.semantic.effect };
const c = (k) => resolve(D[k].$value);
const e = (k) => resolve(E[k].$value);

const darkVars = `--bg:${c('background')};--bg-grad:${e('background-gradient')};
  --surface:${c('surface')};--glass:${e('glass')};--glass-strong:${e('glass-strong')};--glass-border:${e('glass-border')};--glass-hl:${e('glass-highlight')};--orbs:${e('orbs')};--screen-orbs:radial-gradient(60% 30% at 100% 0%,rgb(63 107 214/.35),transparent 70%),radial-gradient(55% 28% at 0% 55%,rgb(53 99 207/.22),transparent 70%),radial-gradient(60% 30% at 90% 100%,rgb(122 159 232/.18),transparent 70%);--muted:${c('surface-muted')};--border:${c('border')};--border-strong:${c('border-strong')};
  --fg:${c('foreground')};--fg-2:${c('foreground-muted')};--fg-3:${c('foreground-subtle')};
  --primary:${c('primary')};--primary-hover:${c('primary-hover')};--on-primary:${c('primary-foreground')};
  --brand:${c('brand')};--brand-hover:${c('brand-hover')};--on-brand:${c('brand-foreground')};
  --solid:${c('brand-solid')};--on-solid:${c('brand-solid-foreground')};
  --soft:${c('brand-soft')};--soft-fg:${c('brand-soft-foreground')};--mid:${c('brand-mid')};--mid-fg:${c('brand-mid-foreground')};
  --pattern:${c('pattern')};--danger:${c('danger')};--danger-soft:${c('danger-soft')};
  --inverse:${c('inverse')};--on-inverse:${c('inverse-foreground')};
  --v-quiet:${c('visit-quiet')};--v-meet:${c('visit-meet')};--v-home:${c('visit-home')};--v-regular:${c('visit-regular')};
  --sh-soft:${e('shadow-soft')};--sh-float:${e('shadow-float')};--sh-bar:${e('shadow-bar')};
  color-scheme:dark;`;
const darkCss = `@media (prefers-color-scheme:dark){:root:not([data-theme="light"]){\n  ${darkVars}\n}}\n:root[data-theme="dark"]{\n  ${darkVars}\n}`;

const svgCache = {};
function icon(name, size = 20, cls = '') {
  if (!svgCache[name]) {
    const f = path.join(ICONS, `${name}.svg`);
    if (!fs.existsSync(f)) throw new Error(`Missing icon ${name} in ${ICONS}`);
    svgCache[name] = fs.readFileSync(f, 'utf8').replace(/<!--[\s\S]*?-->\s*/, '').replace(/\s+/g, ' ').trim();
  }
  return svgCache[name]
    .replace('width="24"', `width="${size}"`).replace('height="24"', `height="${size}"`)
    .replace('stroke-width="2"', 'stroke-width="1.5"')
    .replace(/class="([^"]*)"/, (m, k) => `class="${k}${cls ? ' ' + cls : ''}" aria-hidden="true"`);
}

// 12 x 6 dot matrix: 14 "on" dots scattered calmly
const on = new Set([2, 5, 9, 14, 17, 22, 27, 31, 38, 43, 49, 55, 60, 66]);
const dots = Array.from({ length: 72 }, (_, i) => `<i${on.has(i) ? ' class="on"' : ''}></i>`).join('');

let html = fs.readFileSync(path.join(ROOT, 'preview.template.html'), 'utf8');
html = html.replace('DARK_VARS_PLACEHOLDER', darkCss).replace('DOTS_PLACEHOLDER', dots);
html = html.replace(/\{\{i:([a-z0-9-]+)(?::(\d+))?(?::([a-z-]+))?\}\}/g, (m, n, s, k) => icon(n, s ? +s : 20, k || ''));
fs.writeFileSync(path.join(ROOT, 'design-system-preview.html'), html);
console.log('Generated: design-system-preview.html', (html.match(/<svg/g) || []).length, 'icons');
