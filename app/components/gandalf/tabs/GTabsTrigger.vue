<script setup lang="ts">
import type { TabsTriggerProps } from 'reka-ui'
import type { HTMLAttributes } from 'vue'
import { inject } from 'vue'
import { reactiveOmit } from '@vueuse/core'
import { TabsTrigger } from '@/components/ui/tabs'
import { cn } from '@/lib/utils'
import { gandalfTabsTriggerVariants, tabsVariantKey, tabsAlignKey } from '.'

const props = defineProps<TabsTriggerProps & { class?: HTMLAttributes['class'] }>()

const delegatedProps = reactiveOmit(props, 'class')

const variant = inject(tabsVariantKey)
const align = inject(tabsAlignKey)
</script>

<template>
  <TabsTrigger
    v-bind="delegatedProps"
    :class="
      cn(gandalfTabsTriggerVariants({ variant: variant?.value, align: align?.value }), props.class)
    "
  >
    <slot />
  </TabsTrigger>
</template>
