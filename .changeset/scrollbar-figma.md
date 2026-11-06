---
'@unergy/gandalf': minor
---

Add `GScrollArea` and `GScrollBar`, styled from the Figma **Scroll Bar** page.

The scrollbar follows the `Container Scroll Bar` component set: a 6px track in `base/base-loud` with a `corner/sm` radius, a `base/foreground-quiet` thumb with the same radius, 8px of air between the track and the container edge, and 8px of padding inside the track. `orientation` maps Figma's `Type` property (`vertical`, `horizontal` or `both`) and the bar is visible whenever the content overflows (`type="auto"`).
