<script setup lang="ts">
import type { PaginationListProps } from 'reka-ui'
import type { HTMLAttributes } from 'vue'
import { reactiveOmit } from '@vueuse/core'
import { PaginationContent } from '@/components/ui/pagination'
import { cn } from '@/lib/utils'

const props = defineProps<PaginationListProps & { class?: HTMLAttributes['class'] }>()

const delegatedProps = reactiveOmit(props, 'class')
</script>

<template>
    <PaginationContent v-slot="slotProps" v-bind="delegatedProps" :class="cn(props.class)">
        <slot v-bind="slotProps" />
    </PaginationContent>
</template>
