---
'@unergy/gandalf': minor
---

**Breaking:** `GBadge` follows the Figma Badge. `variant` is `tonal` (default) or `outlined` (was `default` / `outline`); `size` is `md` (28px, 16px text, default), `sm` (24px) or `xs` (22px) (was `sm` / `default` / `lg` / `icon` — an icon alone now stays square at any size). Text and outline use each color's `-bold` tone, the Action outline is `#2b7fff`, links and buttons get the alpha hover/press overlays, disabled uses the muted colors, and badges are capped at 180px.
