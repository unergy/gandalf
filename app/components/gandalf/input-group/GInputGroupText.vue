<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import { InputGroupText } from '@/components/ui/input-group'
import { cn } from '@/lib/utils'

const props = defineProps<{
    class?: HTMLAttributes['class']
}>()
</script>

<template>
    <InputGroupText :class="cn(props.class)">
        <slot />
    </InputGroupText>
</template>
