'use client';

import React from 'react';
import { useWallet } from '@solana/wallet-adapter-react';
import TokenBalances from '../components/TokenBalances';
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from 'recharts';

const mockPortfolioData = [
  { name: 'U.S. Treasury 3M', value: 40 },
  { name: 'U.S. Treasury 6M', value: 35 },
  { name: 'U.S. Treasury 12M', value: 25 },
];

const COLORS = ['#FFB347', '#FFD700', '#FF8C00'];

export default function PortfolioPage() {
  const { publicKey } = useWallet();

  return (
    <div className="max-w-3xl mx-auto px-6 py-16 text-black dark:text-white">
      <h1 className="text-4xl font-bold text-center text-yellow-400 mb-6">
        Your Portfolio
      </h1>

      <p className="text-center text-gray-600 dark:text-gray-300 mb-10">
        View your GRAIN holdings and simulated treasury allocation.
      </p>

      {publicKey ? (
        <>
          <TokenBalances />

          {/* Simulated Allocation Breakdown */}
          <div className="mt-10 bg-white dark:bg-gray-900 p-6 rounded-xl shadow-md">
            <h2 className="text-2xl font-semibold mb-4 text-center">Simulated Allocation</h2>
            <ResponsiveContainer width="100%" height={250}>
              <PieChart>
                <Pie
                  data={mockPortfolioData}
                  dataKey="value"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  outerRadius={80}
                  label
                >
                  {mockPortfolioData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>

          {/* Placeholder for future yield tracking */}
          <div className="mt-10 p-6 rounded-xl border border-dashed border-yellow-400 text-center text-sm text-yellow-600 dark:text-yellow-300">
            🚧 Coming soon: real-time APY tracking, historical yield graphs, and staking duration ladders.
          </div>
        </>
      ) : (
        <div className="text-center text-red-500 mt-10">
          Please connect your wallet to view your portfolio.
        </div>
      )}
    </div>
  );
}
