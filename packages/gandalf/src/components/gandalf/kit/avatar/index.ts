import type { VariantProps } from 'class-variance-authority'
import { cva } from 'class-variance-authority'

export { default as GKitAvatar } from './Avatar.vue'
export { default as GKitAvatarGroup } from './AvatarGroup.vue'

// Avatar Group (Figma): each avatar overlaps the previous one by half its size (-16px at 32px).
export const gandalfAvatarGroupVariants = cva('flex items-center', {
  variants: {
    size: {
      xs: '-space-x-3',
      sm: '-space-x-4',
      md: '-space-x-5',
      lg: '-space-x-6',
    },
  },
  defaultVariants: {
    size: 'sm',
  },
})
