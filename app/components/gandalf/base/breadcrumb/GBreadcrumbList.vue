<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import { BreadcrumbList } from '@/components/ui/breadcrumb'
import { cn } from '@/lib/utils'

const props = defineProps<{
    class?: HTMLAttributes['class']
}>()
</script>

<template>
    <BreadcrumbList :class="cn(props.class)">
        <slot />
    </BreadcrumbList>
</template>
