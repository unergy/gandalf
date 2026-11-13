<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import type { LucideIcon } from 'lucide-vue-next'
import { HardHat, Leaf, Scale, TreePine, Zap } from 'lucide-vue-next'
import { GAvatar, GAvatarFallback } from '@/components/gandalf/base/avatar'
import { cn } from '@/lib/utils'
import { gandalfAvatarRolBadgeVariants, gandalfAvatarRolVariants } from './index'
import type { GandalfAvatarRolType } from './index'

const props = withDefaults(
  defineProps<{
    /** Role ("Type" in Figma). "Eléctrico" is `electrico`. */
    type?: GandalfAvatarRolType
    class?: HTMLAttributes['class']
  }>(),
  { type: 'legal', class: undefined },
)

const roles: Record<GandalfAvatarRolType, { label: string; initials: string; icon: LucideIcon }> = {
  legal: { label: 'Legal', initials: 'LE', icon: Scale },
  ambiental: { label: 'Ambiental', initials: 'AM', icon: Leaf },
  forestal: { label: 'Forestal', initials: 'FO', icon: TreePine },
  civil: { label: 'Civil', initials: 'CI', icon: HardHat },
  electrico: { label: 'Eléctrico', initials: 'EL', icon: Zap },
}
</script>

<template>
  <span
    role="img"
    :aria-label="roles[type].label"
    data-slot="avatar-rol"
    :class="cn('relative inline-flex size-8 shrink-0', props.class)"
  >
    <GAvatar size="sm" aria-hidden="true">
      <GAvatarFallback :class="cn('pb-[3px]', gandalfAvatarRolVariants({ type }))">
        <slot>{{ roles[type].initials }}</slot>
      </GAvatarFallback>
    </GAvatar>
    <span aria-hidden="true" :class="gandalfAvatarRolBadgeVariants({ type })">
      <component :is="roles[type].icon" />
    </span>
  </span>
</template>
