<script setup lang="ts">
import type { CollapsibleRootEmits, CollapsibleRootProps } from 'reka-ui'
import type { HTMLAttributes } from 'vue'
import { reactiveOmit } from '@vueuse/core'
import { useForwardPropsEmits } from 'reka-ui'
import { computed, provide, ref, watch } from 'vue'
import { GMenu } from '@/components/gandalf/base/menu'
import { Collapsible } from '@/components/ui/collapsible'
import { SidebarMenuItem, useSidebar } from '@/components/ui/sidebar'
import { cn } from '@/lib/utils'
import { gSidebarCollapsibleKey } from './context'

// A Sidebar Menu Item that opens a nested menu. It renders the <li> itself, so use it in place of
// GSidebarMenuItem. Expanded (and on mobile) the nested menu unfolds below the item; in the
// collapsed icon rail it opens as a Gandalf menu to the right of the icon.
const props = withDefaults(
  defineProps<
    CollapsibleRootProps & {
      /** One of the nested items is the current page. Highlights the parent, above all in the rail. */
      active?: boolean
      class?: HTMLAttributes['class']
    }
  >(),
  { as: 'li', active: false, class: undefined },
)
const emits = defineEmits<CollapsibleRootEmits>()

const forwarded = useForwardPropsEmits(reactiveOmit(props, 'class', 'active'), emits)

const { state, isMobile } = useSidebar()
const rail = computed(() => state.value === 'collapsed' && !isMobile.value)
provide(gSidebarCollapsibleKey, { rail })

// The floating menu has its own state: it always starts closed and closes when the rail expands.
const menuOpen = ref(false)
watch(rail, () => {
  menuOpen.value = false
})
</script>

<template>
  <SidebarMenuItem
    v-if="rail"
    :data-child-active="active || undefined"
    :class="cn(props.class)"
  >
    <GMenu v-model:open="menuOpen" :modal="false">
      <slot />
    </GMenu>
  </SidebarMenuItem>

  <Collapsible
    v-else
    v-bind="forwarded"
    :data-child-active="active || undefined"
    :class="cn('group/collapsible group/menu-item relative', props.class)"
  >
    <slot />
  </Collapsible>
</template>
