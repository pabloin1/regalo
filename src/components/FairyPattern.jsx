import React, { useEffect, useState } from 'react';

const FairyPattern = () => {
  const [scrollPosition, setScrollPosition] = useState(0);
  
  useEffect(() => {
    const handleScroll = () => {
      const position = window.scrollY;
      setScrollPosition(position);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div id="fairy-pattern" className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
      <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
        <pattern
          id="fairy-pattern"
          patternUnits="userSpaceOnUse"
          width="80"
          height="80"
          patternTransform={`rotate(${10 + scrollPosition * 0.01})`}
        >
          {/* Pequeñas alas de hada - Más visibles */}
          <path
            d="M10,15 Q15,5 20,15 Q25,5 30,15 Q25,25 20,20 Q15,25 10,15"
            fill="#FFFFFF"
            fillOpacity="0.15"
            stroke="#FFCAD4"
            strokeOpacity="0.15"
            strokeWidth="0.5"
          />
          
          {/* Polvo de hada - Más visible */}
          <circle cx="40" cy="40" r="1.5" fill="#FFFFFF" fillOpacity="0.15" />
          <circle cx="45" cy="30" r="1.2" fill="#FFFFFF" fillOpacity="0.15" />
          <circle cx="50" cy="35" r="1.8" fill="#FFFFFF" fillOpacity="0.15" />
          
          {/* Elemento floral - Más visible */}
          <path
            d="M5,45 Q7,40 10,45 Q13,40 15,45 Q13,50 10,48 Q7,50 5,45"
            fill="#FFFFFF"
            fillOpacity="0.12"
            stroke="#BDECD7"
            strokeOpacity="0.15"
            strokeWidth="0.5"
          />
          
          {/* Estrellas adicionales */}
          <path
            d="M55,10 L57,15 L62,15 L58,18 L60,23 L55,20 L50,23 L52,18 L48,15 L53,15 Z"
            fill="#FFFFFF"
            fillOpacity="0.15"
            transform="scale(0.5)"
          />
          
          {/* Campanilla silueta sutil */}
          <path
            d="M20,60 C22,58 23,55 25,55 C27,55 28,58 30,60 C31,61 31,62 30,63 C29,64 26,64 25,63 C24,64 21,64 20,63 C19,62 19,61 20,60 Z"
            fill="#FFFFFF"
            fillOpacity="0.1"
            stroke="#FFE6A7"
            strokeOpacity="0.1"
            strokeWidth="0.3"
          />
          
          {/* Elementos adicionales de naturaleza */}
          <path
            d="M65,65 C68,62 70,60 73,62 C76,64 75,68 72,70 C69,72 65,70 65,65 Z"
            fill="#FFFFFF"
            fillOpacity="0.08"
            stroke="#BDECD7"
            strokeOpacity="0.1"
            strokeWidth="0.3"
          />
        </pattern>
        
        {/* Elementos adicionales en el fondo */}
        <defs>
          <radialGradient id="fairy-glow" cx="50%" cy="50%" r="50%" fx="50%" fy="50%">
            <stop offset="0%" stopColor="#FFF4BD" stopOpacity="0.3" />
            <stop offset="100%" stopColor="#FFF4BD" stopOpacity="0" />
          </radialGradient>
          
          {/* Gradiente para brillo superior */}
          <radialGradient id="fairy-top-glow" cx="50%" cy="0%" r="70%" fx="50%" fy="0%">
            <stop offset="0%" stopColor="#BDECD7" stopOpacity="0.2" />
            <stop offset="100%" stopColor="#BDECD7" stopOpacity="0" />
          </radialGradient>
          
          {/* Gradiente para brillo lateral */}
          <radialGradient id="fairy-side-glow" cx="100%" cy="50%" r="70%" fx="100%" fy="50%">
            <stop offset="0%" stopColor="#FFCAD4" stopOpacity="0.2" />
            <stop offset="100%" stopColor="#FFCAD4" stopOpacity="0" />
          </radialGradient>
        </defs>
        
        {/* Círculos de luz sutiles en diferentes posiciones */}
        <circle 
          cx="20%" 
          cy="30%" 
          r="15%" 
          fill="url(#fairy-glow)" 
          style={{ 
            opacity: Math.max(0.3, 1 - scrollPosition / 1000)
          }}
        />
        <circle 
          cx="80%" 
          cy="70%" 
          r="20%" 
          fill="url(#fairy-glow)" 
          style={{ 
            opacity: Math.max(0.3, 1 - scrollPosition / 1000)
          }}
        />
        <circle 
          cx="50%" 
          cy="20%" 
          r="10%" 
          fill="url(#fairy-glow)" 
          style={{ 
            opacity: Math.max(0.3, 1 - scrollPosition / 1000)
          }}
        />
        
        {/* Brillo superior que desaparece al hacer scroll */}
        <rect 
          x="0" 
          y="0" 
          width="100%" 
          height="30%" 
          fill="url(#fairy-top-glow)" 
          style={{ 
            opacity: Math.max(0, 1 - scrollPosition / 300)
          }}
        />
        
        {/* Brillo lateral derecho */}
        <rect 
          x="70%" 
          y="0" 
          width="30%" 
          height="100%" 
          fill="url(#fairy-side-glow)" 
          style={{ 
            opacity: 0.5
          }}
        />
        
        {/* Sutiles partículas brillantes */}
        {Array.from({ length: 15 }).map((_, i) => (
          <circle 
            key={i}
            cx={`${10 + Math.random() * 80}%`}
            cy={`${10 + Math.random() * 80}%`}
            r="1"
            fill="#FFFFFF"
            fillOpacity={0.3 + Math.random() * 0.3}
            style={{
              animation: `pulse-slow ${3 + Math.random() * 3}s infinite`,
              animationDelay: `${i * 0.2}s`
            }}
          />
        ))}
        
        <rect width="100%" height="100%" fill="url(#fairy-pattern)" />
      </svg>
    </div>
  );
};

export default FairyPattern;