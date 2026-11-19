---
'@unergy-dev/gandalf': minor
---

**Breaking:** `GLayout` and `GKitSidebar` become one component, `GAppSidebar`. `GKitSidebar` is no longer exported: the navigation rail is drawn by `GAppSidebar` from its `groups`, and its `header`, `footer` and `item` slots are now `GAppSidebar`'s `sidebar-header`, `sidebar-footer` and `item`. Renames: `GLayout` → `GAppSidebar`, `GLayoutTitle` → `GAppSidebarTitle`, `GLayoutBreadcrumbs` → `GAppSidebarBreadcrumbs`, `gandalfLayout*` → `gandalfAppSidebar*` (`gandalfLayoutSidebarClass` → `gandalfAppSidebarRailClass`), `GandalfLayoutLevel` → `GandalfAppSidebarLevel`. `SidebarNavGroup` and `SidebarNavItem` are still exported.
