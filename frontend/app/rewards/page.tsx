'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Coins, Gift, TrendingUp, History, ShoppingBag, Sparkles, Flame } from 'lucide-react';
import ScratchCard from '@/components/ScratchCard';
import { useSoundEffects } from '@/hooks/useSoundEffects';

interface ScratchCard {
  id: string;
  status: string;
}

interface RewardCard {
  id: string;
  rewardType: string;
  rewardValue: number;
  expiresAt: string;
}

interface Transaction {
  id: string;
  type: string;
  amount: number;
  pointsAmount: number;
  description: string;
  createdAt: string;
}

export default function RewardsPage() {
  const [summary, setSummary] = useState({
    rewardPoints: 0,
    cashbackBalance: 0,
    totalEarned: 0,
    currentStreak: 0,
    availableCards: 0,
  });
  const [cards, setCards] = useState<RewardCard[]>([]);
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [selectedVoucher, setSelectedVoucher] = useState('');
  const [redeemAmount, setRedeemAmount] = useState(100);
  const { playClick, playSuccess } = useSoundEffects();

  useEffect(() => {
    fetchRewardsSummary();
    fetchAvailableCards();
  }, []);

  const fetchRewardsSummary = async () => {
    try {
      const token = localStorage.getItem('accessToken');

      // Check for guest user
      const guestUser = localStorage.getItem('guestUser');
      if (guestUser) {
        const guest = JSON.parse(guestUser);
        setSummary({
          rewardPoints: guest.points || 0,
          cashbackBalance: guest.cashback || 0,
          totalEarned: (guest.points || 0) * 0.1 + (guest.cashback || 0),
          currentStreak: 0,
          availableCards: 0,
        });
        setTransactions([]);
        return;
      }

      // If no token, show demo/empty state
      if (!token) {
        setSummary({
          rewardPoints: 0,
          cashbackBalance: 0,
          totalEarned: 0,
          currentStreak: 0,
          availableCards: 0,
        });
        setTransactions([]);
        return;
      }

      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/rewards/summary`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (response.ok) {
        const data = await response.json();
        setSummary(data);
        setTransactions(data.recentTransactions);
      }
    } catch (error) {
      console.error('Error fetching summary:', error);
    }
  };

  const fetchAvailableCards = async () => {
    try {
      const token = localStorage.getItem('accessToken');

      // Get cards from localStorage (for non-logged-in users)
      const localCards = JSON.parse(localStorage.getItem('scratchCards') || '[]');
      const availableLocalCards = localCards.filter(
        (card: ScratchCard) => card.status === 'AVAILABLE'
      );

      if (!token) {
        setCards(availableLocalCards);
        return;
      }

      // If logged in, get from backend and merge with local
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/rewards/cards`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (response.ok) {
        const data = await response.json();
        // Merge backend cards with local cards
        setCards([...data.cards, ...availableLocalCards]);
      } else {
        setCards(availableLocalCards);
      }
    } catch (error) {
      console.error('Error fetching cards:', error);
      // Fallback to localStorage
      const localCards = JSON.parse(localStorage.getItem('scratchCards') || '[]');
      setCards(localCards.filter((card: ScratchCard) => card.status === 'AVAILABLE'));
    }
  };

  const handleCardScratched = (reward: { type: string; value: number }) => {
    playSuccess();

    // Update local summary immediately
    if (reward.type === 'POINTS') {
      setSummary((prev) => ({
        ...prev,
        rewardPoints: prev.rewardPoints + reward.value,
        totalEarned: prev.totalEarned + reward.value * 0.1,
      }));
    } else if (reward.type === 'CASHBACK') {
      setSummary((prev) => ({
        ...prev,
        cashbackBalance: prev.cashbackBalance + reward.value,
        totalEarned: prev.totalEarned + reward.value,
      }));
    }

    // Refresh data from server/localStorage
    fetchRewardsSummary();
    fetchAvailableCards();
  };

  const handleRedeem = async () => {
    if (!selectedVoucher || redeemAmount < 100 || summary.rewardPoints < redeemAmount) return;

    playClick();

    // For guest users, convert points to cashback directly
    const guestUser = localStorage.getItem('guestUser');
    if (guestUser) {
      const guest = JSON.parse(guestUser);

      // Deduct points
      guest.points = (guest.points || 0) - redeemAmount;

      // Add cashback (100 points = ₹10)
      const cashbackToAdd = redeemAmount * 0.1;
      guest.cashback = (guest.cashback || 0) + cashbackToAdd;

      localStorage.setItem('guestUser', JSON.stringify(guest));

      playSuccess();
      alert(`Success! Converted ${redeemAmount} points to ₹${cashbackToAdd.toFixed(2)} cashback!`);

      // Update UI
      setSummary((prev) => ({
        ...prev,
        rewardPoints: guest.points,
        cashbackBalance: guest.cashback,
      }));

      // Dispatch event to update PointsBadge
      window.dispatchEvent(new Event('rewardUpdated'));

      setSelectedVoucher('');
      setRedeemAmount(100);
      return;
    }

    // For logged-in users, use backend API
    try {
      const token = localStorage.getItem('accessToken');
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/rewards/redeem`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          pointsToRedeem: redeemAmount,
          voucherType: selectedVoucher,
        }),
      });

      if (response.ok) {
        playSuccess();
        alert('Redemption request submitted! You will receive your voucher code via email.');
        fetchRewardsSummary();
        setSelectedVoucher('');
        setRedeemAmount(100);
      } else {
        const error = await response.json();
        alert(error.error || 'Redemption failed');
      }
    } catch (error) {
      console.error('Error redeeming:', error);
      alert('Redemption failed');
    }
  };

  const voucherOptions = [
    { value: 'AMAZON', label: 'Amazon', icon: '🛒' },
    { value: 'FLIPKART', label: 'Flipkart', icon: '🛍️' },
    { value: 'MYNTRA', label: 'Myntra', icon: '👗' },
    { value: 'SWIGGY', label: 'Swiggy', icon: '🍔' },
    { value: 'ZOMATO', label: 'Zomato', icon: '🍕' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-neutral-50 via-orange-50 to-yellow-50 pt-24 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-5xl font-bold text-gray-900 mb-4">Rewards Dashboard</h1>
          <p className="text-xl text-gray-600">
            Earn rewards for recycling and redeem them for amazing vouchers!
          </p>
        </motion.div>

        {/* Summary Cards */}
        <div className="grid md:grid-cols-4 gap-6 mb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-gradient-to-br from-orange-500 to-red-500 text-white rounded-2xl p-6 shadow-xl"
          >
            <Coins className="w-10 h-10 mb-4" />
            <div className="text-4xl font-bold mb-2">{summary.rewardPoints.toLocaleString()}</div>
            <div className="text-orange-100">Reward Points</div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-gradient-to-br from-green-500 to-emerald-600 text-white rounded-2xl p-6 shadow-xl"
          >
            <Gift className="w-10 h-10 mb-4" />
            <div className="text-4xl font-bold mb-2">₹{summary.cashbackBalance.toFixed(2)}</div>
            <div className="text-green-100">Cashback Balance</div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-gradient-to-br from-blue-500 to-indigo-600 text-white rounded-2xl p-6 shadow-xl"
          >
            <TrendingUp className="w-10 h-10 mb-4" />
            <div className="text-4xl font-bold mb-2">₹{summary.totalEarned.toFixed(2)}</div>
            <div className="text-blue-100">Total Earned</div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="bg-gradient-to-br from-yellow-500 to-orange-500 text-white rounded-2xl p-6 shadow-xl"
          >
            <Flame className="w-10 h-10 mb-4" />
            <div className="text-4xl font-bold mb-2">{summary.currentStreak}</div>
            <div className="text-yellow-100">Day Streak</div>
          </motion.div>
        </div>

        {/* Scratch Cards Section */}
        {cards.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-2xl p-8 shadow-xl mb-12"
          >
            <div className="flex items-center gap-3 mb-6">
              <Sparkles className="w-8 h-8 text-yellow-500" />
              <h2 className="text-3xl font-bold text-gray-900">Available Scratch Cards</h2>
            </div>
            <div className="flex flex-wrap gap-6 justify-center">
              {cards.map((card) => (
                <ScratchCard key={card.id} cardId={card.id} onScratched={handleCardScratched} />
              ))}
            </div>
          </motion.div>
        )}

        {/* Redeem Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-2xl p-8 shadow-xl mb-12"
        >
          <div className="flex items-center gap-3 mb-6">
            <ShoppingBag className="w-8 h-8 text-blue-500" />
            <h2 className="text-3xl font-bold text-gray-900">Redeem Points</h2>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Select Voucher</label>
              <div className="grid grid-cols-2 gap-3">
                {voucherOptions.map((option) => (
                  <button
                    key={option.value}
                    onClick={() => {
                      setSelectedVoucher(option.value);
                      playClick();
                    }}
                    className={`p-4 rounded-xl border-2 transition-all ${
                      selectedVoucher === option.value
                        ? 'border-orange-500 bg-orange-50'
                        : 'border-gray-200 hover:border-orange-300'
                    }`}
                  >
                    <div className="text-3xl mb-2">{option.icon}</div>
                    <div className="font-semibold text-gray-900">{option.label}</div>
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Points to Redeem (Min: 100)
              </label>
              <input
                type="number"
                min="100"
                step="100"
                value={redeemAmount}
                onChange={(e) => setRedeemAmount(parseInt(e.target.value))}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent text-gray-900 bg-white"
              />
              <div className="mt-4 p-4 bg-gray-50 rounded-xl">
                <div className="flex justify-between mb-2">
                  <span className="text-gray-600">Points:</span>
                  <span className="font-bold">{redeemAmount}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Voucher Value:</span>
                  <span className="font-bold text-green-600">
                    ₹{(redeemAmount * 0.1).toFixed(2)}
                  </span>
                </div>
              </div>
              <button
                onClick={handleRedeem}
                disabled={
                  !selectedVoucher || redeemAmount < 100 || summary.rewardPoints < redeemAmount
                }
                className={`w-full mt-4 px-6 py-3 rounded-xl font-semibold transition-all ${
                  !selectedVoucher || redeemAmount < 100 || summary.rewardPoints < redeemAmount
                    ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                    : 'bg-gradient-to-r from-orange-500 to-red-500 text-white hover:shadow-2xl hover:scale-105 animate-pulse'
                }`}
              >
                Redeem Now
              </button>
            </div>
          </div>
        </motion.div>

        {/* Transaction History */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-2xl p-8 shadow-xl"
        >
          <div className="flex items-center gap-3 mb-6">
            <History className="w-8 h-8 text-purple-500" />
            <h2 className="text-3xl font-bold text-gray-900">Recent Transactions</h2>
          </div>
          <div className="space-y-3">
            {transactions.map((tx) => (
              <div
                key={tx.id}
                className="flex items-center justify-between p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors"
              >
                <div>
                  <div className="font-medium text-gray-900">{tx.description}</div>
                  <div className="text-sm text-gray-500">
                    {new Date(tx.createdAt).toLocaleDateString()}
                  </div>
                </div>
                <div
                  className={`font-bold ${tx.pointsAmount > 0 ? 'text-green-600' : 'text-red-600'}`}
                >
                  {tx.pointsAmount > 0 ? '+' : ''}
                  {tx.pointsAmount} pts
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
