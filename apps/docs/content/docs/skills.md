---
title: Copilot Skills
description: GitHub Copilot agent skills for scaffolding and working with Gandalf UI.
---

# Copilot Skills

Gandalf UI ships a set of **GitHub Copilot agent skills** — small, focused instructions that teach Copilot how to work with the design system correctly. Instead of prompting Copilot from scratch every time, these skills encode the conventions and patterns of the codebase so you get consistent, on-brand output.

---

## What are skills?

Skills are instruction files (`.instructions.md`) that Copilot reads as context when you're working in VS Code. They tell Copilot things like:

- Which layer a new component should live in
- How to structure a CVA variant definition
- What naming conventions to follow
- What to never do (e.g. importing directly from `reka-ui`)

---

## Available skills

### `scaffold-base-component`

Generates a new `gandalf/base/` component from scratch. Prompts:

> "Create a new base component for a tooltip"

Copilot will scaffold:
- `app/components/gandalf/tooltip/GTooltip.vue` — the component with CVA variants
- `app/components/gandalf/tooltip/index.ts` — the barrel export
- A stub doc page at `content/docs/tooltip.md`

It will automatically:
- Wrap the shadcn `ui/tooltip` primitive (never Reka UI directly)
- Follow the `G<Name>` naming convention
- Use `cn()` from `@/lib/utils`

---

### `scaffold-kit-component`

Same as above but targets `gandalf/kit/`. Copilot will:
- Only import from `gandalf/base/`, never `ui/` directly
- Keep business domain out of the component
- Generate a focused, opinionated API that hides composition complexity

---

### `add-variant`

Adds a new CVA variant to an existing base component. Prompts:

> "Add a `compact` size variant to GBadge"

Copilot will:
- Add the variant definition to the `cva()` call
- Add it to the `defaultVariants` if appropriate
- Update the prop types and JSDoc

---

### `write-docs-page`

Generates a full documentation page for a Gandalf component. Produces:
- Frontmatter with `title`, `description`, and `status`
- A `## Preview` section with the `::component-preview::` block
- `## Usage` with an import snippet
- `## Props` table derived from the component's TypeScript types
- Variant examples for each CVA variant

---

### `fix-layer-violation`

Detects and fixes layer boundary violations. If a `base/` component imports from `kit/`, or a `kit/` component imports from `ui/` directly, Copilot will refactor the import chain to respect the architecture.

---

## Installing the skills

Skills live in `.github/copilot-instructions.md` and the `.copilot/` directory at the root of the repo. They are loaded automatically when you open the workspace in VS Code with the GitHub Copilot extension installed.

```
.github/
  copilot-instructions.md   ← global workspace instructions
.copilot/
  skills/
    scaffold-base-component.instructions.md
    scaffold-kit-component.instructions.md
    add-variant.instructions.md
    write-docs-page.instructions.md
    fix-layer-violation.instructions.md
```

> **Note:** Skills are currently being authored. See the [Roadmap](/docs/roadmap) for status.

---

## Writing your own skill

1. Create a new `.instructions.md` file in `.copilot/skills/`
2. Add frontmatter `applyTo` to scope it to specific file patterns if needed
3. Write clear, imperative instructions in the body — Copilot reads these literally

```md
---
applyTo: "app/components/gandalf/base/**"
---

When creating a new base component:
- Always wrap a shadcn `ui/` primitive, never Reka UI directly
- Export all public types from the `index.ts` barrel
- Use CVA for all visual variants
```
