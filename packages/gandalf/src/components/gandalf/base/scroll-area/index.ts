import type { VariantProps } from 'class-variance-authority'
import { cva } from 'class-variance-authority'

export { default as GScrollArea } from './GScrollArea.vue'
export { default as GScrollBar } from './GScrollBar.vue'

/**
 * Figma: página "Scroll Bar" → component set "Container Scroll Bar"
 * (Type=Vertical/Horizontal). La barra mide 6px, el riel es `base/base-loud`
 * con radio `corner/sm`, y el thumb es `base/foreground-quiet` con el mismo
 * radio. Hay 8px de aire fuera del riel (margin) y 8px dentro (padding), que
 * Reka respeta al calcular el tamaño y el desplazamiento del thumb.
 */
export const gandalfScrollBarVariants = cva(
  'rounded-sm bg-base-loud p-0 [&_[data-slot=scroll-area-thumb]]:rounded-sm [&_[data-slot=scroll-area-thumb]]:bg-base-foreground-quiet',
  {
    variants: {
      orientation: {
        vertical: 'my-2 h-auto w-1.5 border-l-0 py-2',
        horizontal: 'mx-2 h-1.5 border-t-0 px-2',
      },
    },
    defaultVariants: {
      orientation: 'vertical',
    },
  },
)

/**
 * Figma: página "Scroll Bar". El contenedor no se dibuja en Figma; aquí solo
 * aporta el `relative` de shadcn y repinta la barra vertical que `ScrollArea`
 * monta por dentro (no se le pueden pasar clases), con los mismos valores de
 * `gandalfScrollBarVariants`.
 */
export const gandalfScrollAreaVariants = cva(
  [
    'relative',
    '[&>[data-slot=scroll-area-scrollbar]]:my-2',
    '[&>[data-slot=scroll-area-scrollbar]]:h-auto',
    '[&>[data-slot=scroll-area-scrollbar]]:w-1.5',
    '[&>[data-slot=scroll-area-scrollbar]]:rounded-sm',
    '[&>[data-slot=scroll-area-scrollbar]]:border-l-0',
    '[&>[data-slot=scroll-area-scrollbar]]:bg-base-loud',
    '[&>[data-slot=scroll-area-scrollbar]]:px-0',
    '[&>[data-slot=scroll-area-scrollbar]]:py-2',
    '[&>[data-slot=scroll-area-scrollbar]_[data-slot=scroll-area-thumb]]:rounded-sm',
    '[&>[data-slot=scroll-area-scrollbar]_[data-slot=scroll-area-thumb]]:bg-base-foreground-quiet',
  ],
  {
    variants: {
      orientation: {
        vertical: '',
        horizontal: '[&>[data-slot=scroll-area-scrollbar]]:hidden',
        both: '',
      },
    },
    defaultVariants: {
      orientation: 'vertical',
    },
  },
)

export type GandalfScrollBarVariants = VariantProps<typeof gandalfScrollBarVariants>
export type GandalfScrollAreaVariants = VariantProps<typeof gandalfScrollAreaVariants>
export type GandalfScrollAreaOrientation = NonNullable<GandalfScrollAreaVariants['orientation']>
