'use client';

import Footer from '@/components/Footer';
import { Target, Users, Award, TrendingUp } from 'lucide-react';
import { useSoundEffects } from '@/hooks/useSoundEffects';

export default function AboutPage() {
  const { playClick, playHover } = useSoundEffects();
  return (
    <div className="min-h-screen bg-white">
      {/* Hero */}
      <div className="bg-gradient-to-br from-primary-600 to-secondary-600 text-white py-20 mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-5xl md:text-6xl font-bold mb-6">About E-Waste Locator</h1>
          <p className="text-2xl text-white/90 max-w-3xl">
            India&apos;s first comprehensive platform connecting waste generators with certified
            e-waste recyclers
          </p>
        </div>
      </div>

      {/* Mission */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-4xl font-bold text-neutral-900 mb-6">Our Mission</h2>
            <p className="text-xl text-neutral-600 mb-6 leading-relaxed">
              We&apos;re on a mission to solve India&apos;s critical e-waste crisis. Currently, 95%
              of India&apos;s e-waste flows into the toxic informal sector, resulting in unsafe
              recycling practices, environmental pollution, and loss of valuable materials.
            </p>
            <p className="text-xl text-neutral-600 leading-relaxed">
              E-Waste Locator bridges this gap by connecting waste generators with
              government-certified recycling centers, ensuring safe disposal and environmental
              protection.
            </p>
          </div>
          <div className="grid grid-cols-2 gap-6">
            <div className="bg-primary-50 rounded-2xl p-6">
              <Target className="w-12 h-12 text-primary-600 mb-4" />
              <h3 className="text-2xl font-bold text-neutral-900 mb-2">Our Goal</h3>
              <p className="text-neutral-600">Divert 100% of e-waste from informal sector</p>
            </div>
            <div className="bg-secondary-50 rounded-2xl p-6 mt-8">
              <Users className="w-12 h-12 text-secondary-600 mb-4" />
              <h3 className="text-2xl font-bold text-neutral-900 mb-2">50K+</h3>
              <p className="text-neutral-600">Active Users</p>
            </div>
            <div className="bg-green-50 rounded-2xl p-6 -mt-4">
              <Award className="w-12 h-12 text-green-600 mb-4" />
              <h3 className="text-2xl font-bold text-neutral-900 mb-2">500+</h3>
              <p className="text-neutral-600">Certified Recyclers</p>
            </div>
            <div className="bg-purple-50 rounded-2xl p-6 mt-4">
              <TrendingUp className="w-12 h-12 text-purple-600 mb-4" />
              <h3 className="text-2xl font-bold text-neutral-900 mb-2">125T</h3>
              <p className="text-neutral-600">E-Waste Recycled</p>
            </div>
          </div>
        </div>
      </div>

      {/* The Problem */}
      <div className="bg-neutral-50 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-neutral-900 mb-12 text-center">
            The E-Waste Crisis in India
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white rounded-2xl p-8 shadow-lg">
              <div className="text-5xl font-bold text-red-600 mb-4">95%</div>
              <h3 className="text-xl font-bold text-neutral-900 mb-3">Informal Sector</h3>
              <p className="text-neutral-600">
                Of India&apos;s e-waste flows into unregulated, unsafe recycling practices
              </p>
            </div>
            <div className="bg-white rounded-2xl p-8 shadow-lg">
              <div className="text-5xl font-bold text-orange-600 mb-4">$62B</div>
              <h3 className="text-xl font-bold text-neutral-900 mb-3">Lost Value</h3>
              <p className="text-neutral-600">
                Worth of recoverable materials lost annually due to improper disposal
              </p>
            </div>
            <div className="bg-white rounded-2xl p-8 shadow-lg">
              <div className="text-5xl font-bold text-green-600 mb-4">3.2M</div>
              <h3 className="text-xl font-bold text-neutral-900 mb-3">Tons Generated</h3>
              <p className="text-neutral-600">
                Metric tons of e-waste generated in India annually and growing
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Our Solution */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <h2 className="text-4xl font-bold text-neutral-900 mb-12 text-center">Our Solution</h2>
        <div className="grid md:grid-cols-2 gap-8">
          <div className="bg-gradient-to-br from-primary-50 to-secondary-50 rounded-2xl p-8">
            <h3 className="text-2xl font-bold text-neutral-900 mb-4">For Waste Generators</h3>
            <ul className="space-y-3 text-neutral-700">
              <li className="flex items-start gap-3">
                <div className="w-6 h-6 bg-primary-600 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-white text-sm">✓</span>
                </div>
                <span>Easy discovery of certified recyclers near you</span>
              </li>
              <li className="flex items-start gap-3">
                <div className="w-6 h-6 bg-primary-600 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-white text-sm">✓</span>
                </div>
                <span>AI-powered device identification and guidance</span>
              </li>
              <li className="flex items-start gap-3">
                <div className="w-6 h-6 bg-primary-600 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-white text-sm">✓</span>
                </div>
                <span>Convenient doorstep pickup scheduling</span>
              </li>
              <li className="flex items-start gap-3">
                <div className="w-6 h-6 bg-primary-600 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-white text-sm">✓</span>
                </div>
                <span>Real-time environmental impact tracking</span>
              </li>
            </ul>
          </div>
          <div className="bg-gradient-to-br from-green-50 to-blue-50 rounded-2xl p-8">
            <h3 className="text-2xl font-bold text-neutral-900 mb-4">For Recyclers</h3>
            <ul className="space-y-3 text-neutral-700">
              <li className="flex items-start gap-3">
                <div className="w-6 h-6 bg-green-600 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-white text-sm">✓</span>
                </div>
                <span>Increased visibility and customer reach</span>
              </li>
              <li className="flex items-start gap-3">
                <div className="w-6 h-6 bg-green-600 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-white text-sm">✓</span>
                </div>
                <span>Streamlined pickup request management</span>
              </li>
              <li className="flex items-start gap-3">
                <div className="w-6 h-6 bg-green-600 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-white text-sm">✓</span>
                </div>
                <span>Trust building through certification verification</span>
              </li>
              <li className="flex items-start gap-3">
                <div className="w-6 h-6 bg-green-600 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-white text-sm">✓</span>
                </div>
                <span>Business growth through reviews and ratings</span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* CTA */}
      <div className="bg-gradient-to-br from-primary-600 to-secondary-600 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold text-white mb-6">Join the Movement</h2>
          <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
            Be part of the solution. Start your e-waste recycling journey today.
          </p>
          <a href="/recyclers">
            <button
              onMouseEnter={() => playHover()}
              onClick={() => playClick()}
              className="px-8 py-4 bg-white text-primary-600 rounded-xl font-semibold text-lg shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
            >
              Find Recyclers Near You
            </button>
          </a>
        </div>
      </div>

      <Footer />
    </div>
  );
}
