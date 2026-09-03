<script setup lang="ts">
import type { PopoverAnchorProps } from 'reka-ui'
import type { HTMLAttributes } from 'vue'
import { reactiveOmit } from '@vueuse/core'
import { PopoverAnchor } from '@/components/ui/popover'
import { cn } from '@/lib/utils'

const props = defineProps<PopoverAnchorProps & { class?: HTMLAttributes['class'] }>()

const delegatedProps = reactiveOmit(props, 'class')
</script>

<template>
  <PopoverAnchor v-bind="delegatedProps" :class="cn(props.class)">
    <slot />
  </PopoverAnchor>
</template>
