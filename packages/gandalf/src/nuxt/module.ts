import { readFileSync } from 'node:fs'
import { addComponent, addPlugin, createResolver, defineNuxtModule } from '@nuxt/kit'

export interface ModuleOptions {
  /** Register every `G*` component for auto-import, so templates can use them without `import`. */
  components: boolean
  /** Viewport width assumed during SSR by width-dependent composables such as `useMediaQuery`. */
  ssrWidth: number | false
}

declare module '@nuxt/schema' {
  interface PublicRuntimeConfig {
    gandalf: { ssrWidth: number }
  }
}

export default defineNuxtModule<ModuleOptions>({
  meta: {
    name: '@unergy/gandalf',
    configKey: 'gandalf',
  },
  defaults: {
    components: true,
    ssrWidth: 1024,
  },
  setup(options, nuxt) {
    const resolver = createResolver(import.meta.url)

    nuxt.options.build.transpile.push('@unergy/gandalf')

    if (options.components) {
      // Written by the library build from the barrel's exports.
      const names: string[] = JSON.parse(
        readFileSync(resolver.resolve('./components.json'), 'utf8'),
      )
      for (const name of names) addComponent({ name, export: name, filePath: '@unergy/gandalf' })
    }

    if (options.ssrWidth !== false) {
      nuxt.options.runtimeConfig.public.gandalf = { ssrWidth: options.ssrWidth }
      addPlugin(resolver.resolve('./runtime/ssr-width'))
    }
  },
})
