---
'@unergy/gandalf': minor
---

Add `GDetailsPanel` from the Figma **Details Panel** page, built on `ui/sheet`: `GDetailsPanel`,
`GDetailsPanelTrigger`, `GDetailsPanelContent`, `GDetailsPanelHeader`, `GDetailsPanelTitle`,
`GDetailsPanelDescription`, `GDetailsPanelBody`, `GDetailsPanelFooter` and `GDetailsPanelClose`.

A 416px `card/card` panel docked to the right, without a scrim (non-modal by default). The 72px
header has the title in `Heading/sm` and a Ghost primary close button; the body scrolls with
`GScrollArea`; the footer aligns its buttons to the right. The rows inside are
`GVisualizationCard` (with a `title`) and `GVisualizationCardField`, as in the design.
