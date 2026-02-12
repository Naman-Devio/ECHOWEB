'use client';

import { motion } from 'framer-motion';
import { MapPin, Smartphone, Shield, TrendingUp, Zap, Users } from 'lucide-react';
import { useSoundEffects } from '@/hooks/useSoundEffects';

const features = [
  {
    icon: MapPin,
    title: 'Find Certified Recyclers',
    description:
      'Locate government-certified e-waste recycling centers near you with our interactive map.',
    color: 'text-primary-600',
    bgColor: 'bg-primary-100',
  },
  {
    icon: Smartphone,
    title: 'AI-Powered Guidance',
    description:
      'Upload photos of your e-waste and get instant AI-powered identification and disposal guidance.',
    color: 'text-secondary-600',
    bgColor: 'bg-secondary-100',
  },
  {
    icon: Shield,
    title: 'Verified & Safe',
    description: 'All recyclers are CPCB-certified ensuring safe and compliant e-waste disposal.',
    color: 'text-green-600',
    bgColor: 'bg-green-100',
  },
  {
    icon: TrendingUp,
    title: 'Track Your Impact',
    description:
      'Monitor your environmental contribution with real-time CO₂ savings and material recovery stats.',
    color: 'text-purple-600',
    bgColor: 'bg-purple-100',
  },
  {
    icon: Zap,
    title: 'Easy Pickup Scheduling',
    description: 'Schedule convenient doorstep pickups for your e-waste with just a few clicks.',
    color: 'text-orange-600',
    bgColor: 'bg-orange-100',
  },
  {
    icon: Users,
    title: 'Community Driven',
    description:
      'Join thousands of Indians making a difference in the fight against e-waste pollution.',
    color: 'text-blue-600',
    bgColor: 'bg-blue-100',
  },
];

export default function FeaturesSection() {
  const { playHover } = useSoundEffects();

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-neutral-900 mb-4">
            Why Choose E-Waste Locator?
          </h2>
          <p className="text-xl text-neutral-600 max-w-3xl mx-auto">
            India&apos;s first comprehensive platform connecting you with certified e-waste
            recyclers
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              onMouseEnter={() => playHover()}
              className="group relative bg-white rounded-2xl p-8 border-2 border-neutral-100 hover:border-primary-200 hover:shadow-xl transition-all duration-300 hover:-translate-y-2 cursor-pointer"
            >
              <div
                className={`w-16 h-16 ${feature.bgColor} rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}
              >
                <feature.icon className={`w-8 h-8 ${feature.color}`} />
              </div>
              <h3 className="text-xl font-bold text-neutral-900 mb-3">{feature.title}</h3>
              <p className="text-neutral-600 leading-relaxed">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
