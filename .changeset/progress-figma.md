---
'@unergy/gandalf': minor
---

Add `GProgressBar`, built from the **Progress bar** page in Figma: a 6px square track in
`base/base-loud` that fills with `success/success`, plus the value as a percentage in `Body/sm`
(`00.00%`, `75.00%`, `100.0%`). Figma's `State` property is only a value, so it maps to
`modelValue`; `max` normalises values that are not out of 100, and `label` / the `label` slot
replace the percentage.
