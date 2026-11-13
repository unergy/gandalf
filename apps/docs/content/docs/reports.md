---
title: Reports
description: Report markers for maps — circle and avatar badges per report type, the map pin, and the items of the layer style picker.
status: complete
---

# Reports

The pieces of the **Reports** page in Figma: the badge of each field report type (`GCircleReport`, `GAvatarReport`), the map pin that shows it (`GPin`), the illustrated map icons (`GIcons`) and the item of the layer style picker (`GPickerItem`). Prop names and values match the design.

## Preview

::reports-preview
::

## Usage

```vue
<template>
  <GPin layer-name="Pozo 3" report="agua" />
  <GAvatarReport type="fustal" label="Fustal" />

  <div class="flex gap-1">
    <GPickerItem
      v-for="item in icons"
      :key="item"
      :icon="item"
      :aria-label="item"
      :model-value="selected === item"
      @update:model-value="selected = item"
    />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { GAvatarReport, GPickerItem, GPin } from '@unergy-dev/gandalf'

const icons = ['pin', 'tree', 'door', 'pole'] as const
const selected = ref<(typeof icons)[number]>('tree')
</script>
```

### Report types

| `type` | Figma | Icon (Lucide) | `GCircleReport` | `GAvatarReport` |
|---|---|---|---|---|
| `access` | Access | `door-open` | `orange-600` / `orange-50` | `orange-100` / `orange-700` |
| `boundary` | Boundary | `vector-square` | `red-600` / `red-50` | `red-100` / `red-700` |
| `pole` | Pole | `utility-pole` (circle), `zap` (avatar) | `amber-600` / `amber-50` | `amber-100` / `amber-700` |
| `road` | Road | `corner-up-right` | `indigo-600` / `indigo-50` | `indigo-100` / `indigo-700` |
| `soil` | Soil | `grid-2x2` | `pink-600` / `pink-50` | `pink-100` / `pink-700` |
| `fustal` | Fustal | `tree-pine` | `green-600` / `gray-50` | `green-100` / `green-700` |
| `latizal` | Latizal | `sprout` | `emerald-600` / `emerald-50` | `emerald-100` / `emerald-700` |
| `agua` | Agua | `droplet` | `blue-600` / `blue-50` | `blue-100` / `blue-700` |
| `otro` | Otro | `circle-question-mark` | `purple-600` / `purple-50` | `purple-100` / `purple-700` |
| `observacion` | Observación (circle only) | `scan-eye` | `orange-600` / `purple-50` | — |
| `poligono` | Poligono (avatar only) | `waypoints` | — | `default/object` / `default/objectFg` |

`GCircleReport` is a 30px circle with a 16px icon; `GAvatarReport` a 24px square (8px corners) with a 12px icon. Both are decorative unless you pass `label`.

### GPin

A Cirlcle Report inside a 2px `card` ring with a white tail and the `shape/elevation/MD` shadow, under the layer name (14px semibold `base/foreground`). `report` picks the circle; the default slot replaces it.

### GIcons

The 44×32px illustrated map markers: `pin`, `tree`, `door` and `pole`. Each has a white outline with a drop shadow, so it reads on top of a map.

### GPickerItem

| `type` | Figma | Look |
|---|---|---|
| `icon` (default) | Type=Icon | 44×32px with a `GIcons` drawing (`icon`) |
| `label` | Type=Label | 86×32px with a line sample (`thickness`), a color sample (`color`) and the text (`label`) |

Hover and press use `alpha/dark-5` / `dark-8`. Activated (`v-model`) uses `accent-pr/accent` with a 1.5px `accent-pr/foreground` border.

## GCircleReport / GAvatarReport Props

::docs-props-table
---
items:
  - name: type
    type: "'access' | 'boundary' | 'pole' | 'road' | 'soil' | 'fustal' | 'latizal' | 'agua' | 'otro' | 'observacion' (circle) | 'poligono' (avatar)"
    default: "'access'"
    description: Report type, as the Type property in Figma.
  - name: label
    type: "string"
    default: undefined
    description: Accessible name. Without it the badge is hidden from screen readers.
---
::

## GPin Props

::docs-props-table
---
items:
  - name: layerName
    type: "string"
    default: "'Layer name'"
    description: Text over the pin.
  - name: showLayerName
    type: "boolean"
    default: "true"
    description: Shows the layer name, as "Show Layer name" in Figma.
  - name: report
    type: "GandalfCircleReportType"
    default: "'access'"
    description: Type of the circle inside the pin.
---
::

## GIcons Props

::docs-props-table
---
items:
  - name: type
    type: "'pin' | 'tree' | 'door' | 'pole'"
    default: "'pin'"
    description: Drawing, as the Type property in Figma.
  - name: label
    type: "string"
    default: undefined
    description: Accessible name. Without it the icon is decorative.
---
::

## GPickerItem Props

::docs-props-table
---
items:
  - name: type
    type: "'icon' | 'label'"
    default: "'icon'"
    description: Icon or label item, as the Type property in Figma.
  - name: modelValue
    type: "boolean"
    default: "false"
    description: Activated state (v-model).
  - name: icon
    type: "'pin' | 'tree' | 'door' | 'pole'"
    default: "'tree'"
    description: Drawing of the icon item.
  - name: label
    type: "string"
    default: undefined
    description: Text of the label item.
  - name: showLabel
    type: "boolean"
    default: "true"
    description: Shows the text.
  - name: showOpacity
    type: "boolean"
    default: "true"
    description: Shows the color sample circle.
  - name: showThickness
    type: "boolean"
    default: "true"
    description: Shows the line sample.
  - name: color
    type: "string"
    default: "'#BABBBD'"
    description: Color of the sample circle.
  - name: thickness
    type: "number"
    default: "3"
    description: Height of the sample line, in px.
  - name: ariaLabel
    type: "string"
    default: undefined
    description: Accessible name; needed for the icon item.
  - name: disabled
    type: "boolean"
    default: "false"
    description: Disables the item.
---
::

## Slots

| Component | Slot | Content |
|---|---|---|
| `GPin` | default | Replaces the `GCircleReport` inside the pin. |
| `GPin` | `layer-name` | Replaces the layer name text. |
| `GPickerItem` | default | Replaces the whole content of the item. |
| `GPickerItem` | `label` | Replaces the text of the label item. |
