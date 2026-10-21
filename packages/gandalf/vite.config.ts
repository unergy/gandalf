import { cpSync, readdirSync, readFileSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import vue from '@vitejs/plugin-vue'
import { defineConfig } from 'vite'
import dts from 'vite-plugin-dts'

const src = fileURLToPath(new URL('./src', import.meta.url))
const pkg = JSON.parse(readFileSync(new URL('./package.json', import.meta.url), 'utf8'))

const externals = Object.keys({ ...pkg.dependencies, ...pkg.peerDependencies })

// One entry per shadcn primitive, published as `@unergy/gandalf/ui/<name>`.
const uiEntries = Object.fromEntries(
  readdirSync(`${src}/components/ui`).map((name) => [
    `components/ui/${name}/index`,
    `${src}/components/ui/${name}/index.ts`,
  ]),
)

export default defineConfig({
  resolve: {
    alias: { '@': src },
  },
  plugins: [
    vue(),
    dts({ processor: 'vue', tsconfigPath: './tsconfig.json', entryRoot: src }),
    {
      // The stylesheets are consumed by the app's own Tailwind, so they ship as-is.
      // `@source '../components'` resolves the same from src/styles and dist/styles.
      name: 'gandalf-copy-styles',
      closeBundle() {
        cpSync(`${src}/styles`, fileURLToPath(new URL('./dist/styles', import.meta.url)), {
          recursive: true,
        })
      },
    },
  ],
  build: {
    lib: {
      entry: { index: `${src}/index.ts`, ...uiEntries },
      formats: ['es'],
    },
    cssCodeSplit: false,
    // The consuming app minifies; readable output keeps stack traces useful and stops
    // single-letter names from clashing with transforms such as Nuxt's auto-imports.
    minify: false,
    rolldownOptions: {
      external: (id) => externals.some((dep) => id === dep || id.startsWith(`${dep}/`)),
      output: {
        preserveModules: true,
        preserveModulesRoot: src,
        entryFileNames: '[name].js',
      },
    },
  },
})
