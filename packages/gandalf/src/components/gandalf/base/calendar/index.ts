import type { LayoutTypes } from '@/components/ui/calendar'

export { default as GCalendar } from './GCalendar.vue'
export { default as GCalendarCell } from './GCalendarCell.vue'
export { default as GCalendarCellTrigger } from './GCalendarCellTrigger.vue'
export { default as GCalendarGrid } from './GCalendarGrid.vue'
export { default as GCalendarGridBody } from './GCalendarGridBody.vue'
export { default as GCalendarGridHead } from './GCalendarGridHead.vue'
export { default as GCalendarGridRow } from './GCalendarGridRow.vue'
export { default as GCalendarHeadCell } from './GCalendarHeadCell.vue'
export { default as GCalendarHeader } from './GCalendarHeader.vue'
export { default as GCalendarHeading } from './GCalendarHeading.vue'
export { default as GCalendarNextButton } from './GCalendarNextButton.vue'
export { default as GCalendarPrevButton } from './GCalendarPrevButton.vue'

// No CVA of its own: the calendar's surface is shadcn's, unchanged. The heading layout is
// re-exported under the Gandalf name so `kit/` components can type against it without
// importing from `ui/`.
export type GandalfCalendarLayout = LayoutTypes
