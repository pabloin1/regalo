import { useState, useEffect } from 'react';

const Footer = () => {
  const [showBackToTop, setShowBackToTop] = useState(false);
  const [scrollPosition, setScrollPosition] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  
  // Detectar si es dispositivo móvil
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => window.removeEventListener('resize', checkMobile);
  }, []);
  
  useEffect(() => {
    const handleScroll = () => {
      const position = window.scrollY;
      setScrollPosition(position);
      
      if (position > 300) {
        setShowBackToTop(true);
      } else {
        setShowBackToTop(false);
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };
  
  return (
    <footer className="py-8 mt-12 relative">
      {/* Fondo con gradiente y decoración */}
      <div className="absolute inset-0 bg-gradient-to-t from-tink-blue/30 to-transparent overflow-hidden -z-10">
        <svg width="100%" height="100%" viewBox="0 0 800 100" preserveAspectRatio="none">
          <path
            d="M0,0 Q200,80 400,20 Q600,80 800,0 L800,100 L0,100 Z"
            fill="url(#footer-gradient)"
            opacity="0.3"
          />
          <defs>
            <linearGradient id="footer-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#BDECD7" />
              <stop offset="50%" stopColor="#E2CCFF" />
              <stop offset="100%" stopColor="#FFCAD4" />
            </linearGradient>
          </defs>
        </svg>
      </div>
      
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          {/* Lado izquierdo */}
          <div className="mb-4 md:mb-0">
            <div className="flex items-center">
              <span className="text-2xl mr-2">✨</span>
              <span className="text-tink-purple/80 text-sm">Momentos para recordar</span>
            </div>
          </div>
          
          {/* Lado derecho */}
          <div className="flex space-x-4">
            <span className="text-tink-blue/80 text-sm">Para ti</span>
            <span className="w-px h-4 bg-tink-pink/30"></span>
            <span className="text-tink-pink/80 text-sm">{new Date().getFullYear()}</span>
          </div>
        </div>
      </div>
      
      {/* Elementos decorativos */}
      <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 flex items-center justify-center space-x-8 opacity-60">
        <span className="text-lg animate-pulse">✨</span>
        <span className="w-4 h-px bg-tink-gold"></span>
        <span className="text-lg animate-pulse delay-300">💫</span>
        <span className="w-4 h-px bg-tink-gold"></span>
        <span className="text-lg animate-pulse delay-600">✨</span>
      </div>
      
      {/* Botón para volver arriba - Arreglado para móvil */}
      {showBackToTop && (
        <button
          onClick={scrollToTop}
          className={`fixed z-50 rounded-full shadow-lg bg-gradient-to-br from-tink-green to-tink-blue hover:from-tink-pink hover:to-tink-purple transition-all duration-300 group
            ${isMobile ? 'bottom-5 right-5 p-2.5' : 'bottom-6 right-6 p-3'}`}
          aria-label="Volver arriba"
          style={{
            width: isMobile ? '40px' : '48px',
            height: isMobile ? '40px' : '48px',
            display: 'flex',
            alignItems: 'center', 
            justifyContent: 'center'
          }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className={` transform group-hover:scale-110 transition-transform duration-300
              ${isMobile ? 'h-5 w-5' : 'h-6 w-6'}`}
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M5 10l7-7m0 0l7 7m-7-7v18"
            />
          </svg>
          
          {/* Efecto de brillo */}
          <span className="absolute inset-0 rounded-full bg-white opacity-0 group-hover:opacity-20 transition-opacity duration-300"></span>
        </button>
      )}
    </footer>
  );
};

export default Footer;