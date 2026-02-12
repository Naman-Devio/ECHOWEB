'use client';

import Footer from '@/components/Footer';
import { motion } from 'framer-motion';
import { BookOpen, AlertTriangle, CheckCircle, Info } from 'lucide-react';

export default function GuidelinesPage() {
  const guidelines = [
    {
      title: 'What is E-Waste?',
      icon: Info,
      content:
        'Electronic waste includes discarded electrical or electronic devices. This includes computers, phones, TVs, refrigerators, and other electronic equipment.',
    },
    {
      title: 'Why Proper Disposal Matters',
      icon: AlertTriangle,
      content:
        'E-waste contains hazardous materials like lead, mercury, and cadmium. Improper disposal can contaminate soil and water, harming human health and the environment.',
    },
    {
      title: 'How to Dispose Safely',
      icon: CheckCircle,
      content:
        'Use certified e-waste recyclers, never throw electronics in regular trash, remove personal data before disposal, and keep batteries separate.',
    },
    {
      title: 'Legal Requirements',
      icon: BookOpen,
      content:
        'India\'s E-Waste Management Rules 2016 mandate proper collection and recycling. Producers must ensure collection and recycling of their products.',
    },
  ];

  const dosDonts = {
    dos: [
      'Use certified e-waste recyclers',
      'Remove personal data before disposal',
      'Keep batteries separate',
      'Donate working electronics',
      'Check for manufacturer take-back programs',
    ],
    donts: [
      "Don't throw electronics in regular trash",
      "Don't burn e-waste",
      "Don't dismantle devices yourself",
      "Don't mix e-waste with other waste",
      "Don't give to unauthorized collectors",
    ],
  };

  return (
    <div className="min-h-screen bg-white">
      <div className="bg-gradient-to-br from-primary-600 to-secondary-600 text-white py-20 mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-5xl md:text-6xl font-bold mb-6"
          >
            E-Waste Guidelines
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-2xl text-white/90"
          >
            Everything you need to know about safe e-waste disposal
          </motion.p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        {/* Guidelines Grid */}
        <div className="grid md:grid-cols-2 gap-8 mb-16">
          {guidelines.map((guideline, index) => (
            <motion.div
              key={guideline.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white rounded-2xl shadow-lg p-8 border-2 border-primary-100"
            >
              <div className="w-16 h-16 bg-primary-100 rounded-xl flex items-center justify-center mb-6">
                <guideline.icon className="w-8 h-8 text-primary-600" />
              </div>
              <h3 className="text-2xl font-bold text-neutral-900 mb-4">{guideline.title}</h3>
              <p className="text-neutral-600 leading-relaxed">{guideline.content}</p>
            </motion.div>
          ))}
        </div>

        {/* Do's and Don'ts */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="grid md:grid-cols-2 gap-8"
        >
          {/* Do's */}
          <div className="bg-green-50 rounded-2xl p-8 border-2 border-green-200">
            <h3 className="text-2xl font-bold text-green-900 mb-6 flex items-center gap-2">
              <CheckCircle className="w-6 h-6" />
              Do&apos;s
            </h3>
            <ul className="space-y-3">
              {dosDonts.dos.map((item, index) => (
                <li key={index} className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <span className="text-neutral-700">{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Don'ts */}
          <div className="bg-red-50 rounded-2xl p-8 border-2 border-red-200">
            <h3 className="text-2xl font-bold text-red-900 mb-6 flex items-center gap-2">
              <AlertTriangle className="w-6 h-6" />
              Don&apos;ts
            </h3>
            <ul className="space-y-3">
              {dosDonts.donts.map((item, index) => (
                <li key={index} className="flex items-start gap-3">
                  <AlertTriangle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                  <span className="text-neutral-700">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </motion.div>
      </div>

      <Footer />
    </div>
  );
}
