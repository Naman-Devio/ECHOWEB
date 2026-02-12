'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Leaf, MapPin, Info, Phone } from 'lucide-react';
import Link from 'next/link';
import { useSoundEffects } from '@/hooks/useSoundEffects';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const { playClick, playHover } = useSoundEffects();

  const navItems = [
    { name: 'Find Recyclers', icon: MapPin, href: '/recyclers' },
    { name: 'About', icon: Info, href: '/about' },
    { name: 'Contact', icon: Phone, href: '/contact' },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-neutral-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              onMouseEnter={() => playHover()}
              onClick={() => playClick()}
              className="flex items-center gap-2 cursor-pointer"
            >
              <div className="w-10 h-10 bg-gradient-to-br from-primary-500 to-secondary-500 rounded-lg flex items-center justify-center">
                <Leaf className="w-6 h-6 text-white" />
              </div>
              <span className="text-xl font-bold text-neutral-900">E-Waste Locator</span>
            </motion.div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            {navItems.map((item, index) => (
              <Link key={item.name} href={item.href}>
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  onMouseEnter={() => playHover()}
                  onClick={() => playClick()}
                  className="flex items-center gap-2 text-neutral-700 hover:text-primary-600 transition-colors duration-200 font-medium cursor-pointer"
                >
                  <item.icon className="w-4 h-4" />
                  {item.name}
                </motion.div>
              </Link>
            ))}
          </div>

          {/* Desktop Auth Buttons */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="hidden md:flex items-center gap-4"
          >
            <Link href="/auth/signin">
              <button
                onMouseEnter={() => playHover()}
                onClick={() => playClick()}
                className="px-4 py-2 text-neutral-700 hover:text-primary-600 font-medium transition-colors duration-200"
              >
                Sign In
              </button>
            </Link>
            <Link href="/auth/signup">
              <button
                onMouseEnter={() => playHover()}
                onClick={() => playClick()}
                className="px-6 py-2 bg-primary-600 text-white rounded-lg font-medium hover:bg-primary-700 transition-all duration-200 hover:scale-105 shadow-md"
              >
                Get Started
              </button>
            </Link>
          </motion.div>

          {/* Mobile menu button */}
          <button
            onClick={() => {
              playClick();
              setIsOpen(!isOpen);
            }}
            className="md:hidden p-2 rounded-lg hover:bg-neutral-100 transition-colors duration-200"
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-white border-t border-neutral-200"
          >
            <div className="px-4 py-4 space-y-3">
              {navItems.map((item) => (
                <Link key={item.name} href={item.href}>
                  <div
                    onMouseEnter={() => playHover()}
                    onClick={() => playClick()}
                    className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-neutral-100 transition-colors duration-200 cursor-pointer"
                  >
                    <item.icon className="w-5 h-5 text-primary-600" />
                    <span className="font-medium text-neutral-700">{item.name}</span>
                  </div>
                </Link>
              ))}
              <div className="pt-4 border-t border-neutral-200 space-y-2">
                <Link href="/auth/signin">
                  <button
                    onMouseEnter={() => playHover()}
                    onClick={() => playClick()}
                    className="w-full px-4 py-3 text-neutral-700 hover:bg-neutral-100 rounded-lg font-medium transition-colors duration-200"
                  >
                    Sign In
                  </button>
                </Link>
                <Link href="/auth/signup">
                  <button
                    onMouseEnter={() => playHover()}
                    onClick={() => playClick()}
                    className="w-full px-4 py-3 bg-primary-600 text-white rounded-lg font-medium hover:bg-primary-700 transition-colors duration-200"
                  >
                    Get Started
                  </button>
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
