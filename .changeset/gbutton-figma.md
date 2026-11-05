---
'@unergy/gandalf': minor
---

**Breaking:** `GButton` now uses the variants and sizes from Figma. `variant`: `tonal-primary` (default), `tonal-action`, `tonal-destructive`, `outline-primary`, `outline-destructive`, `ghost-primary`, `ghost-action`, `ghost-danger`; `size`: `md` (default, 40px), `sm` (36px), `xs` (32px). Replace `default` → `tonal-primary`, `destructive` → `tonal-destructive`, `outline` → `outline-primary`, `ghost` → `ghost-primary`, and `size="icon-sm"` → `size="xs"`. New `alertDot` prop. Adds the `alpha-dark-12`, `alpha-light-8` and `alpha-light-12` tokens and the `overlay-*` utilities.
