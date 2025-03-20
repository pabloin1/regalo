import { useEffect, useRef, useState } from 'react';
import OptimizedImage from './OptimizedImage';
import getLayout from '../utils/collageLayouts';

const CollageSection = ({ images, index }) => {
  const sectionRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);
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
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      {
        threshold: 0.15,
        rootMargin: '0px 0px -10% 0px'
      }
    );
    
    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }
    
    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);
  
  // Obtener el layout específico para esta sección
  const layout = getLayout(images.length, index);
  
  // Determinar qué colores de fondo usar para cada sección
  const getSectionColors = () => {
    const colors = [
      'bg-gradient-to-r from-tink-pink/5 to-tink-purple/5',
      'bg-gradient-to-r from-tink-blue/5 to-tink-green/5',
      'bg-gradient-to-r from-tink-yellow/5 to-tink-gold/5',
      'bg-gradient-to-r from-tink-green/5 to-tink-blue/5',
      'bg-gradient-to-r from-tink-purple/5 to-tink-pink/5'
    ];
    
    return colors[index % colors.length];
  };
  
  // Generar estilos para cada imagen individual - reducir la rotación en móviles
  const getImageEffect = (imgIndex) => {
    // En móvil, reducir efectos de rotación para prevenir problemas
    if (isMobile) {
      const minimalEffects = [
        'hover:scale-[1.02]',
        'hover:scale-[1.02]',
        'hover:scale-[1.02]',
        'hover:scale-[1.02]',
        'hover:scale-[1.02]',
      ];
      return minimalEffects[imgIndex % minimalEffects.length];
    }
    
    // Efectos visuales normales para desktop
    const variations = [
      'rotate-1 hover:-rotate-1 hover:scale-[1.02]',
      '-rotate-1 hover:rotate-1 hover:scale-[1.02]',
      'rotate-0 hover:-rotate-1 hover:scale-[1.02]',
      'rotate-2 hover:rotate-0 hover:scale-[1.02]',
      '-rotate-2 hover:rotate-1 hover:scale-[1.02]',
    ];
    
    return variations[imgIndex % variations.length];
  };

  // Elementos decorativos de Tinker Bell según la sección
  const getDecoration = () => {
    // Diferentes decoraciones según el índice
    switch (index % 5) {
      case 0:
        return (
          <div className="absolute -top-3 -right-3 w-12 h-12 opacity-25 pointer-events-none">
            <svg viewBox="0 0 100 100">
              <path
                d="M50,10 C60,30 90,40 90,50 C90,60 60,70 50,90 C40,70 10,60 10,50 C10,40 40,30 50,10"
                fill={`url(#fairy-wing-section-${index})`}
                className="animate-pulse-slow"
              />
              <defs>
                <linearGradient id={`fairy-wing-section-${index}`} x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#BDECD7" />
                  <stop offset="100%" stopColor="#C7E9F4" />
                </linearGradient>
              </defs>
            </svg>
          </div>
        );
      case 1:
        return (
          <div className="absolute -bottom-2 -left-2 w-10 h-10 opacity-30 pointer-events-none">
            <svg viewBox="0 0 100 100">
              <circle cx="50" cy="50" r="25" fill="#FFF4BD" className="animate-pulse-slow" />
              <circle cx="50" cy="50" r="10" fill="#FFE6A7" />
            </svg>
          </div>
        );
      case 2:
        return (
          <div className="absolute -top-2 -left-3 w-10 h-10 opacity-20 pointer-events-none">
            <svg viewBox="0 0 100 100">
              <path
                d="M25,25 L40,40 L25,75 L60,60 L75,75 L60,40 L75,25 L40,40 Z"
                fill="#FFCAD4"
                className="animate-pulse-slow"
              />
            </svg>
          </div>
        );
      case 3:
        return (
          <div className="absolute -bottom-3 -right-3 w-12 h-12 opacity-25 pointer-events-none">
            <svg viewBox="0 0 100 100">
              <path
                d="M50,20 Q80,35 80,50 Q80,65 50,80 Q20,65 20,50 Q20,35 50,20"
                fill="#E2CCFF"
                className="animate-pulse-slow"
              />
            </svg>
          </div>
        );
      default:
        return (
          <div className="absolute top-1/2 -left-4 w-8 h-8 opacity-20 pointer-events-none">
            <svg viewBox="0 0 100 100">
              <circle cx="30" cy="30" r="10" fill="#BDECD7" />
              <circle cx="70" cy="30" r="10" fill="#C7E9F4" />
              <circle cx="30" cy="70" r="10" fill="#FFCAD4" />
              <circle cx="70" cy="70" r="10" fill="#FFF4BD" />
            </svg>
          </div>
        );
    }
  };

  return (
    <section 
      ref={sectionRef}
      className={`mb-12 p-5 rounded-xl ${getSectionColors()} 
        opacity-0 transform translate-y-8 relative
        ${isVisible ? 'opacity-100 translate-y-0 transition-all duration-1000' : ''}`}
      style={{ 
        transitionDelay: `${index * 100}ms`
      }}
    >
      {/* Elemento decorativo */}
      {getDecoration()}
      
      {/* Contenedor de imágenes con layout dinámico */}
      <div className={layout.container}>
        {images.map((image, imgIndex) => (
          <div 
            key={image.id} 
            className={`
              collage-item
              rounded-lg border-2 border-white/70 shadow-lg 
              shadow-tink-blue/20 hover:shadow-tink-pink/30
              transform ${getImageEffect(imgIndex)} transition-all duration-500
              hover:-translate-y-1 ${layout.items[Math.min(imgIndex, layout.items.length - 1)]}
            `}
            style={{ 
              transitionDelay: `${imgIndex * 120}ms`,
            }}
          >
            <OptimizedImage
              src={image.src}
              alt={image.alt}
              className="w-full h-full rounded-lg overflow-hidden"
            />
            
            {/* Polvo de hadas en la esquina de algunas imágenes para efecto Tinkerbell */}
            {imgIndex % 3 === 0 && (
              <div className="absolute top-2 right-2 w-6 h-6 opacity-60 pointer-events-none">
                <div className="absolute w-1 h-1 bg-tink-yellow rounded-full animate-sparkle"></div>
                <div className="absolute w-1 h-1 bg-tink-yellow rounded-full animate-sparkle delay-300"
                     style={{ left: '4px', top: '4px' }}></div>
                <div className="absolute w-1 h-1 bg-tink-yellow rounded-full animate-sparkle delay-600"
                     style={{ left: '2px', top: '7px' }}></div>
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  );
};

export default CollageSection;