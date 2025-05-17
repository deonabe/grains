'use client';

import React from 'react';
import { useWallet } from '@solana/wallet-adapter-react';
import TokenBalances from '../components/TokenBalances';

export default function PortfolioPage() {
  const { publicKey } = useWallet();

  return (
    <div className="max-w-3xl mx-auto px-6 py-16 text-black dark:text-white">
      <h1 className="text-4xl font-bold text-center text-yellow-400 mb-6">
        Your Portfolio
      </h1>

      <p className="text-center text-gray-600 dark:text-gray-300 mb-10">
        Track your token balances and holdings on Solana.
      </p>

      {publicKey ? (
        <>
          <TokenBalances />
          {/* Future: Add value breakdown, history, graphs */}
        </>
      ) : (
        <div className="text-center text-red-500 mt-10">
          Please connect your wallet to view your portfolio.
        </div>
      )}
    </div>
  );
}
