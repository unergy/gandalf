---
'@unergy/gandalf': minor
---

Add `GSegmentedButton` and `GSegment`, from the **Segmented Button** page in Figma.

A pill with a `bni/border-extra-loud` outline, 1000px corners and joined 40px segments separated
by a 1px divider. Segments carry an optional 16px Lucide icon and an `Action/md` label; hover and
press tint with Figma's `alpha/dark-5` and `alpha/dark-8` overlays, and the activated segment uses
`accent-pr/accent` with `accent-pr/foreground` text. Built on `ui/toggle-group`, so it supports
`type="single"` (the default) and `type="multiple"`, keyboard navigation and `v-model`.
