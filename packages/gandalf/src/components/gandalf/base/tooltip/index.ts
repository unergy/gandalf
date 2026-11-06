import { cva } from 'class-variance-authority'

export { default as GTooltip } from './GTooltip.vue'
export { default as GTooltipProvider } from './GTooltipProvider.vue'
export { default as GTooltipTrigger } from './GTooltipTrigger.vue'
export { default as GTooltipContent } from './GTooltipContent.vue'

// Figma: Tooltip. The arrow is a 12×8px triangle with a sharp tip. Reka draws a triangle, but
// ui/tooltip turns it into a rotated rounded square; these descendant rules (more specific than
// its own classes) undo that. The arrow is the <svg> inside Reka's absolutely positioned <span>.
export const gandalfTooltipContentVariants = cva([
  'flex min-h-[38px] w-fit max-w-80 items-center justify-center rounded-xl bg-base-inverse p-2 text-center text-xs text-base-on-inverse shadow-neutral-md',
  '[&>span[style]>svg]:h-2 [&>span[style]>svg]:w-3 [&>span[style]>svg]:translate-y-0 [&>span[style]>svg]:rotate-0 [&>span[style]>svg]:rounded-none [&>span[style]>svg]:bg-transparent [&>span[style]>svg]:fill-base-inverse',
])
