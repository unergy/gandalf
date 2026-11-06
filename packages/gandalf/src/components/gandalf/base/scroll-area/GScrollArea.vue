<script setup lang="ts">
import type { ScrollAreaRootProps } from 'reka-ui'
import type { HTMLAttributes } from 'vue'
import type { GandalfScrollAreaOrientation } from './index'
import { reactiveOmit } from '@vueuse/core'
import { ScrollArea } from '@/components/ui/scroll-area'
import { cn } from '@/lib/utils'
import GScrollBar from './GScrollBar.vue'
import { gandalfScrollAreaVariants } from './index'

const props = withDefaults(
  defineProps<
    ScrollAreaRootProps & {
      class?: HTMLAttributes['class']
      /** Figma "Type": qué barras se muestran. */
      orientation?: GandalfScrollAreaOrientation
    }
  >(),
  {
    type: 'auto',
    orientation: 'vertical',
    class: undefined,
  },
)

const delegatedProps = reactiveOmit(props, 'class', 'orientation')
</script>

<template>
  <ScrollArea
    v-bind="delegatedProps"
    :class="cn(gandalfScrollAreaVariants({ orientation: props.orientation }), props.class)"
  >
    <slot />
    <GScrollBar
      v-if="props.orientation !== 'vertical'"
      orientation="horizontal"
    />
  </ScrollArea>
</template>
