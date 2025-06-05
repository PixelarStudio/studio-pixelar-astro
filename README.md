# Studio Pixelar – Sitio Web Oficial

Este repositorio contiene el código fuente del sitio web de **Studio Pixelar**, desarrollado con **Astro**, **React** y **Tailwind CSS**. A continuación se detalla en forma clara y concisa qué se hizo, cómo está organizado el proyecto y qué tecnologías se emplearon.

---

## 1. Objetivo del Proyecto

El sitio web de Studio Pixelar fue creado para:

- Mostrar los **servicios** ofrecidos (planes personalizados, desarrollo web, e-commerce, etc.).
- Exhibir el **portafolio** de proyectos realizados (sitios web, tiendas online, branding).
- Brindar información sobre **planes** y permitir acceso a páginas detalladas de cada plan.
- Facilitar el contacto con potenciales clientes a través de un **formulario** dedicado.
- Publicar novedades, información institucional y páginas de “Nosotros” para reforzar la identidad.

La idea principal es contar con una plataforma **responsiva**, **funcional** y de **fácil mantenimiento**, donde gran parte del contenido (planes, proyectos, beneficios) esté organizado como colecciones de Markdown/MDX y se renderice de forma estática con Astro.

---

## 2. Tecnologías y Herramientas Usadas

1. **Astro (vX.X.X)**  
   - Framework de generación de sitios estáticos (SSG) con soporte para “Islas interactivas” (Astro Islands).  
   - Maneja contenido mediante colecciones (`astro:content`), lo que permite escribir planes, proyectos y otros textos en archivos Markdown.

2. **React (v18)**  
   - Utilizado para componentes interactivos que requieren JavaScript en el cliente, por ejemplo:
     - **ParticlesBackground.jsx**: efecto de partículas en segundo plano.
     - **PortfolioGrid.jsx** (Astro Island): lógica de filtro de proyectos.
     - **Footer.jsx**, **Header.jsx** (si incluyen partes dinámicas).
     - **ContactForm.jsx**: formulario de contacto que envía datos a WhatsApp.

3. **Tailwind CSS (vX.X.X)**  
   - Sistema de utilidades que permite escribir clases CSS directamente en el markup.  
   - Configuración personalizada en `tailwind.config.js` para colores, tipografías y breakpoints.

4. **Content Collections (Astro Content)**  
   - Carpeta `src/content/planes/` para cada plan de servicio, con frontmatter:  
     ```yaml
     ---
     title: "Plan Altas y Configuraciones en Google"
     description: "Presencia local en buscadores"
     price: 170000
     frequency: "mensual"
     slug: "plan-google"
     # …otros campos específicos de cada plan
     ---
     ```
   - Carpeta `src/content/portfolio/` para proyectos, con frontmatter:  
     ```yaml
     ---
     title: "Studio Pixelar"
     fecha: "2025-06-01"
     categoria: "Web"
     imagen: "/images/portfolio/studio-pixelar.png"
     slug: "studio-pixelar"
     # …otros datos relevantes
     ---
     ```

5. **Astro Layouts**  
   - `src/layouts/BaseLayout.astro`: plantilla base que engloba `<Header />`, `<slot />` y `<Footer />`.  
   - Facilita consistencia en todas las páginas.

6. **JavaScript / TypeScript**  
   - Los archivos `.js` o `.jsx` se usan para componentes React.  
   - Las páginas `.astro` tienen script embebido en JS/TS (según corresponda) para consultas a colecciones y lógica de renderizado.

---

## 3. Flujo de Trabajo y Funcionalidades Principales

1. ### Página de **Inicio** (`src/pages/index.astro`)
   - Sección **Hero** con mensaje de bienvenida y llamado a la acción (CTA).  
   - Componentes destacados que pueden ser:
     - Servicios principales.
     - Breve presentación de Studio Pixelar.
     - Enlaces directos a portafolio, contacto, novedades, etc.

2. ### Página de **Servicios** (`src/pages/servicios/index.astro`)
   - Se obtienen los planes con `const planes = await getCollection("planes")`.  
   - Se recorre `planes.map((plan) => …)`, mostrando:
     - **Título** del plan (`plan.data.title`).
     - **Descripción breve** (`plan.data.description`), truncada a 3 líneas con CSS.
     - **Precio** formateado en pesos argentinos / frecuencia (`plan.data.price`, `plan.data.frequency`).
     - **Enlace** a `/planes/[slug]`, página donde se muestran detalles de cada plan.
   - Efectos de hover: borde y pequeño desplazamiento vertical para “levantarse” al pasar el mouse.

3. ### Páginas de **Planes** (`src/pages/planes/[slug].astro`)
   - Página dinámica que recibe `slug` desde la URL.  
   - Con `getEntryBySlug("planes", slug)` se recupera el frontmatter completo:  
     ```ts
     const plan = await getEntryBySlug("planes", params.slug);
     ```
   - Se muestran:
     - **HeroPlan.astro**: sección principal con título grande y gráfica.
     - **DetailItem.astro**: listado de características/beneficios del plan.
     - Botones de contacto o llamada a WhatsApp según la lógica.

4. ### Página de **Portafolio** (`src/pages/portfolio/index.astro`)
   - Se obtienen proyectos con `const proyectos = await getCollection("portfolio")` y se ordenan por fecha.  
   - **Hero específico** con mensaje “Nuestro Portafolio” y breve descripción.  
   - **PortfolioGrid.jsx** (Astro Island o JS puro) genera los filtros de categorías:
     - Botones: “Todos”, “Web”, “E-commerce”, “Mobile”, etc., según `project.data.categoria`.
     - Al hacer clic


