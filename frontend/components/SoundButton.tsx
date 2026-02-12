'use client';

import { motion } from 'framer-motion';
import { useSoundEffects } from '@/hooks/useSoundEffects';
import { ReactNode } from 'react';

interface SoundButtonProps {
  children: ReactNode;
  onClick?: () => void;
  className?: string;
  type?: 'button' | 'submit';
  disabled?: boolean;
}

export default function SoundButton({
  children,
  onClick,
  className = '',
  type = 'button',
  disabled = false,
}: SoundButtonProps) {
  const { playClick, playHover } = useSoundEffects();

  const handleClick = () => {
    playClick();
    onClick?.();
  };

  return (
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onHoverStart={() => playHover()}
      onClick={handleClick}
      type={type}
      disabled={disabled}
      className={className}
    >
      {children}
    </motion.button>
  );
}
