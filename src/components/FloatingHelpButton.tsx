import { motion, AnimatePresence } from 'motion/react';
import { useState, useEffect } from 'react';
import helpAvatar from '../assets/avatar.png';

interface FloatingHelpButtonProps {
  visible?: boolean;
}

export function FloatingHelpButton({ visible = true }: FloatingHelpButtonProps) {
  const [showText, setShowText] = useState(true);
  const whatsappNumber = '573124964934'; // Piel Papel WhatsApp number
  const whatsappMessage = encodeURIComponent('¡Hola! Necesito ayuda con los productos de Piel Papel 🌸');

  // Toggle text visibility every 4 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setShowText((prev) => !prev);
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  const handleWhatsAppClick = () => {
    window.open(`https://wa.me/${whatsappNumber}?text=${whatsappMessage}`, '_blank');
  };

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8 }}
          transition={{ duration: 0.3 }}
          className="fixed bottom-2 right-2 z-50 flex flex-col items-end gap-1"
        >
          {/* Animated Text Bubble */}
          <AnimatePresence>
            {showText && (
              <motion.div
                initial={{ opacity: 0, y: 10, scale: 0.9 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 10, scale: 0.9 }}
                transition={{ duration: 0.3, ease: "easeOut" }}
                className="bg-white px-6 py-3 rounded-full shadow-xl border border-gray-100"
              >
                <span className="text-sm whitespace-nowrap" style={{ fontFamily: 'var(--font-brand)', fontWeight: 500 }}>
                  ¿Necesitas ayuda?
                </span>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Floating WhatsApp Button */}
          <motion.button
            onClick={handleWhatsAppClick}
            className="relative group"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          >
            {/* Avatar Button */}
            <div className="relative w-28 h-28 flex items-center justify-center hover:drop-shadow-2xl transition-all">
              <img
                src={helpAvatar}
                alt="Ayuda WhatsApp"
                className="w-full h-full object-contain drop-shadow-lg"
              />
            </div>
          </motion.button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}