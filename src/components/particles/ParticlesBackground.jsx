// src/components/ParticlesBackground.jsx
import React, { useEffect, useRef } from "react";

const ParticlesBackground = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const contexto = canvas.getContext("2d");
    let idAnimacion;

    // Ajusta el tamaño del canvas al contenedor
    const ajustarTamanio = () => {
      canvas.width = canvas.clientWidth;
      canvas.height = canvas.clientHeight;
    };

    ajustarTamanio();
    window.addEventListener("resize", ajustarTamanio);

    // Configuración de partículas
    const particulas = [];
    const cantidadParticulas = 150;

    class Particula {
      constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.tamano = Math.random() * 2 + 1;
        this.velocidadX = Math.random() * 1 - 0.5;
        this.velocidadY = Math.random() * 1 - 0.5;
        this.color = `hsla(${Math.random() * 360}, 70%, 60%, ${
          Math.random() * 0.4 + 0.1
        })`;
      }

      actualizar() {
        this.x += this.velocidadX;
        this.y += this.velocidadY;

        if (this.x < 0 || this.x > canvas.width) this.velocidadX *= -1;
        if (this.y < 0 || this.y > canvas.height) this.velocidadY *= -1;
      }

      dibujar() {
        contexto.fillStyle = this.color;
        contexto.beginPath();
        contexto.arc(this.x, this.y, this.tamano, 0, Math.PI * 2);
        contexto.fill();
      }
    }

    // Crear las partículas iniciales
    for (let i = 0; i < cantidadParticulas; i++) {
      particulas.push(new Particula());
    }

    // Función de animación
    const animar = () => {
      contexto.clearRect(0, 0, canvas.width, canvas.height);

      // Dibujar líneas entre partículas cercanas
      for (let i = 0; i < particulas.length; i++) {
        for (let j = i; j < particulas.length; j++) {
          const dx = particulas[i].x - particulas[j].x;
          const dy = particulas[i].y - particulas[j].y;
          const distancia = Math.sqrt(dx * dx + dy * dy);

          if (distancia < 100) {
            contexto.beginPath();
            contexto.strokeStyle = `hsla(${Math.random() * 360}, 70%, 60%, ${
              0.1 * (1 - distancia / 100)
            })`;
            contexto.lineWidth = 0.2;
            contexto.moveTo(particulas[i].x, particulas[i].y);
            contexto.lineTo(particulas[j].x, particulas[j].y);
            contexto.stroke();
          }
        }
      }

      // Actualizar y dibujar cada partícula
      particulas.forEach((p) => {
        p.actualizar();
        p.dibujar();
      });

      idAnimacion = requestAnimationFrame(animar);
    };

    animar();

    // Interacción con el mouse
    const moverMouse = (evento) => {
      const rect = canvas.getBoundingClientRect();
      const ratonX = evento.clientX - rect.left;
      const ratonY = evento.clientY - rect.top;

      particulas.forEach((p) => {
        const dx = ratonX - p.x;
        const dy = ratonY - p.y;
        const distancia = Math.sqrt(dx * dx + dy * dy);

        if (distancia < 100) {
          const fuerza = (100 - distancia) / 100;
          const angulo = Math.atan2(dy, dx);

          p.x -= Math.cos(angulo) * fuerza * 2;
          p.y -= Math.sin(angulo) * fuerza * 2;
        }
      });
    };

    canvas.addEventListener("mousemove", moverMouse);

    // Cleanup al desmontar
    return () => {
      window.removeEventListener("resize", ajustarTamanio);
      canvas.removeEventListener("mousemove", moverMouse);
      cancelAnimationFrame(idAnimacion);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute top-0 left-0 w-full h-full opacity-20 pointer-events-none"
    />
  );
};

export default ParticlesBackground;
