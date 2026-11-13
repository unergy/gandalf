import type { GandalfAvatarSemantic } from '@/components/gandalf/base/avatar'
import { cva } from 'class-variance-authority'

export { default as GMessageCard } from './MessageCard.vue'

// Figma: Chat → Message Card. White bubble, 4px top-left corner and 24px elsewhere, SM shadow.
export const gandalfMessageCardVariants = cva(
  'bg-card relative flex w-full flex-col overflow-clip rounded-3xl rounded-tl-sm shadow-sm',
)

// The "Avatar Item" of the header is GAvatar (Circle, sm) with this semantic. Figma paints the
// default one on `card/card` instead of `default/object`.
export type GandalfMessageCardColor = GandalfAvatarSemantic
