---
'@unergy-dev/gandalf': minor
---

Add `GKitSidebar`, a navigation rail built from `GSidebar`: pass `groups` of items (`value`, `title`, `icon`, `to` / `href`, `disabled`) and the active `value` with `v-model`. It hides group titles without an icon in the collapsed rail, shows a tooltip per item, renders `to` items with the `linkAs` component (`NuxtLink`, `RouterLink`…) and has `header`, `footer` and `item` slots. New types: `SidebarNavGroup`, `SidebarNavItem`.
