'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Leaf, MapPin, Info, Phone, Gift, User, LogOut, ChevronDown } from 'lucide-react';
import Link from 'next/link';
import { useSoundEffects } from '@/hooks/useSoundEffects';
import PointsBadge from './PointsBadge';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userName, setUserName] = useState('');
  const [showUserMenu, setShowUserMenu] = useState(false);
  const { playClick, playHover } = useSoundEffects();

  useEffect(() => {
    checkAuthStatus();
    
    // Listen for auth changes
    const handleAuthChange = () => checkAuthStatus();
    window.addEventListener('storage', handleAuthChange);
    window.addEventListener('rewardUpdated', handleAuthChange);
    
    return () => {
      window.removeEventListener('storage', handleAuthChange);
      window.removeEventListener('rewardUpdated', handleAuthChange);
    };
  }, []);

  const checkAuthStatus = () => {
    const token = localStorage.getItem('accessToken');
    const guestUser = localStorage.getItem('guestUser');
    
    if (token) {
      setIsLoggedIn(true);
      // Try to get user name from token or localStorage
      const userEmail = localStorage.getItem('userEmail') || 'User';
      setUserName(userEmail.split('@')[0]);
    } else if (guestUser) {
      setIsLoggedIn(true);
      const guest = JSON.parse(guestUser);
      setUserName(guest.name || 'Guest User');
    } else {
      setIsLoggedIn(false);
      setUserName('');
    }
  };

  const handleLogout = () => {
    playClick();
    // Set logout flag to prevent auto-creation of guest user
    localStorage.setItem('justLoggedOut', 'true');
    localStorage.removeItem('accessToken');
    localStorage.removeItem('userEmail');
    localStorage.removeItem('guestUser');
    localStorage.removeItem('scratchCards');
    setIsLoggedIn(false);
    setUserName('');
    setShowUserMenu(false);
    
    // Dispatch event to notify PointsBadge
    window.dispatchEvent(new Event('userLoggedOut'));
    
    window.location.href = '/';
  };

  const navItems = [
    { name: 'Find Recyclers', icon: MapPin, href: '/recyclers' },
    { name: 'Rewards', icon: Gift, href: '/rewards' },
    { name: 'About', icon: Info, href: '/about' },
    { name: 'Contact', icon: Phone, href: '/contact' },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-neutral-200 shadow-sm">
      {/* Points Badge - always show */}
      <PointsBadge />
      
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

          {/* Desktop Auth Buttons / User Menu */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="hidden md:flex items-center gap-4"
          >
            {isLoggedIn ? (
              <div className="relative">
                <button
                  onMouseEnter={() => playHover()}
                  onClick={() => {
                    playClick();
                    setShowUserMenu(!showUserMenu);
                  }}
                  className="flex items-center gap-2 px-4 py-2 rounded-lg hover:bg-neutral-100 transition-colors"
                >
                  <div className="w-8 h-8 bg-gradient-to-br from-primary-500 to-secondary-500 rounded-full flex items-center justify-center">
                    <User className="w-5 h-5 text-white" />
                  </div>
                  <span className="font-medium text-neutral-700">{userName}</span>
                  <ChevronDown className="w-4 h-4 text-neutral-500" />
                </button>

                <AnimatePresence>
                  {showUserMenu && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-xl border border-neutral-200 py-2"
                    >
                      <Link href="/rewards">
                        <div
                          onClick={() => {
                            playClick();
                            setShowUserMenu(false);
                          }}
                          className="flex items-center gap-2 px-4 py-2 hover:bg-neutral-100 cursor-pointer"
                        >
                          <Gift className="w-4 h-4 text-primary-600" />
                          <span className="text-neutral-700">My Rewards</span>
                        </div>
                      </Link>
                      <button
                        onClick={handleLogout}
                        className="w-full flex items-center gap-2 px-4 py-2 hover:bg-red-50 text-red-600 cursor-pointer"
                      >
                        <LogOut className="w-4 h-4" />
                        <span>Logout</span>
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ) : (
              <>
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
              </>
            )}
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
                {isLoggedIn ? (
                  <>
                    <div className="px-4 py-2 flex items-center gap-2">
                      <div className="w-8 h-8 bg-gradient-to-br from-primary-500 to-secondary-500 rounded-full flex items-center justify-center">
                        <User className="w-5 h-5 text-white" />
                      </div>
                      <span className="font-medium text-neutral-700">{userName}</span>
                    </div>
                    <Link href="/rewards">
                      <button
                        onMouseEnter={() => playHover()}
                        onClick={() => playClick()}
                        className="w-full px-4 py-3 text-neutral-700 hover:bg-neutral-100 rounded-lg font-medium transition-colors duration-200 flex items-center gap-2"
                      >
                        <Gift className="w-4 h-4" />
                        My Rewards
                      </button>
                    </Link>
                    <button
                      onClick={handleLogout}
                      className="w-full px-4 py-3 text-red-600 hover:bg-red-50 rounded-lg font-medium transition-colors duration-200 flex items-center gap-2"
                    >
                      <LogOut className="w-4 h-4" />
                      Logout
                    </button>
                  </>
                ) : (
                  <>
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
                  </>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
