import { motion } from "framer-motion";
import React, { useEffect } from "react";

interface FlashScreenProps {
  onComplete: () => void;
}

const NAME = "Kri$hna Khanal";
const DURATION_MS = 2200;

const FlashScreen: React.FC<FlashScreenProps> = ({ onComplete }) => {
  useEffect(() => {
    const timer = setTimeout(onComplete, DURATION_MS);
    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <motion.div
      className="fixed inset-0 z-50 flex cursor-pointer flex-col items-center justify-center px-4"
      onClick={onComplete}
      exit={{ opacity: 0, filter: "blur(8px)" }}
      transition={{ duration: 0.5 }}
    >
      <h1 className="text-center text-4xl font-bold tracking-tight md:text-6xl">
        {NAME.split("").map((char, i) => (
          <motion.span
            key={i}
            className="inline-block"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.04 * i, duration: 0.5, ease: "easeOut" }}
          >
            {char === " " ? " " : char}
          </motion.span>
        ))}
      </h1>

      <motion.p
        className="mt-4 text-sm uppercase tracking-[0.3em] text-gray-400 md:text-base"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.7, duration: 0.6 }}
      >
        Full Stack Developer
      </motion.p>

      <div className="mt-10 h-px w-40 overflow-hidden bg-white/10">
        <motion.div
          className="h-full bg-gradient-to-r from-cyan-400 to-orange-400"
          initial={{ width: "0%" }}
          animate={{ width: "100%" }}
          transition={{ duration: DURATION_MS / 1000 - 0.2, ease: "easeInOut" }}
        />
      </div>

      <p className="absolute bottom-10 text-xs text-gray-500">
        Click anywhere to skip
      </p>
    </motion.div>
  );
};

export default FlashScreen;
