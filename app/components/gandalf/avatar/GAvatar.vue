<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import { reactiveOmit } from '@vueuse/core'
import { Avatar } from '@/components/ui/avatar'
import { cn } from '@/lib/utils'

const props = defineProps<{
    class?: HTMLAttributes['class']
}>()

const delegatedProps = reactiveOmit(props, 'class')
</script>

<template>
    <Avatar v-bind="delegatedProps" :class="cn(props.class)">
        <slot />
    </Avatar>
</template>
