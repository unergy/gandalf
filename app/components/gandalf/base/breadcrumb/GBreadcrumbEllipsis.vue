<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import { BreadcrumbEllipsis } from '@/components/ui/breadcrumb'
import { cn } from '@/lib/utils'

const props = defineProps<{
    class?: HTMLAttributes['class']
}>()
</script>

<template>
    <BreadcrumbEllipsis :class="cn(props.class)">
        <slot />
    </BreadcrumbEllipsis>
</template>
