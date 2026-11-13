<script setup lang="ts">
import type { RadioGroupItemProps } from 'reka-ui'
import type { HTMLAttributes } from 'vue'
import { reactiveOmit } from '@vueuse/core'
import { gandalfCheckVariants } from '@/components/gandalf/base/checkbox'
import { RadioGroupItem } from '@/components/ui/radio-group'
import { cn } from '@/lib/utils'

// Reka props whose default is not `false` stay undefined, so Reka applies its own default.
const props = withDefaults(
  defineProps<RadioGroupItemProps & { class?: HTMLAttributes['class'] }>(),
  {
    checked: undefined,
    class: undefined,
  },
)

const delegatedProps = reactiveOmit(props, 'class')
</script>

<template>
  <!-- Figma Check, Type=Circle. The empty slot replaces shadcn's filled dot. -->
  <RadioGroupItem
    v-bind="delegatedProps"
    :class="cn(gandalfCheckVariants({ type: 'circle' }), props.class)"
  >
    <span />
  </RadioGroupItem>
</template>
