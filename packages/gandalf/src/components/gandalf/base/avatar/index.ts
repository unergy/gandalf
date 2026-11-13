import type { VariantProps } from 'class-variance-authority'
import { cva } from 'class-variance-authority'
import type { InjectionKey, Ref } from 'vue'

export { default as GAvatar } from './GAvatar.vue'
export { default as GAvatarImage } from './GAvatarImage.vue'
export { default as GAvatarFallback } from './GAvatarFallback.vue'

// Avatar Item (Figma → Avatar): Type = shape, Size = 24 / 32 / 40 / 48px with bold 12 / 14 / 16 / 18px text.
export const gandalfAvatarVariants = cva('font-bold whitespace-nowrap', {
  variants: {
    type: {
      circle: 'rounded-full',
      square: 'rounded-lg',
    },
    size: {
      xs: 'size-6 text-xs leading-[normal]',
      sm: 'size-8 text-sm leading-[normal]',
      md: 'size-10 text-base leading-normal',
      lg: 'size-12 text-lg leading-[normal]',
    },
  },
  defaultVariants: {
    type: 'circle',
    size: 'sm',
  },
})

// Avatar Item → Semantic: `{color}/object` background and `{color}/objectFg` text.
export const gandalfAvatarFallbackVariants = cva('rounded-[inherit]', {
  variants: {
    semantic: {
      default: 'bg-default-muted text-default-bold',
      action: 'bg-action-muted text-action-bold',
      information: 'bg-information-muted text-information-bold',
      success: 'bg-success-muted text-success-bold',
      warning: 'bg-warning-muted text-warning-bold',
      destructive: 'bg-destructive-muted text-destructive-bold',
    },
  },
  defaultVariants: {
    semantic: 'default',
  },
})

export type GandalfAvatarVariants = VariantProps<typeof gandalfAvatarVariants>
export type GandalfAvatarType = NonNullable<GandalfAvatarVariants['type']>
export type GandalfAvatarSize = NonNullable<GandalfAvatarVariants['size']>
export type GandalfAvatarSemantic = NonNullable<
  VariantProps<typeof gandalfAvatarFallbackVariants>['semantic']
>

/** Semantic of the current GAvatar, read by GAvatarFallback. */
export const avatarSemanticKey: InjectionKey<Ref<GandalfAvatarSemantic>> = Symbol('avatar-semantic')

/** Defaults a group (GKitAvatarGroup) passes to the avatars inside it. */
export interface GandalfAvatarGroupContext {
  type: Ref<GandalfAvatarType>
  size: Ref<GandalfAvatarSize>
}
export const avatarGroupKey: InjectionKey<GandalfAvatarGroupContext> = Symbol('avatar-group')
