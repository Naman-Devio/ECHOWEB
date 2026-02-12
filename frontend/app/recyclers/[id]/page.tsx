'use client';

import { motion } from 'framer-motion';
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  Star,
  CheckCircle,
  Package,
  Truck,
  Shield,
  ArrowRight,
} from 'lucide-react';
import Link from 'next/link';
import { useSoundEffects } from '@/hooks/useSoundEffects';

export default function RecyclerDetailPage({ params }: { params: { id: string } }) {
  const { playClick, playHover } = useSoundEffects();

  // Mock data - will be replaced with API call
  const recycler = {
    id: params.id,
    name: 'GreenTech Recyclers',
    rating: 4.8,
    reviewCount: 234,
    distance: 2.5,
    address: '123 Green Street, Sector 18, Delhi 110001',
    phone: '+91 98765 43210',
    email: 'contact@greentech.com',
    certifications: ['CPCB Certified', 'ISO 14001', 'E-Waste Authorized'],
    operatingHours: {
      weekdays: '9:00 AM - 6:00 PM',
      saturday: '9:00 AM - 2:00 PM',
      sunday: 'Closed',
    },
    acceptedDevices: [
      'Mobile Phones',
      'Laptops',
      'Desktops',
      'Televisions',
      'Printers',
      'Batteries',
    ],
    bulkPickup: true,
    description:
      'Leading e-waste recycling facility with state-of-the-art processing equipment. We handle all types of electronic waste with complete environmental compliance.',
  };

  const reviews = [
    {
      id: 1,
      name: 'Rajesh Kumar',
      rating: 5,
      date: '2 days ago',
      comment: 'Excellent service! They picked up my old laptop and TV on time. Very professional.',
    },
    {
      id: 2,
      name: 'Priya Sharma',
      rating: 4,
      date: '1 week ago',
      comment: 'Good experience overall. The staff was helpful and the process was smooth.',
    },
    {
      id: 3,
      name: 'Amit Patel',
      rating: 5,
      date: '2 weeks ago',
      comment: 'Highly recommend! They handled bulk e-waste from our office efficiently.',
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 to-secondary-50 pt-20 pb-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-2xl shadow-xl p-8 mb-6"
        >
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6">
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-2">
                <h1 className="text-3xl font-bold text-neutral-900">{recycler.name}</h1>
                <div className="flex gap-2">
                  {recycler.certifications.slice(0, 1).map((cert) => (
                    <span
                      key={cert}
                      className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm font-semibold flex items-center gap-1"
                    >
                      <Shield className="w-4 h-4" />
                      {cert}
                    </span>
                  ))}
                </div>
              </div>
              <div className="flex items-center gap-4 text-neutral-600 mb-4">
                <div className="flex items-center gap-1">
                  <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                  <span className="font-semibold">{recycler.rating}</span>
                  <span className="text-sm">({recycler.reviewCount} reviews)</span>
                </div>
                <div className="flex items-center gap-1">
                  <MapPin className="w-5 h-5" />
                  <span>{recycler.distance} km away</span>
                </div>
              </div>
              <p className="text-neutral-600">{recycler.description}</p>
            </div>
            <Link href={`/recyclers/${recycler.id}/schedule`}>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onHoverStart={() => playHover()}
                onClick={() => playClick()}
                className="px-8 py-4 bg-gradient-to-r from-primary-600 to-secondary-600 text-white rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all flex items-center gap-2"
              >
                Schedule Pickup
                <ArrowRight className="w-5 h-5" />
              </motion.button>
            </Link>
          </div>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Left Column - Details */}
          <div className="lg:col-span-2 space-y-6">
            {/* Contact Information */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="bg-white rounded-2xl shadow-lg p-6"
            >
              <h2 className="text-2xl font-bold text-neutral-900 mb-4">Contact Information</h2>
              <div className="space-y-3">
                <div className="flex items-center gap-3 text-neutral-700">
                  <MapPin className="w-5 h-5 text-primary-600" />
                  <span>{recycler.address}</span>
                </div>
                <div className="flex items-center gap-3 text-neutral-700">
                  <Phone className="w-5 h-5 text-primary-600" />
                  <a href={`tel:${recycler.phone}`} className="hover:text-primary-600">
                    {recycler.phone}
                  </a>
                </div>
                <div className="flex items-center gap-3 text-neutral-700">
                  <Mail className="w-5 h-5 text-primary-600" />
                  <a href={`mailto:${recycler.email}`} className="hover:text-primary-600">
                    {recycler.email}
                  </a>
                </div>
              </div>
            </motion.div>

            {/* Operating Hours */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-white rounded-2xl shadow-lg p-6"
            >
              <h2 className="text-2xl font-bold text-neutral-900 mb-4 flex items-center gap-2">
                <Clock className="w-6 h-6 text-primary-600" />
                Operating Hours
              </h2>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-neutral-700">Monday - Friday</span>
                  <span className="font-semibold text-neutral-900">
                    {recycler.operatingHours.weekdays}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-neutral-700">Saturday</span>
                  <span className="font-semibold text-neutral-900">
                    {recycler.operatingHours.saturday}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-neutral-700">Sunday</span>
                  <span className="font-semibold text-neutral-900">
                    {recycler.operatingHours.sunday}
                  </span>
                </div>
              </div>
            </motion.div>

            {/* Reviews */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="bg-white rounded-2xl shadow-lg p-6"
            >
              <h2 className="text-2xl font-bold text-neutral-900 mb-4">Customer Reviews</h2>
              <div className="space-y-4">
                {reviews.map((review) => (
                  <div key={review.id} className="border-b border-neutral-200 pb-4 last:border-0">
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-semibold text-neutral-900">{review.name}</span>
                      <span className="text-sm text-neutral-500">{review.date}</span>
                    </div>
                    <div className="flex items-center gap-1 mb-2">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`w-4 h-4 ${
                            i < review.rating
                              ? 'fill-yellow-400 text-yellow-400'
                              : 'text-neutral-300'
                          }`}
                        />
                      ))}
                    </div>
                    <p className="text-neutral-600">{review.comment}</p>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Right Column - Services */}
          <div className="space-y-6">
            {/* Accepted Devices */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="bg-white rounded-2xl shadow-lg p-6"
            >
              <h2 className="text-xl font-bold text-neutral-900 mb-4 flex items-center gap-2">
                <Package className="w-5 h-5 text-primary-600" />
                Accepted Devices
              </h2>
              <div className="space-y-2">
                {recycler.acceptedDevices.map((device) => (
                  <div key={device} className="flex items-center gap-2 text-neutral-700">
                    <CheckCircle className="w-4 h-4 text-green-600" />
                    <span>{device}</span>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Services */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-white rounded-2xl shadow-lg p-6"
            >
              <h2 className="text-xl font-bold text-neutral-900 mb-4">Services</h2>
              <div className="space-y-3">
                <div className="flex items-center gap-3 p-3 bg-primary-50 rounded-lg">
                  <Truck className="w-5 h-5 text-primary-600" />
                  <div>
                    <div className="font-semibold text-neutral-900">Free Pickup</div>
                    <div className="text-sm text-neutral-600">Within 10 km radius</div>
                  </div>
                </div>
                {recycler.bulkPickup && (
                  <div className="flex items-center gap-3 p-3 bg-secondary-50 rounded-lg">
                    <Package className="w-5 h-5 text-secondary-600" />
                    <div>
                      <div className="font-semibold text-neutral-900">Bulk Pickup</div>
                      <div className="text-sm text-neutral-600">For organizations</div>
                    </div>
                  </div>
                )}
                <div className="flex items-center gap-3 p-3 bg-green-50 rounded-lg">
                  <Shield className="w-5 h-5 text-green-600" />
                  <div>
                    <div className="font-semibold text-neutral-900">Certified</div>
                    <div className="text-sm text-neutral-600">Fully compliant</div>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Certifications */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="bg-white rounded-2xl shadow-lg p-6"
            >
              <h2 className="text-xl font-bold text-neutral-900 mb-4">Certifications</h2>
              <div className="space-y-2">
                {recycler.certifications.map((cert) => (
                  <div
                    key={cert}
                    className="flex items-center gap-2 p-2 bg-green-50 rounded-lg text-green-700"
                  >
                    <CheckCircle className="w-4 h-4" />
                    <span className="text-sm font-semibold">{cert}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}
