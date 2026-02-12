'use client';

import { motion } from 'framer-motion';
import { Leaf, MapPin, Recycle, TrendingUp } from 'lucide-react';

interface ImpactStats {
  eWasteDiverted: number;
  co2Saved: number;
  materialsRecovered: number;
}

interface HeroSectionProps {
  impactStats?: ImpactStats;
}

export default function HeroSection({ impactStats }: HeroSectionProps) {
  return (
    <section className="relative min-h-screen bg-gradient-to-br from-primary-50 via-secondary-50 to-primary-100 overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          className="absolute top-20 left-10 w-72 h-72 bg-primary-200 rounded-full mix-blend-multiply filter blur-xl opacity-30"
          animate={{
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
          className="absolute top-40 right-10 w-96 h-96 bg-secondary-200 rounded-full mix-blend-multiply filter blur-xl opacity-30"
          animate={{
            x: [0, -100, 0],
            y: [0, 100, 0],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-16">
        <div className="grid lg:grid-cols-2 gap-12 items-center min-h-[80vh]">
          {/* Left content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="text-left"
          >
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="inline-flex items-center gap-2 bg-white/80 backdrop-blur-sm px-4 py-2 rounded-full shadow-sm mb-6"
            >
              <Leaf className="w-5 h-5 text-primary-600" />
              <span className="text-sm font-medium text-neutral-700">
                Certified E-Waste Recycling Platform
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="text-5xl md:text-6xl lg:text-7xl font-bold text-neutral-900 mb-6 leading-tight"
            >
              Turn Your{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-600 to-secondary-600">
                E-Waste
              </span>{' '}
              Into Environmental Impact
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="text-xl text-neutral-600 mb-8 leading-relaxed"
            >
              Connect with government-certified recyclers across India. Dispose of your electronic
              waste safely, track your environmental impact, and contribute to a sustainable future.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="flex flex-col sm:flex-row gap-4"
            >
              <a href="/recyclers">
                <button className="group relative px-8 py-4 bg-primary-600 text-white rounded-xl font-semibold text-lg shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 overflow-hidden">
                  <span className="relative z-10 flex items-center justify-center gap-2">
                    <MapPin className="w-5 h-5" />
                    Find Recycling Center Near Me
                  </span>
                  <div className="absolute inset-0 bg-gradient-to-r from-primary-700 to-secondary-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </button>
              </a>

              <a href="/about">
                <button className="px-8 py-4 bg-white text-primary-600 rounded-xl font-semibold text-lg shadow-md hover:shadow-lg transition-all duration-300 hover:scale-105 border-2 border-primary-200">
                  Learn More
                </button>
              </a>
            </motion.div>

            {/* Quick stats */}
            {impactStats && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
                className="grid grid-cols-3 gap-6 mt-12 pt-8 border-t border-neutral-200"
              >
                <div>
                  <div className="flex items-center gap-2 text-primary-600 mb-1">
                    <Recycle className="w-5 h-5" />
                    <span className="text-2xl font-bold">
                      {(impactStats.eWasteDiverted / 1000).toFixed(1)}T
                    </span>
                  </div>
                  <p className="text-sm text-neutral-600">E-Waste Recycled</p>
                </div>
                <div>
                  <div className="flex items-center gap-2 text-secondary-600 mb-1">
                    <Leaf className="w-5 h-5" />
                    <span className="text-2xl font-bold">
                      {(impactStats.co2Saved / 1000).toFixed(1)}T
                    </span>
                  </div>
                  <p className="text-sm text-neutral-600">CO₂ Saved</p>
                </div>
                <div>
                  <div className="flex items-center gap-2 text-accent-leaf mb-1">
                    <TrendingUp className="w-5 h-5" />
                    <span className="text-2xl font-bold">{impactStats.materialsRecovered}kg</span>
                  </div>
                  <p className="text-sm text-neutral-600">Materials Recovered</p>
                </div>
              </motion.div>
            )}
          </motion.div>

          {/* Right content - Illustration */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative hidden lg:block"
          >
            <div className="relative w-full h-[600px]">
              {/* Placeholder for illustration - can be replaced with actual image */}
              <div className="absolute inset-0 bg-gradient-to-br from-primary-400 to-secondary-500 rounded-3xl shadow-2xl transform rotate-3 hover:rotate-6 transition-transform duration-500" />
              <div className="absolute inset-0 bg-white rounded-3xl shadow-2xl flex items-center justify-center">
                <div className="text-center p-8">
                  <Recycle className="w-32 h-32 text-primary-600 mx-auto mb-4 animate-pulse" />
                  <p className="text-2xl font-bold text-neutral-800">
                    Sustainable E-Waste Management
                  </p>
                  <p className="text-neutral-600 mt-2">Join thousands making a difference</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="w-6 h-10 border-2 border-neutral-400 rounded-full flex justify-center pt-2"
        >
          <div className="w-1 h-2 bg-neutral-400 rounded-full" />
        </motion.div>
      </motion.div>
    </section>
  );
}
