'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Coins, Gift } from 'lucide-react';
import Link from 'next/link';

export default function PointsBadge() {
  const [points, setPoints] = useState(0);
  const [cashback, setCashback] = useState(0);
  const [availableCards, setAvailableCards] = useState(0);
  const [showTooltip, setShowTooltip] = useState(false);
  const [userTier, setUserTier] = useState('BRONZE');

  useEffect(() => {
    fetchRewardsSummary();
    
    // Refresh every 5 seconds for better responsiveness
    const interval = setInterval(fetchRewardsSummary, 5000);
    
    // Listen for storage events (when localStorage changes in another tab/component)
    const handleStorageChange = () => {
      console.log('Storage changed, refreshing points badge');
      fetchRewardsSummary();
    };
    window.addEventListener('storage', handleStorageChange);
    
    // Also listen for custom event when scratch card is scratched
    const handleRewardUpdate = () => {
      console.log('Reward updated, refreshing points badge');
      fetchRewardsSummary();
    };
    window.addEventListener('rewardUpdated', handleRewardUpdate);
    
    // Listen for logout event
    const handleLogout = () => {
      console.log('User logged out, clearing badge');
      setPoints(0);
      setCashback(0);
      setAvailableCards(0);
      setUserTier('MVP');
    };
    window.addEventListener('userLoggedOut', handleLogout);
    
    return () => {
      clearInterval(interval);
      window.removeEventListener('storage', handleStorageChange);
      window.removeEventListener('rewardUpdated', handleRewardUpdate);
      window.removeEventListener('userLoggedOut', handleLogout);
    };
  }, []);

  const getTierInfo = (points: number) => {
    if (points >= 5000) return { name: 'GOLD', color: 'from-yellow-400 to-yellow-600', icon: '👑' };
    if (points >= 2000) return { name: 'SILVER', color: 'from-gray-300 to-gray-500', icon: '⭐' };
    if (points >= 500) return { name: 'BRONZE', color: 'from-orange-400 to-orange-600', icon: '🥉' };
    return { name: 'MVP', color: 'from-green-400 to-green-600', icon: '🌱' };
  };

  const fetchRewardsSummary = async () => {
    try {
      const token = localStorage.getItem('accessToken');
      
      // Check if user just logged out - don't auto-create guest user
      const justLoggedOut = localStorage.getItem('justLoggedOut');
      if (justLoggedOut) {
        console.log('User just logged out, not creating guest user');
        localStorage.removeItem('justLoggedOut');
        setPoints(0);
        setCashback(0);
        setAvailableCards(0);
        setUserTier('MVP');
        return;
      }
      
      // Check for guest user
      let guestUser = localStorage.getItem('guestUser');
      if (!guestUser && !token) {
        // Create guest user if doesn't exist and not logged in
        console.log('Creating new guest user for PointsBadge');
        const newGuest = {
          id: 'guest-' + Date.now(),
          email: 'guest@demo.com',
          name: 'Guest User',
          tier: 'MVP',
          points: 0,
          cashback: 0,
          isGuest: true
        };
        localStorage.setItem('guestUser', JSON.stringify(newGuest));
        guestUser = JSON.stringify(newGuest);
      }
      
      if (guestUser) {
        const guest = JSON.parse(guestUser);
        setPoints(guest.points || 0);
        setCashback(guest.cashback || 0);
        setUserTier(guest.tier || 'MVP');
        
        // Count localStorage cards
        const localCards = JSON.parse(localStorage.getItem('scratchCards') || '[]');
        setAvailableCards(localCards.filter((c: any) => c.status === 'AVAILABLE').length);
        return;
      }
      
      // Show badge even without login, just with 0 values
      if (!token) {
        setPoints(0);
        setCashback(0);
        setAvailableCards(0);
        setUserTier('MVP');
        return;
      }

      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/rewards/summary`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        const data = await response.json();
        setPoints(data.rewardPoints);
        setCashback(data.cashbackBalance);
        setAvailableCards(data.availableCards);
        setUserTier(getTierInfo(data.rewardPoints).name);
      }
    } catch (error) {
      console.error('Error fetching rewards:', error);
    }
  };

  const tierInfo = getTierInfo(points);

  return (
    <Link href="/rewards">
      <motion.div
        className="fixed top-20 right-4 z-50"
        initial={{ x: 100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ type: 'spring', stiffness: 260, damping: 20 }}
        onMouseEnter={() => setShowTooltip(true)}
        onMouseLeave={() => setShowTooltip(false)}
      >
        <motion.div
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className={`bg-gradient-to-r ${tierInfo.color} text-white rounded-full px-4 py-2 shadow-lg cursor-pointer relative`}
        >
          <div className="flex items-center gap-2">
            <span className="text-lg">{tierInfo.icon}</span>
            <Coins className="w-5 h-5" />
            <motion.span
              key={points}
              initial={{ scale: 1.5, color: '#fff' }}
              animate={{ scale: 1, color: '#fff' }}
              className="font-bold text-lg"
            >
              {points.toLocaleString()}
            </motion.span>
          </div>

          {/* Notification badge for available cards */}
          <AnimatePresence>
            {availableCards > 0 && (
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                exit={{ scale: 0 }}
                className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold"
              >
                {availableCards}
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        {/* Tooltip */}
        <AnimatePresence>
          {showTooltip && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="absolute top-full right-0 mt-2 bg-white text-gray-800 rounded-lg shadow-xl p-4 w-64"
            >
              <div className="space-y-2">
                <div className="flex items-center justify-between pb-2 border-b">
                  <span className="text-sm font-medium">Tier:</span>
                  <span className="text-lg font-bold flex items-center gap-1">
                    {tierInfo.icon} {tierInfo.name}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Points:</span>
                  <span className="text-lg font-bold text-orange-500">
                    {points.toLocaleString()}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Cashback:</span>
                  <span className="text-lg font-bold text-green-500">₹{cashback.toFixed(2)}</span>
                </div>
                {availableCards > 0 && (
                  <div className="flex items-center justify-between pt-2 border-t">
                    <span className="text-sm font-medium flex items-center gap-1">
                      <Gift className="w-4 h-4" />
                      Scratch Cards:
                    </span>
                    <span className="text-lg font-bold text-red-500">{availableCards}</span>
                  </div>
                )}
                <div className="pt-2 text-xs text-gray-500 text-center">
                  Click to view rewards dashboard
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </Link>
  );
}
