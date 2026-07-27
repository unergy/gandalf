import type { VariantProps } from 'class-variance-authority'
import type { ExternalToast } from 'vue-sonner'
import { cva } from 'class-variance-authority'
import { markRaw } from 'vue'
import { toast } from 'vue-sonner'
import GToastCard from './GToastCard.vue'

export { default as GToaster } from './GToaster.vue'

export const gandalfToastVariants = cva(
  'bg-card border rounded-xl shadow-md p-3 flex w-80 items-start gap-2',
  {
    variants: {
      color: {
        default: 'border-default',
        action: 'border-action',
        information: 'border-information',
        success: 'border-success',
        warning: 'border-warning',
        destructive: 'border-destructive',
      },
    },
    defaultVariants: {
      color: 'default',
    },
  },
)

export const gandalfToastIconVariants = cva('mt-0.5 size-4 shrink-0', {
  variants: {
    color: {
      default: 'text-default',
      action: 'text-action',
      information: 'text-information',
      success: 'text-success',
      warning: 'text-warning',
      destructive: 'text-destructive',
    },
  },
  defaultVariants: {
    color: 'default',
  },
})

export const gandalfToastTitleVariants = cva('text-sm font-semibold', {
  variants: {
    color: {
      default: 'text-default',
      action: 'text-action',
      information: 'text-information',
      success: 'text-success',
      warning: 'text-warning',
      destructive: 'text-destructive',
    },
  },
  defaultVariants: {
    color: 'default',
  },
})

export type GandalfToastVariants = VariantProps<typeof gandalfToastVariants>
export type GandalfToastColor = NonNullable<GandalfToastVariants['color']>

function createToast(color: GandalfToastColor) {
  return (title: string, description?: string, data?: ExternalToast) => {
    const id = data?.id ?? crypto.randomUUID()
    return toast.custom(markRaw(GToastCard), {
      ...data,
      id,
      componentProps: { id, title, description, color },
    })
  }
}

export const gToast = {
  default: createToast('default'),
  action: createToast('action'),
  information: createToast('information'),
  success: createToast('success'),
  warning: createToast('warning'),
  destructive: createToast('destructive'),
}
