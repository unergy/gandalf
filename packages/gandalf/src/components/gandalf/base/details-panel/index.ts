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
export { default as GDetailsPanelFooter } from './GDetailsPanelFooter.vue'

// Figma: Details Panel → Detail Panel. A 416px card/card panel docked to the edge of the screen.
// The design shows no scrim over the page, so the sheet is non-modal by default, and no shadow or
// border either (`shadow-none`). `p-0` and `gap-0` drop shadcn's own padding: every band (header,
// body, footer) brings its own.
// The last-child <button> is the close button `ui/sheet` always renders; Figma puts its own
// Ghost primary button inside the header instead.
export const gandalfDetailsPanelContentVariants = cva(
  'bg-card flex w-full max-w-[416px] flex-col gap-0 p-0 shadow-none sm:max-w-[416px] [&>button:last-child]:hidden',
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

// Figma: Detail Panel → Content. Scrolls with Gandalf's scrollbar 16px from the panel edge and 12px
// from the top and bottom; the rows stop 12px before the bar (6px bar + 12px = pr-4.5). The rows
// are Visualization Cards (`GVisualizationCard` with a `title`), 12px apart.
export const gandalfDetailsPanelBodyVariants = cva('mx-4 my-3 min-h-0 flex-1')

export const gandalfDetailsPanelBodyContentVariants = cva('flex flex-col gap-3 pr-4.5')

// Figma: Detail Panel → "Group Button". Actions aligned to the right, 16px of padding.
export const gandalfDetailsPanelFooterVariants = cva(
  'flex shrink-0 flex-row items-center justify-end gap-2 p-4',
)
