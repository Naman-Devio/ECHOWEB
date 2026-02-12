'use client';

import { useEffect, useState } from 'react';

export default function DebugRewardsPage() {
  const [guestUser, setGuestUser] = useState<any>(null);
  const [scratchCards, setScratchCards] = useState<any[]>([]);

  useEffect(() => {
    loadData();
    const interval = setInterval(loadData, 1000);
    return () => clearInterval(interval);
  }, []);

  const loadData = () => {
    const guest = localStorage.getItem('guestUser');
    const cards = localStorage.getItem('scratchCards');
    
    setGuestUser(guest ? JSON.parse(guest) : null);
    setScratchCards(cards ? JSON.parse(cards) : []);
  };

  const clearData = () => {
    localStorage.removeItem('guestUser');
    localStorage.removeItem('scratchCards');
    loadData();
  };

  return (
    <div className="min-h-screen bg-gray-100 pt-24 p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">Debug Rewards System</h1>
        
        <button
          onClick={clearData}
          className="mb-6 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
        >
          Clear All Data
        </button>

        <div className="bg-white rounded-lg p-6 mb-6">
          <h2 className="text-xl font-bold mb-4">Guest User Data</h2>
          <pre className="bg-gray-100 p-4 rounded overflow-auto">
            {JSON.stringify(guestUser, null, 2)}
          </pre>
        </div>

        <div className="bg-white rounded-lg p-6">
          <h2 className="text-xl font-bold mb-4">Scratch Cards</h2>
          <pre className="bg-gray-100 p-4 rounded overflow-auto">
            {JSON.stringify(scratchCards, null, 2)}
          </pre>
        </div>
      </div>
    </div>
  );
}
