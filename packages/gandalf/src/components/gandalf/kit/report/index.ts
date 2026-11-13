import type { VariantProps } from 'class-variance-authority'
import { cva } from 'class-variance-authority'
import type { Component } from 'vue'
import {
  CircleQuestionMark,
  CornerUpRight,
  DoorOpen,
  Droplet,
  Grid2x2,
  ScanEye,
  Sprout,
  TreePine,
  UtilityPole,
  VectorSquare,
  Waypoints,
  Zap,
} from 'lucide-vue-next'

export { default as GCircleReport } from './CircleReport.vue'
export { default as GAvatarReport } from './AvatarReport.vue'
export { default as GPin } from './Pin.vue'
export { default as GIcons } from './Icons.vue'
export { default as GPickerItem } from './PickerItem.vue'

// Figma: Reports → Cirlcle Report. 30px circle in `{hue}/600` with a 16px icon in `{hue}/50`.
// Fustal and Observación use other text / background hues in Figma; copied as drawn.
export const gandalfCircleReportVariants = cva(
  'inline-flex size-[30px] shrink-0 items-center justify-center rounded-full p-0.5 [&_svg]:size-4',
  {
    variants: {
      type: {
        access: 'bg-orange-600 text-orange-50',
        boundary: 'bg-red-600 text-red-50',
        pole: 'bg-amber-600 text-amber-50',
        road: 'bg-indigo-600 text-indigo-50',
        soil: 'bg-pink-600 text-pink-50',
        fustal: 'bg-green-600 text-gray-50',
        latizal: 'bg-emerald-600 text-emerald-50',
        agua: 'bg-blue-600 text-blue-50',
        otro: 'bg-purple-600 text-purple-50',
        observacion: 'bg-orange-600 text-purple-50',
      },
    },
    defaultVariants: {
      type: 'access',
    },
  },
)

export type GandalfCircleReportType = NonNullable<
  VariantProps<typeof gandalfCircleReportVariants>['type']
>

export const circleReportIcons: Record<GandalfCircleReportType, Component> = {
  access: DoorOpen,
  boundary: VectorSquare,
  pole: UtilityPole,
  road: CornerUpRight,
  soil: Grid2x2,
  fustal: TreePine,
  latizal: Sprout,
  agua: Droplet,
  otro: CircleQuestionMark,
  observacion: ScanEye,
}

// Figma: Reports → Avatar Report. A 24px Avatar Item (corner/lg) in `{hue}/100` with a 12px icon in `{hue}/700`;
// Poligono uses `default/object` and `default/objectFg`.
// Size and corner come from GAvatar (type="square", size="xs").
export const gandalfAvatarReportVariants = cva('items-center justify-center [&_svg]:size-3', {
  variants: {
    type: {
      access: 'bg-orange-100 text-orange-700',
      boundary: 'bg-red-100 text-red-700',
      pole: 'bg-amber-100 text-amber-700',
      road: 'bg-indigo-100 text-indigo-700',
      soil: 'bg-pink-100 text-pink-700',
      fustal: 'bg-green-100 text-green-700',
      latizal: 'bg-emerald-100 text-emerald-700',
      agua: 'bg-blue-100 text-blue-700',
      otro: 'bg-purple-100 text-purple-700',
      poligono: 'bg-default-muted text-default-bold',
    },
  },
  defaultVariants: {
    type: 'access',
  },
})

export type GandalfAvatarReportType = NonNullable<
  VariantProps<typeof gandalfAvatarReportVariants>['type']
>

export const avatarReportIcons: Record<GandalfAvatarReportType, Component> = {
  access: DoorOpen,
  boundary: VectorSquare,
  pole: Zap,
  road: CornerUpRight,
  soil: Grid2x2,
  fustal: TreePine,
  latizal: Sprout,
  agua: Droplet,
  otro: CircleQuestionMark,
  poligono: Waypoints,
}

// Figma: Reports → Icons. The 44×32px map markers drawn as illustrations (Pin, Tree, Door, Pole).
export const gandalfIconsVariants = cva(
  'flex h-8 w-11 shrink-0 flex-col items-center justify-center overflow-clip p-2.5',
)

export const GANDALF_ICONS_TYPES = ['pin', 'tree', 'door', 'pole'] as const
export type GandalfIconsType = (typeof GANDALF_ICONS_TYPES)[number]

// Figma: Reports → Picker Item. Type=Icon (44×32px) or Type=Label (86×32px), 1.5px border, corner/md.
// Hovered / Pressed: alpha/dark-5 / dark-8. Activated: accent-pr/accent with an accent-pr/foreground border.
export const gandalfPickerItemVariants = cva(
  'focus-visible:ring-ring hover:not-data-[state=on]:overlay-dark-5 active:not-data-[state=on]:overlay-dark-8 data-[state=on]:border-accent-primary-foreground data-[state=on]:bg-accent-primary inline-flex shrink-0 cursor-pointer items-center justify-center overflow-clip rounded-md border-[1.5px] border-transparent outline-none focus-visible:ring-2 disabled:cursor-not-allowed disabled:opacity-50',
  {
    variants: {
      type: {
        icon: 'h-8 w-11 flex-col',
        label: 'h-8 w-[86px] gap-1.5 px-2',
      },
    },
    defaultVariants: {
      type: 'icon',
    },
  },
)

export type GandalfPickerItemType = NonNullable<
  VariantProps<typeof gandalfPickerItemVariants>['type']
>
