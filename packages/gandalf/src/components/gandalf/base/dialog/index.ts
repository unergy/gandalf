import type { VariantProps } from 'class-variance-authority'
import { cva } from 'class-variance-authority'

export { default as GDialog } from './GDialog.vue'
export { default as GDialogTrigger } from './GDialogTrigger.vue'
export { default as GDialogContent } from './GDialogContent.vue'
export { default as GDialogHeader } from './GDialogHeader.vue'
export { default as GDialogBody } from './GDialogBody.vue'
export { default as GDialogFooter } from './GDialogFooter.vue'
export { default as GDialogTitle } from './GDialogTitle.vue'
export { default as GDialogDescription } from './GDialogDescription.vue'
export { default as GDialogClose } from './GDialogClose.vue'
export { default as GDialogScrollContent } from './GDialogScrollContent.vue'
export { default as GDialogOverlay } from './GDialogOverlay.vue'

// Figma: Dialogs → "Dialog Notification" / "Dialog Form". card/card, corner/3xl (24px),
// shape/elevation/LG, no border and no padding: header, body and footer bring their own.
// 416px wide like the examples; wider dialogs (Steps Form, Dual) pass their own `sm:max-w-*`.
// Shared with GAlertDialogContent.
export const gandalfDialogContentVariants = cva(
  'bg-card text-base-foreground flex flex-col gap-0 overflow-clip rounded-3xl border-0 p-0 shadow-lg sm:max-w-[416px]',
)

// Figma: Dialog Header, Type=Left / Center. 72px tall. Left: 24px before the title, 16px after the
// close button, 12px between icon, title and button. Center: title centred, 24px on both sides.
export const gandalfDialogHeaderVariants = cva(
  'flex h-18 shrink-0 flex-row items-center gap-3 py-0',
  {
    variants: {
      type: {
        left: 'pr-4 pl-6 text-left sm:text-left',
        center: 'justify-center px-6 text-center sm:text-center',
      },
    },
    defaultVariants: {
      type: 'left',
    },
  },
)

export type GandalfDialogHeaderVariants = VariantProps<typeof gandalfDialogHeaderVariants>
export type GandalfDialogHeaderType = NonNullable<GandalfDialogHeaderVariants['type']>

// Figma: Dialog Header → icon. Lucide at 24px (Size/2XL), base/foreground.
export const gandalfDialogHeaderIconVariants = cva(
  'text-base-foreground flex shrink-0 [&_svg]:size-6 [&_svg]:shrink-0',
)

// Figma: Dialog Header → "Title". Heading/md: 24px semibold, line-height normal, base/foreground.
export const gandalfDialogTitleVariants = cva(
  'text-base-foreground min-w-0 flex-1 text-2xl leading-[normal] font-semibold',
)

// Figma: the description text. Body/md: 16px regular, line-height 1.5, base/foreground.
export const gandalfDialogDescriptionVariants = cva(
  'text-base-foreground text-base leading-normal font-normal',
)

// Figma: the content bands between header and buttons (named "Dropdown menu" in the file).
// 24px on the sides, 12px top and bottom, 20px between form fields.
export const gandalfDialogBodyVariants = cva('flex flex-col gap-5 px-6 py-3')

// Figma: "Group Button". 24px padding, 8px between buttons, aligned to the right.
export const gandalfDialogFooterVariants = cva(
  'flex flex-row items-center justify-end gap-2 p-6 sm:flex-row sm:justify-end',
)
