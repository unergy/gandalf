---
title: MCP
description: Model Context Protocol server for Gandalf UI — AI-powered component tooling.
---

# MCP

Gandalf UI exposes a **Model Context Protocol (MCP) server** that lets AI tools — GitHub Copilot, Claude, Cursor, and others — query the design system programmatically. Instead of relying on prompt context alone, agents can call MCP tools to get accurate, up-to-date information about components, tokens, and variants.

---

## What is MCP?

[Model Context Protocol](https://modelcontextprotocol.io) is an open standard that allows AI assistants to call structured tools exposed by a local or remote server. Think of it as a typed API layer between your codebase and the AI.

---

## Available tools

### `gandalf_list_components`

Returns all components registered in the design system, grouped by layer.

```json
// Request
{ "tool": "gandalf_list_components" }

// Response
{
  "base": ["GAlert", "GBadge", "GButton", ...],
  "kit": ["GKitAvatar", "GCheckboxCard"]
}
```

---

### `gandalf_get_component`

Returns full metadata for a single component: props, variants, slots, emits, and the source file path.

```json
// Request
{ "tool": "gandalf_get_component", "name": "GBadge" }

// Response
{
  "name": "GBadge",
  "layer": "base",
  "filePath": "app/components/gandalf/badge/GBadge.vue",
  "props": [
    { "name": "variant", "type": "'default' | 'outline'", "default": "\"default\"" },
    { "name": "color",   "type": "'action' | 'success' | 'warning' | ...", "default": "\"default\"" },
    { "name": "shape",   "type": "'rounded' | 'square'", "default": "\"rounded\"" },
    { "name": "size",    "type": "'default' | 'icon'", "default": "\"default\"" }
  ],
  "slots": ["default"],
  "emits": []
}
```

---

### `gandalf_get_tokens`

Returns the resolved CSS variable token map — useful for agents that need to know the actual color values when generating code or Figma specs.

```json
// Request
{ "tool": "gandalf_get_tokens", "mode": "light" }

// Response
{
  "action":        "#2563eb",
  "action-muted":  "#dbeafe",
  "success":       "#059669",
  "warning":       "#d97706",
  "destructive":   "#dc2626",
  ...
}
```

---

### `gandalf_search`

Full-text search across component names, prop names, and documentation content.

```json
// Request
{ "tool": "gandalf_search", "query": "color variants badge" }

// Response
[
  { "type": "component", "name": "GBadge", "score": 0.97 },
  { "type": "doc",       "path": "content/docs/badge.md", "score": 0.84 }
]
```

---

## Setup

### 1. Install the MCP server package

```bash
bun add -D @unergy/gandalf-mcp
```

### 2. Register it in your editor

**VS Code (`.vscode/mcp.json`)**

```json
{
  "servers": {
    "gandalf": {
      "type": "stdio",
      "command": "bunx",
      "args": ["@unergy/gandalf-mcp", "--root", "${workspaceFolder}"]
    }
  }
}
```

**Cursor (`.cursor/mcp.json`)**

```json
{
  "mcpServers": {
    "gandalf": {
      "command": "bunx",
      "args": ["@unergy/gandalf-mcp", "--root", "."]
    }
  }
}
```

**Claude Desktop (`claude_desktop_config.json`)**

```json
{
  "mcpServers": {
    "gandalf": {
      "command": "bunx",
      "args": ["@unergy/gandalf-mcp", "--root", "/path/to/your/project"]
    }
  }
}
```

---

## Usage examples

Once the MCP server is running, you can ask your AI assistant:

> "What props does `GBadge` accept?"

> "Scaffold a new base component for a tooltip, using the same pattern as `GBadge`."

> "What's the hex value of `--color-success` in light mode?"

The agent will call the appropriate MCP tool instead of guessing from training data, so answers reflect the actual current state of the design system.

---

## Status

> The `@unergy/gandalf-mcp` package is currently in development. See the [Roadmap](/docs/roadmap) for the planned release. The tool definitions above reflect the intended API.
