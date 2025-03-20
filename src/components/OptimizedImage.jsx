import { useState, useEffect, useRef } from 'react';

const OptimizedImage = ({ src, alt, className, style }) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isInView, setIsInView] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const imgRef = useRef(null);
  
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
          setIsInView(true);
          observer.unobserve(entry.target);
        }
      },
      {
        rootMargin: '200px 0px', // Carga la imagen cuando está a 200px de entrar en la pantalla
        threshold: 0.01
      }
    );
    
    if (imgRef.current) {
      observer.observe(imgRef.current);
    }
    
    return () => {
      if (imgRef.current) {
        observer.unobserve(imgRef.current);
      }
    };
  }, []);
  
  const handleLoad = () => {
    setIsLoaded(true);
  };
  
  const handleError = () => {
    setHasError(true);
    setIsLoaded(true); // Considerar cargada aunque sea con error para quitar el placeholder
  };
  
  return (
    <div 
      ref={imgRef}
      className={`relative overflow-hidden ${className}`} 
      style={style}
    >
      {/* Fondo de carga o placeholder */}
      <div 
        className={`absolute inset-0 bg-gradient-to-br from-tink-pink/10 to-tink-blue/10 
          ${isLoaded ? 'opacity-0' : 'opacity-100'} transition-opacity duration-500`}
      />
      
      {isInView && (
        <>
          {hasError ? (
            // Imagen de respaldo si hay error
            <div className="w-full h-full flex items-center justify-center bg-tink-pink/10 text-tink-purple/60 text-sm">
              <div className="text-center p-4">
                <div className="mb-2">✨</div>
                <div>Imagen no disponible</div>
              </div>
            </div>
          ) : (
            // Imagen normal con object-fit optimizado para móvil
            <img
              src={src}
              alt={alt}
              className={`w-full h-full transition-opacity duration-500 
                ${isLoaded ? 'opacity-100' : 'opacity-0'} 
                ${isMobile ? 'object-contain p-1 bg-white/5' : 'object-cover'}`}
              onLoad={handleLoad}
              onError={handleError}
              loading="lazy"
            />
          )}
        </>
      )}
    </div>
  );
};

export default OptimizedImage;