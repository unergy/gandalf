<script setup lang="ts">
import type { PrimitiveProps } from 'reka-ui'
import type { HTMLAttributes } from 'vue'
import { reactiveOmit } from '@vueuse/core'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { gandalfFloatingButtonVariants } from './index'

const props = defineProps<PrimitiveProps & { class?: HTMLAttributes['class'] }>()

const delegatedProps = reactiveOmit(props, 'class')
</script>

<template>
  <Button
    v-bind="delegatedProps"
    data-slot="floating-button"
    :class="cn(gandalfFloatingButtonVariants(), props.class)"
  >
    <slot />
  </Button>
</template>
