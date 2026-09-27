// TYKHO Care v2 — Tailwind preset. Generated from tokens.json.
// tailwind.config.ts: presets: [require('./tailwind.preset.cjs')]
module.exports = {
  "darkMode": [
    "class"
  ],
  "theme": {
    "extend": {
      "fontFamily": {
        "sans": [
          "Manrope",
          "system-ui",
          "sans-serif"
        ]
      },
      "colors": {
        "background": "hsl(var(--background))",
        "foreground": "hsl(var(--foreground))",
        "card": {
          "DEFAULT": "hsl(var(--card))",
          "foreground": "hsl(var(--card-foreground))"
        },
        "popover": {
          "DEFAULT": "hsl(var(--popover))",
          "foreground": "hsl(var(--popover-foreground))"
        },
        "primary": {
          "DEFAULT": "hsl(var(--primary))",
          "foreground": "hsl(var(--primary-foreground))",
          "hover": "hsl(var(--primary-hover))",
          "active": "hsl(var(--primary-active))"
        },
        "secondary": {
          "DEFAULT": "hsl(var(--secondary))",
          "foreground": "hsl(var(--secondary-foreground))"
        },
        "muted": {
          "DEFAULT": "hsl(var(--muted))",
          "foreground": "hsl(var(--muted-foreground))"
        },
        "subtle": "hsl(var(--subtle))",
        "accent": {
          "DEFAULT": "hsl(var(--accent))",
          "foreground": "hsl(var(--accent-foreground))"
        },
        "brand": {
          "DEFAULT": "hsl(var(--brand))",
          "hover": "hsl(var(--brand-hover))",
          "foreground": "hsl(var(--brand-foreground))",
          "solid": "hsl(var(--brand-solid))",
          "solid-foreground": "hsl(var(--brand-solid-foreground))",
          "soft": "hsl(var(--brand-soft))",
          "soft-foreground": "hsl(var(--brand-soft-foreground))",
          "mid": "hsl(var(--brand-mid))",
          "mid-foreground": "hsl(var(--brand-mid-foreground))"
        },
        "destructive": {
          "DEFAULT": "hsl(var(--destructive))",
          "soft": "hsl(var(--destructive-soft))",
          "foreground": "hsl(var(--destructive-foreground))"
        },
        "border": {
          "DEFAULT": "hsl(var(--border))",
          "strong": "hsl(var(--border-strong))"
        },
        "input": "hsl(var(--input))",
        "ring": "hsl(var(--ring))",
        "pattern": "hsl(var(--pattern))",
        "inverse": {
          "DEFAULT": "hsl(var(--inverse))",
          "foreground": "hsl(var(--inverse-foreground))"
        },
        "visit": {
          "quiet": "hsl(var(--visit-quiet))",
          "meet": "hsl(var(--visit-meet))",
          "home": "hsl(var(--visit-home))",
          "regular": "hsl(var(--visit-regular))"
        }
      },
      "borderRadius": {
        "sm": "12px",
        "md": "20px",
        "lg": "24px",
        "xl": "32px",
        "full": "9999px"
      },
      "boxShadow": {
        "soft": "var(--shadow-soft)",
        "float": "var(--shadow-float)",
        "bar": "var(--shadow-bar)"
      },
      "backgroundImage": {
        "page": "var(--orbs), var(--background-gradient)",
        "hero": "var(--hero-gradient)"
      },
      "fontSize": {
        "numeral": [
          "3rem",
          {
            "lineHeight": "3.25rem",
            "fontWeight": "300",
            "letterSpacing": "-0.03em"
          }
        ],
        "display": [
          "2.5rem",
          {
            "lineHeight": "2.75rem",
            "fontWeight": "300",
            "letterSpacing": "-0.03em"
          }
        ],
        "display-lg": [
          "3.5rem",
          {
            "lineHeight": "3.75rem",
            "fontWeight": "300",
            "letterSpacing": "-0.03em"
          }
        ],
        "h1": [
          "1.875rem",
          {
            "lineHeight": "2.25rem",
            "fontWeight": "400",
            "letterSpacing": "-0.02em"
          }
        ],
        "h2": [
          "1.375rem",
          {
            "lineHeight": "1.75rem",
            "fontWeight": "500",
            "letterSpacing": "-0.02em"
          }
        ],
        "h3": [
          "1.125rem",
          {
            "lineHeight": "1.5rem",
            "fontWeight": "600"
          }
        ],
        "body": [
          "1.0625rem",
          {
            "lineHeight": "1.625rem"
          }
        ],
        "small": [
          "0.9375rem",
          {
            "lineHeight": "1.375rem"
          }
        ],
        "caption": [
          "0.8125rem",
          {
            "lineHeight": "1.125rem",
            "fontWeight": "500"
          }
        ]
      },
      "spacing": {
        "page-x": "1.25rem",
        "target": "2.75rem",
        "icon": "3rem",
        "control": "3.5rem",
        "choice": "4rem"
      },
      "minHeight": {
        "target": "2.75rem",
        "control": "3.5rem",
        "choice": "4rem"
      },
      "maxWidth": {
        "flow": "440px",
        "owner": "1200px",
        "measure": "60ch"
      },
      "transitionTimingFunction": {
        "calm": "cubic-bezier(0.22, 0.8, 0.26, 1)"
      },
      "transitionDuration": {
        "fast": "150ms",
        "calm": "240ms",
        "reveal": "420ms"
      }
    }
  }
};
