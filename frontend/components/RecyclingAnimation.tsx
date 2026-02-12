'use client';

import { motion } from 'framer-motion';
import { Smartphone, Laptop, Tv, Recycle, Leaf, Sparkles } from 'lucide-react';

export default function RecyclingAnimation() {
  return (
    <div className="relative w-full h-[500px] flex items-center justify-center">
      {/* Central Recycling Bin */}
      <motion.div
        className="absolute z-10"
        animate={{
          scale: [1, 1.05, 1],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      >
        <div className="relative">
          <motion.div
            className="w-32 h-32 bg-gradient-to-br from-primary-500 to-secondary-500 rounded-2xl flex items-center justify-center shadow-2xl"
            animate={{
              boxShadow: [
                '0 10px 40px rgba(34, 197, 94, 0.3)',
                '0 10px 60px rgba(34, 197, 94, 0.5)',
                '0 10px 40px rgba(34, 197, 94, 0.3)',
              ],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
            }}
          >
            <Recycle className="w-16 h-16 text-white" />
          </motion.div>

          {/* Sparkles around bin */}
          {[...Array(8)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute"
              style={{
                left: '50%',
                top: '50%',
              }}
              animate={{
                x: [0, Math.cos((i * Math.PI) / 4) * 80],
                y: [0, Math.sin((i * Math.PI) / 4) * 80],
                opacity: [0, 1, 0],
                scale: [0, 1, 0],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                delay: i * 0.2,
              }}
            >
              <Sparkles className="w-4 h-4 text-yellow-400" />
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Floating E-Waste Items */}
      {/* Phone */}
      <motion.div
        className="absolute"
        style={{ left: '10%', top: '20%' }}
        animate={{
          y: [0, -20, 0],
          rotate: [0, 10, 0],
          x: ['0%', '200%'],
        }}
        transition={{
          y: { duration: 2, repeat: Infinity, ease: 'easeInOut' },
          rotate: { duration: 2, repeat: Infinity, ease: 'easeInOut' },
          x: { duration: 4, repeat: Infinity, ease: 'linear' },
        }}
      >
        <div className="bg-white p-4 rounded-xl shadow-lg border-2 border-primary-200">
          <Smartphone className="w-12 h-12 text-primary-600" />
        </div>
      </motion.div>

      {/* Laptop */}
      <motion.div
        className="absolute"
        style={{ right: '10%', top: '30%' }}
        animate={{
          y: [0, 20, 0],
          rotate: [0, -10, 0],
          x: ['0%', '-200%'],
        }}
        transition={{
          y: { duration: 2.5, repeat: Infinity, ease: 'easeInOut' },
          rotate: { duration: 2.5, repeat: Infinity, ease: 'easeInOut' },
          x: { duration: 5, repeat: Infinity, ease: 'linear' },
        }}
      >
        <div className="bg-white p-4 rounded-xl shadow-lg border-2 border-secondary-200">
          <Laptop className="w-12 h-12 text-secondary-600" />
        </div>
      </motion.div>

      {/* TV */}
      <motion.div
        className="absolute"
        style={{ left: '15%', bottom: '20%' }}
        animate={{
          y: [0, -15, 0],
          rotate: [0, 5, 0],
          x: ['0%', '180%'],
        }}
        transition={{
          y: { duration: 3, repeat: Infinity, ease: 'easeInOut' },
          rotate: { duration: 3, repeat: Infinity, ease: 'easeInOut' },
          x: { duration: 6, repeat: Infinity, ease: 'linear' },
        }}
      >
        <div className="bg-white p-4 rounded-xl shadow-lg border-2 border-green-200">
          <Tv className="w-12 h-12 text-green-600" />
        </div>
      </motion.div>

      {/* Leaves coming out (recycled) */}
      {[...Array(6)].map((_, i) => (
        <motion.div
          key={`leaf-${i}`}
          className="absolute"
          style={{
            left: '50%',
            top: '50%',
          }}
          animate={{
            x: [0, Math.cos((i * Math.PI) / 3 + Math.PI) * 120],
            y: [0, Math.sin((i * Math.PI) / 3 + Math.PI) * 120],
            opacity: [0, 1, 0],
            rotate: [0, 360],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            delay: i * 0.3 + 1,
          }}
        >
          <Leaf className="w-6 h-6 text-green-500" />
        </motion.div>
      ))}

      {/* Circular path indicator */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none">
        <motion.circle
          cx="50%"
          cy="50%"
          r="150"
          fill="none"
          stroke="url(#gradient)"
          strokeWidth="2"
          strokeDasharray="10 5"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1, rotate: 360 }}
          transition={{
            pathLength: { duration: 2, ease: 'easeInOut' },
            rotate: { duration: 20, repeat: Infinity, ease: 'linear' },
          }}
          style={{ originX: '50%', originY: '50%' }}
        />
        <defs>
          <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#22c55e" stopOpacity="0.3" />
            <stop offset="100%" stopColor="#0ea5e9" stopOpacity="0.3" />
          </linearGradient>
        </defs>
      </svg>

      {/* Text labels */}
      <motion.div
        className="absolute top-4 left-1/2 transform -translate-x-1/2"
        animate={{ opacity: [0.5, 1, 0.5] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <div className="bg-white/90 backdrop-blur-sm px-4 py-2 rounded-full shadow-lg border border-primary-200">
          <span className="text-sm font-semibold text-primary-600">♻️ Recycling in Action</span>
        </div>
      </motion.div>
    </div>
  );
}
