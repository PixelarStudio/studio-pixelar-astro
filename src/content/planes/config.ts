import {z, defineCollection } from "astro:content"


const planes = defineCollection({
  schema: z.object({

    title: z.string(),
    subtitle: z.string().optional(),
    description: z.string(),
    category: z.string(),
    price: z.number(),

    secciones: z.number().optional().default(0),
    correoCorporativo: z.number().optional().default(0),
    certificadoSSL: z.boolean().optional().default(false),

    extras: z.array(z.string()).optional(),
    tecnologias: z.array(z.string()).optional(),

    tiempoEntrega: z.string().optional(),
    publico: z.string().optional(),
    documentacion: z.boolean().optional(),

    formasPago: z.array(z.string()).optional(),
    integraciones: z.array(z.string()).optional(),

    idioma: z.string().optional(),
    factura: z.boolean().optional(),

    disponible: z.boolean().default(true),
    cta: z.string().optional(),
    frequency: z.string().optional(),

    imagen: z.string().optional(),
    seoTitle: z.string().optional(),
    seoDescription: z.string().optional(),
    
  }),
});

export const collections = { planes };
    