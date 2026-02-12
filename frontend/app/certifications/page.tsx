'use client';

import Footer from '@/components/Footer';
import { motion } from 'framer-motion';
import { Shield, CheckCircle, Award } from 'lucide-react';
import Link from 'next/link';

export default function CertificationsPage() {
  const certifications = [
    {
      name: 'CPCB Authorization',
      description: 'Central Pollution Control Board certification for e-waste handling',
      icon: Shield,
    },
    {
      name: 'ISO 14001',
      description: 'Environmental Management System certification',
      icon: Award,
    },
    {
      name: 'ISO 9001',
      description: 'Quality Management System certification',
      icon: CheckCircle,
    },
  ];

  return (
    <div className="min-h-screen bg-white">
      <div className="bg-gradient-to-br from-primary-600 to-secondary-600 text-white py-20 mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-5xl md:text-6xl font-bold mb-6"
          >
            Certifications
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-2xl text-white/90"
          >
            Our commitment to quality and environmental standards
          </motion.p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid md:grid-cols-3 gap-8 mb-12">
          {certifications.map((cert, index) => (
            <motion.div
              key={cert.name}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white rounded-2xl shadow-lg p-8 border-2 border-primary-100 hover:border-primary-300 transition-colors"
            >
              <div className="w-16 h-16 bg-primary-100 rounded-xl flex items-center justify-center mb-6">
                <cert.icon className="w-8 h-8 text-primary-600" />
              </div>
              <h3 className="text-2xl font-bold text-neutral-900 mb-4">{cert.name}</h3>
              <p className="text-neutral-600">{cert.description}</p>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-gradient-to-br from-primary-50 to-secondary-50 rounded-2xl p-8 text-center"
        >
          <h2 className="text-3xl font-bold text-neutral-900 mb-4">
            All Our Recyclers Are Certified
          </h2>
          <p className="text-xl text-neutral-600 mb-6">
            We ensure every recycler on our platform meets strict environmental and safety standards
          </p>
          <Link href="/recyclers">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-4 bg-gradient-to-r from-primary-600 to-secondary-600 text-white rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all"
            >
              Find Certified Recyclers
            </motion.button>
          </Link>
        </motion.div>
      </div>

      <Footer />
    </div>
  );
}
