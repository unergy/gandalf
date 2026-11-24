---
'@unergy-dev/gandalf': patch
---

Fix `GSwitch` on and off looking the same. The track was `base/base` off and `base/base-loud` on,
two near-identical greys, under the same dark thumb. On is now the purple of `GCheckbox` and
`GRadioGroup` (`accent-primary-foreground`) with a white thumb and a purple check; off is a grey
`bni/border-loud` track with a white thumb and a grey cross.
