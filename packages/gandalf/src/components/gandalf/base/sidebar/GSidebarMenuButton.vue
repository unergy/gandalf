<script setup lang="ts">
import type { PrimitiveProps } from 'reka-ui'
import type { Component, HTMLAttributes } from 'vue'
import { reactiveOmit } from '@vueuse/core'
import { GTooltip, GTooltipContent, GTooltipTrigger } from '@/components/gandalf/base/tooltip'
import { SidebarMenuButton, useSidebar } from '@/components/ui/sidebar'
import { cn } from '@/lib/utils'
import { gandalfSidebarMenuButtonVariants } from './index'

// Figma: Sidebar Menu Item. Status=Actived is `isActive`; Hovered is plain CSS. The Type property
// (Expanded / Icon) follows the sidebar state, so it is not a prop.
const props = withDefaults(
  defineProps<
    PrimitiveProps & {
      /** Figma: Status=Actived — marks the current page. */
      isActive?: boolean
      /** Label shown as a Gandalf tooltip while the sidebar is collapsed into the icon rail. */
      tooltip?: string | Component
      class?: HTMLAttributes['class']
    }
  >(),
  {
    as: 'button',
    isActive: false,
    tooltip: undefined,
    class: undefined,
  },
)

const { isMobile, state } = useSidebar()

const delegatedProps = reactiveOmit(props, 'class', 'tooltip')
</script>

<template>
  <SidebarMenuButton
    v-if="!tooltip"
    v-bind="delegatedProps"
    :class="cn(gandalfSidebarMenuButtonVariants(), props.class)"
  >
    <slot />
  </SidebarMenuButton>

  <GTooltip v-else>
    <GTooltipTrigger as-child>
      <SidebarMenuButton
        v-bind="delegatedProps"
        :class="cn(gandalfSidebarMenuButtonVariants(), props.class)"
      >
        <slot />
      </SidebarMenuButton>
    </GTooltipTrigger>
    <GTooltipContent
      side="right"
      align="center"
      :hidden="state !== 'collapsed' || isMobile"
    >
      <template v-if="typeof tooltip === 'string'">
        {{ tooltip }}
      </template>
      <component :is="tooltip" v-else />
    </GTooltipContent>
  </GTooltip>
</template>
