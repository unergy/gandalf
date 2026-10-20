---
title: GForm
description: Form composition utilities with built-in validation support.
status: planned
---

# GForm

> **Not yet wrapped in Gandalf.** Until `GForm` is implemented, use the shadcn/ui primitive directly:
>
> ```ts
> import { ... } from '@/components/ui/form'
> ```

A form layer built on top of shadcn/ui's `Form` and [Vee-Validate](https://vee-validate.logaretm.com/) + [Zod](https://zod.dev/). Provides `GFormField`, `GFormItem`, `GFormLabel`, `GFormMessage`, and `GFormDescription` sub-components for structured, validated forms.
