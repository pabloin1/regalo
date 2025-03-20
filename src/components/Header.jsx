import { useState, useEffect } from 'react';

const Header = () => {
  const [isFloating, setIsFloating] = useState(false);
  const [scrollPosition, setScrollPosition] = useState(0);
  
  useEffect(() => {
    setIsFloating(true);
    
    const handleScroll = () => {
      const position = window.scrollY;
      setScrollPosition(position);
      
      if (position < 100) {
        setIsFloating(true);
      } else {
        setIsFloating(false);
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Frases cortas y no cursis para la cabecera
  const phrases = [
    "Recuerdos capturados",
    "Nuestro tiempo juntos",
    "Instantes especiales",
    "Momentos compartidos"
  ];
  
  // Seleccionar una frase aleatoria al cargar
  const [selectedPhrase] = useState(() => {
    return phrases[Math.floor(Math.random() * phrases.length)];
  });

  return (
    <header className="py-8 px-4 text-center relative">
      {/* Decoración de fondo superior */}
      <div className="absolute top-0 left-0 w-full h-32 overflow-hidden -z-10">
        <div className="absolute top-0 left-1/4 w-40 h-40 bg-tink-yellow/20 rounded-full blur-xl"></div>
        <div className="absolute top-0 right-1/4 w-40 h-40 bg-tink-pink/20 rounded-full blur-xl"></div>
      </div>
      
      <div 
        className={`transition-all duration-700 ${
          isFloating ? 'transform translate-y-0' : 'transform -translate-y-4'
        }`}
      >
        <h1 className="text-4xl md:text-5xl font-fairy text-tink-purple mb-2 relative inline-block">
          <span className="relative z-10">{selectedPhrase}</span>
          
          {/* Resplandor alrededor del título */}
          <div className="absolute inset-0 bg-white/10 blur-md rounded-full -z-10"></div>
          
          {/* Destellos decorativos más visibles */}
          <span className="absolute -top-2 -right-2 w-4 h-4 bg-tink-yellow rounded-full animate-sparkle opacity-0"></span>
          <span className="absolute -bottom-1 -left-3 w-3 h-3 bg-tink-pink rounded-full animate-sparkle opacity-0 delay-300"></span>
          <span className="absolute top-1 right-20 w-2 h-2 bg-tink-blue rounded-full animate-sparkle opacity-0 delay-600"></span>
        </h1>
      </div>
      
      {/* Línea decorativa bajo el título */}
      <div className="relative h-2 w-48 mx-auto mt-2 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-tink-purple/40 to-transparent"></div>
      </div>
    </header>
  );
};

export default Header;