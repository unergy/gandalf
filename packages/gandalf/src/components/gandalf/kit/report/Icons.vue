<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import { useId } from 'vue'
import { cn } from '@/lib/utils'
import { gandalfIconsVariants } from './index'
import type { GandalfIconsType } from './index'

const props = withDefaults(
  defineProps<{
    type?: GandalfIconsType
    /** Accessible name; without it the icon is decorative. */
    label?: string
    class?: HTMLAttributes['class']
  }>(),
  { type: 'pin', label: undefined, class: undefined },
)

// Each drawing has a white outline with the same drop shadow as in Figma
const shadowId = `g-icons-shadow-${useId()}`
</script>

<template>
  <span
    data-slot="icons"
    :data-type="type"
    :role="label ? 'img' : undefined"
    :aria-label="label"
    :aria-hidden="label ? undefined : 'true'"
    :class="cn(gandalfIconsVariants(), props.class)"
  >
    <svg width="0" height="0" class="absolute" aria-hidden="true">
      <filter
        :id="shadowId"
        x="-20%"
        y="-20%"
        width="140%"
        height="150%"
        color-interpolation-filters="sRGB"
      >
        <feDropShadow dx="0" dy="1" stdDeviation="1" flood-color="#000" flood-opacity="0.35" />
      </filter>
    </svg>

    <span v-if="type === 'pin'" class="relative block h-[25px] w-5 shrink-0">
      <svg
        class="absolute -top-px -left-0.5"
        width="24"
        height="29"
        viewBox="0 0 24 29"
        fill="none"
      >
        <path
          :filter="`url(#${shadowId})`"
          d="M12 1C17.6598 1 21.9999 5.89475 22 11.6152C22 14.4049 20.9796 17.8432 19.3877 20.5938C18.5835 21.9832 17.5795 23.2936 16.3867 24.2773C15.1916 25.263 13.704 26 12 26C10.296 26 8.80841 25.263 7.61328 24.2773C6.42048 23.2936 5.41646 21.9832 4.6123 20.5938C3.02036 17.8432 2 14.4049 2 11.6152C2.00008 5.89475 6.34021 1 12 1Z"
          fill="white"
        />
        <path
          d="M20 11.6154C20 16.3735 16.4183 24 12 24C7.58172 24 4 16.3735 4 11.6154C4 6.85724 7.58172 3 12 3C16.4183 3 20 6.85724 20 11.6154Z"
          fill="#FB2C36"
        />
        <circle cx="12" cy="12" r="4" fill="#C10007" />
      </svg>
    </span>

    <span v-else-if="type === 'tree'" class="relative block h-[27.3px] w-7 shrink-0">
      <svg
        class="absolute -top-px left-0"
        width="28"
        height="31.3"
        viewBox="0 0 28 31.3024"
        fill="none"
      >
        <path
          :filter="`url(#${shadowId})`"
          d="M11.0621 2.2858C12.6458 0.571401 15.3544 0.571402 16.9381 2.2858L22.067 7.83755C23.5154 9.40551 23.3944 11.5675 22.2847 13.0104L23.7496 14.3698C26.4148 16.843 24.6647 21.302 21.0289 21.3024H18.9996V25.3024C18.9995 26.9592 17.6564 28.3024 15.9996 28.3024H11.9996C10.3429 28.3022 8.99969 26.9591 8.99958 25.3024V21.3024H6.97126C3.33516 21.3023 1.58511 16.843 4.25056 14.3698L5.71443 13.0104C4.60502 11.5675 4.48391 9.40538 5.9322 7.83755L11.0621 2.2858Z"
          fill="white"
        />
        <rect x="11" y="18.3021" width="6" height="8" rx="1" fill="#8F400E" />
        <path
          d="M12.6396 9.31438C13.4068 8.6025 14.5932 8.6025 15.3604 9.31438L22.3889 15.836C23.7216 17.0727 22.8466 19.3021 21.0285 19.3021H6.97148C5.15339 19.3021 4.27838 17.0727 5.61112 15.836L12.6396 9.31438Z"
          fill="#00997D"
        />
        <path
          d="M12.5309 3.64248C13.3228 2.78528 14.6773 2.78528 15.4692 3.64248L20.5984 9.19502C21.7817 10.476 20.8731 12.5521 19.1293 12.5521H8.87083C7.12696 12.5521 6.21842 10.476 7.40172 9.19502L12.5309 3.64248Z"
          fill="#02B985"
        />
      </svg>
    </span>

    <span v-else-if="type === 'door'" class="relative block h-[28.35px] w-[21px] shrink-0">
      <svg
        class="absolute -top-px -left-0.5"
        width="25"
        height="32.34"
        viewBox="0 0 25 32.3448"
        fill="none"
      >
        <path
          :filter="`url(#${shadowId})`"
          d="M7.31836 2.62295C8.18303 1.45804 9.65917 0.788147 11.2207 1.06045L19.6875 2.53701C21.6024 2.87106 22.9998 4.53367 23 6.47744V24.2362C23 26.2449 21.5102 27.9425 19.5186 28.203L11.0518 29.3104C9.50223 29.513 8.06675 28.8031 7.24609 27.6229H6C3.85979 27.6229 2.11186 25.9416 2.00488 23.828L2 23.6229V6.62295C2 4.41381 3.79086 2.62295 6 2.62295H7.31836Z"
          fill="white"
        />
        <path
          d="M4 6.62244C4 5.51787 4.89543 4.62244 6 4.62244H18.9864C20.0963 4.62244 20.9939 5.52615 20.9864 6.63599L20.8711 23.636C20.8637 24.7352 19.9704 25.6224 18.8712 25.6224H6C4.89543 25.6224 4 24.727 4 23.6224V6.62244Z"
          fill="#490606"
        />
        <path
          d="M8.53333 5.00137C8.53333 3.75942 9.65341 2.81775 10.8769 3.0311L19.3436 4.5075C20.3011 4.67448 21 5.50576 21 6.47777V24.2365C21 25.2409 20.2552 26.0894 19.2594 26.2196L10.7927 27.327C9.59532 27.4835 8.53333 26.5514 8.53333 25.3438V5.00137Z"
          fill="#A73F0F"
        />
        <circle cx="12.8" cy="15.6224" r="2" fill="#EFB83F" />
      </svg>
    </span>

    <!-- Pole: Figma's "Transformer", a white base with the sticks drawn on top -->
    <span v-else class="relative block h-[27px] w-6 shrink-0">
      <svg
        class="absolute -top-px -left-0.5"
        width="28"
        height="31"
        viewBox="0 0 28 31"
        fill="none"
      >
        <path
          :filter="`url(#${shadowId})`"
          d="M20 1C22.2091 1 24 2.79086 24 5V5.53613C25.1954 6.22781 26 7.51962 26 9C26 11.2091 24.2091 13 22 13H20V18C20 19.4802 19.1951 20.7711 18 21.4629V24C18 26.2091 16.2091 28 14 28C11.7909 28 10 26.2091 10 24V21.4629C8.80487 20.7711 8 19.4802 8 18V13H6C3.79086 13 2 11.2091 2 9C2 7.51962 2.80464 6.22781 4 5.53613V5C4 2.79086 5.79086 1 8 1C9.1953 1 10.267 1.52528 11 2.35645C11.733 1.52528 12.8047 1 14 1C15.1953 1 16.267 1.52528 17 2.35645C17.733 1.52528 18.8047 1 20 1Z"
          fill="white"
        />
      </svg>
      <span class="absolute top-0.5 left-0.5 block h-[23px] w-5">
        <span class="absolute top-[17px] left-2 h-1.5 w-1 rounded-b-xs bg-[#5a8caf]" />
        <span class="absolute top-1 left-0 h-1 w-5 rounded-xs bg-[#5a8caf]" />
        <span class="absolute top-0 left-0.5 size-1 rounded-t-xs bg-[#386aa2]" />
        <span class="absolute top-0 left-2 size-1 rounded-t-xs bg-[#386aa2]" />
        <span class="absolute top-0 left-3.5 size-1 rounded-t-xs bg-[#386aa2]" />
        <span class="absolute top-2 left-1.5 h-[9px] w-2 rounded-xs bg-[#5ca4d6]" />
      </span>
    </span>
  </span>
</template>
