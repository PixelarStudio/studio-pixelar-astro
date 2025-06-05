// src/components/portfolio/PortfolioGrid.jsx
import React, { useState, useMemo } from "react";
import ProjectCard from "./ProjectCard.jsx"; // Asegurate de que la ruta sea correcta

/**
 * Props:
 *  - proyectos: arreglo de objetos con estructura { data: { categoria: string; fecha: string; ... }, slug: string; ... }
 */
export default function PortfolioGrid({ proyectos }) {
  // Estado para la categoría seleccionada; por defecto "Todos"
  const [categoriaActiva, setCategoriaActiva] = useState("Todos");

  // Calcular lista filtrada cada vez que cambie proyectos o categoriaActiva
  const proyectosFiltrados = useMemo(() => {
    if (categoriaActiva === "Todos") {
      return proyectos;
    }
    // Filtramos por el campo data.categoria (debe existir en cada proyecto)
    return proyectos.filter(
      (p) => p.data.categoria && p.data.categoria === categoriaActiva
    );
  }, [proyectos, categoriaActiva]);

  // Obtener lista única de categorías existentes en los proyectos (para generar botones dinámicos)
  const categoriasDisponibles = useMemo(() => {
    const setCats = new Set();
    proyectos.forEach((p) => {
      if (p.data.categoria) {
        setCats.add(p.data.categoria);
      }
    });
    return ["Todos", ...Array.from(setCats)];
  }, [proyectos]);

  return (
    <div>
      {/* Botones de filtro */}
      <div className="mb-8 flex flex-wrap gap-3">
        {categoriasDisponibles.map((cat) => (
          <button
            key={cat}
            className={
              "px-5 py-2 rounded-full font-medium transition-all " +
              (categoriaActiva === cat
                ? "bg-blue-600 text-white"
                : "bg-gray-800 text-gray-300 hover:bg-gray-700")
            }
            onClick={() => setCategoriaActiva(cat)}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Grid de proyectos filtrados */}
      <div className="portfolio-grid">
        {proyectosFiltrados.length > 0 ? (
          proyectosFiltrados.map((proyecto) => (
            <ProjectCard key={proyecto.slug} proyecto={proyecto} />
          ))
        ) : (
          <p className="text-gray-400">No se encontraron proyectos en esta categoría.</p>
        )}
      </div>

      <style jsx>{`
        .portfolio-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
          gap: 2rem;
        }
        @media (min-width: 768px) {
          .portfolio-grid {
            grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
          }
        }
      `}</style>
    </div>
  );
}
