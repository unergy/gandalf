<script setup lang="ts">
import type { PrimitiveProps } from 'reka-ui'
import type { HTMLAttributes } from 'vue'
import { reactiveOmit } from '@vueuse/core'
import { BreadcrumbLink } from '@/components/ui/breadcrumb'
import { cn } from '@/lib/utils'

const props = withDefaults(defineProps<PrimitiveProps & {
    class?: HTMLAttributes['class']
}>(), {
    as: 'a',
})

const delegatedProps = reactiveOmit(props, 'class')
</script>

<template>
    <BreadcrumbLink v-bind="delegatedProps" :class="cn(props.class)">
        <slot />
    </BreadcrumbLink>
</template>
