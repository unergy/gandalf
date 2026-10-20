import type { ButtonVariants } from '@/components/ui/button'

export { default as GButton } from './GButton.vue'

// No CVA of its own: the variant surface is shadcn's, unchanged. Re-exported under the Gandalf
// name so `kit/` components can type against it without importing from `ui/`.
export type GandalfButtonVariants = ButtonVariants
export type GandalfButtonVariant = NonNullable<ButtonVariants['variant']>
export type GandalfButtonSize = NonNullable<ButtonVariants['size']>
