<script setup lang="ts">
import type { PaginationFirstProps } from 'reka-ui'
import type { HTMLAttributes } from 'vue'
import type { ButtonVariants } from '@/components/ui/button'
import { reactiveOmit } from '@vueuse/core'
import { PaginationFirst } from '@/components/ui/pagination'
import { cn } from '@/lib/utils'

const props = withDefaults(
    defineProps<
        PaginationFirstProps & {
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
    <PaginationFirst v-bind="delegatedProps" :size="size" :class="cn(props.class)">
        <slot />
    </PaginationFirst>
</template>
