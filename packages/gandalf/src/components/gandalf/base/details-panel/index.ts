import type { VariantProps } from 'class-variance-authority'
import { cva } from 'class-variance-authority'

export { default as GDetailsPanel } from './GDetailsPanel.vue'
export { default as GDetailsPanelTrigger } from './GDetailsPanelTrigger.vue'
export { default as GDetailsPanelClose } from './GDetailsPanelClose.vue'
export { default as GDetailsPanelContent } from './GDetailsPanelContent.vue'
export { default as GDetailsPanelHeader } from './GDetailsPanelHeader.vue'
export { default as GDetailsPanelTitle } from './GDetailsPanelTitle.vue'
export { default as GDetailsPanelDescription } from './GDetailsPanelDescription.vue'
export { default as GDetailsPanelBody } from './GDetailsPanelBody.vue'
export { default as GDetailsPanelSection } from './GDetailsPanelSection.vue'
export { default as GDetailsPanelField } from './GDetailsPanelField.vue'
export { default as GDetailsPanelFooter } from './GDetailsPanelFooter.vue'

// Figma: Details Panel → Detail Panel. A 416px card/card panel docked to the edge of the screen.
// The design shows no scrim over the page, so the sheet is non-modal by default. `p-0` and `gap-0`
// drop shadcn's own padding: every band (header, body, footer) brings its own.
// The last-child <button> is the close button `ui/sheet` always renders; Figma puts its own
// Ghost primary button inside the header instead.
export const gandalfDetailsPanelContentVariants = cva(
  'bg-card flex w-full max-w-[416px] flex-col gap-0 p-0 sm:max-w-[416px] [&>button:last-child]:hidden',
  {
    variants: {
      side: {
        right: 'border-l-0',
        left: 'border-r-0',
      },
    },
    defaultVariants: {
      side: 'right',
    },
  },
)

export type GandalfDetailsPanelContentVariants = VariantProps<
  typeof gandalfDetailsPanelContentVariants
>
export type GandalfDetailsPanelSide = NonNullable<GandalfDetailsPanelContentVariants['side']>

// Figma: Detail Panel → Header. 72px tall, 16px of side padding, 10px between title and button.
export const gandalfDetailsPanelHeaderVariants = cva(
  'flex h-18 shrink-0 flex-row items-center gap-2.5 overflow-clip px-4 py-0',
)

// Figma: Detail Panel → Header → "Item title". Heading/sm, base/foreground-loud.
export const gandalfDetailsPanelTitleVariants = cva(
  'text-base-foreground-loud min-w-0 flex-1 text-xl leading-[normal] font-semibold',
)

// Figma: Detail Panel → Content. Scrolls; 16px of side padding, 12px top and bottom, 12px between
// sections.
export const gandalfDetailsPanelBodyVariants = cva(
  'flex min-h-0 w-full flex-1 flex-col gap-3 overflow-x-hidden overflow-y-auto px-4 py-3',
)

// Figma: Detail Panel → Content → "Visualization Panel". A base/base card with 16px corners that
// groups fields under a title.
export const gandalfDetailsPanelSectionVariants = cva(
  'bg-base-base flex w-full shrink-0 flex-col rounded-2xl px-3',
)

// Figma: the section title. Body/xsEm on a 40px row.
export const gandalfDetailsPanelSectionTitleVariants = cva(
  'text-base-foreground-loud flex h-10 w-full shrink-0 items-center text-xs leading-[normal] font-semibold',
)

// Figma: Visualization → "Visualization Card Field", as used inside the Details Panel. Two columns
// of equal width with 8px between them; Divider=Yes draws the bni/border line below.
export const gandalfDetailsPanelFieldVariants = cva(
  'grid w-full shrink-0 grid-cols-2 gap-x-2 overflow-clip py-0',
  {
    variants: {
      divider: {
        true: 'border-bni-border border-b',
        false: '',
      },
    },
    defaultVariants: {
      divider: false,
    },
  },
)

export type GandalfDetailsPanelFieldVariants = VariantProps<typeof gandalfDetailsPanelFieldVariants>

// The left column: icon and label, Body/sm in base/foreground-quiet, never wrapping.
export const gandalfDetailsPanelFieldLabelVariants = cva(
  'text-base-foreground-quiet col-start-1 row-start-1 flex max-h-[67px] min-h-10 items-center gap-2 self-stretch overflow-clip py-2 text-sm leading-[normal] whitespace-nowrap [&_svg]:size-3.5 [&_svg]:shrink-0',
)

// The right column: value, badges or avatar. Sits at the top of the row, like the design.
export const gandalfDetailsPanelFieldValueVariants = cva(
  'col-start-2 row-start-1 flex max-h-[67px] min-h-10 items-center gap-2 self-start py-2',
)

// The value text itself: Body/sm in base/foreground-loud, up to the 3 rows the design allows.
// `placeholder` is the "Sin definir" state, in base/foreground-extra-quiet.
export const gandalfDetailsPanelFieldTextVariants = cva(
  'line-clamp-3 min-w-0 flex-1 text-sm leading-[normal]',
  {
    variants: {
      placeholder: {
        true: 'text-base-foreground-extra-quiet',
        false: 'text-base-foreground-loud',
      },
    },
    defaultVariants: {
      placeholder: false,
    },
  },
)

// Figma: Detail Panel → "Group Button". Actions aligned to the right, 16px of padding.
export const gandalfDetailsPanelFooterVariants = cva(
  'flex shrink-0 flex-row items-center justify-end gap-2 p-4',
)
