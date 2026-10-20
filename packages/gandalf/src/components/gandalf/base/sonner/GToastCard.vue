<script setup lang="ts">
import type { GandalfToastColor } from './index'
import {
  CheckIcon,
  Flower2Icon,
  Loader2Icon,
  SirenIcon,
  TriangleAlertIcon,
  XIcon,
} from 'lucide-vue-next'
import { computed } from 'vue'
import { toast } from 'vue-sonner'
import {
  gandalfToastIconVariants,
  gandalfToastTitleVariants,
  gandalfToastVariants,
} from './index'

const props = defineProps<{
  id: string | number
  title: string
  description?: string
  color: GandalfToastColor
}>()

const icons: Record<GandalfToastColor, typeof CheckIcon> = {
  default: CheckIcon,
  action: Loader2Icon,
  information: Flower2Icon,
  success: CheckIcon,
  warning: TriangleAlertIcon,
  destructive: SirenIcon,
}

const icon = computed(() => icons[props.color])
</script>

<template>
  <div :class="gandalfToastVariants({ color })">
    <component
      :is="icon"
      :class="[gandalfToastIconVariants({ color }), color === 'action' && 'animate-spin']"
    />
    <div class="min-w-0 flex-1">
      <p :class="gandalfToastTitleVariants({ color })">
        {{ title }}
      </p>
      <p v-if="description" class="text-muted-foreground text-sm">
        {{ description }}
      </p>
    </div>
    <button
      type="button"
      class="text-muted-foreground hover:text-foreground shrink-0"
      @click="toast.dismiss(id)"
    >
      <XIcon class="size-4" />
    </button>
  </div>
</template>
