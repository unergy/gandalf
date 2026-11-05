---
title: GFilesCard
description: A selectable card for a folder or a file, with an action button.
status: in-progress
---

# GFilesCard

A selectable card for a folder or a file, as in a document drive. Click toggles its activated state; the `actions` slot holds a button (a menu for folders, a download for files) that does not toggle the card. It follows the **Card → Files Card** component in Figma; prop names match the design's properties.

## Preview

::files-card-preview
::

## Usage

```vue
<template>
  <GFilesCard v-model="active" title="Contratos" file-count="12 files">
    <template #actions>
      <GButton variant="ghost" size="icon-sm" aria-label="More actions"><EllipsisVertical /></GButton>
    </template>
  </GFilesCard>

  <GFilesCard v-model="activeFile" type="file" title="Tramite4.xlsx" extension="xlsx">
    <template #actions>
      <GButton variant="ghost" size="icon-sm" aria-label="Download"><Download /></GButton>
    </template>
  </GFilesCard>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { Download, EllipsisVertical } from 'lucide-vue-next'
import { GButton, GFilesCard } from '@unergy/gandalf'

const active = ref(false)
const activeFile = ref(false)
</script>
```

### Types

| `type` | Figma | Size | Shows |
|---|---|---|---|
| `folder` (default) | Type=Folder | 72px high | Folder icon, title, `fileCount` and actions |
| `file` | Type=File | 192px high | Title, actions and a preview with the file type |

The file preview shows a file icon and `extension` by default. Put a real thumbnail in the `preview` slot.

## GFilesCard Props

::docs-props-table
---
items:
  - name: title
    type: "string"
    default: "—"
    description: Folder or file name, truncated to one line.
  - name: type
    type: "'folder' | 'file'"
    default: "'folder'"
    description: Layout, as the Type property in Figma.
  - name: fileCount
    type: "string | number"
    default: undefined
    description: Second line of a folder, shown as given (e.g. "12 files").
  - name: extension
    type: "string"
    default: undefined
    description: File type in the default preview, shown in uppercase.
  - name: modelValue
    type: "boolean"
    default: "false"
    description: Activated state (v-model), "State=Activated" in Figma.
---
::

## Slots

| Slot | Content |
|---|---|
| `actions` | A button at the top right. Its clicks do not toggle the card. |
| `icon` | Replaces the folder icon, or adds an icon before a file's title. |
| `preview` | Replaces the file preview (icon and extension). |
