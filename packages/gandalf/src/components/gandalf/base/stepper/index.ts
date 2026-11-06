import { cva } from 'class-variance-authority'

export { default as GStepper } from './GStepper.vue'
export { default as GStepperItem } from './GStepperItem.vue'

// Figma: Stepper. A vertical list of steps; each step's connector leads to the next one.
export const gandalfStepperVariants = cva('flex flex-col gap-0')

// Figma: Stepper → Number & Title, plus the connector below. Type=Final is the last step, which has
// no connector. Reka adds a live region after the items, so "last" means no step comes after it.
export const gandalfStepperItemVariants = cva(
  'flex-col items-start gap-0 [&:not(:has(~[data-state]))>[data-slot=stepper-connector]]:hidden',
)

// The row is the trigger: 8px between the Step and the title.
export const gandalfStepperTriggerVariants = cva(
  'group/step flex-row items-center gap-2 rounded-sm p-0 text-left outline-none focus-visible:ring-2 focus-visible:ring-ring',
)

// Figma: Step (24px). Every selector repeats ui/stepper's own variant so tailwind-merge replaces it.
// Current (inactive): base/inverse outline, base/foreground-loud number; hover alpha/dark-5,
// press alpha/dark-8. Active: base/inverse fill with alpha/light-8, hover light-5, press light-12.
// Done (completed): base/inverse fill with a check; hover and press show the number with
// light-5 / light-12. Disabled: card/card with a bni/border outline and an extra-quiet number.
export const gandalfStepperIndicatorVariants = cva([
  'size-6 shrink-0 rounded-full border border-base-inverse bg-card text-sm leading-[normal] font-semibold text-base-foreground-loud',
  'group-hover/step:overlay-dark-5 group-active/step:overlay-dark-8',
  'group-data-[state=active]:border-transparent group-data-[state=active]:bg-base-inverse group-data-[state=active]:text-base-on-inverse group-data-[state=active]:overlay-light-8 group-data-[state=active]:group-hover/step:overlay-light-5 group-data-[state=active]:group-active/step:overlay-light-12',
  'group-data-[state=completed]:border-transparent group-data-[state=completed]:bg-base-inverse group-data-[state=completed]:text-base-on-inverse group-data-[state=completed]:group-hover/step:overlay-light-5 group-data-[state=completed]:group-active/step:overlay-light-12',
  'group-data-[disabled]:border-bni-border group-data-[disabled]:bg-card group-data-[disabled]:bg-none group-data-[disabled]:text-base-foreground-extra-quiet group-data-[disabled]:opacity-100',
])

// Figma: the title next to the Step, Body/md in base/foreground-loud.
export const gandalfStepperTitleVariants = cva(
  'text-base-foreground-loud text-base leading-normal font-normal whitespace-normal',
)

// Figma: Container Conector. A 24px vertical line under the centre of the Step: bni/border-loud,
// or base/inverse once the step is done (Type=Connected).
export const gandalfStepperConnectorVariants = cva(
  'ml-[11.5px] h-6 w-px shrink-0 bg-bni-border-loud group-data-[disabled]:bg-bni-border-loud group-data-[disabled]:opacity-100 group-data-[state=completed]:bg-base-inverse',
)
