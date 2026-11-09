---
'@unergy-dev/gandalf': patch
---

Fix `GSelect` never opening when used without `v-model:open`: an absent `open` was cast to `false`, so the select stayed closed. It is now uncontrolled unless `open` is passed.
