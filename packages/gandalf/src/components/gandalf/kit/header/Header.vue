<script setup lang="ts">
import type { Component, HTMLAttributes } from 'vue'
import { GSidebarTrigger } from '@/components/gandalf/base/sidebar'
import { cn } from '@/lib/utils'
import {
  gandalfHeaderDividerClass,
  gandalfHeaderLogoLinkClass,
  gandalfHeaderVariants,
} from './index'
import UnergyLogo from './UnergyLogo.vue'

// Figma: Header, Type=Default — the app bar above every layout. Logo, divider and the sidebar
// toggle on the left; free content after them; the actions (help, settings, notifications,
// avatar) on the right.
const props = withDefaults(
  defineProps<{
    /** Shows the GSidebarTrigger after the logo. It needs a GSidebarProvider above (GAppSidebar has one). */
    sidebarTrigger?: boolean
    /** Destination of the logo: `to` of `linkAs`, or an `href` without it. No link when empty. */
    logoTo?: string
    /** Component for the logo link, such as `NuxtLink` or `RouterLink`. Defaults to `<a>` (with `href`). */
    linkAs?: Component | string
    class?: HTMLAttributes['class']
  }>(),
  {
    sidebarTrigger: true,
    logoTo: undefined,
    linkAs: undefined,
    class: undefined,
  },
)
</script>

<template>
  <header data-slot="header" :class="cn(gandalfHeaderVariants(), props.class)">
    <div class="flex min-w-0 flex-1 items-center gap-1">
      <slot name="logo">
        <component
          :is="linkAs ?? 'a'"
          v-if="logoTo"
          v-bind="!linkAs || linkAs === 'a' ? { href: logoTo } : { to: logoTo }"
          :class="gandalfHeaderLogoLinkClass"
        >
          <UnergyLogo />
        </component>
        <UnergyLogo v-else class="shrink-0" />
      </slot>
      <span v-if="sidebarTrigger" aria-hidden="true" :class="gandalfHeaderDividerClass" />
      <GSidebarTrigger v-if="sidebarTrigger" />
      <slot />
    </div>
    <slot name="actions" />
  </header>
</template>
