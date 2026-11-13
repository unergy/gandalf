---
title: GAccordion
description: A vertically stacked set of interactive headings that each reveal a section of content.
status: stable
---

# GAccordion

A wrapper around shadcn/ui's `Accordion` (Reka UI), styled after the **Accordeon** page in Figma. It has the two molecules of the design:

- **Accordeon Main** (`variant="main"`, the default): a white card with a title, a badge and a count. `type="visualization"` shows a chevron when closed and "Ocultar" when open; `type="table"` shows "Mostrar" / "Ocultar".
- **Accordeon Blended** (`variant="blended"`): the chevron sits before the title and the badge is on the right. `category="main"` is the white card; `category="default"` are the flush rows used for sub-accordions inside it.

## Preview

::accordion-preview
::

## Usage

```vue
<template>
  <GAccordion type="single" collapsible>
    <GAccordionItem value="projects" type="table">
      <GAccordionTrigger label="Activo" count="12">Proyectos</GAccordionTrigger>
      <GAccordionContent>
        <GTable>…</GTable>
      </GAccordionContent>
    </GAccordionItem>
  </GAccordion>
</template>

<script setup lang="ts">
import {
  GAccordion,
  GAccordionContent,
  GAccordionItem,
  GAccordionTrigger,
} from '@unergy-dev/gandalf'
</script>
```

### Blended, with sub-accordions

```vue
<template>
  <GAccordion variant="blended" type="single" collapsible>
    <GAccordionItem value="main">
      <GAccordionTrigger label="Label">
        Main accordeon
        <template #label-icon><BookCheck /></template>
      </GAccordionTrigger>
      <GAccordionContent>
        <GAccordion variant="blended" category="default" type="multiple">
          <GAccordionItem value="sub-1">
            <GAccordionTrigger label="Label">Subaccordeon 1</GAccordionTrigger>
            <GAccordionContent>…</GAccordionContent>
          </GAccordionItem>
        </GAccordion>
      </GAccordionContent>
    </GAccordionItem>
  </GAccordion>
</template>
```

## Components

| Component           | Description                                                                                     |
| ------------------- | ----------------------------------------------------------------------------------------------- |
| `GAccordion`        | Root. `type="single"` or `"multiple"`, `v-model` for the open items, `variant` and `category`.   |
| `GAccordionItem`    | One collapsible section. Requires a unique `value`; `type` picks the Main layout.               |
| `GAccordionTrigger` | The 48px header row. The default slot is the title, shown in uppercase as in Figma.             |
| `GAccordionContent` | The collapsible content, animated on open/close. It adds no padding: the content brings its own. |

## GAccordion Props

`GAccordion` extends all props from Reka UI's [`Accordion`](https://reka-ui.com/docs/components/accordion) (`type`, `collapsible`, `modelValue`, `defaultValue`, `disabled`…).

::docs-props-table
---
items:
  - name: variant
    type: "'main' | 'blended'"
    default: "'main'"
    description: Figma molecule. Accordeon Main or Accordeon Blended.
  - name: category
    type: "'main' | 'default'"
    default: "'main'"
    description: Blended only. 'main' is the white card, 'default' the flush rows used inside it.
---
::

## GAccordionItem Props

::docs-props-table
---
items:
  - name: value
    type: "string"
    default: "—"
    description: Unique value of the item.
  - name: type
    type: "'visualization' | 'table'"
    default: "'visualization'"
    description: Main only. Visualization shows a chevron when closed; Table shows "Mostrar" and, when open, an outline.
  - name: disabled
    type: "boolean"
    default: "false"
    description: Disables the item with the muted colors of the design.
---
::

## GAccordionTrigger Props

::docs-props-table
---
items:
  - name: label
    type: "string"
    default: undefined
    description: Text of the badge (Tonal in Main and Blended Main, Outlined in Blended Default). The `label` slot replaces the badge; `label-icon` adds its leading icon.
  - name: count
    type: "string | number"
    default: undefined
    description: Main only. The text after the badge ("Count#" in Figma). Also a `count` slot.
  - name: expandText
    type: "string"
    default: "'Mostrar'"
    description: Main Table only. Action text while closed.
  - name: collapseText
    type: "string"
    default: "'Ocultar'"
    description: Main only. Action text while open.
---
::
