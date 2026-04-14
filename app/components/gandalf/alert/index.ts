import type { VariantProps } from 'class-variance-authority'
import { cva } from 'class-variance-authority'

export { default as GAlert } from './GAlert.vue'
export { default as GAlertTitle } from './GAlertTitle.vue'
export { default as GAlertDescription } from './GAlertDescription.vue'

export const gandalfAlertVariants = cva('', {
    variants: {
        variant: {
            default: '',
            destructive: '',
        },
    },
    defaultVariants: {
        variant: 'default',
    },
})

export type GandalfAlertVariants = VariantProps<typeof gandalfAlertVariants>
