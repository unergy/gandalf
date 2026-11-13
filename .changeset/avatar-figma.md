---
'@unergy-dev/gandalf': minor
---

**Breaking:** `GAvatar` and `GKitAvatar` follow the Avatar page in Figma. `variant="rounded" | "square"` becomes `type="circle" | "square"` (square is now 8px, `corner/lg`). New props `size` (`xs` 24px, `sm` 32px by default, `md` 40px, `lg` 48px, with bold 12 / 14 / 16 / 18px text) and `semantic` (`default`, `action`, `information`, `success`, `warning`, `destructive`). `GKitAvatarGroup` overlaps by half the avatar size, without ring, and takes `type`, `size` and `more` (a last "+N" avatar). New `GAvatarRol` (Avatar Rol: legal, ambiental, forestal, civil, electrico).
