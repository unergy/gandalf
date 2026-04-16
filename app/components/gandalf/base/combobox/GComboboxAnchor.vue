<script setup lang="ts">
import type { ComboboxAnchorProps } from 'reka-ui'
import type { HTMLAttributes } from 'vue'
import { reactiveOmit } from '@vueuse/core'
import { ComboboxAnchor } from '@/components/ui/combobox'
import { cn } from '@/lib/utils'

const props = defineProps<ComboboxAnchorProps & { class?: HTMLAttributes['class'] }>()

const delegatedProps = reactiveOmit(props, 'class')
</script>

<template>
  <ComboboxAnchor v-bind="delegatedProps" :class="cn(props.class)">
    <slot />
  </ComboboxAnchor>
</template>
