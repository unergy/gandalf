import { cva } from 'class-variance-authority'

export { default as GTooltip } from './GTooltip.vue'
export { default as GTooltipProvider } from './GTooltipProvider.vue'
export { default as GTooltipTrigger } from './GTooltipTrigger.vue'
export { default as GTooltipContent } from './GTooltipContent.vue'

export const gandalfTooltipContentVariants = cva(
  'flex min-h-[38px] w-fit max-w-80 items-center justify-center rounded-xl bg-base-inverse p-2 text-center text-xs text-base-on-inverse shadow-neutral-md',
)
