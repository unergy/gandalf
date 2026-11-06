import type { VariantProps } from 'class-variance-authority'
import { cva } from 'class-variance-authority'

export { default as GFilesCard } from './FilesCard.vue'

// Figma: Card → Files Card. Property names (`type`, `folder` / `file`, `fileCount`) follow the design.
export const gandalfFilesCardVariants = cva(
  'group flex w-full cursor-pointer overflow-clip rounded-2xl border border-bni-border-loud bg-base-base text-left outline-none focus-visible:ring-2 focus-visible:ring-ring data-[state=on]:border-accent-primary-foreground data-[state=on]:bg-accent-primary',
  {
    variants: {
      type: {
        folder: 'h-18',
        file: 'h-48 flex-col',
      },
    },
    defaultVariants: {
      type: 'folder',
    },
  },
)

export type GandalfFilesCardVariants = VariantProps<typeof gandalfFilesCardVariants>
export type GandalfFilesCardType = NonNullable<GandalfFilesCardVariants['type']>
