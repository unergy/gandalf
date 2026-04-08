<script setup lang="ts">
import type { PrimitiveProps } from 'reka-ui'
import type { HTMLAttributes } from 'vue'
import type { BadgeColor, BadgeVariants } from '.'
import { reactiveOmit } from '@vueuse/core'
import { computed } from 'vue'
import { Badge as UiBadge } from '@/components/ui/badge'
import { cn } from '@/lib/utils'
import { badgeVariants } from '.'

const props = defineProps<
    PrimitiveProps & {
        variant?: BadgeVariants['variant']
        color?: BadgeColor
        class?: HTMLAttributes['class']
    }
>()

const delegatedProps = reactiveOmit(props, 'class', 'variant', 'color')

const badgeStyle = computed(() => {
    const c = props.color ?? 'default'
    if (props.variant === 'outline') {
        return {
            borderColor: `var(--color-${c})`,
            color: `var(--color-${c})`,
        }
    }
    return {
        backgroundColor: `var(--color-${c}-object)`,
        color: `var(--color-${c}-object-fg)`,
    }
})
</script>

<template>
    <UiBadge :variant="variant" :class="cn(badgeVariants({ variant }), props.class)" :style="badgeStyle"
        v-bind="delegatedProps">
        <slot />
    </UiBadge>
</template>
