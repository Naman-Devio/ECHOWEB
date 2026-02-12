'use client';

import { motion } from 'framer-motion';
import { Search, CheckCircle, Truck, Award } from 'lucide-react';
import Link from 'next/link';
import { useSoundEffects } from '@/hooks/useSoundEffects';

const steps = [
  {
    icon: Search,
    title: 'Find Recyclers',
    description: 'Search for certified e-waste recyclers near your location',
    step: '01',
  },
  {
    icon: CheckCircle,
    title: 'Schedule Pickup',
    description: 'Book a convenient time for doorstep collection',
    step: '02',
  },
  {
    icon: Truck,
    title: 'Safe Collection',
    description: 'Certified professionals collect your e-waste safely',
    step: '03',
  },
  {
    icon: Award,
    title: 'Track Impact',
    description: 'Monitor your environmental contribution in real-time',
    step: '04',
  },
];

export default function HowItWorks() {
  const { playHover, playClick } = useSoundEffects();

  return (
    <section className="py-20 bg-gradient-to-br from-neutral-50 to-primary-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-neutral-900 mb-4">How It Works</h2>
          <p className="text-xl text-neutral-600 max-w-3xl mx-auto">
            Dispose of your e-waste responsibly in 4 simple steps
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              onMouseEnter={() => playHover()}
              className="relative cursor-pointer"
            >
              {/* Connector line */}
              {index < steps.length - 1 && (
                <div className="hidden lg:block absolute top-16 left-full w-full h-0.5 bg-gradient-to-r from-primary-300 to-transparent -translate-x-1/2 z-0" />
              )}

              <div className="relative bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2 z-10">
                <div className="absolute -top-4 -right-4 w-12 h-12 bg-gradient-to-br from-primary-500 to-secondary-500 rounded-full flex items-center justify-center text-white font-bold text-lg shadow-lg">
                  {step.step}
                </div>

                <div className="w-16 h-16 bg-gradient-to-br from-primary-100 to-secondary-100 rounded-xl flex items-center justify-center mb-6">
                  <step.icon className="w-8 h-8 text-primary-600" />
                </div>

                <h3 className="text-xl font-bold text-neutral-900 mb-3">{step.title}</h3>
                <p className="text-neutral-600 leading-relaxed">{step.description}</p>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-center mt-12"
        >
          <Link href="/recyclers">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onMouseEnter={() => playHover()}
              onClick={() => playClick()}
              className="px-8 py-4 bg-gradient-to-r from-primary-600 to-secondary-600 text-white rounded-xl font-semibold text-lg shadow-lg hover:shadow-xl transition-all duration-300"
            >
              Get Started Now
            </motion.button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
