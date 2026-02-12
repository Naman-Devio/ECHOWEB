'use client';

import { motion } from 'framer-motion';
import { ArrowRight, Smartphone } from 'lucide-react';
import Link from 'next/link';
import { useSoundEffects } from '@/hooks/useSoundEffects';

export default function CTASection() {
  const { playClick, playHover } = useSoundEffects();
  return (
    <section className="py-20 bg-gradient-to-br from-primary-600 via-primary-700 to-secondary-700 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}
        />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Ready to Make a Difference?
            </h2>
            <p className="text-xl text-white/90 mb-8 leading-relaxed">
              Join thousands of Indians who are contributing to a cleaner, greener future. Start
              your e-waste recycling journey today.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/recyclers">
                <motion.button
                  whileHover={{ scale: 1.05, boxShadow: '0 20px 40px rgba(255, 255, 255, 0.3)' }}
                  whileTap={{ scale: 0.95 }}
                  onMouseEnter={() => playHover()}
                  onClick={() => playClick()}
                  className="group px-8 py-4 bg-white text-primary-600 rounded-xl font-semibold text-lg shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center gap-2"
                >
                  Find Recyclers Near You
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-200" />
                </motion.button>
              </Link>
              <a href="https://play.google.com" target="_blank" rel="noopener noreferrer">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onMouseEnter={() => playHover()}
                  onClick={() => playClick()}
                  className="px-8 py-4 bg-white/10 backdrop-blur-sm text-white rounded-xl font-semibold text-lg border-2 border-white/30 hover:bg-white/20 transition-all duration-300 flex items-center justify-center gap-2"
                >
                  <Smartphone className="w-5 h-5" />
                  Download App
                </motion.button>
              </a>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="hidden lg:block"
          >
            <div className="relative">
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
                  <div className="text-4xl font-bold text-white mb-2">500+</div>
                  <p className="text-white/80">Certified Recyclers</p>
                </div>
                <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20 mt-8">
                  <div className="text-4xl font-bold text-white mb-2">50K+</div>
                  <p className="text-white/80">Happy Users</p>
                </div>
                <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20 -mt-4">
                  <div className="text-4xl font-bold text-white mb-2">125T</div>
                  <p className="text-white/80">E-Waste Recycled</p>
                </div>
                <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20 mt-4">
                  <div className="text-4xl font-bold text-white mb-2">87T</div>
                  <p className="text-white/80">CO₂ Saved</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
