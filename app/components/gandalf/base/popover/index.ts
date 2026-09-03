export { default as GPopover } from './GPopover.vue'
export { default as GPopoverTrigger } from './GPopoverTrigger.vue'
export { default as GPopoverAnchor } from './GPopoverAnchor.vue'
export { default as GPopoverContent } from './GPopoverContent.vue'

// No CVA of its own: the popover has no visual variants beyond shadcn's, and a panel's look is
// the caller's business — pass `class` or `contentClass` instead of growing a variant surface.
