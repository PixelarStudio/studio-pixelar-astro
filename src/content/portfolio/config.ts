import {z, defineCollection } from "astro:content";


const portfolio = defineCollection({
    schema: z.object({
        // Información básica del proyecto
        nombre: z.string().max(80),
        categoria: z.enum([
            "E-commerce", 
            "Web Corporativa", 
            "Landing Page", 
            "Aplicación Web", 
            "Branding",
            "Rediseño",
            "Plataforma Educativa"
        ]),
        industria: z.string().max(60),
        descripcion_larga: z.string().max(500),
        
        // Análisis y solución
    desafio: z.array(z.string()).optional().default([]),
        solucion: z.array(z.string().max(120)),
        
        // Tecnologías implementadas
        tecnologias: z.array(z.string().max(40)),
        
        // Resultados y métricas
        metricas: z.array(z.string().max(100)),
        caracteristicas_destacadas: z.array(z.string().max(120)),
        
        // Elementos visuales
        imagen_principal: z.string(),
        imagenes_secundarias: z.array(z.string()),
        
        // Información del cliente
        url: z.string().url(),
        cliente: z.string().max(60),
        testimonio: z.string().max(300),
        
        // Metadatos y SEO
        fecha: z.string().regex(/^\d{4}-\d{2}-\d{2}$/), // Formato YYYY-MM-DD
        slug: z.string().regex(/^[a-z0-9-]+$/),
        id: z.string().regex(/^[a-z0-9-]+$/),
        metaTitle: z.string().max(70).optional(),
        metaDescription: z.string().max(160).optional(),
        
        // Control de publicación
        disponible: z.boolean().default(true),
        destacado: z.boolean().default(false),
        
        // Estadísticas (opcionales)
        visitas: z.number().default(0).optional(),
        conversionRate: z.number().optional()
    })
});

export const collections = { portfolio };