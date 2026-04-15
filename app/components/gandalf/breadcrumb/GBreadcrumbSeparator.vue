<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import { BreadcrumbSeparator } from '@/components/ui/breadcrumb'
import { cn } from '@/lib/utils'

const props = defineProps<{
    class?: HTMLAttributes['class']
}>()
</script>

<template>
    <BreadcrumbSeparator :class="cn(props.class)">
        <slot />
    </BreadcrumbSeparator>
</template>
