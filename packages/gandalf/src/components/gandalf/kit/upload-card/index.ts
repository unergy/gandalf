import type { VariantProps } from 'class-variance-authority'
import { cva } from 'class-variance-authority'

export { default as GUploadCard } from './UploadCard.vue'

// Figma: Upload & Download → Upload Card. 56px row with the file icon, the name, a meta line
// (size · status), the file-type badge and one action. Type only changes the status line.
export const gandalfUploadCardVariants = cva(
  'flex w-full items-center gap-4 rounded-lg bg-base-base py-2 pr-2 pl-4',
  {
    variants: {
      type: {
        queue: '',
        'in-progress': '',
        completed: '',
        error: '',
      },
    },
    defaultVariants: {
      type: 'queue',
    },
  },
)

export type GandalfUploadCardVariants = VariantProps<typeof gandalfUploadCardVariants>
export type GandalfUploadCardType = NonNullable<GandalfUploadCardVariants['type']>

// Figma: the status word of the meta line. Queue and In progress keep
// base/foreground-extra-quiet; Completed is success/success and Error destructive/destructive.
export const gandalfUploadCardStatusVariants = cva('shrink-0', {
  variants: {
    type: {
      queue: '',
      'in-progress': '',
      completed: 'text-success',
      error: 'text-destructive',
    },
  },
  defaultVariants: {
    type: 'queue',
  },
})
