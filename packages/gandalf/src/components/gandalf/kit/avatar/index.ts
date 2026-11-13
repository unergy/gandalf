import type { VariantProps } from 'class-variance-authority'
import { cva } from 'class-variance-authority'

export { default as GKitAvatar } from './Avatar.vue'
export { default as GKitAvatarGroup } from './AvatarGroup.vue'
export { default as GAvatarRol } from './AvatarRol.vue'

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

// Avatar Rol (Figma): 32px circle with the initials 3px above center, and an 18px badge with the role icon.
export const gandalfAvatarRolVariants = cva('', {
  variants: {
    type: {
      legal: 'bg-information-muted text-information-bold',
      ambiental: 'bg-lime-100 text-lime-700',
      forestal: 'bg-success-muted text-success-bold',
      civil: 'bg-action-muted text-action-bold',
      electrico: 'bg-warning-muted text-warning-bold',
    },
  },
  defaultVariants: {
    type: 'legal',
  },
})

// Avatar Rol → "Container icon": the badge background per role.
export const gandalfAvatarRolBadgeVariants = cva(
  'text-card absolute top-[23px] left-[7px] flex size-[18px] items-center justify-center rounded-full drop-shadow-[0px_-0.5px_0.5px_rgba(0,0,0,0.25)] [&_svg]:size-2.5',
  {
    variants: {
      type: {
        legal: 'bg-information-bold',
        ambiental: 'bg-lime-700',
        forestal: 'bg-success',
        civil: 'bg-action-bold',
        electrico: 'bg-warning-bold',
      },
    },
    defaultVariants: {
      type: 'legal',
    },
  },
)

export type GandalfAvatarRolType = NonNullable<
  VariantProps<typeof gandalfAvatarRolVariants>['type']
>
