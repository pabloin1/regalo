import React, { useRef, useState, useEffect } from 'react';

const Transition = ({ index }) => {
  const transitionRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);
  
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      {
        threshold: 0.2,
      }
    );
    
    if (transitionRef.current) {
      observer.observe(transitionRef.current);
    }
    
    return () => {
      if (transitionRef.current) {
        observer.unobserve(transitionRef.current);
      }
    };
  }, []);
  
  // Diferentes estilos de transición basados en el índice
  const getStyle = () => {
    const styles = [
      'bg-gradient-to-b from-transparent via-tink-yellow/20 to-transparent',
      'bg-gradient-to-b from-transparent via-tink-pink/20 to-transparent',
      'bg-gradient-to-b from-transparent via-tink-blue/20 to-transparent',
      'bg-gradient-to-b from-transparent via-tink-green/20 to-transparent',
      'bg-gradient-to-b from-transparent via-tink-purple/20 to-transparent'
    ];
    
    return styles[index % styles.length];
  };
  
  // Diferentes decoraciones para cada transición
  const getDecoration = () => {
    const decorations = [
      // Patrón 1: Línea con estrellas
      <div className="flex items-center justify-center space-x-3 opacity-0 transform translate-y-4 transition-all duration-1000" style={{ 
        opacity: isVisible ? 0.7 : 0, 
        transform: isVisible ? 'translateY(0)' : 'translateY(4px)',
        transitionDelay: '300ms'
      }}>
        <div className="w-16 h-px bg-tink-yellow"></div>
        <span className="text-lg">✨</span>
        <div className="w-16 h-px bg-tink-yellow"></div>
      </div>,
      
      // Patrón 2: Círculos
      <div className="flex items-center justify-center space-x-2 opacity-0 transform scale-95 transition-all duration-1000" style={{ 
        opacity: isVisible ? 0.7 : 0, 
        transform: isVisible ? 'scale(1)' : 'scale(0.95)',
        transitionDelay: '300ms'
      }}>
        <div className="w-2 h-2 rounded-full bg-tink-pink"></div>
        <div className="w-3 h-3 rounded-full bg-tink-purple"></div>
        <div className="w-2 h-2 rounded-full bg-tink-pink"></div>
      </div>,
      
      // Patrón 3: Patrón de hojas
      <div className="flex items-center justify-center space-x-4 opacity-0 transform -translate-y-4 transition-all duration-1000" style={{ 
        opacity: isVisible ? 0.7 : 0, 
        transform: isVisible ? 'translateY(0)' : 'translateY(-4px)',
        transitionDelay: '300ms'
      }}>
        <span className="transform rotate-45">🍃</span>
        <span className="transform -rotate-45">🍃</span>
      </div>,
      
      // Patrón 4: Diamantes
      <div className="relative h-6 opacity-0 transition-opacity duration-1000" style={{ 
        opacity: isVisible ? 0.7 : 0,
        transitionDelay: '300ms'
      }}>
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-4 h-4 bg-tink-blue/40 transform rotate-45"></div>
        </div>
      </div>,
      
      // Patrón 5: Olas
      <svg className="w-full h-6 opacity-0 transition-opacity duration-1000" style={{ 
        opacity: isVisible ? 0.5 : 0,
        transitionDelay: '300ms'
      }} viewBox="0 0 200 20">
        <path
          d="M0,10 Q20,5 40,10 Q60,15 80,10 Q100,5 120,10 Q140,15 160,10 Q180,5 200,10"
          fill="none"
          stroke="url(#wave-gradient)"
          strokeWidth="1"
        />
        <defs>
          <linearGradient id="wave-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#BDECD7" />
            <stop offset="50%" stopColor="#FFF4BD" />
            <stop offset="100%" stopColor="#FFCAD4" />
          </linearGradient>
        </defs>
      </svg>
    ];
    
    return decorations[index % decorations.length];
  };
  
  return (
    <div ref={transitionRef} className={`h-16 my-8 relative ${getStyle()} flex items-center justify-center`}>
      {getDecoration()}
    </div>
  );
};

export default Transition;