---
title: GDetailsPanel
description: A side panel that shows the details of the selected item.
status: complete
---

# GDetailsPanel

The **Details Panel** page in Figma: a 416px panel docked to the right edge of the screen, with a
72px header (title and close button), a scrolling body and a row of actions at the bottom. It is
built on shadcn/ui's `Sheet`.

The design shows no scrim and the page behind stays usable, so the panel is **non-modal** by
default. Pass `:modal="true"` to `GDetailsPanel` to block the page.

## Preview

::details-panel-preview
::

## Usage

The rows of the body are the components of the [Visualization](/docs/visualization) page, as in
Figma: each group is a `GVisualizationCard` with a `title`, and each row a
`GVisualizationCardField`.

```vue
<template>
  <GDetailsPanel v-model:open="open">
    <GDetailsPanelContent>
      <GDetailsPanelHeader>
        <GDetailsPanelTitle>Item title</GDetailsPanelTitle>
        <GDetailsPanelDescription class="sr-only">Details of the selected item</GDetailsPanelDescription>
      </GDetailsPanelHeader>

      <GDetailsPanelBody>
        <GVisualizationCard title="PANEL 1">
          <GVisualizationCardField label="Visita" value="Forestal" />
          <GVisualizationCardField label="Fecha de visita" placeholder="Sin definir" />
        </GVisualizationCard>
      </GDetailsPanelBody>

      <GDetailsPanelFooter>
        <GButton variant="outline-primary">Action 2</GButton>
        <GButton>Action 1</GButton>
      </GDetailsPanelFooter>
    </GDetailsPanelContent>
  </GDetailsPanel>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import {
  GButton,
  GDetailsPanel,
  GDetailsPanelBody,
  GDetailsPanelContent,
  GDetailsPanelDescription,
  GDetailsPanelFooter,
  GDetailsPanelHeader,
  GDetailsPanelTitle,
  GVisualizationCard,
  GVisualizationCardField,
} from '@unergy/gandalf'

const open = ref(false)
</script>
```

## Parts

| Component | Figma | Notes |
|---|---|---|
| `GDetailsPanel` | Detail Panel | Root. `v-model:open`, `modal` (default `false`). |
| `GDetailsPanelTrigger` | — | Opens the panel; use `as-child` to wrap your own button. |
| `GDetailsPanelContent` | Detail Panel | 416px `card/card` panel. `side`: `right` (default) or `left`. |
| `GDetailsPanelHeader` | Header | 72px, title on the left and a Ghost primary close button. `showCloseButton`, `closeLabel`. |
| `GDetailsPanelTitle` | Item title | `Heading/sm` in `base/foreground-loud`. |
| `GDetailsPanelDescription` | — | Not drawn in Figma; keep it for screen readers with `class="sr-only"`. |
| `GDetailsPanelBody` | Content | Scrolls with `GScrollArea`; groups 12px apart. `contentClass`. |
| `GDetailsPanelFooter` | Group Button | Actions aligned to the right, 16px of padding. |
| `GDetailsPanelClose` | — | Closes the panel from any custom button. |
