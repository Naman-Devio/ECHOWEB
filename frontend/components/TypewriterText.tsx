'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const words = ['E-Waste', 'Old Electronics', 'Broken Devices', 'Unused Gadgets'];

export default function TypewriterText() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % words.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <span className="inline-block min-w-[300px] text-left">
      <AnimatePresence mode="wait">
        <motion.span
          key={words[index]}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.5, ease: 'easeInOut' }}
          className="inline-block text-transparent bg-clip-text bg-gradient-to-r from-primary-600 via-secondary-600 to-primary-600"
        >
          {words[index]}
        </motion.span>
      </AnimatePresence>
    </span>
  );
}
