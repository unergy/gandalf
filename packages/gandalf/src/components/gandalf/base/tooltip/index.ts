import { cva } from 'class-variance-authority'

export { default as GTooltip } from './GTooltip.vue'
export { default as GTooltipProvider } from './GTooltipProvider.vue'
export { default as GTooltipTrigger } from './GTooltipTrigger.vue'
export { default as GTooltipContent } from './GTooltipContent.vue'

export const gandalfTooltipContentVariants = cva(
  'w-fit max-w-80 rounded-xl bg-slate-800 p-2 text-xs text-white shadow-md',
)
