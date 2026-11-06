<script setup lang="ts">
import type { SelectTriggerProps } from 'reka-ui'
import type { HTMLAttributes } from 'vue'
import { reactiveOmit } from '@vueuse/core'
import { gandalfFieldVariants } from '@/components/gandalf/base/input'
import { SelectTrigger } from '@/components/ui/select'
import { cn } from '@/lib/utils'

const props = withDefaults(
  defineProps<SelectTriggerProps & { class?: HTMLAttributes['class']; size?: 'sm' | 'default' }>(),
  { size: 'default', class: undefined },
)

const delegatedProps = reactiveOmit(props, 'class')
</script>

<template>
  <!-- Looks like Figma's Input Field; `default` is its md size. shadcn sets heights through
       data-[size=…], so they are overridden with the same selectors. -->
  <SelectTrigger
    v-bind="delegatedProps"
    :class="
      cn(
        gandalfFieldVariants({ size: size === 'sm' ? 'sm' : 'md' }),
        'data-[placeholder]:text-base-foreground-extra-quiet [&_svg:not([class*=\'text-\'])]:text-base-foreground data-[size=default]:h-10 data-[size=sm]:h-8',
        props.class,
      )
    "
  >
    <slot />
  </SelectTrigger>
</template>
