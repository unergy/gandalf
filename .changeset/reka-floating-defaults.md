---
'@unergy-dev/gandalf': patch
---

Keep Reka's defaults in the wrappers the previous fix missed. `GPopoverContent`, `GSelectContent`, `GComboboxList` and `GTooltipContent` turned `avoidCollisions`, `sideFlip`, `alignFlip` and `hideShiftedArrow` into `false`, so they did not flip or shift near the edge of the screen and got cut off. `GSelectContent` and `GComboboxList` also kept `bodyLock` and `disableOutsidePointerEvents` off, and `GStepper` turned `linear` off, which let you skip steps.
