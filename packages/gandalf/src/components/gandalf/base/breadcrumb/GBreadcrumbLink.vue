<script setup lang="ts">
import type { PrimitiveProps } from 'reka-ui'
import type { HTMLAttributes } from 'vue'
import { computed, inject } from 'vue'
import { reactiveOmit } from '@vueuse/core'
import { BreadcrumbLink } from '@/components/ui/breadcrumb'
import { cn } from '@/lib/utils'
import { breadcrumbSizeKey, gandalfBreadcrumbLinkVariants } from './index'
import type { GandalfBreadcrumbSize } from './index'

const props = withDefaults(
  defineProps<
    PrimitiveProps & {
      class?: HTMLAttributes['class']
    }
  >(),
  {
    as: 'a',
    class: undefined,
  },
)

const delegatedProps = reactiveOmit(props, 'class')

const size = inject(
  breadcrumbSizeKey,
  computed<GandalfBreadcrumbSize>(() => 'md'),
)
</script>

<template>
  <BreadcrumbLink
    v-bind="delegatedProps"
    :class="cn(gandalfBreadcrumbLinkVariants({ size }), props.class)"
  >
    <slot />
  </BreadcrumbLink>
</template>
