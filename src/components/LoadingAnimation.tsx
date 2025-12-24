import { motion } from 'motion/react';
const logo = "/logo.png";

export function LoadingAnimation() {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-white">
      <div className="flex flex-col items-center">
        <motion.div
          initial={{ scale: 0, opacity: 0, rotate: -180 }}
          animate={{
            scale: [0, 1.2, 1],
            opacity: [0, 1, 1],
            rotate: [0, 360, 0]
          }}
          transition={{
            duration: 2,
            ease: "easeOut",
            times: [0, 0.6, 1]
          }}
        >
          <img src={logo} alt="Piel Papel" className="w-32 h-32 object-contain" />
        </motion.div>

        <motion.p
          className="mt-6 tracking-[0.2em] uppercase"
          style={{ color: '#000000', fontFamily: 'var(--font-brand)', fontWeight: 700, fontSize: '1.125rem' }}
          initial={{ opacity: 0 }}
          animate={{ opacity: [0, 1, 0.7] }}
          transition={{
            duration: 1.5,
            delay: 1,
            ease: "easeInOut",
          }}
        >
          PIEL PAPEL
        </motion.p>
      </div>
    </div>
  );
}