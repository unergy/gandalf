---
'@unergy-dev/gandalf': patch
---

Fix `GKitSelect` and `GKitCombobox` dropping native attributes. Their root renders no element, so
`id`, `aria-label`, `aria-describedby` and `aria-invalid` were lost: a `<label for>` or a form field
(vee-validate's `FormControl`) pointed at nothing and the trigger had no accessible name. They now
go to the trigger (the default one, for `GKitCombobox`).
