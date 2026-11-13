---
'@unergy-dev/gandalf': patch
---

Fix `GDialog`, `GAlertDialog` and `GPopover` casting absent boolean props to `false`: without `v-model:open` they never opened from their trigger, and `GDialog` was not modal (no overlay). They are now uncontrolled unless `open` is passed, and `GDialog` is modal by default.
