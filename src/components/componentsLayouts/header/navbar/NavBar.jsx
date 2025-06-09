import { useState, useEffect } from "react";
import "../navbar/NavBar.css";

const imageLogo = "/images/logo.png";

export default function NavBar() {
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const scrollDelta = currentScrollY - lastScrollY;
      const scrollThreshold = 5;

      if (Math.abs(scrollDelta) > scrollThreshold) {
        setIsVisible(scrollDelta < 30 || currentScrollY < 100);
      }
      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  return (
    <>
      <nav
        className={`fixed w-full z-50 transition-all duration-300 mt-5 ease-[cubic-bezier(0.4,0,0.2,1)] ${
          isVisible ? "translate-y-0" : "-translate-y-full"
        }`}
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="relative flex h-20 items-center justify-between rounded-2xl bg-gray-900/80 backdrop-blur-xl shadow-2xl shadow-black/40 border border-gray-700/50">
            {/* Logo Left */}
            <div className="flex items-center">
              <a href="/" className="flex items-center pl-4 md:pl-6">
                <img
                  src={imageLogo}
                  className="h-12 w-auto transition-all hover:scale-105"
                  alt="Studio Pixelar Logo"
                />
                <div className="ml-3 hidden md:block">
                  <div className="h-0.5 w-full bg-gradient-to-r from-blue-500 to-purple-600 rounded-full mt-0.5"></div>
                </div>
              </a>
            </div>

            {/* Menú Desktop - Right */}
            <div className="hidden md:flex items-center space-x-2 pr-4">
              {["Servicios", "Portfolio", "Contacto", "Nosotros"].map(
                (item, index) => (
                  <a
                    key={item}
                    href={`/${item.toLowerCase()}`}
                    className="relative px-5 py-2.5 text-sm font-medium text-white rounded-lg 
                  group transition-all duration-300 overflow-hidden"
                  >
                    
                    <span className="relative z-10">{item}</span>
                    <span
                      className="absolute inset-0 bg-gradient-to-r from-blue-600/20 to-purple-600/20 
                  rounded-lg border border-gray-600/50 group-hover:border-blue-500/70
                  transition-all duration-300"
                    ></span>
                    <span
                      className="absolute inset-0 bg-gradient-to-r from-blue-700/0 via-blue-500/30 to-purple-900/0 
                  opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    ></span>
                    <span
                      className="absolute bottom-0 left-1/2 w-0 h-0.5 bg-gradient-to-r from-blue-400 to-purple-500 
                  group-hover:w-4/5 group-hover:left-1/10 transition-all duration-300"
                    ></span>
                  </a>
                )
              )}
              <div className="ml-2 relative group">
                <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg blur opacity-25 group-hover:opacity-75 transition-all duration-300"></div>
                <a
                  href="https://api.whatsapp.com/send/?phone=541124025510&text=Hola%2C+quiero+consultar+por+el+servicio+de+...&type=phone_number&app_absent=0"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="relative px-5 py-2.5 text-sm font-bold text-white rounded-lg bg-gradient-to-r from-blue-700 to-purple-800 hover:from-blue-600 hover:to-purple-700 transition-all duration-300"
                >
                  Contactar
                </a>
              </div>
            </div>

            {/* Menú Mobile Button - Right */}
            <div className="md:hidden flex items-center mr-4">
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="p-2 text-gray-400 hover:text-white focus:outline-none transition-all"
                aria-label="Toggle menu"
              >
                <div className="w-6 h-6 relative">
                  <span
                    className={`absolute left-0 top-2.5 h-0.5 w-full bg-gray-300 rounded-full 
                  transition-all duration-300 ${
                    isMenuOpen ? "rotate-45 translate-y-0" : "-translate-y-1"
                  }`}
                  ></span>
                  <span
                    className={`absolute left-0 top-2.5 h-0.5 w-full bg-gray-300 rounded-full 
                  transition-all duration-300 ${
                    isMenuOpen ? "opacity-0" : "opacity-100"
                  }`}
                  ></span>
                  <span
                    className={`absolute left-0 top-2.5 h-0.5 w-full bg-gray-300 rounded-full 
                  transition-all duration-300 ${
                    isMenuOpen ? "-rotate-45 translate-y-0" : "translate-y-1"
                  }`}
                  ></span>
                </div>
              </button>
            </div>
          </div>
        </div>

        {/* Menú Mobile Dropdown */}
        <div
          className={`md:hidden absolute w-full z-40 transition-all duration-300 ease-out ${
            isMenuOpen
              ? "opacity-100 translate-y-0"
              : "opacity-0 -translate-y-4 pointer-events-none"
          }`}
        >
          <div className="mx-3 mt-2 rounded-xl bg-gray-900/95 backdrop-blur-xl shadow-xl border border-gray-700/50">
            <div className="px-2 pt-2 pb-3 space-y-2">
              {["Servicios", "Portfolio", "Nosotros", "Contacto"].map((item) => (
                <a
                  key={item}
                  href={`/${item.toLowerCase()}`}
                  className="block px-4 py-3 text-base font-medium text-gray-300 hover:text-white 
                  rounded-lg transition-all duration-300 group relative overflow-hidden"
                >
                  <span className="relative z-10">{item}</span>
                  <span
                    className="absolute inset-0 bg-gradient-to-r from-blue-700/10 to-purple-900/10 
                  opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  ></span>
                  <span
                    className="absolute left-0 bottom-0 w-0 h-0.5 bg-gradient-to-r from-blue-400 to-purple-500 
                  group-hover:w-full transition-all duration-300"
                  ></span>
                </a>
              ))}
              <a
                href="https://api.whatsapp.com/send/?phone=541124025510&text=Hola%2C+quiero+consultar+por+el+servicio+de+...&type=phone_number&app_absent=0"
                target="_blank"
                rel="noopener noreferrer"
                className="block px-4 py-3 text-center text-base font-bold text-white rounded-lg 
                bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-700 
                transition-all duration-300 shadow-lg shadow-blue-500/20"
              >
                Contactar Ahora
              </a>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
}
