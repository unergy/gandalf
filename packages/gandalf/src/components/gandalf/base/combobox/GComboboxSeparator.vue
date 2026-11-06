<script setup lang="ts">
import type { ComboboxSeparatorProps } from 'reka-ui'
import type { HTMLAttributes } from 'vue'
import { reactiveOmit } from '@vueuse/core'
import { ComboboxSeparator } from '@/components/ui/combobox'
import { cn } from '@/lib/utils'
import { gandalfMenuSeparatorVariants } from '@/components/gandalf/base/menu'

const props = defineProps<ComboboxSeparatorProps & { class?: HTMLAttributes['class'] }>()

const delegatedProps = reactiveOmit(props, 'class')
</script>

<template>
  <ComboboxSeparator
    v-bind="delegatedProps"
    :class="cn(gandalfMenuSeparatorVariants(), props.class)"
  >
    <slot />
  </ComboboxSeparator>
</template>
