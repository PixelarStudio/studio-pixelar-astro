// src/components/FooterExotic.jsx
import React from "react";
import "@fortawesome/fontawesome-free/css/all.min.css";

const imageLogo = "/images/logo.png";
const rrss = [
  {
    red: "Instagram",
    enlace: "https://www.instagram.com/studio.pixelar",
    icon: "instagram",
  },
  {
    red: "Facebook",
    enlace: "https://www.facebook.com/studio.pixelar",
    icon: "facebook",
  },
];

const Footer = () => {
  const canvasReferencia = React.useRef(null);

  React.useEffect(() => {
    const canvas = canvasReferencia.current;
    const contexto = canvas.getContext("2d");
    let idAnimacion;

    const ajustarTamanio = () => {
      canvas.width = canvas.clientWidth;
      canvas.height = canvas.clientHeight;
    };

    ajustarTamanio();
    window.addEventListener("resize", ajustarTamanio);

    const particulas = [];
    const cantidadParticulas = 150;

    class Particula {
      constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.tamano = Math.random() * 2 + 1;
        this.velocidadX = Math.random() * 1 - 0.5;
        this.velocidadY = Math.random() * 1 - 0.5;
        this.color = `hsla(${Math.random() * 360}, 70%, 60%, ${Math.random() * 0.4 + 0.1})`;
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

    for (let i = 0; i < cantidadParticulas; i++) {
      particulas.push(new Particula());
    }

    const animar = () => {
      contexto.clearRect(0, 0, canvas.width, canvas.height);

      for (let i = 0; i < particulas.length; i++) {
        for (let j = i; j < particulas.length; j++) {
          const dx = particulas[i].x - particulas[j].x;
          const dy = particulas[i].y - particulas[j].y;
          const distancia = Math.sqrt(dx * dx + dy * dy);

          if (distancia < 100) {
            contexto.beginPath();
            contexto.strokeStyle = `hsla(${Math.random() * 360}, 70%, 60%, ${0.1 * (1 - distancia / 100)})`;
            contexto.lineWidth = 0.2;
            contexto.moveTo(particulas[i].x, particulas[i].y);
            contexto.lineTo(particulas[j].x, particulas[j].y);
            contexto.stroke();
          }
        }
      }

      particulas.forEach((p) => {
        p.actualizar();
        p.dibujar();
      });

      idAnimacion = requestAnimationFrame(animar);
    };

    animar();

    const moverMouse = (evento) => {
      const rectangulo = canvas.getBoundingClientRect();
      const ratonX = evento.clientX - rectangulo.left;
      const ratonY = evento.clientY - rectangulo.top;

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

    return () => {
      window.removeEventListener("resize", ajustarTamanio);
      canvas.removeEventListener("mousemove", moverMouse);
      cancelAnimationFrame(idAnimacion);
    };
  }, []);

  const enlacesExplorar = [
    { etiqueta: "Inicio", enlace: "/" },
    { etiqueta: "Servicios", enlace: "/servicios" },
    { etiqueta: "Portfolio", enlace: "/portfolio" },
    { etiqueta: "Contacto", enlace: "/contacto" },
    { etiqueta: "Nuestra Historia", enlace: "/nosotros" },
  ];

  return (
    <footer className="relative overflow-hidden bg-transparent mt-32 pt-24 md:pt-32 lg:pt-48 pb-12 md:pb-16 lg:pb-24 ">
      {/* Canvas de partículas (opacidad baja para no competir con contenido) */}
      <canvas
        ref={canvasReferencia}
        className="absolute top-0 left-0 w-full h-full opacity-20 pointer-events-none bg-gradient-to-br from-gray-900 via-[#0F0F0F] to-gray-800 text-white "
      />

      {/* Sombras/gradientes decorativos (aparecen solo en pantallas grandes) */}
      <div className="hidden lg:block absolute top-0 left-0 w-full h-48 bg-gradient-to-r from-gray-800/10 to-indigo-600/10 transform -skew-y-12 origin-top" />
      <div className="hidden lg:block absolute top-1/4 left-1/4 w-36 h-36 rounded-full bg-gradient-to-br from-gray-500/20 to-indigo-600/20 blur-3xl animate-float" />
      <div className="hidden lg:block absolute top-1/3 right-1/4 w-24 h-24 rotate-45 bg-gradient-to-br from-cyan-400/20 to-blue-500/20 blur-3xl animate-float animation-delay-2000" />
      <div className="hidden lg:block absolute bottom-1/4 left-1/3 w-32 h-32 rounded-full bg-gradient-to-br from-pink-500/20 to-rose-600/20 blur-3xl animate-float animation-delay-4000" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-12">

          {/* 1) Logo y descripción */}
          <div className="flex flex-col items-center lg:items-start space-y-4">
            <a href="/" className="inline-block">
              <img
                src={imageLogo}
                className="h-12 sm:h-14 md:h-16 lg:h-20 w-auto transition-transform duration-300 hover:scale-105"
                alt="Logo Studio Pixelar"
              />
            </a>
            <p className="text-center lg:text-left text-gray-400 text-sm sm:text-base md:text-base leading-relaxed">
              Creamos experiencias digitales únicas que desafían la convención. Combinamos innovación técnica con un diseño minimalista e impactante.
            </p>
            <div className="flex space-x-3">
              {rrss.map(({ red, enlace, icon }) => (
                <a
                  key={red}
                  href={enlace}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-8 h-8 sm:w-10 sm:h-10 flex items-center justify-center rounded-lg bg-gray-800 hover:bg-gradient-to-r hover:from-purple-600 hover:to-indigo-600 transition-all duration-300"
                  aria-label={red}
                >
                  <i className={`fab fa-${icon} text-gray-300 hover:text-white text-base sm:text-lg`} />
                </a>
              ))}
            </div>
          </div>

          {/* 2) Sección Explorar */}
          <div className="flex flex-col">
            <h3 className="text-lg md:text-xl font-bold text-white mb-4 relative">
              <span className="text-shadow-neon">Explorar</span>
              <div className="absolute -bottom-1 left-0 w-10 h-1 bg-gradient-to-r from-purple-500 to-indigo-500 rounded-full" />
            </h3>
            <ul className="space-y-3">
              {enlacesExplorar.map(({ etiqueta, enlace }) => (
                <li key={etiqueta}>
                  <a
                    href={enlace}
                    className="flex items-center text-gray-400 hover:text-white transition-colors text-sm md:text-base"
                  >
                    <div className="mr-3 w-2 h-2 rounded-full bg-indigo-500 group-hover:animate-pulse" />
                    <span className="relative group-hover:pl-2 transition-all duration-300">
                      {etiqueta}
                      <div className="absolute bottom-0 left-0 w-0 h-px bg-gradient-to-r from-purple-500 to-indigo-500 group-hover:w-full transition-all duration-500" />
                    </span>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* 3) Sección Conectar */}
          <div className="flex flex-col">
            <h3 className="text-lg md:text-xl font-bold text-white mb-4 relative">
              <span className="text-shadow-neon">Conectar</span>
              <div className="absolute -bottom-1 left-0 w-10 h-1 bg-gradient-to-r from-purple-500 to-indigo-500 rounded-full" />
            </h3>
            <ul className="space-y-3 text-gray-400 text-sm md:text-base">
              <li className="flex items-start">
                <i className="fas fa-map-marker-alt mt-1 mr-3 text-indigo-400 text-base md:text-lg" />
                <span className="transition-transform duration-200 hover:-translate-y-0.5">
                  Almirante Brown, Buenos Aires
                </span>
              </li>
              <li className="flex items-start">
                <i className="fas fa-phone mt-1 mr-3 text-indigo-400 text-base md:text-lg" />
                <span className="transition-transform duration-200 hover:-translate-y-0.5">
                  +54 11 2402-5510
                </span>
              </li>
              <li className="flex items-start">
                <i className="fas fa-envelope mt-1 mr-3 text-indigo-400 text-base md:text-lg" />
                <span className="transition-transform duration-200 hover:-translate-y-0.5">
                  info@StudioPixelar.com
                </span>
              </li>
              <li className="flex items-start">
                <i className="fas fa-clock mt-1 mr-3 text-indigo-400 text-base md:text-lg" />
                <span className="transition-transform duration-200 hover:-translate-y-0.5">
                  Lun–Vie: 9:00 – 18:00
                </span>
              </li>
            </ul>
          </div>
        </div>

        {/* Separador decorativo */}
        <div className="relative my-8 h-px">
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-purple-500 to-transparent" />
          <div className="absolute inset-0 bg-gray-800 opacity-30" />
        </div>
      </div>

      {/* Footer Base con copyright */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-6 md:mb-8">
        <div className="w-full flex flex-col md:flex-row justify-between items-center bg-gray-900/30 backdrop-blur-sm rounded-2xl p-4 md:p-6 space-y-4 md:space-y-0">
          <div className="text-gray-500 text-xs sm:text-sm text-center md:text-left">
            © {new Date().getFullYear()}   Studio Pixelar. Donde tu proyecto cobra vida..

          </div>
        </div>
      </div>

      {/* Botón “volver arriba” */}
      <a
        href="#top"
        className="fixed bottom-6 right-6 z-50 w-12 h-12 sm:w-14 sm:h-14 rounded-full flex items-center justify-center bg-gradient-to-r from-purple-600 to-indigo-600 text-white shadow-lg hover:shadow-2xl transition-all duration-300 animate-bounce-slow"
        aria-label="Volver arriba"
      >
        <i className="fas fa-arrow-up text-lg sm:text-xl" />
      </a>
    </footer>
  );
};

export default Footer;
