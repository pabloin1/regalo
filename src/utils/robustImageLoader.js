//robustImageLoader.js

/**
 * Cargador robusto de imágenes con manejo de errores y fallback a placeholders
 */

// Importar imágenes de la carpeta assets/images
const loadImagesFromAssets = async () => {
    try {
      // Intenta cargar dinámicamente las imágenes
      const imageModules = import.meta.glob('../assets/images/*.(jpg|jpeg|png|gif|webp)', { eager: true });
      
      if (Object.keys(imageModules).length === 0) {
        console.warn('No se encontraron imágenes en la carpeta assets/images');
        throw new Error('No se encontraron imágenes');
      }
      
      // Convertir los módulos importados a un formato utilizable
      const imageArray = Object.entries(imageModules).map(([path, module], index) => {
        const fileName = path.split('/').pop();
        const nameWithoutExtension = fileName.substring(0, fileName.lastIndexOf('.'));
        
        return {
          id: index + 1,
          src: module.default, // La URL de la imagen
          alt: nameWithoutExtension.replace(/[_-]/g, ' '),
          fileName: fileName,
          name: nameWithoutExtension
        };
      });
      
      // Ordenar las imágenes - intenta primero ordenar numéricamente
      return imageArray.sort((a, b) => {
        const numRegexA = a.fileName.match(/^(\d+)[_-]?/);
        const numRegexB = b.fileName.match(/^(\d+)[_-]?/);
        
        if (numRegexA && numRegexB) {
          return parseInt(numRegexA[1]) - parseInt(numRegexB[1]);
        }
        
        if (numRegexA) return -1;
        if (numRegexB) return 1;
        
        const numA = parseInt(a.name);
        const numB = parseInt(b.name);
        
        if (!isNaN(numA) && !isNaN(numB)) {
          return numA - numB;
        }
        
        return a.fileName.localeCompare(b.fileName);
      });
    } catch (error) {
      console.error('Error al cargar las imágenes desde assets:', error);
      throw error;
    }
  };
  
  // Plan B: Cargar imágenes de placeholder
  const loadPlaceholderImages = () => {
    console.log('Cargando imágenes de placeholder como fallback');
    const placeholders = Array(21).fill(0).map((_, index) => ({
      id: index + 1,
      src: `https://via.placeholder.com/400x300?text=Imagen+${index + 1}`,
      alt: `Imagen ${index + 1}`,
      fileName: `placeholder-${index + 1}.jpg`,
      name: `placeholder-${index + 1}`
    }));
    
    return placeholders;
  };
  
  // Plan C: Crear imágenes de demostración integradas
  const getHardcodedImages = () => {
    console.log('Usando imágenes hardcodeadas de demostración');
    return [
      { id: 1, src: 'https://source.unsplash.com/400x300/?nature', alt: 'Naturaleza 1' },
      { id: 2, src: 'https://source.unsplash.com/400x300/?flowers', alt: 'Flores' },
      { id: 3, src: 'https://source.unsplash.com/400x300/?sky', alt: 'Cielo' },
      { id: 4, src: 'https://source.unsplash.com/400x300/?forest', alt: 'Bosque' },
      { id: 5, src: 'https://source.unsplash.com/400x300/?ocean', alt: 'Océano' },
      { id: 6, src: 'https://source.unsplash.com/400x300/?mountain', alt: 'Montaña' },
      { id: 7, src: 'https://source.unsplash.com/400x300/?beach', alt: 'Playa' },
      { id: 8, src: 'https://source.unsplash.com/400x300/?sunset', alt: 'Atardecer' },
      { id: 9, src: 'https://source.unsplash.com/400x300/?waterfall', alt: 'Cascada' },
      { id: 10, src: 'https://source.unsplash.com/400x300/?river', alt: 'Río' },
      { id: 11, src: 'https://source.unsplash.com/400x300/?butterfly', alt: 'Mariposa' },
      { id: 12, src: 'https://source.unsplash.com/400x300/?garden', alt: 'Jardín' },
      { id: 13, src: 'https://source.unsplash.com/400x300/?stars', alt: 'Estrellas' },
      { id: 14, src: 'https://source.unsplash.com/400x300/?rainbow', alt: 'Arcoíris' },
      { id: 15, src: 'https://source.unsplash.com/400x300/?aurora', alt: 'Aurora' },
      { id: 16, src: 'https://source.unsplash.com/400x300/?meadow', alt: 'Prado' },
      { id: 17, src: 'https://source.unsplash.com/400x300/?sunrise', alt: 'Amanecer' },
      { id: 18, src: 'https://source.unsplash.com/400x300/?clouds', alt: 'Nubes' },
      { id: 19, src: 'https://source.unsplash.com/400x300/?lake', alt: 'Lago' },
      { id: 20, src: 'https://source.unsplash.com/400x300/?moon', alt: 'Luna' },
      { id: 21, src: 'https://source.unsplash.com/400x300/?fairy', alt: 'Hada' }
    ];
  };
  
  // Función principal robusta con múltiples planes de respaldo
  const loadImages = async () => {
    try {
      // Plan A: Intenta cargar desde assets/images
      return await loadImagesFromAssets();
    } catch (assetError) {
      console.error('Error al cargar imágenes de assets, intentando con placeholders', assetError);
      
      try {
        // Plan B: Intenta usar placeholders
        return loadPlaceholderImages();
      } catch (placeholderError) {
        console.error('Error con placeholders, usando imágenes hardcodeadas', placeholderError);
        
        // Plan C: Último recurso - imágenes harcodeadas
        return getHardcodedImages();
      }
    }
  };
  
  export default loadImages;