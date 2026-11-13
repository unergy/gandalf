<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import type { GandalfToastType } from './index'
import {
  CheckIcon,
  ComponentIcon,
  LoaderCircleIcon,
  SirenIcon,
  TriangleAlertIcon,
  XIcon,
} from 'lucide-vue-next'
import { computed } from 'vue'
import { toast } from 'vue-sonner'
import { cn } from '@/lib/utils'
import {
  gandalfToastCloseVariants,
  gandalfToastDescriptionVariants,
  gandalfToastIconVariants,
  gandalfToastTitleVariants,
  gandalfToastVariants,
} from './index'

const props = withDefaults(
  defineProps<{
    /** Sonner toast id. When set, the close button dismisses that toast. */
    id?: string | number
    title: string
    description?: string
    type?: GandalfToastType
    class?: HTMLAttributes['class']
  }>(),
  { type: 'default' },
)

const emit = defineEmits<{ close: [] }>()

// Figma icons per Type (lucide_icons font).
const icons: Record<GandalfToastType, typeof CheckIcon> = {
  default: CheckIcon,
  action: LoaderCircleIcon,
  information: ComponentIcon,
  success: CheckIcon,
  warning: TriangleAlertIcon,
  destructive: SirenIcon,
}

const icon = computed(() => icons[props.type])

function close() {
  emit('close')
  if (props.id !== undefined) toast.dismiss(props.id)
}
</script>

<template>
  <div data-slot="toast" :class="cn(gandalfToastVariants({ type }), props.class)">
    <component
      :is="icon"
      aria-hidden="true"
      :class="[gandalfToastIconVariants({ type }), type === 'action' && 'animate-spin']"
    />
    <div class="flex min-w-0 flex-1 flex-col self-start">
      <p :class="gandalfToastTitleVariants({ type })">
        {{ title }}
      </p>
      <p v-if="description" :class="gandalfToastDescriptionVariants()">
        {{ description }}
      </p>
    </div>
    <button
      type="button"
      aria-label="Close"
      :class="gandalfToastCloseVariants({ type })"
      @click="close"
    >
      <XIcon />
    </button>
  </div>
</template>
