'use client';

import { useEffect, useState, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Leaf, Recycle, Sparkles, TrendingUp } from 'lucide-react';
import Link from 'next/link';
import { useSoundEffects } from '@/hooks/useSoundEffects';

interface MaterialBreakdown {
  goldGrams: number;
  silverGrams: number;
  copperKg: number;
  aluminumKg: number;
  plasticKg: number;
}

interface ImpactStatsCounterProps {
  eWasteDiverted: number;
  co2Saved: number;
  materialsRecovered: MaterialBreakdown;
}

function AnimatedCounter({
  value,
  duration = 2000,
  playTick,
}: {
  value: number;
  duration?: number;
  playTick?: () => void;
}) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  const lastTickRef = useRef(0);

  useEffect(() => {
    if (!isInView) return;

    let startTime: number;
    let animationFrame: number;

    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      const newCount = Math.floor(progress * value);

      setCount(newCount);

      // Play tick sound every 10% of progress
      if (
        playTick &&
        newCount > lastTickRef.current &&
        newCount % Math.max(1, Math.floor(value / 20)) === 0
      ) {
        playTick();
        lastTickRef.current = newCount;
      }

      if (progress < 1) {
        animationFrame = requestAnimationFrame(animate);
      }
    };

    animationFrame = requestAnimationFrame(animate);

    return () => cancelAnimationFrame(animationFrame);
  }, [value, duration, isInView, playTick]);

  return <span ref={ref}>{count.toLocaleString()}</span>;
}

export default function ImpactStatsCounter({
  eWasteDiverted,
  co2Saved,
  materialsRecovered,
}: ImpactStatsCounterProps) {
  const totalMaterials =
    materialsRecovered.copperKg + materialsRecovered.aluminumKg + materialsRecovered.plasticKg;
  const { playTick, playClick, playHover } = useSoundEffects();

  return (
    <section className="py-20 bg-gradient-to-br from-neutral-900 via-primary-900 to-secondary-900 text-white relative overflow-hidden">
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-10">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}
        />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full mb-4">
            <Sparkles className="w-5 h-5 text-primary-300" />
            <span className="text-sm font-medium">Real-Time Impact</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Our Collective Environmental Impact
          </h2>
          <p className="text-xl text-neutral-300 max-w-2xl mx-auto">
            Together, we&apos;re making a measurable difference in India&apos;s e-waste crisis
          </p>
        </motion.div>

        {/* Main stats */}
        <div className="grid md:grid-cols-3 gap-8 mb-12">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="bg-white/10 backdrop-blur-md rounded-2xl p-8 border border-white/20 hover:bg-white/15 transition-all duration-300 hover:scale-105"
          >
            <div className="flex items-center justify-between mb-4">
              <Recycle className="w-12 h-12 text-primary-400" />
              <TrendingUp className="w-6 h-6 text-green-400" />
            </div>
            <div className="text-5xl font-bold mb-2">
              <AnimatedCounter value={Math.floor(eWasteDiverted / 1000)} playTick={playTick} />
              <span className="text-3xl ml-1">Tons</span>
            </div>
            <p className="text-neutral-300 text-lg">E-Waste Diverted from Landfills</p>
            <div className="mt-4 pt-4 border-t border-white/20">
              <p className="text-sm text-neutral-400">
                Equivalent to{' '}
                <span className="text-white font-semibold">
                  {Math.floor(eWasteDiverted / 2).toLocaleString()}
                </span>{' '}
                laptops recycled
              </p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="bg-white/10 backdrop-blur-md rounded-2xl p-8 border border-white/20 hover:bg-white/15 transition-all duration-300 hover:scale-105"
          >
            <div className="flex items-center justify-between mb-4">
              <Leaf className="w-12 h-12 text-green-400" />
              <TrendingUp className="w-6 h-6 text-green-400" />
            </div>
            <div className="text-5xl font-bold mb-2">
              <AnimatedCounter value={Math.floor(co2Saved / 1000)} playTick={playTick} />
              <span className="text-3xl ml-1">Tons</span>
            </div>
            <p className="text-neutral-300 text-lg">CO₂ Emissions Prevented</p>
            <div className="mt-4 pt-4 border-t border-white/20">
              <p className="text-sm text-neutral-400">
                Equal to planting{' '}
                <span className="text-white font-semibold">
                  {Math.floor((co2Saved / 1000) * 50).toLocaleString()}
                </span>{' '}
                trees
              </p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="bg-white/10 backdrop-blur-md rounded-2xl p-8 border border-white/20 hover:bg-white/15 transition-all duration-300 hover:scale-105"
          >
            <div className="flex items-center justify-between mb-4">
              <Sparkles className="w-12 h-12 text-yellow-400" />
              <TrendingUp className="w-6 h-6 text-green-400" />
            </div>
            <div className="text-5xl font-bold mb-2">
              <AnimatedCounter value={Math.floor(totalMaterials)} playTick={playTick} />
              <span className="text-3xl ml-1">Kg</span>
            </div>
            <p className="text-neutral-300 text-lg">Precious Materials Recovered</p>
            <div className="mt-4 pt-4 border-t border-white/20">
              <p className="text-sm text-neutral-400">
                Including{' '}
                <span className="text-yellow-400 font-semibold">
                  {materialsRecovered.goldGrams}g gold
                </span>{' '}
                &{' '}
                <span className="text-gray-300 font-semibold">
                  {materialsRecovered.silverGrams}g silver
                </span>
              </p>
            </div>
          </motion.div>
        </div>

        {/* Material breakdown */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10"
        >
          <h3 className="text-xl font-semibold mb-4 text-center">Material Recovery Breakdown</h3>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            {[
              {
                label: 'Gold',
                value: materialsRecovered.goldGrams,
                unit: 'g',
                color: 'text-yellow-400',
              },
              {
                label: 'Silver',
                value: materialsRecovered.silverGrams,
                unit: 'g',
                color: 'text-gray-300',
              },
              {
                label: 'Copper',
                value: materialsRecovered.copperKg,
                unit: 'kg',
                color: 'text-orange-400',
              },
              {
                label: 'Aluminum',
                value: materialsRecovered.aluminumKg,
                unit: 'kg',
                color: 'text-blue-300',
              },
              {
                label: 'Plastic',
                value: materialsRecovered.plasticKg,
                unit: 'kg',
                color: 'text-green-300',
              },
            ].map((material, index) => (
              <div key={index} className="text-center">
                <div className={`text-2xl font-bold ${material.color}`}>
                  <AnimatedCounter value={Math.floor(material.value)} />
                  <span className="text-sm ml-1">{material.unit}</span>
                </div>
                <p className="text-sm text-neutral-400 mt-1">{material.label}</p>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Call to action */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="text-center mt-12"
        >
          <p className="text-lg text-neutral-300 mb-4">
            Join the movement and contribute to a sustainable future
          </p>
          <Link href="/recyclers">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onMouseEnter={() => playHover()}
              onClick={() => playClick()}
              className="px-8 py-4 bg-gradient-to-r from-primary-500 to-secondary-500 text-white rounded-xl font-semibold text-lg shadow-lg hover:shadow-xl transition-all duration-300"
            >
              Start Recycling Today
            </motion.button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
