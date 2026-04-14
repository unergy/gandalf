<script setup lang="ts">
import type { PaginationNextProps } from 'reka-ui'
import type { HTMLAttributes } from 'vue'
import type { ButtonVariants } from '@/components/ui/button'
import { reactiveOmit } from '@vueuse/core'
import { PaginationNext } from '@/components/ui/pagination'
import { cn } from '@/lib/utils'

const props = withDefaults(
    defineProps<
        PaginationNextProps & {
            size?: ButtonVariants['size']
            class?: HTMLAttributes['class']
        }
    >(),
    {
        size: 'default',
    },
)

const delegatedProps = reactiveOmit(props, 'class', 'size')
</script>

<template>
    <PaginationNext v-bind="delegatedProps" :size="size" :class="cn(props.class)">
        <slot />
    </PaginationNext>
</template>
