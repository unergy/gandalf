---
'@unergy-dev/gandalf': minor
---

Add what an app needs to build its whole header from Gandalf. `GKitUserMenu` is the Header avatar and the menu it opens: the signed-in user (avatar, name, email) on top, the app's items in the default slot and an optional `footer` row. `GMenuSub`, `GMenuSubTrigger` and `GMenuSubContent` nest a menu inside `GMenu` with the same item and container styles. `GHeader` takes `logoTo` and `linkAs` to make the logo a link to the app's home. `GAppSidebar` takes `sidebarLabel`, the accessible name of the sidebar's `<nav>`, which it did not pass to the rail before.
