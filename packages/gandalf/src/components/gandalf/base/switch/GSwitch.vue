<script setup lang="ts">
import type { SwitchRootEmits, SwitchRootProps } from 'reka-ui'
import type { HTMLAttributes } from 'vue'
import { reactiveOmit } from '@vueuse/core'
import { CheckIcon, XIcon } from 'lucide-vue-next'
import { SwitchRoot, SwitchThumb, useForwardPropsEmits } from 'reka-ui'
import { cn } from '@/lib/utils'

const props = defineProps<SwitchRootProps & { class?: HTMLAttributes['class'] }>()

const emits = defineEmits<SwitchRootEmits>()

const delegatedProps = reactiveOmit(props, 'class')
const forwarded = useForwardPropsEmits(delegatedProps, emits)
</script>

<template>
  <SwitchRoot
    v-slot="{ checked }"
    data-slot="switch"
    v-bind="forwarded"
    :class="
      cn(
        'inline-flex h-7 w-12 shrink-0 items-center rounded-full p-0.5 transition-colors outline-none focus-visible:ring-[3px] focus-visible:ring-ring/50 disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-base-loud data-[state=unchecked]:bg-base',
        props.class,
      )
    "
  >
    <SwitchThumb
      data-slot="switch-thumb"
      class="bg-base-inverse pointer-events-none flex size-6 items-center justify-center rounded-full shadow-md transition-transform data-[state=checked]:translate-x-5 data-[state=unchecked]:translate-x-0"
    >
      <CheckIcon v-if="checked" class="text-base-foreground-loud size-3.5" />
      <XIcon v-else class="text-base-foreground-quiet size-3.5" />
    </SwitchThumb>
  </SwitchRoot>
</template>
