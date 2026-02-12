'use client';

import Footer from '@/components/Footer';
import { motion } from 'framer-motion';
import { Building2, Handshake, Users } from 'lucide-react';
import Link from 'next/link';

export default function PartnersPage() {
  const partnerTypes = [
    {
      title: 'Recycling Partners',
      description: '500+ certified e-waste recyclers across India',
      icon: Building2,
      count: '500+',
    },
    {
      title: 'Corporate Partners',
      description: 'Organizations committed to sustainable e-waste disposal',
      icon: Handshake,
      count: '100+',
    },
    {
      title: 'Community Partners',
      description: 'NGOs and community organizations spreading awareness',
      icon: Users,
      count: '50+',
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
            Our Partners
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-2xl text-white/90"
          >
            Building a sustainable future together
          </motion.p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid md:grid-cols-3 gap-8 mb-12">
          {partnerTypes.map((partner, index) => (
            <motion.div
              key={partner.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-gradient-to-br from-primary-50 to-secondary-50 rounded-2xl p-8 text-center"
            >
              <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg">
                <partner.icon className="w-10 h-10 text-primary-600" />
              </div>
              <div className="text-4xl font-bold text-primary-600 mb-2">{partner.count}</div>
              <h3 className="text-2xl font-bold text-neutral-900 mb-4">{partner.title}</h3>
              <p className="text-neutral-600">{partner.description}</p>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-white rounded-2xl shadow-xl p-8 text-center border-2 border-primary-100"
        >
          <h2 className="text-3xl font-bold text-neutral-900 mb-4">Become a Partner</h2>
          <p className="text-xl text-neutral-600 mb-6">
            Join us in creating a cleaner, greener India. Partner with us to make e-waste recycling
            accessible to everyone.
          </p>
          <Link href="/contact">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-4 bg-gradient-to-r from-primary-600 to-secondary-600 text-white rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all"
            >
              Contact Us
            </motion.button>
          </Link>
        </motion.div>
      </div>

      <Footer />
    </div>
  );
}
