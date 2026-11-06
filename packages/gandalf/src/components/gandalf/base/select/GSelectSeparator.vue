<script setup lang="ts">
import type { SelectSeparatorProps } from 'reka-ui'
import type { HTMLAttributes } from 'vue'
import { reactiveOmit } from '@vueuse/core'
import { SelectSeparator } from '@/components/ui/select'
import { cn } from '@/lib/utils'
import { gandalfMenuSeparatorVariants } from '@/components/gandalf/base/menu'

const props = defineProps<SelectSeparatorProps & { class?: HTMLAttributes['class'] }>()

const delegatedProps = reactiveOmit(props, 'class')
</script>

<template>
  <SelectSeparator
    v-bind="delegatedProps"
    :class="cn(gandalfMenuSeparatorVariants(), props.class)"
  />
</template>
