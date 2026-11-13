import type { VariantProps } from 'class-variance-authority'
import type { ExternalToast } from 'vue-sonner'
import { cva } from 'class-variance-authority'
import { markRaw } from 'vue'
import { toast } from 'vue-sonner'
import GToast from './GToast.vue'

export { GToast }
export { default as GToaster } from './GToaster.vue'

// Figma: Toast → Toast. 404px wide, base/base background, 1px border in {type}/{type}, corner/2xl
// (16px), elevation SM, padding 12px 12px 12px 20px and 16px between icon, text and close.
export const gandalfToastVariants = cva(
  'bg-base-base text-base-foreground-quiet flex w-[404px] max-w-full gap-4 rounded-2xl border py-3 pr-3 pl-5 shadow-sm',
  {
    variants: {
      type: {
        default: 'border-default',
        action: 'border-action',
        information: 'border-information',
        success: 'border-success',
        warning: 'border-warning',
        destructive: 'border-destructive',
      },
    },
    defaultVariants: {
      type: 'default',
    },
  },
)

// Figma: the leading icon, Icon/lg (18px) in {type}/{type}, vertically centered.
export const gandalfToastIconVariants = cva('size-[18px] shrink-0 self-center', {
  variants: {
    type: {
      default: 'text-default',
      action: 'text-action',
      information: 'text-information',
      success: 'text-success',
      warning: 'text-warning',
      destructive: 'text-destructive',
    },
  },
  defaultVariants: {
    type: 'default',
  },
})

// Figma: the title, Body/mdEm (16px semibold, 1.5) in {type}/{type}, one line with ellipsis.
export const gandalfToastTitleVariants = cva('text-body-mdEm truncate', {
  variants: {
    type: {
      default: 'text-default',
      action: 'text-action',
      information: 'text-information',
      success: 'text-success',
      warning: 'text-warning',
      destructive: 'text-destructive',
    },
  },
  defaultVariants: {
    type: 'default',
  },
})

// Figma: the description, 14px regular with a 1.3 line height in base/foreground-quiet.
export const gandalfToastDescriptionVariants = cva(
  'text-base-foreground-quiet text-sm leading-[1.3] font-normal',
)

// Figma: the close icon, lucide `x` at 16px in base/foreground-quiet, pinned to the top. In
// Type=Destructive its frame is 48px tall, which makes that toast 72px instead of 66px.
export const gandalfToastCloseVariants = cva(
  'text-base-foreground-quiet hover:text-base-foreground focus-visible:ring-ring/50 flex shrink-0 cursor-pointer items-start self-start rounded-sm outline-none focus-visible:ring-[3px] [&_svg]:size-4',
  {
    variants: {
      type: {
        default: '',
        action: '',
        information: '',
        success: '',
        warning: '',
        destructive: 'h-12',
      },
    },
    defaultVariants: {
      type: 'default',
    },
  },
)

export type GandalfToastVariants = VariantProps<typeof gandalfToastVariants>
export type GandalfToastType = NonNullable<GandalfToastVariants['type']>
/** @deprecated Use `GandalfToastType`; Figma calls this property Type. */
export type GandalfToastColor = GandalfToastType

function createToast(type: GandalfToastType) {
  return (title: string, description?: string, data?: ExternalToast) => {
    const id = data?.id ?? crypto.randomUUID()
    return toast.custom(markRaw(GToast), {
      ...data,
      id,
      componentProps: { id, title, description, type },
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
