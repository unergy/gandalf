import { provideSSRWidth } from '@vueuse/core'
import { defineNuxtPlugin, useRuntimeConfig } from 'nuxt/app'

export default defineNuxtPlugin((nuxtApp) => {
  provideSSRWidth(useRuntimeConfig().public.gandalf.ssrWidth, nuxtApp.vueApp)
})
