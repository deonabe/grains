'use client';

import React, { useEffect, useState } from 'react';
import { useWallet } from '@solana/wallet-adapter-react';
import { useSearchParams } from 'next/navigation';
import { SwapForm } from '../components/SwapForm';
import TokenBalances from '../components/TokenBalances';

export default function ExchangePage() {
  const { publicKey } = useWallet();
  const searchParams = useSearchParams();
  const [selectedTreasury, setSelectedTreasury] = useState<string | null>(null);
  const [refreshKey, setRefreshKey] = useState(0);
  const [lastSwapAmount, setLastSwapAmount] = useState(0);

  const treasuries = [
    { name: 'U.S. Treasury 3M', address: 'address_of_treasury_A' },
    { name: 'U.S. Treasury 6M', address: 'address_of_treasury_B' },
  ];

  useEffect(() => {
    const queryTreasury = searchParams.get('treasury');
    if (queryTreasury) {
      const match = treasuries.find((t) => t.name === queryTreasury);
      if (match) setSelectedTreasury(match.address);
    }
  }, [searchParams]);

  const handleSwapComplete = (amountSwapped: number) => {
    setLastSwapAmount(amountSwapped);
    setRefreshKey((prev) => prev + 1);
  };

  return (
    <div className="max-w-2xl mx-auto px-6 py-16 text-black dark:text-white">
      <h1 className="text-4xl font-bold text-center mb-6 text-yellow-400">
        Swap USDC → GRAIN
      </h1>
      <p className="text-center text-gray-600 dark:text-gray-300 mb-10">
        Choose a Treasury to start swapping your USDC into tokenized GRAIN.
      </p>

      <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl shadow-lg p-6 space-y-6">
        <div>
          <label className="block text-sm font-semibold mb-2">Select Treasury</label>
          <select
            className="w-full p-3 rounded border bg-white dark:bg-gray-800 dark:text-white focus:ring-2 focus:ring-yellow-300 transition"
            value={selectedTreasury || ''}
            onChange={(e) => setSelectedTreasury(e.target.value)}
          >
            <option value="" disabled>-- Choose a Treasury --</option>
            {treasuries.map((t) => (
              <option key={t.address} value={t.address}>{t.name}</option>
            ))}
          </select>
        </div>

        {selectedTreasury && (
          <>
            <SwapForm
              selectedTreasury={selectedTreasury}
              onSwapComplete={handleSwapComplete}
            />
            <TokenBalances refreshKey={refreshKey} lastSwapAmount={lastSwapAmount} />
          </>
        )}

        {!publicKey && (
          <p className="text-red-500 text-sm text-center">
            Please connect your wallet to begin.
          </p>
        )}
      </div>
    </div>
  );
}
