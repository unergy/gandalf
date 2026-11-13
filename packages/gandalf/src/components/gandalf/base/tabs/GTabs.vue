<script setup lang="ts">
import type { TabsRootEmits, TabsRootProps } from 'reka-ui'
import type { HTMLAttributes } from 'vue'
import { reactiveOmit } from '@vueuse/core'
import { Tabs } from '@/components/ui/tabs'
import { cn } from '@/lib/utils'

// Reka props whose default is not `false` stay undefined, so Reka applies its own default.
const props = withDefaults(defineProps<TabsRootProps & { class?: HTMLAttributes['class'] }>(), {
  unmountOnHide: undefined,
  class: undefined,
})
const emits = defineEmits<TabsRootEmits>()

const delegatedProps = reactiveOmit(props, 'class')
</script>

<template>
  <Tabs
    v-bind="delegatedProps"
    :class="cn('flex flex-col gap-2', props.class)"
    @update:model-value="emits('update:modelValue', $event)"
  >
    <slot />
  </Tabs>
</template>
