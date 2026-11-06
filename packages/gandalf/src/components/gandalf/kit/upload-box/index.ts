import type { VariantProps } from 'class-variance-authority'
import { cva } from 'class-variance-authority'

export { default as GUploadBox } from './UploadBox.vue'

// Figma: Upload & Download → Upload Box, State=Enabled / Hovered. The dashed box that opens the
// file picker; State=Hovered (blue fill, "Drop your file here") covers both hover and drag-over.
export const gandalfUploadBoxVariants = cva(
  'group relative flex w-full cursor-pointer items-center justify-center rounded-lg border border-dashed border-bni-border-loud bg-base-base p-6 text-center text-base-foreground-loud outline-none focus-visible:ring-ring focus-visible:ring-2 hover:bg-blue-50 hover:text-action data-[dragging=true]:bg-blue-50 data-[dragging=true]:text-action disabled:cursor-not-allowed disabled:border-muted-foreground-quiet disabled:bg-muted disabled:text-muted-foreground-quiet',
  {
    variants: {
      size: {
        md: 'h-28 flex-col gap-1',
        sm: 'h-14 gap-2',
      },
    },
    defaultVariants: {
      size: 'md',
    },
  },
)

export type GandalfUploadBoxVariants = VariantProps<typeof gandalfUploadBoxVariants>
export type GandalfUploadBoxSize = NonNullable<GandalfUploadBoxVariants['size']>

// Figma: Upload Box, State=Activated. The box turns into the chosen file: action/object fill,
// action/objectFg border and text, with a button to clear it.
export const gandalfUploadBoxFileVariants = cva(
  'flex h-14 w-full items-center justify-between gap-2 rounded-lg border border-action-bold bg-action-muted px-4 text-base leading-[normal] font-semibold text-action-bold',
)
