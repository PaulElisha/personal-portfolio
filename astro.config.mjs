import { defineConfig } from 'astro/config'
import alpinejs from '@astrojs/alpinejs'

export default defineConfig({
  site: 'https://protocol-architect.pages.dev',
  integrations: [alpinejs()],
  output: 'static',
  build: {
    inlineStylesheets: 'auto',
  },
})
