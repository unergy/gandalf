export { default as GKitUserMenu } from './UserMenu.vue'

/** Header › Avatar as the trigger: a round focus ring around the 32px avatar. */
export const gandalfUserMenuTriggerClass =
  'shrink-0 rounded-full outline-none focus-visible:ring-2 focus-visible:ring-ring'

/**
 * The menu never grows past 288px nor past the space left on screen, so a long name or email is
 * truncated instead of widening the menu.
 */
export const gandalfUserMenuContentClass =
  'max-w-[min(var(--reka-dropdown-menu-content-available-width),--spacing(72))]'

/** Top of the menu: the user's avatar, name and email, in place of a Divider header. */
export const gandalfUserMenuHeaderClass = 'h-auto gap-3 px-3 py-2'

/** Bottom row after the items, for secondary text such as the app version. */
export const gandalfUserMenuFooterClass =
  'flex items-center justify-between gap-2 px-3 text-sm text-base-foreground-extra-quiet'
