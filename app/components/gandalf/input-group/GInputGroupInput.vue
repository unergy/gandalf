<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import { InputGroupInput } from '@/components/ui/input-group'
import { cn } from '@/lib/utils'

const props = defineProps<{
    class?: HTMLAttributes['class']
}>()
</script>

<template>
    <InputGroupInput :class="cn(props.class)" />
</template>
