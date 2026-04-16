---
title: GField
description: Combine labels, controls, and help text to compose accessible form fields and grouped inputs.
---

# GField

A composable field system that wraps shadcn/ui's `Field` family. Provides semantic grouping, validation states, and responsive layouts for form controls.

## Composition

### GField

A single control with label, helper text, and validation.

```
GField
├── GFieldLabel
├── Input / Textarea / Switch / Select
├── GFieldDescription
└── GFieldError
```

### GFieldGroup

Related fields in one group. Use `GFieldSeparator` between sections when needed.

```
GFieldGroup
├── GField
│   ├── GFieldLabel
│   ├── Input / Textarea / Switch / Select
│   ├── GFieldDescription
│   └── GFieldError
├── GFieldSeparator
└── GField
    ├── GFieldLabel
    └── Input / Textarea / Switch / Select
```

### GFieldSet

Semantic grouping with a legend and description, usually containing a `GFieldGroup`.

```
GFieldSet
├── GFieldLegend
├── GFieldDescription
└── GFieldGroup
    ├── GField
    │   ├── GFieldLabel
    │   ├── Input / Textarea / Switch / Select
    │   ├── GFieldDescription
    │   └── GFieldError
    └── GField
        ├── GFieldLabel
        └── Input / Textarea / Switch / Select
```

## Usage

```vue
<template>
  <GFieldSet>
    <GFieldLegend>Profile</GFieldLegend>
    <GFieldDescription>This appears on invoices and emails.</GFieldDescription>
    <GFieldGroup>
      <GField>
        <GFieldLabel for="name">Full name</GFieldLabel>
        <input id="name" placeholder="Evil Rabbit" />
        <GFieldDescription>This appears on invoices and emails.</GFieldDescription>
      </GField>
      <GField>
        <GFieldLabel for="username">Username</GFieldLabel>
        <input id="username" aria-invalid />
        <GFieldError>Choose another username.</GFieldError>
      </GField>
      <GField orientation="horizontal">
        <GFieldLabel for="newsletter">Subscribe to the newsletter</GFieldLabel>
      </GField>
    </GFieldGroup>
  </GFieldSet>
</template>

<script setup lang="ts">
import {
  GField,
  GFieldContent,
  GFieldDescription,
  GFieldError,
  GFieldGroup,
  GFieldLabel,
  GFieldLegend,
  GFieldSeparator,
  GFieldSet,
  GFieldTitle,
} from '@/components/gandalf/field'
</script>
```

## GField Props

::docs-props-table
---
items:
  - name: orientation
    type: "'vertical' | 'horizontal' | 'responsive'"
    default: "'vertical'"
    description: Controls the layout direction of the field.
  - name: data-invalid
    type: "boolean"
    default: undefined
    description: Switches the field into an error state.
---
::

## GFieldContent Props

::docs-props-table
---
items:
  - name: class
    type: "string"
    default: undefined
    description: Additional CSS classes.
---
::

## GFieldLabel Props

::docs-props-table
---
items:
  - name: class
    type: "string"
    default: undefined
    description: Additional CSS classes.
---
::

## GFieldTitle Props

::docs-props-table
---
items:
  - name: class
    type: "string"
    default: undefined
    description: Additional CSS classes.
---
::

## GFieldDescription Props

::docs-props-table
---
items:
  - name: class
    type: "string"
    default: undefined
    description: Additional CSS classes.
---
::

## GFieldError Props

::docs-props-table
---
items:
  - name: errors
    type: "Array<string | { message: string | undefined } | undefined>"
    default: undefined
    description: An array of error objects or strings. When multiple messages exist, renders a list automatically.
---
::

## GFieldGroup Props

::docs-props-table
---
items:
  - name: class
    type: "string"
    default: undefined
    description: Additional CSS classes.
---
::

## GFieldSet Props

::docs-props-table
---
items:
  - name: class
    type: "string"
    default: undefined
    description: Additional CSS classes.
---
::

## GFieldLegend Props

::docs-props-table
---
items:
  - name: variant
    type: "'legend' | 'label'"
    default: "'legend'"
    description: "The legend variant. Use 'label' for label sizing and alignment in nested FieldSets."
---
::

## GFieldSeparator Props

::docs-props-table
---
items:
  - name: class
    type: "string"
    default: undefined
    description: Additional CSS classes. Accepts slot content for inline text.
---
::

## Validation and Errors

Add `data-invalid` to `GField` to switch the entire block into an error state. Add `aria-invalid` on the input itself for assistive technologies. Render `GFieldError` immediately after the control.

```vue
<GField data-invalid>
  <GFieldLabel for="email">Email</GFieldLabel>
  <input id="email" type="email" aria-invalid />
  <GFieldError>Enter a valid email address.</GFieldError>
</GField>
```

## Responsive Layout

Set `orientation="horizontal"` on `GField` to align the label and control side-by-side. Set `orientation="responsive"` for automatic column layouts inside container-aware parents.

```vue
<GFieldGroup class="@container/field-group">
  <GField orientation="responsive">
    <GFieldLabel for="name">Name</GFieldLabel>
    <input id="name" />
  </GField>
</GFieldGroup>
```
