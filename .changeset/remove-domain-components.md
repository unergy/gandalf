---
'@unergy-dev/gandalf': minor
---

**Breaking:** remove `GAvatarRol` and the Reports kit (`GCircleReport`, `GAvatarReport`, `GPin`, `GIcons`, `GPickerItem`, with their variants, types and icon maps). They encoded one product's domain (roles and field report types) and belong in the app that uses them, built on `GAvatar` / `GKitAvatar`.
