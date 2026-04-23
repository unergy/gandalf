import { defineContentConfig, defineCollection, z } from '@nuxt/content'

export default defineContentConfig({
  collections: {
    docs: defineCollection({
      type: 'page',
      source: 'docs/**',
      schema: z.object({
        status: z.enum(['complete', 'in-progress', 'pending']).optional(),
      }),
    }),
  },
})
