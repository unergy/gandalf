---
title: Roadmap
description: What's coming next to Gandalf UI.
---

# Roadmap

This page tracks what's done, what's actively being worked on, and what's planned for Gandalf UI. Priorities shift with platform needs — if something is blocking you, bring it up in `#design-system`.

---

## Now — v0.1 (current)

Shipping the foundational layer. The goal is to have every component Unergy actively uses covered with a stable, documented `gandalf/base/` implementation.

| Component | Status |
|---|---|
| GBadge | ✅ Complete |
| GAlert | ✅ Complete |
| GAlertDialog | ✅ Complete |
| GAvatar | 🔄 In progress |
| GBreadcrumb | ✅ Complete |
| GButtonGroup | ✅ Complete |
| GCheckbox | ✅ Complete |
| GCombobox | ✅ Complete |
| GDialog | ✅ Complete |
| GDropdown | ✅ Complete |
| GField | ✅ Complete |
| GInputGroup | ✅ Complete |
| GLabel | ✅ Complete |
| GPagination | ✅ Complete |
| GSkeleton | ✅ Complete |
| GTabs | ✅ Complete |
| GTextarea | ✅ Complete |
| GButton | 📋 Planned |

---

## Next — v0.2

Focus: forms, layout primitives, and the first `gandalf/kit/` expansion.

### Forms

- **GInput** — Themed input wrapping shadcn's `Input`, with size variants and state styling (error, disabled, readonly)
- **GSelect** — Accessible select built on Reka UI's Select primitive
- **GNativeSelect** — A styled `<select>` for cases where accessibility or SSR simplicity matters
- **GRadioGroup** — Single-choice group with consistent label and description support
- **GSwitch** — Toggle switch with semantic color support
- **GNumberField** — Numeric input with stepper controls

### Layout

- **GSeparator** — Horizontal and vertical dividers
- **GCard** — Composable card with header, content, and footer slots
- **GScrollArea** — Custom scrollbar overlay for overflow containers

### Kit expansions

- **GFormField** — A `kit/` component combining `GField` + `GInput` + validation display into one drop-in unit
- **GSearchInput** — `GInputGroup` pre-wired with a search icon and clear button

---

## Later — v0.3

Focus: data display, feedback, and navigation.

- **GTable** — Sortable, paginated data table with column configuration
- **GProgress** — Determinate and indeterminate progress bars
- **GSonner** — Toast notification system backed by Sonner
- **GTooltip** — Accessible tooltip with configurable delay and placement
- **GPopover** — Generic popover anchor for contextual content
- **GHoverCard** — Rich preview on hover, useful for user/entity previews
- **GSidebar** — Collapsible sidebar shell for app layouts
- **GNavigationMenu** — Top-level nav with keyboard support

---

## Backlog

Ideas and requests that don't have a scheduled release yet.

- **GChart** — Chart wrapper around a lightweight charting library, with Unergy's color palette pre-applied
- **GCalendar / GDatePicker** — Date selection with range support
- **GCarousel** — Embla-powered carousel with navigation controls
- **GKbd** — Keyboard shortcut display component
- **GResizable** — Resizable panel layout primitive
- **GStepper** — Multi-step wizard progress indicator
- **GTagsInput** — Free-form tag entry with autocomplete
- **GPinInput** — OTP / PIN code entry
- **GCommand** — Command palette with search and keyboard navigation
- **GContextMenu** — Right-click context menu

---

## Ideas under consideration

These are longer-horizon investments, not commitments.

- **Figma sync** — Auto-generate Figma component stubs from the CVA variant definitions so design and code stay in sync
- **Storybook integration** — Parallel Storybook build alongside these docs, useful for isolated component development
- **Theme builder** — An interactive page in these docs where you can tweak CSS variables live and copy the output
- **Component CLI** — `gandalf add <component>` command to scaffold new base components following the project conventions
- **Chromatic visual regression** — Catch unintentional visual diffs on PRs before they reach main

---

## Done

- Project scaffold — Nuxt 3, Tailwind v4, shadcn-nuxt
- CSS variable token system with semantic colors and dark mode
- CVA-based variant architecture for all base components
- Documentation site (this site)
- `gandalf/kit/` layer with `GKitAvatar` and `GCheckboxCard`
