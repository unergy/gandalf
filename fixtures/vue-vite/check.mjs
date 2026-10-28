// Fails unless the packed library rendered and its classes reached the app's CSS.
import { readdirSync, readFileSync } from 'node:fs'
import { render } from './dist-ssr/entry-server.js'

const html = await render()
const css = readdirSync('dist/assets')
  .filter((file) => file.endsWith('.css'))
  .map((file) => readFileSync(`dist/assets/${file}`, 'utf8'))
  .join('')

const expectations = {
  'GBadge rendered': html.includes('Activo'),
  'GKitCombobox rendered': html.includes('data-slot="combobox'),
  'GKitDatePicker rendered': html.includes('data-slot="popover-trigger"'),
  'ui/button rendered': html.includes('data-slot="button"'),
  'GInput rendered with its size':
    /<input[^>]*data-size="sm"/.test(html) && html.includes('value="Ana"'),
  'semantic token class generated': css.includes('.bg-success-muted'),
  'design tokens present': css.includes('--background:'),
}

const failed = Object.entries(expectations).filter(([, ok]) => !ok)
for (const [name, ok] of Object.entries(expectations)) console.log(`${ok ? '✓' : '✗'} ${name}`)
if (failed.length) process.exit(1)
