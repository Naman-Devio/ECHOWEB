'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { Leaf, MapPin, Recycle, TrendingUp, Sparkles, ArrowRight } from 'lucide-react';
import { useRef } from 'react';
import Link from 'next/link';
import RecyclingAnimation from './RecyclingAnimation';
import TypewriterText from './TypewriterText';
import { useSoundEffects } from '@/hooks/useSoundEffects';

interface ImpactStats {
  eWasteDiverted: number;
  co2Saved: number;
  materialsRecovered: number;
}

interface EnhancedHeroProps {
  impactStats?: ImpactStats;
}

export default function EnhancedHero({ impactStats }: EnhancedHeroProps) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end start'],
  });

  const y = useTransform(scrollYProgress, [0, 1], ['0%', '50%']);
  const opacity = useTransform(scrollYProgress, [0, 1], [1, 0]);
  const { playClick, playHover } = useSoundEffects();

  return (
    <section
      ref={ref}
      className="relative min-h-screen bg-gradient-to-br from-primary-50 via-secondary-50 to-primary-100 overflow-hidden"
    >
      {/* Animated background blobs */}
      <motion.div style={{ y }} className="absolute inset-0 overflow-hidden">
        <motion.div
          className="absolute top-20 left-10 w-96 h-96 bg-primary-300 rounded-full mix-blend-multiply filter blur-3xl opacity-40"
          animate={{
            scale: [1, 1.2, 1],
            x: [0, 100, 0],
            y: [0, 50, 0],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
        <motion.div
          className="absolute top-40 right-10 w-[500px] h-[500px] bg-secondary-300 rounded-full mix-blend-multiply filter blur-3xl opacity-40"
          animate={{
            scale: [1, 1.3, 1],
            x: [0, -100, 0],
            y: [0, 100, 0],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
        <motion.div
          className="absolute bottom-20 left-1/2 w-96 h-96 bg-green-300 rounded-full mix-blend-multiply filter blur-3xl opacity-30"
          animate={{
            scale: [1, 1.1, 1],
            x: [-50, 50, -50],
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
      </motion.div>

      {/* Floating particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-primary-400 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -30, 0],
              opacity: [0.2, 0.8, 0.2],
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          />
        ))}
      </div>

      <motion.div
        style={{ opacity }}
        className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-16"
      >
        <div className="grid lg:grid-cols-2 gap-12 items-center min-h-[80vh]">
          {/* Left content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="text-left z-10"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2, type: 'spring' }}
              className="inline-flex items-center gap-2 bg-white/90 backdrop-blur-sm px-4 py-2 rounded-full shadow-lg mb-6 border border-primary-200"
            >
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
              >
                <Leaf className="w-5 h-5 text-primary-600" />
              </motion.div>
              <span className="text-sm font-semibold text-neutral-700">
                🇮🇳 India&apos;s #1 E-Waste Platform
              </span>
              <Sparkles className="w-4 h-4 text-yellow-500" />
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="text-5xl md:text-6xl lg:text-7xl font-bold text-neutral-900 mb-6 leading-tight"
            >
              Turn Your <TypewriterText /> Into Environmental Impact
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="text-xl text-neutral-600 mb-8 leading-relaxed"
            >
              Connect with{' '}
              <span className="font-bold text-primary-600">500+ certified recyclers</span> across
              India. Dispose safely, track impact, and contribute to a sustainable future.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="flex flex-col sm:flex-row gap-4"
            >
              <Link href="/recyclers">
                <motion.button
                  whileHover={{ scale: 1.05, boxShadow: '0 20px 40px rgba(34, 197, 94, 0.3)' }}
                  whileTap={{ scale: 0.95 }}
                  onMouseEnter={() => playHover()}
                  onClick={() => playClick()}
                  className="group relative px-8 py-4 bg-gradient-to-r from-primary-600 to-secondary-600 text-white rounded-xl font-semibold text-lg shadow-lg overflow-hidden"
                >
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-primary-700 to-secondary-700"
                    initial={{ x: '-100%' }}
                    whileHover={{ x: 0 }}
                    transition={{ duration: 0.3 }}
                  />
                  <span className="relative z-10 flex items-center justify-center gap-2">
                    <MapPin className="w-5 h-5" />
                    Find Recyclers Near Me
                    <motion.div
                      animate={{ x: [0, 5, 0] }}
                      transition={{ duration: 1.5, repeat: Infinity }}
                    >
                      <ArrowRight className="w-5 h-5" />
                    </motion.div>
                  </span>
                </motion.button>
              </Link>

              <Link href="/about">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onMouseEnter={() => playHover()}
                  onClick={() => playClick()}
                  className="px-8 py-4 bg-white text-primary-600 rounded-xl font-semibold text-lg shadow-md hover:shadow-lg transition-all duration-300 border-2 border-primary-200"
                >
                  Learn More
                </motion.button>
              </Link>
            </motion.div>

            {/* Quick stats */}
            {impactStats && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
                className="grid grid-cols-3 gap-6 mt-12 pt-8 border-t border-neutral-200"
              >
                <motion.div whileHover={{ scale: 1.05 }} className="cursor-pointer">
                  <div className="flex items-center gap-2 text-primary-600 mb-1">
                    <Recycle className="w-5 h-5" />
                    <span className="text-2xl font-bold">
                      {(impactStats.eWasteDiverted / 1000).toFixed(1)}T
                    </span>
                  </div>
                  <p className="text-sm text-neutral-600">E-Waste Recycled</p>
                </motion.div>
                <motion.div whileHover={{ scale: 1.05 }} className="cursor-pointer">
                  <div className="flex items-center gap-2 text-secondary-600 mb-1">
                    <Leaf className="w-5 h-5" />
                    <span className="text-2xl font-bold">
                      {(impactStats.co2Saved / 1000).toFixed(1)}T
                    </span>
                  </div>
                  <p className="text-sm text-neutral-600">CO₂ Saved</p>
                </motion.div>
                <motion.div whileHover={{ scale: 1.05 }} className="cursor-pointer">
                  <div className="flex items-center gap-2 text-accent-leaf mb-1">
                    <TrendingUp className="w-5 h-5" />
                    <span className="text-2xl font-bold">{impactStats.materialsRecovered}kg</span>
                  </div>
                  <p className="text-sm text-neutral-600">Materials Recovered</p>
                </motion.div>
              </motion.div>
            )}
          </motion.div>

          {/* Right content - Animated Illustration */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative hidden lg:block"
          >
            <RecyclingAnimation />
          </motion.div>
        </div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-10"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="flex flex-col items-center gap-2 cursor-pointer"
        >
          <span className="text-sm text-neutral-600 font-medium">Scroll to explore</span>
          <div className="w-6 h-10 border-2 border-neutral-400 rounded-full flex justify-center pt-2">
            <motion.div
              animate={{ y: [0, 12, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
              className="w-1 h-2 bg-neutral-400 rounded-full"
            />
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}
