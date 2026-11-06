// Fails unless the module's auto-import and the explicit import both prerendered with Gandalf's styles.
import { readdirSync, readFileSync } from 'node:fs'

const html = readFileSync('.output/public/index.html', 'utf8')
const css = readdirSync('.output/public/_nuxt')
  .filter((file) => file.endsWith('.css'))
  .map((file) => readFileSync(`.output/public/_nuxt/${file}`, 'utf8'))
  .join('')

const expectations = {
  'GBadge auto-imported by the module': html.includes('Activo') && !html.includes('<gbadge'),
  'GKitDatePicker imported explicitly': html.includes('data-slot="popover-trigger"'),
  'semantic token class generated': css.includes('.bg-success-muted'),
  'design tokens present': css.includes('--background:'),
}

for (const [name, ok] of Object.entries(expectations)) console.log(`${ok ? '✓' : '✗'} ${name}`)
if (Object.values(expectations).includes(false)) process.exit(1)
