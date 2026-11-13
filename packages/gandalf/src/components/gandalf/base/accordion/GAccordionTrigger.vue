<script setup lang="ts">
import type { AccordionTriggerProps } from 'reka-ui'
import type { HTMLAttributes } from 'vue'
import { reactiveOmit } from '@vueuse/core'
import { ChevronDown } from 'lucide-vue-next'
import { computed, inject, useSlots } from 'vue'
import { AccordionTrigger } from '@/components/ui/accordion'
import { cn } from '@/lib/utils'
import { GBadge } from '../badge'
import { ACCORDION_ITEM_KEY, gandalfAccordionTriggerVariants } from './index'

const props = withDefaults(
  defineProps<
    AccordionTriggerProps & {
      class?: HTMLAttributes['class']
      /** Text of the badge ("Label" in Figma). The `label` slot replaces the whole badge. */
      label?: string
      /** Text after the badge ("Count#" in Figma). Main only. */
      count?: string | number
      /** Action text of a closed Table item. */
      expandText?: string
      /** Action text of an open Main item. */
      collapseText?: string
    }
  >(),
  {
    class: undefined,
    label: undefined,
    count: undefined,
    expandText: 'Mostrar',
    collapseText: 'Ocultar',
  },
)

const delegatedProps = reactiveOmit(props, 'class', 'label', 'count', 'expandText', 'collapseText')

const slots = useSlots()

const item = inject(
  ACCORDION_ITEM_KEY,
  computed(() => ({
    variant: 'main' as const,
    category: 'main' as const,
    type: 'visualization' as const,
  })),
)

const isMain = computed(() => item.value.variant === 'main')
const isTable = computed(() => item.value.type === 'table')
const isDefault = computed(() => item.value.category === 'default')
const hasLabel = computed(() => props.label !== undefined || !!slots.label)
const hasCount = computed(() => props.count !== undefined || !!slots.count)

// Figma: title in Body/xsEm, base/foreground-quiet; muted/foreground-quiet when disabled.
// Blended Default paints it action/action when open.
const titleClass = computed(() =>
  cn(
    'text-base-foreground-quiet group-data-[disabled]:text-muted-foreground-quiet truncate text-xs leading-[normal] font-semibold uppercase',
    !isMain.value &&
      isDefault.value &&
      'group-data-[state=open]:text-action group-data-[disabled]:group-data-[state=open]:text-muted-foreground-quiet',
  ),
)

// Figma: the badge is Tonal md Default (Main and Blended Main) or Outlined (Blended Default),
// with muted fills when disabled.
const badgeClass = computed(() =>
  cn(
    'group-data-[disabled]:bg-muted group-data-[disabled]:text-muted-foreground-quiet shrink-0',
    !isMain.value && isDefault.value && 'group-data-[disabled]:border-muted-foreground-quiet',
  ),
)

// Figma: "Text & Icon" on the right of Main. base/foreground closed, action/action open.
// Table greys it out when disabled; Visualization keeps the colors of the design.
const actionClass = computed(() =>
  cn(
    'text-base-foreground group-data-[state=open]:text-action flex shrink-0 items-center gap-2 text-sm leading-[normal] font-semibold',
    isTable.value &&
      'group-data-[disabled]:text-muted-foreground-quiet group-data-[disabled]:group-data-[state=open]:text-muted-foreground-quiet',
  ),
)

const chevronClass =
  'size-4 shrink-0 transition-transform duration-200 group-data-[state=open]:rotate-180'
</script>

<template>
  <AccordionTrigger
    v-bind="delegatedProps"
    :class="cn(gandalfAccordionTriggerVariants(item), props.class)"
  >
    <!-- Figma: Accordeon Main. Title, badge and count on the left; the action on the right. -->
    <template v-if="isMain">
      <span class="flex min-w-0 flex-1 items-center gap-2">
        <span :class="titleClass"><slot /></span>
        <slot name="label">
          <GBadge v-if="hasLabel" :class="badgeClass">{{ label }}</GBadge>
        </slot>
        <span
          v-if="hasCount"
          class="text-base-foreground-quiet group-data-[disabled]:text-muted-foreground-quiet truncate text-base leading-normal"
        >
          <slot name="count">{{ count }}</slot>
        </span>
      </span>
      <span :class="actionClass">
        <span v-if="isTable" class="group-data-[state=open]:hidden">{{ expandText }}</span>
        <span class="hidden group-data-[state=open]:inline">{{ collapseText }}</span>
        <ChevronDown :class="chevronClass" />
      </span>
    </template>

    <!-- Figma: Accordeon Blended. Chevron and title on the left; the badge on the right. -->
    <template v-else>
      <span class="flex min-w-0 flex-1 items-center gap-2">
        <ChevronDown
          :class="
            cn(
              chevronClass,
              'text-base-foreground group-data-[state=open]:text-action group-data-[disabled]:text-muted-foreground-quiet group-data-[disabled]:group-data-[state=open]:text-muted-foreground-quiet',
            )
          "
        />
        <span :class="titleClass"><slot /></span>
      </span>
      <slot name="label">
        <GBadge v-if="hasLabel" :variant="isDefault ? 'outlined' : 'tonal'" :class="badgeClass">
          <slot name="label-icon" />
          {{ label }}
        </GBadge>
      </slot>
    </template>

    <template #icon>
      <span class="hidden" />
    </template>
  </AccordionTrigger>
</template>
