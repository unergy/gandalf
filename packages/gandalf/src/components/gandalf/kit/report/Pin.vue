<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import { cn } from '@/lib/utils'
import CircleReport from './CircleReport.vue'
import type { GandalfCircleReportType } from './index'

// Figma: Reports → Pin (Type=Report). Layer name over a Cirlcle Report in a 2px card ring with a white tail.
const props = withDefaults(
  defineProps<{
    /** Text over the pin ("Layer name" in Figma). */
    layerName?: string
    /** "Show Layer name" in Figma. */
    showLayerName?: boolean
    /** Type of the Cirlcle Report inside the pin. */
    report?: GandalfCircleReportType
    class?: HTMLAttributes['class']
  }>(),
  { layerName: 'Layer name', showLayerName: true, report: 'access', class: undefined },
)
</script>

<template>
  <div data-slot="pin" :class="cn('inline-flex flex-col items-center gap-1', props.class)">
    <span v-if="showLayerName" class="text-body-smEm text-base-foreground whitespace-nowrap">
      <slot name="layer-name">{{ layerName }}</slot>
    </span>
    <!-- shape/elevation/MD, as a drop shadow so it follows the pin outline -->
    <span
      class="relative block h-[41px] w-[34px] shrink-0 [filter:drop-shadow(0_4px_3px_rgb(0_0_0/0.1))_drop-shadow(0_2px_2px_rgb(0_0_0/0.1))]"
    >
      <svg
        class="absolute top-[15px] left-px"
        width="32"
        height="26"
        viewBox="0 0 32 26"
        fill="none"
        aria-hidden="true"
      >
        <path
          d="M32 7.68182C31.4483 10.6364 23.313 26 16 26C8.68699 26 0.551724 10.6364 0 7.68203C0 -0.150377 8.68699 0.000207291 16 0.000207291C23.313 0.000207291 32 -0.150584 32 7.68182Z"
          fill="white"
        />
      </svg>
      <span class="bg-card absolute top-0 left-0 flex rounded-full p-0.5">
        <slot>
          <CircleReport :type="report" />
        </slot>
      </span>
    </span>
  </div>
</template>
