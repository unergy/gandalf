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
  <!-- On is the purple of GCheckbox and GRadioGroup (accent-pr/foreground); off is a grey track.
       They used to be base/base and base/base-loud, two greys too close to tell apart. -->
  <SwitchRoot
    v-slot="{ checked }"
    data-slot="switch"
    v-bind="forwarded"
    :class="
      cn(
        'focus-visible:ring-ring/50 data-[state=checked]:bg-accent-primary-foreground data-[state=unchecked]:bg-bni-border-loud inline-flex h-7 w-12 shrink-0 items-center rounded-full p-0.5 transition-colors outline-none focus-visible:ring-[3px] disabled:cursor-not-allowed disabled:opacity-50',
        props.class,
      )
    "
  >
    <SwitchThumb
      data-slot="switch-thumb"
      class="pointer-events-none flex size-6 items-center justify-center rounded-full bg-white shadow-md transition-transform data-[state=checked]:translate-x-5 data-[state=unchecked]:translate-x-0"
    >
      <CheckIcon v-if="checked" class="text-accent-primary-foreground size-3.5" />
      <XIcon v-else class="text-base-foreground-quiet size-3.5" />
    </SwitchThumb>
  </SwitchRoot>
</template>
