<script setup lang="ts">
import type { SelectLabelProps } from 'reka-ui'
import type { HTMLAttributes } from 'vue'
import { reactiveOmit } from '@vueuse/core'
import { SelectLabel } from '@/components/ui/select'
import { cn } from '@/lib/utils'
import { gandalfMenuLabelVariants } from '@/components/gandalf/base/menu'

const props = defineProps<SelectLabelProps & { class?: HTMLAttributes['class'] }>()

const delegatedProps = reactiveOmit(props, 'class')
</script>

<template>
  <SelectLabel v-bind="delegatedProps" :class="cn(gandalfMenuLabelVariants(), props.class)">
    <slot />
  </SelectLabel>
</template>
