'use client';

import { useState } from 'react';
import { MapPin, Star, Phone, Mail, Clock, CheckCircle } from 'lucide-react';
import Footer from '@/components/Footer';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { useSoundEffects } from '@/hooks/useSoundEffects';

// Mock recycler data
const mockRecyclers = [
  {
    id: 1,
    name: 'Green Recycle Solutions',
    rating: 4.5,
    reviews: 120,
    distance: 2.3,
    address: '123 Green Street, Sector 18, Delhi',
    phone: '+91 98765 43220',
    email: 'greenrecycle@example.com',
    certified: true,
    devices: ['Mobile Phones', 'Laptops', 'Desktops', 'Tablets', 'Monitors'],
    bulkPickup: true,
    hours: 'Mon-Sat: 9:00 AM - 6:00 PM',
  },
  {
    id: 2,
    name: 'EcoTech Recyclers',
    rating: 4.8,
    reviews: 85,
    distance: 3.7,
    address: '456 Eco Lane, Andheri East, Mumbai',
    phone: '+91 98765 43221',
    email: 'ecotech@example.com',
    certified: true,
    devices: ['TVs', 'Refrigerators', 'Washing Machines', 'ACs', 'Batteries'],
    bulkPickup: true,
    hours: 'Mon-Sat: 8:00 AM - 8:00 PM',
  },
  {
    id: 3,
    name: 'Tech Recycle Hub',
    rating: 4.2,
    reviews: 45,
    distance: 5.1,
    address: '789 Tech Park, Whitefield, Bangalore',
    phone: '+91 98765 43222',
    email: 'techrecycle@example.com',
    certified: true,
    devices: ['Mobile Phones', 'Laptops', 'Printers', 'Cameras', 'Speakers'],
    bulkPickup: false,
    hours: 'Mon-Fri: 10:00 AM - 7:00 PM',
  },
];

export default function RecyclersPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const { playClick, playHover } = useSoundEffects();

  return (
    <div className="min-h-screen bg-neutral-50">
      {/* Header */}
      <div className="bg-gradient-to-br from-primary-600 to-secondary-600 text-white py-16 mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Find Certified Recyclers</h1>
          <p className="text-xl text-white/90">
            Discover government-certified e-waste recycling centers near you
          </p>
        </div>
      </div>

      {/* Search Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8">
        <div className="bg-white rounded-2xl shadow-xl p-6">
          <div className="flex gap-4">
            <div className="flex-1">
              <input
                type="text"
                placeholder="Enter your location..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full px-6 py-4 border-2 border-neutral-200 rounded-xl focus:border-primary-500 focus:outline-none text-lg text-gray-900 bg-white"
              />
            </div>
            <button
              onMouseEnter={() => playHover()}
              onClick={() => playClick()}
              className="px-8 py-4 bg-primary-600 text-white rounded-xl font-semibold hover:bg-primary-700 transition-colors duration-200 flex items-center gap-2"
            >
              <MapPin className="w-5 h-5" />
              Search
            </button>
          </div>
        </div>
      </div>

      {/* Results */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-neutral-900">
            {mockRecyclers.length} Recyclers Found Near You
          </h2>
        </div>

        <div className="grid gap-6">
          {mockRecyclers.map((recycler) => (
            <div
              key={recycler.id}
              className="bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 p-6 border-2 border-transparent hover:border-primary-200"
            >
              <div className="flex flex-col lg:flex-row gap-6">
                {/* Left: Info */}
                <div className="flex-1">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h3 className="text-2xl font-bold text-neutral-900 mb-2">{recycler.name}</h3>
                      <div className="flex items-center gap-4 text-sm text-neutral-600">
                        <div className="flex items-center gap-1">
                          <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                          <span className="font-semibold">{recycler.rating}</span>
                          <span>({recycler.reviews} reviews)</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <MapPin className="w-4 h-4" />
                          <span>{recycler.distance} km away</span>
                        </div>
                      </div>
                    </div>
                    {recycler.certified && (
                      <div className="flex items-center gap-2 bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm font-semibold">
                        <CheckCircle className="w-4 h-4" />
                        CPCB Certified
                      </div>
                    )}
                  </div>

                  <div className="space-y-3 mb-4">
                    <div className="flex items-start gap-2 text-neutral-600">
                      <MapPin className="w-5 h-5 mt-0.5 flex-shrink-0" />
                      <span>{recycler.address}</span>
                    </div>
                    <div className="flex items-center gap-2 text-neutral-600">
                      <Clock className="w-5 h-5 flex-shrink-0" />
                      <span>{recycler.hours}</span>
                    </div>
                  </div>

                  <div className="mb-4">
                    <p className="text-sm font-semibold text-neutral-700 mb-2">Accepted Devices:</p>
                    <div className="flex flex-wrap gap-2">
                      {recycler.devices.map((device, idx) => (
                        <span
                          key={idx}
                          className="px-3 py-1 bg-primary-50 text-primary-700 rounded-full text-sm"
                        >
                          {device}
                        </span>
                      ))}
                    </div>
                  </div>

                  {recycler.bulkPickup && (
                    <div className="inline-flex items-center gap-2 bg-blue-50 text-blue-700 px-3 py-1 rounded-full text-sm font-semibold">
                      <CheckCircle className="w-4 h-4" />
                      Bulk Pickup Available
                    </div>
                  )}
                </div>

                {/* Right: Actions */}
                <div className="lg:w-64 flex flex-col gap-3">
                  <Link href={`/recyclers/${recycler.id}/schedule`}>
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onMouseEnter={() => playHover()}
                      onClick={() => playClick()}
                      className="w-full px-6 py-3 bg-primary-600 text-white rounded-xl font-semibold hover:bg-primary-700 transition-colors duration-200"
                    >
                      Schedule Pickup
                    </motion.button>
                  </Link>
                  <Link href={`/recyclers/${recycler.id}`}>
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onMouseEnter={() => playHover()}
                      onClick={() => playClick()}
                      className="w-full px-6 py-3 bg-white text-primary-600 border-2 border-primary-600 rounded-xl font-semibold hover:bg-primary-50 transition-colors duration-200"
                    >
                      View Details
                    </motion.button>
                  </Link>
                  <div className="flex gap-2">
                    <a
                      href={`tel:${recycler.phone}`}
                      onMouseEnter={() => playHover()}
                      onClick={() => playClick()}
                      className="flex-1 px-4 py-2 bg-neutral-100 text-neutral-700 rounded-lg hover:bg-neutral-200 transition-colors duration-200 flex items-center justify-center gap-2"
                    >
                      <Phone className="w-4 h-4" />
                      Call
                    </a>
                    <a
                      href={`mailto:${recycler.email}`}
                      onMouseEnter={() => playHover()}
                      onClick={() => playClick()}
                      className="flex-1 px-4 py-2 bg-neutral-100 text-neutral-700 rounded-lg hover:bg-neutral-200 transition-colors duration-200 flex items-center justify-center gap-2"
                    >
                      <Mail className="w-4 h-4" />
                      Email
                    </a>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <Footer />
    </div>
  );
}
