<script setup lang="ts">
import type { CheckboxRootEmits, CheckboxRootProps } from 'reka-ui'
import type { HTMLAttributes } from 'vue'
import { reactiveOmit } from '@vueuse/core'
import { Checkbox } from '@/components/ui/checkbox'
import { cn } from '@/lib/utils'
import { gandalfCheckVariants } from './index'

const props = defineProps<
  CheckboxRootProps & {
    class?: HTMLAttributes['class']
  }
>()

const emits = defineEmits<CheckboxRootEmits>()

const delegatedProps = reactiveOmit(props, 'class')
</script>

<template>
  <Checkbox
    v-bind="delegatedProps"
    :class="cn(gandalfCheckVariants({ type: 'square' }), props.class)"
    @update:model-value="emits('update:modelValue', $event)"
  >
    <template #default="slotProps">
      <!-- The glyph is drawn by the root; the empty fallback keeps shadcn's check icon out -->
      <slot v-bind="slotProps"><span /></slot>
    </template>
  </Checkbox>
</template>
