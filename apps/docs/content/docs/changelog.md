---
title: Changelog
description: Release history for Gandalf UI.
---

# Changelog

All notable changes to Gandalf UI are documented here. Versioning follows [Semantic Versioning](https://semver.org/).

---

## v0.1.4 — April 23, 2026

### Added
- `GCheckboxCard` kit component — a checkbox wrapped in a selectable card surface, with checked/unchecked visual states driven by CVA
- `GKitAvatar` kit component — avatar with name, subtitle, and optional badge slot
- Documentation site launched (you're looking at it)
- `ProseCode` and `ProsePre` content components for syntax-highlighted code blocks in docs

### Changed
- `GBadge`: added `shape` prop (`rounded` | `square`) and `size="icon"` variant for icon-only badges
- `GField`: slot-based layout now supports `description` and `error` slots independently

### Fixed
- `GCombobox`: selected item was not cleared when `modelValue` was reset to `null` externally
- `GTabs`: active tab indicator misaligned on first render in SSR mode

---

## v0.1.3 — April 10, 2026

### Added
- `GPagination` component with page number display, previous/next controls, and ellipsis
- `GSkeleton` component with animated pulse and configurable dimensions
- Dark mode support across all base components — token overrides in `.dark` class

### Changed
- Migrated color system from HSL to **OKLCH** across all CSS variable definitions
- `GDropdown` now accepts a `triggerClass` prop to style the trigger slot wrapper independently

### Fixed
- `GAlertDialog`: confirm button now correctly emits `@confirm` before closing
- `GBreadcrumb`: last item was incorrectly rendering as a link instead of plain text

---

## v0.1.2 — March 28, 2026

### Added
- `GInputGroup` — composable input wrapper with leading/trailing icon and addon slots
- `GButtonGroup` — horizontally grouped buttons with shared border treatment
- `GLabel` — accessible label with required indicator and disabled state
- CVA variant system documented and adopted across all base components

### Changed
- `GAlert`: `variant` prop now accepts `ghost` in addition to `default` and `outline`
- Switched from `cn()` inline to a shared `app/lib/utils.ts` export

---

## v0.1.1 — March 14, 2026

### Added
- `GDialog` and `GAlertDialog` base components
- `GAvatar`, `GAvatarImage`, `GAvatarFallback` component trio
- `GBreadcrumb` with separator and ellipsis support
- `GCheckbox` with indeterminate state support

### Changed
- `GBadge`: semantic colors (`action`, `information`, `success`, `warning`, `destructive`, `default`) replace the old string-based `color` options
- Project structure formalized — `ui/` is now strictly read-only, all customization lives in `gandalf/base/`

---

## v0.1.0 — February 28, 2026

### Initial release

- Project scaffolded with Nuxt 3.13, Tailwind CSS v4, and shadcn-nuxt
- `gandalf/base/` layer established with the first set of components: `GBadge`, `GAlert`, `GCombobox`, `GDropdown`, `GField`, `GTabs`, `GTextarea`
- Semantic color token system defined (`action`, `information`, `success`, `warning`, `destructive`)
- `gandalf/kit/` layer introduced (empty, pending first kit components)
- `app/lib/utils.ts` with `cn()` helper
