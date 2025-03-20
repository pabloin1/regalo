import { useEffect, useState } from 'react';

const FairyDust = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [dustParticles, setDustParticles] = useState([]);
  const [isMoving, setIsMoving] = useState(false);
  
  // Colores de Tinker Bell
  const tinkColors = [
    '#BDECD7', // tink-green
    '#FFF4BD', // tink-yellow
    '#FFCAD4', // tink-pink
    '#C7E9F4', // tink-blue
    '#E2CCFF', // tink-purple
    '#FFE6A7'  // tink-gold
  ];
  
  // Seguir la posición del ratón
  useEffect(() => {
    let lastX = 0;
    let lastY = 0;
    let moveTimer;
    
    const handleMouseMove = (e) => {
      const currentX = e.clientX;
      const currentY = e.clientY;
      
      // Calcular la distancia movida
      const distance = Math.sqrt(
        Math.pow(currentX - lastX, 2) + Math.pow(currentY - lastY, 2)
      );
      
      // Actualizar la posición actual
      setMousePosition({ x: currentX, y: currentY });
      
      // Determina si está en movimiento
      if (distance > 3) {
        setIsMoving(true);
        
        // Crear partículas según la velocidad de movimiento
        const particleCount = Math.min(Math.floor(distance * 0.3), 3);
        
        for (let i = 0; i < particleCount; i++) {
          if (Math.random() > 0.3) {
            createDustParticle();
          }
        }
        
        // Resetear el timer
        clearTimeout(moveTimer);
        moveTimer = setTimeout(() => {
          setIsMoving(false);
        }, 100);
      }
      
      lastX = currentX;
      lastY = currentY;
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      clearTimeout(moveTimer);
    };
  }, []);
  
  // Crear polvo de hadas automáticamente cada cierto tiempo
  useEffect(() => {
    const interval = setInterval(() => {
      if (dustParticles.length < 70) { // Aumentado para tener más partículas
        createRandomDustParticle();
      }
    }, 400); // Más frecuente
    
    return () => clearInterval(interval);
  }, [dustParticles]);
  
  // Limpiar partículas de polvo antiguas
  useEffect(() => {
    const cleanup = setTimeout(() => {
      if (dustParticles.length > 50) {
        setDustParticles(prevParticles => prevParticles.slice(20));
      }
    }, 2000);
    
    return () => clearTimeout(cleanup);
  }, [dustParticles]);
  
  // Crear una partícula de polvo en la posición actual del ratón
  const createDustParticle = () => {
    if (!mousePosition) return;
    
    const newParticle = {
      id: Date.now() + Math.random(),
      x: mousePosition.x + (Math.random() * 20 - 10),
      y: mousePosition.y + (Math.random() * 20 - 10),
      size: Math.random() * 6 + 2, // Tamaño más grande
      color: tinkColors[Math.floor(Math.random() * tinkColors.length)],
      opacity: Math.random() * 0.9 + 0.5, // Más opaco
      blur: Math.random() * 3 + 1,
      speedX: (Math.random() - 0.5) * 2,
      speedY: (Math.random() - 0.5) * 2 - 1.5, // Velocidad con tendencia hacia arriba
      rotation: Math.random() * 360,
      rotationSpeed: (Math.random() - 0.5) * 5
    };
    
    setDustParticles(prev => [...prev, newParticle]);
    
    // Eliminar la partícula después de un tiempo
    setTimeout(() => {
      setDustParticles(prev => prev.filter(p => p.id !== newParticle.id));
    }, 2000 + Math.random() * 1000);
  };
  
  // Crear partículas de polvo en posiciones aleatorias
  const createRandomDustParticle = () => {
    const x = Math.random() * window.innerWidth;
    const y = Math.random() * window.innerHeight;
    
    const newParticle = {
      id: Date.now() + Math.random(),
      x,
      y,
      size: Math.random() * 4 + 1.5,
      color: tinkColors[Math.floor(Math.random() * tinkColors.length)],
      opacity: Math.random() * 0.8 + 0.3, // Más visible
      blur: Math.random() * 2 + 0.5,
      speedX: (Math.random() - 0.5) * 1.5,
      speedY: (Math.random() - 0.5) * 1.5 - 0.5, // Leve tendencia hacia arriba
      rotation: Math.random() * 360,
      rotationSpeed: (Math.random() - 0.5) * 3
    };
    
    setDustParticles(prev => [...prev, newParticle]);
    
    // Eliminar la partícula después de un tiempo
    setTimeout(() => {
      setDustParticles(prev => prev.filter(p => p.id !== newParticle.id));
    }, 3000 + Math.random() * 2000);
  };
  
  // Animar las partículas
  useEffect(() => {
    if (dustParticles.length === 0) return;
    
    const animationFrame = requestAnimationFrame(() => {
      setDustParticles(prevParticles => 
        prevParticles.map(particle => ({
          ...particle,
          x: particle.x + particle.speedX,
          y: particle.y + particle.speedY,
          rotation: particle.rotation + particle.rotationSpeed,
          // Reducir gradualmente la opacidad al final de su vida
          opacity: particle.opacity * 0.995
        }))
      );
    });
    
    return () => cancelAnimationFrame(animationFrame);
  }, [dustParticles]);
  
  // Renderizar solo partículas que tienen al menos 10% de opacidad
  const visibleParticles = dustParticles.filter(p => p.opacity > 0.1);
  
  return (
    <div className="fixed inset-0 pointer-events-none z-20">
      {visibleParticles.map(particle => (
        <div
          key={particle.id}
          style={{
            position: 'absolute',
            left: `${particle.x}px`,
            top: `${particle.y}px`,
            width: `${particle.size}px`,
            height: `${particle.size}px`,
            backgroundColor: particle.color,
            opacity: particle.opacity,
            borderRadius: '50%',
            boxShadow: `0 0 ${particle.size * 1.5}px ${particle.color}`,
            filter: `blur(${particle.blur}px)`,
            transform: `translate(-50%, -50%) rotate(${particle.rotation}deg)`,
            transition: 'opacity 0.5s ease'
          }}
        />
      ))}
      
      {/* Rastro de brillo que sigue al cursor cuando se mueve */}
      {isMoving && (
        <div 
          style={{
            position: 'absolute',
            left: `${mousePosition.x}px`,
            top: `${mousePosition.y}px`,
            width: '30px',
            height: '30px',
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(255,246,189,0.5) 0%, rgba(255,246,189,0) 70%)',
            transform: 'translate(-50%, -50%)',
            pointerEvents: 'none',
            zIndex: 10
          }}
        />
      )}
    </div>
  );
};

export default FairyDust;