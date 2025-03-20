//ImageUpload.jsx

import { useState, useRef } from 'react';

const ImageUpload = ({ onImagesLoaded }) => {
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const fileInputRef = useRef(null);
  
  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    if (!files.length) return;
    
    setIsLoading(true);
    setSelectedFiles(files);
    
    // Procesar las imágenes seleccionadas
    const imagePromises = files.map(file => {
      return new Promise((resolve) => {
        const reader = new FileReader();
        reader.onload = (e) => {
          resolve({
            id: Math.random().toString(36).substr(2, 9),
            src: e.target.result,
            alt: file.name,
            file
          });
        };
        reader.readAsDataURL(file);
      });
    });
    
    // Una vez que todas las imágenes estén cargadas
    Promise.all(imagePromises)
      .then(processedImages => {
        onImagesLoaded(processedImages);
        setIsLoading(false);
      })
      .catch(error => {
        console.error('Error al cargar las imágenes:', error);
        setIsLoading(false);
      });
  };
  
  const triggerFileInput = () => {
    fileInputRef.current.click();
  };
  
  return (
    <div className="py-10 px-6 text-center">
      <div 
        className="border-4 border-dashed border-tink-purple/50 rounded-xl p-8 max-w-xl mx-auto hover:border-tink-pink/70 transition-colors duration-300 cursor-pointer bg-white/10 backdrop-blur-sm"
        onClick={triggerFileInput}
      >
        <input
          type="file"
          ref={fileInputRef}
          onChange={handleFileChange}
          accept="image/*"
          multiple
          className="hidden"
        />
        
        <div className="text-tink-purple mb-4 text-4xl">
          🧚‍♀️
        </div>
        
        <h3 className="text-xl font-fairy text-tink-purple mb-3">
          Sube tus 21 imágenes mágicas
        </h3>
        
        {isLoading ? (
          <div className="text-tink-pink animate-pulse">
            <p>Preparando la magia...</p>
            <div className="mt-4 flex justify-center space-x-3">
              <span className="inline-block w-3 h-3 rounded-full bg-tink-pink"></span>
              <span className="inline-block w-3 h-3 rounded-full bg-tink-blue animate-bounce delay-100"></span>
              <span className="inline-block w-3 h-3 rounded-full bg-tink-green animate-bounce delay-200"></span>
            </div>
          </div>
        ) : (
          <>
            <p className="text-tink-blue mb-4">
              Haz clic aquí o arrastra tus imágenes para crear un collage mágico
            </p>
            
            {selectedFiles.length > 0 && (
              <p className="text-tink-green mt-2">
                {selectedFiles.length} {selectedFiles.length === 1 ? 'imagen seleccionada' : 'imágenes seleccionadas'}
              </p>
            )}
          </>
        )}
      </div>
      
      {selectedFiles.length > 0 && (
        <div className="mt-6">
          <p className="text-tink-purple text-sm">
            {selectedFiles.length < 21 
              ? `Necesitas ${21 - selectedFiles.length} imágenes más para completar tu collage mágico` 
              : 'Perfecto! Ya tienes todas las imágenes que necesitas'}
          </p>
        </div>
      )}
    </div>
  );
};

export default ImageUpload;
