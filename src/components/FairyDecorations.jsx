import React, { useEffect, useState } from 'react';

const FairyDecorations = () => {
  const [scrollPosition, setScrollPosition] = useState(0);
  
  useEffect(() => {
    const handleScroll = () => {
      const position = window.scrollY;
      setScrollPosition(position);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);
  
  return (
    <div className="fairy-decorations fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {/* Alas de hada en las esquinas - Aumentada opacidad */}
      <div 
        className="absolute top-0 left-0 w-36 h-36 md:w-48 md:h-48 opacity-40"
        style={{ 
          transform: `translateY(${scrollPosition * 0.05}px) rotate(${-scrollPosition * 0.02}deg)` 
        }}
      >
        <svg viewBox="0 0 100 100" className="w-full h-full">
          <path
            d="M10,50 Q30,20 50,10 Q70,20 90,50 Q70,80 50,90 Q30,80 10,50 Z"
            fill="url(#fairy-wing-1)"
            transform="rotate(-45, 50, 50)"
          />
          <defs>
            <linearGradient id="fairy-wing-1" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#BDECD7" />
              <stop offset="100%" stopColor="#C7E9F4" />
            </linearGradient>
          </defs>
        </svg>
      </div>
      
      <div 
        className="absolute top-0 right-0 w-36 h-36 md:w-48 md:h-48 opacity-40"
        style={{ 
          transform: `translateY(${scrollPosition * 0.05}px) rotate(${scrollPosition * 0.02}deg)` 
        }}
      >
        <svg viewBox="0 0 100 100" className="w-full h-full">
          <path
            d="M10,50 Q30,20 50,10 Q70,20 90,50 Q70,80 50,90 Q30,80 10,50 Z"
            fill="url(#fairy-wing-2)"
            transform="rotate(45, 50, 50)"
          />
          <defs>
            <linearGradient id="fairy-wing-2" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#FFCAD4" />
              <stop offset="100%" stopColor="#E2CCFF" />
            </linearGradient>
          </defs>
        </svg>
      </div>
      
      {/* Marco decorativo en la parte superior */}
      <div className="absolute top-0 left-0 right-0 h-16 overflow-hidden">
        <svg width="100%" height="100%" viewBox="0 0 800 50" preserveAspectRatio="none">
          <path
            d="M0,10 Q200,50 400,10 Q600,50 800,10 L800,0 L0,0 Z"
            fill="url(#header-gradient)"
            opacity="0.4"
          />
          <defs>
            <linearGradient id="header-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#C7E9F4" />
              <stop offset="50%" stopColor="#BDECD7" />
              <stop offset="100%" stopColor="#C7E9F4" />
            </linearGradient>
          </defs>
        </svg>
      </div>
      
      {/* Polvo de hadas en la parte inferior - Más visible */}
      <div className="absolute bottom-0 left-0 right-0 h-40 overflow-hidden">
        <div className="absolute bottom-0 left-0 right-0 h-40 
                       bg-gradient-to-t from-tink-gold/30 to-transparent"></div>
        
        {/* Dots mágicos estáticos más brillantes */}
        {Array(25).fill().map((_, i) => (
          <div
            key={`dust-${i}`}
            className="absolute w-2 h-2 rounded-full blur-sm bg-tink-yellow/70"
            style={{
              left: `${Math.random() * 100}%`,
              bottom: `${Math.random() * 40}px`,
              opacity: Math.random() * 0.6 + 0.2,
            }}
          ></div>
        ))}
      </div>
      
      {/* Estrellas y destellos más visibles */}
      {Array(15).fill().map((_, i) => (
        <div
          key={`twinkle-${i}`}
          className="absolute w-2 h-2 bg-white rounded-full animate-pulse-slow"
          style={{
            left: `${10 + Math.random() * 80}%`,
            top: `${10 + Math.random() * 80}%`,
            animationDelay: `${i * 0.5}s`,
            opacity: 0.7,
            boxShadow: '0 0 8px #fff, 0 0 12px #FFE6A7',
          }}
        ></div>
      ))}
      
      {/* Elemento grande central que se mueve con el scroll - Campanilla estilizada */}
      <div 
        className="absolute opacity-20 w-96 h-96 pointer-events-none"
        style={{ 
          left: '50%', 
          top: '50%', 
          transform: `translate(-50%, -50%) translateY(${scrollPosition * 0.1}px)`,
          display: scrollPosition > 300 ? 'none' : 'block'
        }}
      >
        <svg viewBox="0 0 200 200" className="w-full h-full">
          <path
            d="M100,50 Q120,30 140,50 Q160,70 140,90 Q120,110 100,90 Q80,110 60,90 Q40,70 60,50 Q80,30 100,50 Z"
            fill="url(#center-gradient)"
            opacity="0.3"
          />
          <defs>
            <linearGradient id="center-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#FFF4BD" />
              <stop offset="50%" stopColor="#FFE6A7" />
              <stop offset="100%" stopColor="#FFF4BD" />
            </linearGradient>
          </defs>
        </svg>
      </div>
      
      {/* Patrón floral en esquina inferior - Más destacado */}
      <div className="absolute bottom-0 right-0 w-64 h-64 opacity-40"
        style={{ 
          transform: `translateY(${Math.min(scrollPosition * 0.08, 40)}px)` 
        }}
      >
        <svg viewBox="0 0 100 100" className="w-full h-full">
          <path
            d="M70,90 Q60,70 80,60 Q70,50 80,40 Q60,30 50,10 Q40,30 20,40 Q30,50 20,60 Q40,70 30,90 Q50,80 70,90 Z"
            fill="url(#fairy-flower)"
            stroke="#FFCAD4"
            strokeWidth="1"
            opacity="0.6"
          />
          <defs>
            <linearGradient id="fairy-flower" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#FFCAD4" />
              <stop offset="50%" stopColor="#FFF4BD" />
              <stop offset="100%" stopColor="#BDECD7" />
            </linearGradient>
          </defs>
        </svg>
      </div>
    </div>
  );
};

export default FairyDecorations;