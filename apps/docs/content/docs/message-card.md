---
title: GMessageCard
description: A chat message with the author, the comment, attachments and the date.
status: complete
---

# GMessageCard

A comment of a chat: the author's avatar and name, a ⋮ menu, the comment and its date. Images go above the comment and file attachments ([GMiniatures](/docs/miniatures)) just before it. It follows the **Chat → Message Card** component in Figma and its usage examples.

## Preview

::message-card-preview
::

## Usage

```vue
<template>
  <GMessageCard
    commenter-name="Laura Melissa"
    initials="LM"
    color="information"
    date="12/11/2026"
    comment="Adjunto los contratos firmados."
    :options="options"
    @select="onSelect"
  >
    <template #attachments>
      <GMiniatures file-name="Contrato 1" file-type="PDF" :removable="false" />
    </template>
  </GMessageCard>
</template>

<script setup lang="ts">
import { GMessageCard, GMiniatures } from '@unergy-dev/gandalf'
import type { Option } from '@unergy-dev/gandalf'

const options: Option[] = [
  { label: 'Editar', value: 'edit' },
  { label: 'Eliminar', value: 'delete' },
]

function onSelect(option: Option) {
  // ...
}
</script>
```

The card is as wide as its container (358px in the Figma examples). For an image, put an `<img>` with its size in the `media` slot: the slot rounds it to 8px, as in the design.

## GMessageCard Props

::docs-props-table
---
items:
  - name: commenterName
    type: "string"
    default: "—"
    description: Author's name ("Commenter Name" in Figma).
  - name: initials
    type: "string"
    default: undefined
    description: Initials of the Avatar Item, e.g. "CN".
  - name: color
    type: "'default' | 'action' | 'information' | 'success' | 'warning' | 'destructive'"
    default: "'default'"
    description: Color of the Avatar Item. default sits on card/card, the others on {color}/object.
  - name: comment
    type: "string"
    default: undefined
    description: The comment. The default slot replaces it.
  - name: date
    type: "string"
    default: undefined
    description: Shown as given, aligned to the right.
  - name: options
    type: "Option[]"
    default: undefined
    description: Options of the ⋮ menu (a GDropdown). Without them the button is not shown.
  - name: actionsLabel
    type: "string"
    default: "'Message options'"
    description: Accessible name of the ⋮ button.
---
::

## Events

| Event | When |
|---|---|
| `select` | An option of the ⋮ menu is chosen; receives the `Option` |

## Slots

| Slot | Content |
|---|---|
| default | The comment, instead of `comment`. |
| `avatar` | Content of the Avatar Item, a `GAvatar` (`GAvatarImage` / `GAvatarFallback`). |
| `actions` | Replaces the ⋮ menu. |
| `media` | Image above the comment. |
| `attachments` | Files before the comment, 4px apart, wrapping. |
