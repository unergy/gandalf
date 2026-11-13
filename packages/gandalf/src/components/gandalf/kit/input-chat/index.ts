import { cva } from 'class-variance-authority'

export { default as GInputChat } from './InputChat.vue'

// Figma: Chat → Input Chat. Status=Focused is `:focus-within`: the 1px `bni/border-loud` border
// turns into 2px `primary/primary` (1px border plus a 1px inset ring, so nothing moves).
export const gandalfInputChatVariants = cva(
  'group/input-chat bg-card border-bni-border-loud focus-within:border-primary focus-within:ring-primary flex w-full flex-col justify-center rounded-xl border p-3 shadow-md focus-within:ring-1 focus-within:ring-inset',
)
