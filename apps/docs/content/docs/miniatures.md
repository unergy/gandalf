---
title: GMiniatures
description: An attachment chip for chat messages, as a file or an image thumbnail.
status: complete
---

# GMiniatures

An attachment of a chat message or of the text being written: a file with its name and type, or a square image. It follows the **Chat → Miniatures** component in Figma; prop names and values match the design. Not to be confused with [GMiniature](/docs/miniature), the selectable 128px thumbnail of the Card page.

## Preview

::miniatures-preview
::

## Usage

```vue
<template>
  <GMiniatures file-name="Contrato.pdf" file-type="PDF" @remove="remove('contrato')" />
  <GMiniatures type="variant2" src="/uploads/plant.jpg" alt="Planta" @remove="remove('foto')" />
</template>

<script setup lang="ts">
import { GMiniatures } from '@unergy-dev/gandalf'

function remove(id: string) {
  // ...
}
</script>
```

### Types

| `type` | Figma | Look |
|---|---|---|
| `default` (default) | Type=Default | 144×48px, `base/base` with a `bni/border` border, file icon, name and type |
| `variant2` | Type=Variant2 | 48px square with the image (`src`) cropped to fill it |

Both draw the dark remove button of the corner, which emits `remove`.

## GMiniatures Props

::docs-props-table
---
items:
  - name: type
    type: "'default' | 'variant2'"
    default: "'default'"
    description: File chip or image thumbnail, as the Type property in Figma.
  - name: fileName
    type: "string"
    default: undefined
    description: Name of the file, truncated to one line.
  - name: fileType
    type: "string"
    default: undefined
    description: Type under the name, e.g. "PDF".
  - name: src
    type: "string"
    default: undefined
    description: Image of variant2. Without it the square shows the dark placeholder.
  - name: alt
    type: "string"
    default: "''"
    description: Image description for screen readers.
  - name: removable
    type: "boolean"
    default: "true"
    description: Shows the remove button of the corner.
  - name: removeLabel
    type: "string"
    default: "'Remove'"
    description: Accessible name of the remove button.
---
::

## Events

| Event | When |
|---|---|
| `remove` | The remove button is clicked |

## Slots

| Slot | Content |
|---|---|
| `icon` | Replaces the file icon of `default`. |
