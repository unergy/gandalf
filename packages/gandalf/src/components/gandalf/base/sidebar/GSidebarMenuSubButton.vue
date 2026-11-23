<script setup lang="ts">
import type { PrimitiveProps } from 'reka-ui'
import type { HTMLAttributes } from 'vue'
import { reactiveOmit } from '@vueuse/core'
import { Primitive } from 'reka-ui'
import { GMenuItem } from '@/components/gandalf/base/menu'
import { SidebarMenuSubButton } from '@/components/ui/sidebar'
import { cn } from '@/lib/utils'
import { useSidebarCollapsibleRail } from './context'
import {
  gandalfSidebarMenuSubButtonVariants,
  gandalfSidebarMenuSubMenuItemVariants,
} from './index'

// A row of a nested menu: text only, same states as GSidebarMenuButton. In the collapsed rail it
// becomes a Gandalf Menu Item of the floating menu.
const props = withDefaults(
  defineProps<
    PrimitiveProps & {
      /** The row is the current page. */
      isActive?: boolean
      class?: HTMLAttributes['class']
    }
  >(),
  { as: 'a', isActive: false, class: undefined },
)

const delegatedProps = reactiveOmit(props, 'class', 'isActive')
const rail = useSidebarCollapsibleRail()
</script>

<template>
  <GMenuItem
    v-if="rail"
    as-child
    :class="cn(gandalfSidebarMenuSubMenuItemVariants(), props.class)"
  >
    <Primitive
      v-bind="delegatedProps"
      :data-active="isActive"
      :aria-current="isActive ? 'page' : undefined"
    >
      <slot />
    </Primitive>
  </GMenuItem>

  <SidebarMenuSubButton
    v-else
    v-bind="delegatedProps"
    :data-active="isActive"
    :aria-current="isActive ? 'page' : undefined"
    :class="cn(gandalfSidebarMenuSubButtonVariants(), props.class)"
  >
    <slot />
  </SidebarMenuSubButton>
</template>
