---
'@unergy/gandalf': minor
---

Rename the `base` color token to `base-base` (Figma `base/base`; use `bg-base-base`). A color named `base` made Tailwind treat `text-base` as a color too, so any `text-base` text rendered almost white (`slate-50`), including inputs and `GTabs`.
