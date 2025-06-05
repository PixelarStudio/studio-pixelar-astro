import { defineCollection, z } from "astro:content";

const servicios = defineCollection({
    schema: z.object({
        title: z.string(),
        description: z.string(),
        image: z.string(),
        cta: z.string().optional(),
    }),
})

export const collections = { servicios };