---
'@unergy/gandalf': minor
---

Add `GSidebar` and its parts from the Figma Sidebar page: `GSidebarProvider`, `GSidebar`,
`GSidebarHeader`, `GSidebarContent`, `GSidebarGroup`, `GSidebarGroupLabel`, `GSidebarGroupContent`,
`GSidebarMenu`, `GSidebarMenuItem`, `GSidebarMenuButton`, `GSidebarFooter`, `GSidebarTrigger` and
`GSidebarInset`, plus the `useSidebar` composable.

The rail is 224px expanded (`Type=Expanded`) and 52px collapsed (`Type=Icon`). Sidebar Title is a
32px row with a 12px icon and 12px text in `sidebar/primary-fg`; Sidebar Menu Item is a 32px row
with a 14px icon and 14px text in `sidebar/foreground`, filling with `sidebar/accent` on hover and
with `sidebar/primary` plus a semibold `sidebar/primary-fg` label when `is-active`.
