import { motion } from 'motion/react';

export function PromoBanner() {
  const promoText = "10% de descuento en tu primera compra";
  
  // Repetir el texto múltiples veces para crear el efecto de loop infinito
  const repeatedText = Array(10).fill(promoText).join(" • ");

  return (
    <div className="bg-[#FFD4E5] text-[#D4116F] overflow-hidden relative">
      <div className="flex">
        <motion.div
          className="flex whitespace-nowrap py-2.5"
          animate={{
            x: [0, -1920], // Ajustar según el ancho del contenido
          }}
          transition={{
            x: {
              repeat: Infinity,
              repeatType: "loop",
              duration: 25,
              ease: "linear",
            },
          }}
        >
          <span className="text-sm tracking-wide px-4">{repeatedText}</span>
          <span className="text-sm tracking-wide px-4">{repeatedText}</span>
        </motion.div>
      </div>
    </div>
  );
}