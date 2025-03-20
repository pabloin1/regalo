//collageLayouts.js

/**
 * Layouts predefinidos para diferentes cantidades de imágenes
 * Cada layout define cómo se distribuyen las imágenes en una sección
 */

// Layouts para secciones con 3 imágenes
const layouts3Images = [
    // Layout 1: 2 columnas, imagen principal a la izquierda
    {
      container: 'grid grid-cols-2 gap-3 md:gap-4',
      items: [
        // Imagen 0: grande a la izquierda ocupando toda la columna
        'row-span-2 h-full',
        // Imagen 1: arriba a la derecha
        'h-64 md:h-72',
        // Imagen 2: abajo a la derecha
        'h-56 md:h-64'
      ]
    },
    // Layout 2: 2 columnas, imagen principal a la derecha
    {
      container: 'grid grid-cols-2 gap-3 md:gap-4',
      items: [
        // Imagen 0: arriba a la izquierda
        'h-56 md:h-64',
        // Imagen 1: grande a la derecha ocupando toda la columna
        'row-span-2 h-full',
        // Imagen 2: abajo a la izquierda
        'h-64 md:h-72'
      ]
    },
    // Layout 3: Horizontal con 3 columnas
    {
      container: 'grid grid-cols-3 gap-3 md:gap-4',
      items: [
        // Imagen 0
        'h-72 md:h-80',
        // Imagen 1 (central, más alta)
        'h-80 md:h-96',
        // Imagen 2
        'h-72 md:h-80'
      ]
    }
  ];
  
  // Layouts para secciones con 4 imágenes
  const layouts4Images = [
    // Layout 1: Cuadrícula 2x2 clásica
    {
      container: 'grid grid-cols-2 gap-3 md:gap-4',
      items: [
        // Imagen 0
        'h-64 md:h-72',
        // Imagen 1
        'h-64 md:h-72',
        // Imagen 2
        'h-64 md:h-72',
        // Imagen 3
        'h-64 md:h-72'
      ]
    },
    // Layout 2: Una grande, tres pequeñas
    {
      container: 'grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4',
      items: [
        // Imagen 0 (grande ocupando 2 columnas y 2 filas)
        'col-span-2 row-span-2 h-80 md:h-96',
        // Imagen 1
        'h-40 md:h-48',
        // Imagen 2
        'h-40 md:h-48',
        // Imagen 3
        'col-span-2 h-40 md:h-48'
      ]
    },
    // Layout 3: Primero horizontal completo, luego 3 en fila
    {
      container: 'grid grid-cols-1 md:grid-cols-3 gap-3 md:gap-4',
      items: [
        // Imagen 0 (ancho completo)
        'col-span-3 h-72 md:h-80',
        // Imagen 1
        'h-56 md:h-64',
        // Imagen 2
        'h-56 md:h-64',
        // Imagen 3
        'h-56 md:h-64'
      ]
    }
  ];
  
  // Layouts para secciones con 5 imágenes
  const layouts5Images = [
    // Layout 1: Patrón asimétrico
    {
      container: 'grid grid-cols-3 gap-3 md:gap-4',
      items: [
        // Imagen 0 (grande ocupando 2 columnas y 2 filas)
        'col-span-2 row-span-2 h-96 md:h-104',
        // Imagen 1
        'h-48 md:h-52',
        // Imagen 2
        'h-48 md:h-52',
        // Imagen 3
        'h-48 md:h-52',
        // Imagen 4
        'col-span-2 h-48 md:h-52'
      ]
    },
    // Layout 2: Galería con imagen central destacada
    {
      container: 'grid grid-cols-3 gap-3 md:gap-4',
      items: [
        // Imagen 0
        'h-72 md:h-80',
        // Imagen 1 (central arriba, más grande)
        'h-96 md:h-104',
        // Imagen 2
        'h-72 md:h-80',
        // Imagen 3
        'h-48 md:h-52',
        // Imagen 4 (central abajo)
        'h-48 md:h-52'
      ]
    },
    // Layout 3: Masonry style
    {
      container: 'grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4',
      items: [
        // Imagen 0
        'col-span-2 h-72 md:h-80',
        // Imagen 1
        'h-48 md:h-52',
        // Imagen 2
        'h-48 md:h-52',
        // Imagen 3
        'h-64 md:h-72',
        // Imagen 4
        'h-64 md:h-72'
      ]
    }
  ];
  
  // Selecciona un layout basado en la cantidad de imágenes y el índice de sección
  const getLayout = (imageCount, sectionIndex) => {
    let layouts;
    
    if (imageCount <= 2) {
      // Para 1-2 imágenes, usamos un layout simple
      return {
        container: 'grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4',
        items: Array(imageCount).fill('h-72 md:h-80')
      };
    } else if (imageCount === 3) {
      layouts = layouts3Images;
    } else if (imageCount === 4) {
      layouts = layouts4Images;
    } else {
      layouts = layouts5Images;
    }
    
    // Seleccionar un layout basado en el índice de la sección
    return layouts[sectionIndex % layouts.length];
  };
  
  export default getLayout;