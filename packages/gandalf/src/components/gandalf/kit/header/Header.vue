<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import { GSidebarTrigger } from '@/components/gandalf/base/sidebar'
import { cn } from '@/lib/utils'
import { gandalfHeaderDividerClass, gandalfHeaderVariants } from './index'
import UnergyLogo from './UnergyLogo.vue'

// Figma: Header, Type=Default — the app bar above every layout. Logo, divider and the sidebar
// toggle on the left; free content after them; the actions (help, settings, notifications,
// avatar) on the right.
const props = withDefaults(
  defineProps<{
    /** Shows the GSidebarTrigger after the logo. It needs a GSidebarProvider above (GLayout has one). */
    sidebarTrigger?: boolean
    class?: HTMLAttributes['class']
  }>(),
  {
    sidebarTrigger: true,
    class: undefined,
  },
)
</script>

<template>
  <header data-slot="header" :class="cn(gandalfHeaderVariants(), props.class)">
    <div class="flex min-w-0 flex-1 items-center gap-1">
      <slot name="logo">
        <UnergyLogo class="shrink-0" />
      </slot>
      <span v-if="sidebarTrigger" aria-hidden="true" :class="gandalfHeaderDividerClass" />
      <GSidebarTrigger v-if="sidebarTrigger" />
      <slot />
    </div>
    <slot name="actions" />
  </header>
</template>
