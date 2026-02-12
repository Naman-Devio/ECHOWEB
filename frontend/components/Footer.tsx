'use client';

import { Leaf, Mail, Phone, MapPin, Facebook, Twitter, Instagram, Linkedin } from 'lucide-react';
import Link from 'next/link';
import { useSoundEffects } from '@/hooks/useSoundEffects';

export default function Footer() {
  const { playClick, playHover } = useSoundEffects();
  return (
    <footer className="bg-neutral-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 bg-gradient-to-br from-primary-500 to-secondary-500 rounded-lg flex items-center justify-center">
                <Leaf className="w-6 h-6 text-white" />
              </div>
              <span className="text-xl font-bold">E-Waste Locator</span>
            </div>
            <p className="text-neutral-400 mb-4">
              India&apos;s leading platform for responsible e-waste management. Connect with
              certified recyclers and make a difference.
            </p>
            <div className="flex gap-4">
              <a
                href="#"
                onMouseEnter={() => playHover()}
                onClick={() => playClick()}
                className="w-10 h-10 bg-neutral-800 rounded-lg flex items-center justify-center hover:bg-primary-600 transition-colors duration-200"
              >
                <Facebook className="w-5 h-5" />
              </a>
              <a
                href="#"
                onMouseEnter={() => playHover()}
                onClick={() => playClick()}
                className="w-10 h-10 bg-neutral-800 rounded-lg flex items-center justify-center hover:bg-primary-600 transition-colors duration-200"
              >
                <Twitter className="w-5 h-5" />
              </a>
              <a
                href="#"
                onMouseEnter={() => playHover()}
                onClick={() => playClick()}
                className="w-10 h-10 bg-neutral-800 rounded-lg flex items-center justify-center hover:bg-primary-600 transition-colors duration-200"
              >
                <Instagram className="w-5 h-5" />
              </a>
              <a
                href="#"
                onMouseEnter={() => playHover()}
                onClick={() => playClick()}
                className="w-10 h-10 bg-neutral-800 rounded-lg flex items-center justify-center hover:bg-primary-600 transition-colors duration-200"
              >
                <Linkedin className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-bold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/"
                  onMouseEnter={() => playHover()}
                  onClick={() => playClick()}
                  className="text-neutral-400 hover:text-primary-400 transition-colors duration-200"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  href="/recyclers"
                  onMouseEnter={() => playHover()}
                  onClick={() => playClick()}
                  className="text-neutral-400 hover:text-primary-400 transition-colors duration-200"
                >
                  Find Recyclers
                </Link>
              </li>
              <li>
                <Link
                  href="/about"
                  onMouseEnter={() => playHover()}
                  onClick={() => playClick()}
                  className="text-neutral-400 hover:text-primary-400 transition-colors duration-200"
                >
                  About Us
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  onMouseEnter={() => playHover()}
                  onClick={() => playClick()}
                  className="text-neutral-400 hover:text-primary-400 transition-colors duration-200"
                >
                  Contact
                </Link>
              </li>
              <li>
                <Link
                  href="/about"
                  onMouseEnter={() => playHover()}
                  onClick={() => playClick()}
                  className="text-neutral-400 hover:text-primary-400 transition-colors duration-200"
                >
                  Our Impact
                </Link>
              </li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h3 className="text-lg font-bold mb-4">Resources</h3>
            <ul className="space-y-2">
              <li>
                <a
                  href="/blog"
                  onMouseEnter={() => playHover()}
                  onClick={() => playClick()}
                  className="text-neutral-400 hover:text-primary-400 transition-colors duration-200"
                >
                  Blog
                </a>
              </li>
              <li>
                <a
                  href="/faq"
                  onMouseEnter={() => playHover()}
                  onClick={() => playClick()}
                  className="text-neutral-400 hover:text-primary-400 transition-colors duration-200"
                >
                  FAQ
                </a>
              </li>
              <li>
                <a
                  href="/guidelines"
                  onMouseEnter={() => playHover()}
                  onClick={() => playClick()}
                  className="text-neutral-400 hover:text-primary-400 transition-colors duration-200"
                >
                  E-Waste Guidelines
                </a>
              </li>
              <li>
                <a
                  href="/certifications"
                  onMouseEnter={() => playHover()}
                  onClick={() => playClick()}
                  className="text-neutral-400 hover:text-primary-400 transition-colors duration-200"
                >
                  Certifications
                </a>
              </li>
              <li>
                <a
                  href="/partners"
                  onMouseEnter={() => playHover()}
                  onClick={() => playClick()}
                  className="text-neutral-400 hover:text-primary-400 transition-colors duration-200"
                >
                  Partners
                </a>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-lg font-bold mb-4">Contact Us</h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-3">
                <Mail className="w-5 h-5 text-primary-400 mt-1 flex-shrink-0" />
                <div>
                  <p className="text-neutral-400">Email</p>
                  <a
                    href="mailto:info@ewaste-locator.com"
                    onMouseEnter={() => playHover()}
                    onClick={() => playClick()}
                    className="text-white hover:text-primary-400 transition-colors duration-200"
                  >
                    info@ewaste-locator.com
                  </a>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <Phone className="w-5 h-5 text-primary-400 mt-1 flex-shrink-0" />
                <div>
                  <p className="text-neutral-400">Phone</p>
                  <a
                    href="tel:+911234567890"
                    onMouseEnter={() => playHover()}
                    onClick={() => playClick()}
                    className="text-white hover:text-primary-400 transition-colors duration-200"
                  >
                    +91 123 456 7890
                  </a>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-primary-400 mt-1 flex-shrink-0" />
                <div>
                  <p className="text-neutral-400">Address</p>
                  <p className="text-white">New Delhi, India</p>
                </div>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-neutral-800 pt-8 mt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-neutral-400 text-sm">© 2026 E-Waste Locator. All rights reserved.</p>
            <div className="flex gap-6 text-sm">
              <a
                href="/privacy"
                onMouseEnter={() => playHover()}
                onClick={() => playClick()}
                className="text-neutral-400 hover:text-primary-400 transition-colors duration-200"
              >
                Privacy Policy
              </a>
              <a
                href="/terms"
                onMouseEnter={() => playHover()}
                onClick={() => playClick()}
                className="text-neutral-400 hover:text-primary-400 transition-colors duration-200"
              >
                Terms of Service
              </a>
              <a
                href="/cookies"
                onMouseEnter={() => playHover()}
                onClick={() => playClick()}
                className="text-neutral-400 hover:text-primary-400 transition-colors duration-200"
              >
                Cookie Policy
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
