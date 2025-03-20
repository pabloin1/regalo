import React, { useState, useEffect, useRef } from "react";

const PersonalLetter = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [isOpening, setIsOpening] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const letterRef = useRef(null);
  const contentRef = useRef(null);

  // Detectar si es dispositivo móvil
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);

    return () => window.removeEventListener("resize", checkMobile);
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
        threshold: 0.2,
      }
    );

    if (letterRef.current) {
      observer.observe(letterRef.current);
    }

    return () => {
      if (letterRef.current) {
        observer.unobserve(letterRef.current);
      }
    };
  }, []);

  const toggleLetter = () => {
    if (!isOpen) {
      setIsOpening(true);
      setTimeout(() => {
        setIsOpen(true);
        setTimeout(() => {
          setIsOpening(false);
        }, 600);
      }, 800);
    } else {
      setIsOpen(false);
    }
  };

  return (
    <div
      ref={letterRef}
      className={`max-w-lg mx-auto my-8 md:my-16 px-4 transition-all duration-1000 transform opacity-0 translate-y-10 ${
        isVisible ? "opacity-100 translate-y-0" : ""
      }`}
    >
      {/* Sobre de la carta con aspecto más realista */}
      <div
        className={`bg-white/90 rounded-lg overflow-hidden transition-all duration-700 ease-in-out relative 
          ${
            isOpen
              ? "max-h-none mb-8"
              : "max-h-56 cursor-pointer shadow-lg hover:shadow-tink-pink/40"
          }
          ${isOpening ? "animate-pulse-slow" : ""}
        `}
        style={{
          perspective: "1000px",
          transformStyle: "preserve-3d",
        }}
        onClick={!isOpen && !isOpening ? toggleLetter : undefined}
      >
        {/* Solapa superior del sobre (visible al principio) */}
        <div
          className={`absolute top-0 left-0 w-full overflow-hidden bg-tink-yellow/10 
            transition-all duration-800 ease-in-out origin-top border-b border-tink-gold/30
            ${
              isOpening || isOpen
                ? "transform -translate-y-full rotate-x-180"
                : "h-10"
            }
          `}
          style={{
            backfaceVisibility: "hidden",
            transformStyle: "preserve-3d",
            zIndex: isOpen ? 0 : 3,
          }}
        >
          <div className="h-3 w-full bg-tink-yellow/20"></div>
          <div className="absolute inset-0 flex items-center justify-center opacity-60">
            <svg width="20" height="20" viewBox="0 0 100 100">
              <path
                d="M50,10 C60,30 90,40 90,50 C90,60 60,70 50,90 C40,70 10,60 10,50 C10,40 40,30 50,10"
                fill="#FFE6A7"
                opacity="0.5"
              />
            </svg>
          </div>
        </div>

        {/* Parte frontal del sobre (visible cuando está cerrado) */}
        <div
          className={`p-4 md:p-6 relative overflow-hidden transition-all duration-700 
            ${isOpening ? "transform translate-y-2 opacity-90" : ""}
            ${isOpen ? "opacity-0 max-h-0" : "opacity-100 max-h-56"}
          `}
          style={{
            backgroundImage: "linear-gradient(to bottom, #fff8f8, #ffffff)",
            boxShadow: "inset 0 0 20px rgba(255, 202, 212, 0.2)",
            borderTop: "1px solid rgba(255, 230, 167, 0.3)",
          }}
        >
          {/* Líneas de dirección simuladas - Ocultas en móvil */}
          <div className="hidden md:block mb-6 mt-1">
            <div className="h-px w-32 bg-tink-blue/20 mb-2"></div>
            <div className="h-px w-40 bg-tink-blue/20 mb-2"></div>
            <div className="h-px w-28 bg-tink-blue/20"></div>
          </div>

          <div className="flex justify-between items-center mb-4">
            <h3 className="text-tink-purple font-fairy text-lg md:text-xl">
              Para ti
            </h3>
            <span className="text-base md:text-lg transform -rotate-12">
              💌
            </span>
          </div>

          <p className="text-gray-500 text-xs md:text-sm mb-3">
            Toca para abrir
          </p>

          {/* Sello postal decorativo - Más pequeño en móvil */}
          <div className="absolute top-3 right-3 w-10 h-10 md:w-16 md:h-16 opacity-70">
            <div className="w-8 h-8 md:w-12 md:h-12 border border-tink-purple/30 rounded-sm p-1 transform rotate-3 bg-gradient-to-br from-tink-pink/10 to-tink-yellow/10">
              <div className="w-full h-full flex items-center justify-center">
                <span className="text-xs text-tink-purple/60">✨</span>
              </div>
            </div>
          </div>

          {/* Estampado de remitente */}
          <div className="absolute bottom-3 left-3 text-xs text-tink-blue/60 transform -rotate-3">
            <p>Con cariño</p>
          </div>

          {/* Decoración del sobre */}
          <div className="absolute top-0 right-0 w-12 h-12 md:w-20 md:h-20 opacity-10">
            <svg viewBox="0 0 100 100">
              <path
                d="M10,50 Q30,20 50,10 Q70,20 90,50 Q70,80 50,90 Q30,80 10,50 Z"
                fill="#FFCAD4"
                transform="rotate(45, 50, 50)"
              />
            </svg>
          </div>

          <div className="absolute bottom-2 right-2 w-4 h-4 opacity-60">
            <div className="absolute w-1 h-1 bg-tink-yellow rounded-full animate-sparkle"></div>
            <div
              className="absolute w-1 h-1 bg-tink-yellow rounded-full animate-sparkle delay-300"
              style={{ left: "3px", top: "3px" }}
            ></div>
          </div>
        </div>

        {/* Efecto de apertura del sobre */}
        <div
          className={`absolute inset-0 bg-gradient-to-b from-tink-yellow/5 to-tink-pink/5 transition-all duration-800 
            ${isOpening ? "opacity-100" : "opacity-0 pointer-events-none"}
          `}
          style={{
            zIndex: isOpening ? 10 : -1,
          }}
        >
          <div className="w-full h-full flex items-center justify-center">
            <div
              className={`transition-transform duration-800 ${
                isOpening ? "transform scale-125 md:scale-150" : ""
              }`}
            >
              <svg
                width="80"
                height="80"
                viewBox="0 0 100 100"
                className="opacity-70"
              >
                <path
                  d="M50,20 Q80,50 50,80 Q20,50 50,20 Z"
                  fill="none"
                  stroke="#FFE6A7"
                  strokeWidth="1"
                  className={isOpening ? "animate-pulse-slow" : ""}
                />
                <path
                  d="M30,50 L70,50"
                  stroke="#FFCAD4"
                  strokeWidth="1"
                  strokeDasharray="30"
                  strokeDashoffset={isOpening ? "-30" : "0"}
                  style={{
                    transition: "stroke-dashoffset 0.8s ease-in-out",
                  }}
                />
              </svg>
            </div>
          </div>
        </div>

        {/* Contenido de la carta (visible cuando está abierta) */}
        <div
          ref={contentRef}
          className={`p-4 md:p-6 bg-gradient-to-br from-white to-tink-yellow/5 relative transition-all duration-700 
            ${
              isOpen
                ? "opacity-100 max-h-[800px]"
                : "opacity-0 max-h-0 pointer-events-none"
            }
          `}
          style={{
            backgroundImage: "linear-gradient(to bottom, #ffffff, #fffdf5)",
            boxShadow: "inset 0 0 30px rgba(255, 244, 189, 0.2)",
            transform: isOpen ? "translateY(0)" : "translateY(20px)",
            borderTop: "1px solid rgba(255, 230, 167, 0.3)",
          }}
        >
          <div className="flex justify-between items-center mb-4 md:mb-6">
            <h3 className="text-tink-purple font-fairy text-lg md:text-xl">
              Para ti
            </h3>
            <button
              onClick={toggleLetter}
              className="text-xs md:text-sm bg-tink-pink/20 hover:bg-tink-pink/30 rounded-full px-2 py-1 md:px-3 md:py-1 transition-colors duration-300"
            >
              Cerrar
            </button>
          </div>

          {/* Patrón de papel de carta */}
          <div
            className="absolute inset-0 opacity-5 pointer-events-none"
            style={{
              backgroundImage: "radial-gradient(#FFCAD4 1px, transparent 1px)",
              backgroundSize: "16px 16px",
              zIndex: 0,
            }}
          ></div>

          <div className="space-y-3 md:space-y-4 text-gray-700 text-sm md:text-base relative z-10">
            <p className="quote-text first-letter:text-2xl md:first-letter:text-3xl first-letter:font-fairy first-letter:mr-1 first-letter:float-left first-letter:text-tink-purple">
              Quería tomar un momento para decirte lo mucho que te quiero.
              Aunque las circunstancias o el tiempo a veces no permitan que nos
              veamos tanto como podriamos llegar a querer, el cariño que siento
              por ti no disminuye.
            </p>

            <p>
              Los momentos que compartimos, incluso si son breves, se quedan
              conmigo. Las risas, las conversaciones, la manera en que me miras
              que tanto me gusta y los besos que pues ya sabes que disfruto
              mucho.
            </p>

            <p>
              Quizás no nos veamos tan seguido como quisiéramos, pero eso no
              significa que no pueda demostarte cariño.
            </p>

            <p>
              Espero que te guste esta pequeña pagina que hice para ti. Te quiero mucho.
            </p>

            <p className="text-right pt-2 md:pt-4 font-fairy text-base md:text-lg text-tink-purple/80">
              Con cariño
            </p>
          </div>

          {/* Decoraciones de la carta */}
          <div className="absolute top-3 right-3 w-16 h-16 md:w-32 md:h-32 opacity-10 pointer-events-none">
            <svg viewBox="0 0 100 100">
              <path
                d="M10,50 Q30,20 50,10 Q70,20 90,50 Q70,80 50,90 Q30,80 10,50 Z"
                fill="#BDECD7"
                transform="rotate(45, 50, 50)"
              />
            </svg>
          </div>

          <div className="absolute bottom-4 left-4 flex space-x-1 opacity-40">
            <span className="w-1 h-1 bg-tink-blue rounded-full"></span>
            <span className="w-1 h-1 bg-tink-pink rounded-full"></span>
            <span className="w-1 h-1 bg-tink-gold rounded-full"></span>
          </div>
        </div>
      </div>

      {/* Eliminamos la sombra que causaba problemas en móviles */}
    </div>
  );
};

export default PersonalLetter;
