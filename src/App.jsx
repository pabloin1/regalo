import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import CollageSection from './components/CollageSection';
import FairyDust from './components/FairyDust';
import FairyDecorations from './components/FairyDecorations';
import FairyPattern from './components/FairyPattern';
import Footer from './components/Footer';
import Transition from './components/Transition';
import PersonalLetter from './components/PersonalLetter';
import loadImages from './utils/robustImageLoader';

function App() {
  const [images, setImages] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [loadingProgress, setLoadingProgress] = useState(0);
  const [error, setError] = useState(null);
  const [usedFallback, setUsedFallback] = useState(false);
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

  // Simular progreso de carga
  useEffect(() => {
    if (isLoading) {
      const interval = setInterval(() => {
        setLoadingProgress(prev => {
          const increment = Math.random() * 15;
          const newValue = Math.min(prev + increment, 95); // Máximo 95% hasta carga real
          return newValue;
        });
      }, 300);
      
      return () => clearInterval(interval);
    }
  }, [isLoading]);

  // Cargar imágenes al iniciar
  useEffect(() => {
    const fetchImages = async () => {
      try {
        setIsLoading(true);
        setError(null);
        
        // Carga imágenes con plan de respaldo
        const imagesList = await loadImages();
        
        if (imagesList.length === 0) {
          setError("No se encontraron imágenes. Asegúrate de colocarlas en src/assets/images");
        }
        
        // Si estamos usando imágenes de demostración
        if (imagesList[0]?.src?.includes('unsplash') || 
            imagesList[0]?.src?.includes('placeholder')) {
          setUsedFallback(true);
        }
        
        // Esperar un momento para mejor experiencia de usuario
        setTimeout(() => {
          setLoadingProgress(100);
          setImages(imagesList);
          setTimeout(() => {
            setIsLoading(false);
          }, 500); // Breve retraso para completar animación
        }, 800);
      } catch (error) {
        console.error('Error al cargar las imágenes:', error);
        setError(`Error al cargar las imágenes: ${error.message}`);
        setIsLoading(false);
      }
    };
    
    fetchImages();
  }, []);

  // Dividir imágenes en grupos para los collages con distribución más equilibrada
  const getCollageSections = () => {
    const sections = [];
    let currentIndex = 0;
    
    // Patrón de tamaños de sección para mejor distribución visual
    // En móvil, hacemos secciones más pequeñas para mejor rendimiento
    const sectionSizes = isMobile 
      ? [2, 3, 2, 3, 2]  // Móvil: secciones más pequeñas
      : [3, 4, 5, 4, 3]; // Desktop: secciones más grandes
    
    while (currentIndex < images.length) {
      const sectionSize = sectionSizes[sections.length % sectionSizes.length];
      const end = Math.min(currentIndex + sectionSize, images.length);
      
      if (end - currentIndex > 0) {
        sections.push(images.slice(currentIndex, end));
      }
      
      currentIndex = end;
    }
    
    return sections;
  };
  
  const collageSections = getCollageSections();

  return (
    <div className="relative min-h-screen overflow-hidden bg-gradient-to-br from-tink-blue via-tink-green/30 to-tink-blue/20 font-poppins">
      {/* Patrón de fondo */}
      <FairyPattern />
      
      {/* Elementos decorativos de Tinker Bell - Más visibles */}
      <FairyDecorations />
      
      {/* Componente de animación de polvo de hadas */}
      <FairyDust />
      
      {/* Encabezado con tema de Tinker Bell */}
      <Header />
      
      {/* Contenedor principal */}
      <main className="container mx-auto px-4 py-4 md:py-6 relative z-10">
        {isLoading ? (
          <div className="flex flex-col items-center justify-center min-h-[50vh] mt-8 mb-24">
            <div className="relative">
              <div className="text-5xl mb-8 animate-pulse-slow relative z-10">✨</div>
              {/* Círculo de brillo */}
              <div className="absolute inset-0 bg-tink-yellow/20 rounded-full blur-xl transform scale-150"></div>
            </div>
            
            {/* Barra de progreso estilizada */}
            <div className="w-64 h-2 bg-white/20 rounded-full overflow-hidden mb-6">
              <div 
                className="h-full bg-gradient-to-r from-tink-green via-tink-pink to-tink-blue rounded-full"
                style={{ width: `${loadingProgress}%`, transition: 'width 0.3s ease-out' }}
              ></div>
            </div>
            
            <div className="text-tink-purple/80 text-sm mb-8">
              {loadingProgress < 100 ? 'Preparando tu colección...' : 'Listo!'}
            </div>
            
            <div className="flex space-x-3 mt-2">
              <div className="w-3 h-3 bg-tink-pink/70 rounded-full animate-bounce"></div>
              <div className="w-3 h-3 bg-tink-blue/70 rounded-full animate-bounce delay-150"></div>
              <div className="w-3 h-3 bg-tink-green/70 rounded-full animate-bounce delay-300"></div>
            </div>
          </div>
        ) : error ? (
          <div className="text-center py-10 bg-white/20 rounded-xl backdrop-blur-sm p-6 shadow-lg mt-8">
            <div className="text-3xl mb-4">⚠️</div>
            <h2 className="text-2xl font-fairy text-tink-purple mb-4">
              ¡Atención!
            </h2>
            <p className="text-red-500 mb-6 max-w-md mx-auto">
              {error}
            </p>
            <div className="mt-6 text-tink-blue p-4 bg-white/30 rounded-lg inline-block">
              <p className="mb-2 font-medium">Asegúrate de:</p>
              <ul className="list-disc pl-6 text-left inline-block">
                <li className="mb-2">Tener imágenes en la carpeta <code className="bg-white/40 px-1 rounded">src/assets/images</code></li>
                <li className="mb-2">Que las imágenes sean formatos válidos (jpg, jpeg, png, gif, webp)</li>
                <li>Que la carpeta tenga permisos de lectura</li>
              </ul>
            </div>
          </div>
        ) : (
          <>
            {usedFallback && (
              <div className="bg-tink-yellow/20 p-4 rounded-lg mb-6 shadow-lg backdrop-blur-sm">
                <div className="flex items-center justify-center space-x-3">
                  <span className="text-amber-600">⚠️</span>
                  <p className="text-sm">
                    Usando imágenes de demostración. Para ver tus propias fotos, colócalas en <code className="bg-white/30 px-1 py-0.5 rounded">src/assets/images</code>
                  </p>
                </div>
              </div>
            )}
            
            {/* Secciones de Collage con transiciones */}
            {collageSections.map((section, index) => (
              <React.Fragment key={index}>
                <CollageSection 
                  images={section} 
                  index={index} 
                />
                {index < collageSections.length - 1 && (
                  <Transition index={index} />
                )}
              </React.Fragment>
            ))}
            
            {/* Decoración de fin de sección */}
            <div className="w-full flex justify-center my-8 md:my-12">
              <div className="inline-flex items-center">
                <div className="h-px w-12 bg-gradient-to-r from-transparent to-tink-pink/40"></div>
                <div className="mx-4 text-xl opacity-70">✨</div>
                <div className="h-px w-12 bg-gradient-to-l from-transparent to-tink-pink/40"></div>
              </div>
            </div>
            
            {/* Carta personal */}
            <PersonalLetter />
          </>
        )}
      </main>
      
      {/* Pie de página con temática */}
      <Footer />
    </div>
  );
}

export default App;