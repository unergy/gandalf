<script setup lang="ts">
import type { RadioGroupRootEmits, RadioGroupRootProps } from 'reka-ui'
import type { HTMLAttributes } from 'vue'
import { reactiveOmit } from '@vueuse/core'
import { RadioGroup } from '@/components/ui/radio-group'
import { cn } from '@/lib/utils'

// Reka props whose default is not `false` stay undefined, so Reka applies its own default.
const props = withDefaults(
  defineProps<RadioGroupRootProps & { class?: HTMLAttributes['class'] }>(),
  {
    loop: undefined,
    class: undefined,
  },
)
const emits = defineEmits<RadioGroupRootEmits>()

const delegatedProps = reactiveOmit(props, 'class')
</script>

<template>
  <RadioGroup
    v-bind="delegatedProps"
    :class="cn(props.class)"
    @update:model-value="emits('update:modelValue', $event)"
  >
    <slot />
  </RadioGroup>
</template>
