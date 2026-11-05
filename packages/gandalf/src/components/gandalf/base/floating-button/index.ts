import { cva } from 'class-variance-authority'

export { default as GFloatingButton } from './GFloatingButton.vue'

// Figma: Button → Floating Button. A 44px round icon button that floats over the content:
// elevation 2XL at rest, XL once hovered, pressed or disabled.
export const gandalfFloatingButtonVariants = cva(
  "relative size-11 rounded-full bg-card p-0 text-primary shadow-2xl hover:bg-card hover:shadow-xl hover:overlay-light-5 active:shadow-xl active:overlay-light-8 disabled:bg-muted disabled:text-muted-foreground-quiet disabled:opacity-100 disabled:shadow-xl has-[>svg]:px-0 [&_svg:not([class*='size-'])]:size-[18px]",
)
