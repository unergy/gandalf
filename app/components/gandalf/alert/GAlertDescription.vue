<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import { reactiveOmit } from '@vueuse/core'
import { AlertDescription } from '@/components/ui/alert'
import { cn } from '@/lib/utils'

const props = defineProps<{
    class?: HTMLAttributes['class']
}>()

const delegatedProps = reactiveOmit(props, 'class')
</script>

<template>
    <AlertDescription v-bind="delegatedProps" :class="cn(props.class)">
        <slot />
    </AlertDescription>
</template>
