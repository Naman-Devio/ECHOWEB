'use client';

import { motion } from 'framer-motion';
import { Calendar, Clock, MapPin, Package, Phone, User, CheckCircle } from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';
import { useSoundEffects } from '@/hooks/useSoundEffects';

export default function SchedulePickupPage() {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    address: '',
    deviceType: '',
    quantity: '',
    date: '',
    time: '',
  });
  const { playClick, playSuccess } = useSoundEffects();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    playSuccess();
    
    // Create a scratch card with fixed demo reward (50 points)
    try {
      // Store demo card in localStorage with fixed reward
      const existingCards = JSON.parse(localStorage.getItem('scratchCards') || '[]');
      const newCard = {
        id: Date.now().toString(),
        rewardType: 'POINTS',
        rewardValue: 50, // Fixed demo amount
        status: 'AVAILABLE',
        createdAt: new Date().toISOString(),
      };
      existingCards.push(newCard);
      localStorage.setItem('scratchCards', JSON.stringify(existingCards));
      console.log('Demo scratch card created with 50 points');
    } catch (error) {
      console.error('Error creating scratch card:', error);
    }
    
    setStep(4); // Success step
  };

  const handleNext = () => {
    playClick();
    setStep(step + 1);
  };

  const handleBack = () => {
    playClick();
    setStep(step - 1);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 to-secondary-50 pt-20 pb-10">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Progress Steps */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            {[1, 2, 3].map((s) => (
              <div key={s} className="flex items-center flex-1">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className={`w-10 h-10 rounded-full flex items-center justify-center font-bold ${
                    step >= s ? 'bg-primary-600 text-white' : 'bg-neutral-200 text-neutral-500'
                  }`}
                >
                  {s}
                </motion.div>
                {s < 3 && (
                  <div
                    className={`flex-1 h-1 mx-2 ${step > s ? 'bg-primary-600' : 'bg-neutral-200'}`}
                  />
                )}
              </div>
            ))}
          </div>
          <div className="flex justify-between mt-2 text-sm">
            <span className={step >= 1 ? 'text-primary-600 font-semibold' : 'text-neutral-500'}>
              Your Info
            </span>
            <span className={step >= 2 ? 'text-primary-600 font-semibold' : 'text-neutral-500'}>
              Device Details
            </span>
            <span className={step >= 3 ? 'text-primary-600 font-semibold' : 'text-neutral-500'}>
              Schedule
            </span>
          </div>
        </div>

        {step < 4 ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-2xl shadow-xl p-8"
          >
            <h1 className="text-3xl font-bold text-neutral-900 mb-6">Schedule E-Waste Pickup</h1>

            <form onSubmit={handleSubmit} className="space-y-6">
              {step === 1 && (
                <>
                  <div>
                    <label className="block text-sm font-medium text-neutral-700 mb-2">
                      <User className="inline w-4 h-4 mr-2" />
                      Full Name
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-4 py-3 border-2 border-neutral-200 rounded-xl focus:border-primary-500 focus:outline-none text-gray-900 bg-white"
                      placeholder="John Doe"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-neutral-700 mb-2">
                      <Phone className="inline w-4 h-4 mr-2" />
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      required
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full px-4 py-3 border-2 border-neutral-200 rounded-xl focus:border-primary-500 focus:outline-none text-gray-900 bg-white"
                      placeholder="+91 98765 43210"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-neutral-700 mb-2">
                      <MapPin className="inline w-4 h-4 mr-2" />
                      Pickup Address
                    </label>
                    <textarea
                      required
                      rows={3}
                      value={formData.address}
                      onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                      className="w-full px-4 py-3 border-2 border-neutral-200 rounded-xl focus:border-primary-500 focus:outline-none text-gray-900 bg-white"
                      placeholder="123 Green Street, Sector 18, Delhi"
                    />
                  </div>
                </>
              )}

              {step === 2 && (
                <>
                  <div>
                    <label className="block text-sm font-medium text-neutral-700 mb-2">
                      <Package className="inline w-4 h-4 mr-2" />
                      Device Type
                    </label>
                    <select
                      required
                      value={formData.deviceType}
                      onChange={(e) => setFormData({ ...formData, deviceType: e.target.value })}
                      className="w-full px-4 py-3 border-2 border-neutral-200 rounded-xl focus:border-primary-500 focus:outline-none text-gray-900 bg-white"
                    >
                      <option value="">Select device type</option>
                      <option value="mobile">Mobile Phone</option>
                      <option value="laptop">Laptop</option>
                      <option value="desktop">Desktop</option>
                      <option value="tv">Television</option>
                      <option value="other">Other</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-neutral-700 mb-2">
                      Quantity / Weight (approx)
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.quantity}
                      onChange={(e) => setFormData({ ...formData, quantity: e.target.value })}
                      className="w-full px-4 py-3 border-2 border-neutral-200 rounded-xl focus:border-primary-500 focus:outline-none text-gray-900 bg-white"
                      placeholder="e.g., 2 laptops or 5kg"
                    />
                  </div>
                </>
              )}

              {step === 3 && (
                <>
                  <div>
                    <label className="block text-sm font-medium text-neutral-700 mb-2">
                      <Calendar className="inline w-4 h-4 mr-2" />
                      Preferred Date
                    </label>
                    <input
                      type="date"
                      required
                      value={formData.date}
                      onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                      className="w-full px-4 py-3 border-2 border-neutral-200 rounded-xl focus:border-primary-500 focus:outline-none text-gray-900 bg-white"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-neutral-700 mb-2">
                      <Clock className="inline w-4 h-4 mr-2" />
                      Preferred Time
                    </label>
                    <select
                      required
                      value={formData.time}
                      onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                      className="w-full px-4 py-3 border-2 border-neutral-200 rounded-xl focus:border-primary-500 focus:outline-none text-gray-900 bg-white"
                    >
                      <option value="">Select time slot</option>
                      <option value="9-12">9:00 AM - 12:00 PM</option>
                      <option value="12-3">12:00 PM - 3:00 PM</option>
                      <option value="3-6">3:00 PM - 6:00 PM</option>
                    </select>
                  </div>
                </>
              )}

              <div className="flex gap-4">
                {step > 1 && (
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    type="button"
                    onClick={handleBack}
                    className="flex-1 px-6 py-3 bg-neutral-200 text-neutral-700 rounded-xl font-semibold hover:bg-neutral-300 transition-colors"
                  >
                    Back
                  </motion.button>
                )}
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  type={step === 3 ? 'submit' : 'button'}
                  onClick={() => step < 3 && handleNext()}
                  className="flex-1 px-6 py-3 bg-gradient-to-r from-primary-600 to-secondary-600 text-white rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all"
                >
                  {step === 3 ? 'Schedule Pickup' : 'Next'}
                </motion.button>
              </div>
            </form>
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-2xl shadow-xl p-8 text-center"
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: 'spring' }}
              className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6"
            >
              <CheckCircle className="w-12 h-12 text-green-600" />
            </motion.div>
            <h2 className="text-3xl font-bold text-neutral-900 mb-4">Pickup Scheduled!</h2>
            <p className="text-lg text-neutral-600 mb-2">
              Your tracking ID: <span className="font-bold text-primary-600">EWL-2026-001234</span>
            </p>
            <p className="text-neutral-600 mb-4">
              We&apos;ve sent a confirmation to your phone. The recycler will contact you soon.
            </p>
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="bg-gradient-to-r from-yellow-50 to-orange-50 border-2 border-orange-200 rounded-xl p-4 mb-8"
            >
              <p className="text-orange-800 font-semibold flex items-center justify-center gap-2">
                <span className="text-2xl">🎁</span>
                You&apos;ve earned a scratch card! Check your rewards page.
              </p>
            </motion.div>
            <div className="flex gap-4 justify-center">
              <Link href="/recyclers">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-6 py-3 bg-neutral-200 text-neutral-700 rounded-xl font-semibold hover:bg-neutral-300 transition-colors"
                >
                  Find More Recyclers
                </motion.button>
              </Link>
              <Link href="/">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-6 py-3 bg-primary-600 text-white rounded-xl font-semibold hover:bg-primary-700 transition-colors"
                >
                  Back to Home
                </motion.button>
              </Link>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}
