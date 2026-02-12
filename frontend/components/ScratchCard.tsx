'use client';

import { useRef, useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';
import { Gift, Sparkles } from 'lucide-react';
import { useSoundEffects } from '@/hooks/useSoundEffects';

interface ScratchCardProps {
  cardId: string;
  onScratched: (reward: { type: string; value: number }) => void;
}

export default function ScratchCard({ cardId, onScratched }: ScratchCardProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isScratching, setIsScratching] = useState(false);
  const [scratchPercentage, setScratchPercentage] = useState(0);
  const [isRevealed, setIsRevealed] = useState(false);
  const [reward, setReward] = useState<{ type: string; value: number } | null>(null);
  const lastScratchSoundTime = useRef<number>(0);
  const { playClick, playSuccess, playScratch } = useSoundEffects();

  // Load reward data when component mounts
  useEffect(() => {
    const loadReward = () => {
      console.log('Loading reward for card:', cardId);
      // Check if this is a localStorage card
      const isLocalCard = cardId.length === 13;
      
      if (isLocalCard) {
        const localCards = JSON.parse(localStorage.getItem('scratchCards') || '[]');
        console.log('Local cards:', localCards);
        const card = localCards.find((c: any) => c.id === cardId);
        console.log('Found card:', card);
        if (card) {
          const rewardData = { type: card.rewardType, value: card.rewardValue };
          console.log('Setting reward:', rewardData);
          setReward(rewardData);
        }
      }
    };
    
    loadReward();
  }, [cardId]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas size
    canvas.width = 300;
    canvas.height = 200;

    // Draw scratch surface
    const gradient = ctx.createLinearGradient(0, 0, 300, 200);
    gradient.addColorStop(0, '#10b981');
    gradient.addColorStop(1, '#059669');
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, 300, 200);

    // Add text
    ctx.fillStyle = 'white';
    ctx.font = 'bold 24px Arial';
    ctx.textAlign = 'center';
    ctx.fillText('Scratch Here!', 150, 100);
    ctx.font = '16px Arial';
    ctx.fillText('🎁', 150, 130);
  }, []);

  const scratch = (x: number, y: number) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const rect = canvas.getBoundingClientRect();
    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;

    const canvasX = (x - rect.left) * scaleX;
    const canvasY = (y - rect.top) * scaleY;

    ctx.globalCompositeOperation = 'destination-out';
    ctx.beginPath();
    ctx.arc(canvasX, canvasY, 20, 0, Math.PI * 2);
    ctx.fill();

    // Calculate scratch percentage
    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    const pixels = imageData.data;
    let transparent = 0;

    for (let i = 3; i < pixels.length; i += 4) {
      if (pixels[i] === 0) transparent++;
    }

    const percentage = (transparent / (pixels.length / 4)) * 100;
    setScratchPercentage(percentage);

    if (percentage > 60 && !isRevealed) {
      revealReward();
    }
  };

  const revealReward = async () => {
    console.log('Revealing reward, current reward state:', reward);
    if (!reward) {
      console.error('No reward data available!');
      return; // Safety check
    }
    
    setIsRevealed(true);
    playSuccess();

    // Trigger confetti
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#10b981', '#3b82f6', '#f59e0b', '#ef4444'],
    });

    // Check if this is a localStorage card
    const isLocalCard = cardId.length === 13;

    if (isLocalCard) {
      console.log('Processing localStorage card');
      // Update card status in localStorage
      const localCards = JSON.parse(localStorage.getItem('scratchCards') || '[]');
      const cardIndex = localCards.findIndex((c: any) => c.id === cardId);
      if (cardIndex !== -1) {
        localCards[cardIndex].status = 'SCRATCHED';
        localStorage.setItem('scratchCards', JSON.stringify(localCards));
        console.log('Card marked as scratched');
      }

      // Update guest user points/cashback
      let guestUser = localStorage.getItem('guestUser');
      if (!guestUser) {
        // Create guest user if doesn't exist
        console.log('Creating new guest user');
        const newGuest = {
          id: 'guest-' + Date.now(),
          email: 'guest@demo.com',
          name: 'Guest User',
          tier: 'BRONZE',
          points: 0,
          cashback: 0,
          isGuest: true
        };
        localStorage.setItem('guestUser', JSON.stringify(newGuest));
        guestUser = JSON.stringify(newGuest);
      }
      
      if (guestUser) {
        const guest = JSON.parse(guestUser);
        console.log('Current guest user:', guest);
        if (reward.type === 'POINTS') {
          guest.points = (guest.points || 0) + reward.value;
          console.log('Updated points to:', guest.points);
        } else if (reward.type === 'CASHBACK') {
          guest.cashback = (guest.cashback || 0) + reward.value;
          console.log('Updated cashback to:', guest.cashback);
        }
        localStorage.setItem('guestUser', JSON.stringify(guest));
        console.log('Guest user updated:', guest);
        
        // Dispatch custom event to notify other components
        window.dispatchEvent(new Event('rewardUpdated'));
      }

      onScratched(reward);
    }
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsScratching(true);
    scratch(e.clientX, e.clientY);
    playClick();
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (isScratching) {
      scratch(e.clientX, e.clientY);
      // Play scratch sound only once every 200ms to avoid overlapping sounds
      const now = Date.now();
      if (now - lastScratchSoundTime.current > 200) {
        playScratch();
        lastScratchSoundTime.current = now;
      }
    }
  };

  const handleMouseUp = () => {
    setIsScratching(false);
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    setIsScratching(true);
    const touch = e.touches[0];
    scratch(touch.clientX, touch.clientY);
    playClick();
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (isScratching) {
      const touch = e.touches[0];
      scratch(touch.clientX, touch.clientY);
      // Play scratch sound only once every 200ms to avoid overlapping sounds
      const now = Date.now();
      if (now - lastScratchSoundTime.current > 200) {
        playScratch();
        lastScratchSoundTime.current = now;
      }
    }
  };

  const handleTouchEnd = () => {
    setIsScratching(false);
  };

  return (
    <motion.div
      initial={{ scale: 0.8, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      className="relative"
    >
      <div className="relative w-[300px] h-[200px] rounded-xl overflow-hidden shadow-2xl">
        {/* Background reward display */}
        <div className="absolute inset-0 bg-gradient-to-br from-yellow-400 via-orange-500 to-red-500 flex flex-col items-center justify-center">
          {!reward ? (
            <div className="text-white text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white mx-auto mb-2"></div>
              <div className="text-sm">Loading reward...</div>
            </div>
          ) : (
            <AnimatePresence>
              {isRevealed && (
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="text-center"
                >
                  <motion.div
                    animate={{ rotate: [0, 10, -10, 0] }}
                    transition={{ repeat: Infinity, duration: 2 }}
                  >
                    {reward.type === 'CASHBACK' ? (
                      <Gift className="w-16 h-16 text-white mx-auto mb-4" />
                    ) : (
                      <Sparkles className="w-16 h-16 text-white mx-auto mb-4" />
                    )}
                  </motion.div>
                  <div className="text-5xl font-bold text-white mb-2">
                    {reward.type === 'CASHBACK' ? `₹${reward.value}` : `${reward.value}`}
                  </div>
                  <div className="text-xl text-white font-semibold">
                    {reward.type === 'CASHBACK' ? 'Cashback!' : 'Points!'}
                  </div>
                  <div className="text-sm text-white/80 mt-2">
                    Demo reward added
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          )}
        </div>

        {/* Scratch canvas */}
        <canvas
          ref={canvasRef}
          className="absolute inset-0 cursor-pointer touch-none"
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseUp}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
          style={{ touchAction: 'none' }}
        />
      </div>

      {/* Progress indicator */}
      {!isRevealed && scratchPercentage > 0 && (
        <div className="mt-2 text-center text-sm text-gray-600">
          {Math.floor(scratchPercentage)}% revealed
        </div>
      )}
    </motion.div>
  );
}
