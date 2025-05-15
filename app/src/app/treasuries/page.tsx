'use client';

import { useWallet } from '@solana/wallet-adapter-react';
import { useEffect, useState } from 'react';

type TreasuryOption = {
  name: string;
  yield: number;
  duration: string;
  available: boolean;
};

const mockTreasuries: TreasuryOption[] = [
  { name: 'US Treasury 3M', yield: 4.85, duration: '3 months', available: true },
  { name: 'US Treasury 6M', yield: 5.12, duration: '6 months', available: true },
  { name: 'US Treasury 12M', yield: 5.25, duration: '12 months', available: false },
];

export default function TreasuriesPage() {
  const { connected } = useWallet();
  const [treasuries, setTreasuries] = useState<TreasuryOption[]>([]);

  useEffect(() => {
    // Replace with on-chain fetch later
    setTreasuries(mockTreasuries);
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-4">Treasuries</h1>
      {!connected ? (
        <p className="text-gray-600">Connect your wallet to view treasury options.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {treasuries.map((t, index) => (
            <div
              key={index}
              className={`rounded-xl border p-4 shadow-sm transition ${
                t.available ? 'bg-white hover:shadow-md' : 'bg-gray-100 text-gray-400'
              }`}
            >
              <h2 className="text-xl font-semibold">{t.name}</h2>
              <p className="mt-1">Yield: {t.yield.toFixed(2)}%</p>
              <p className="mt-1">Duration: {t.duration}</p>
              {t.available ? (
                <button className="mt-3 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">
                  Allocate
                </button>
              ) : (
                <p className="mt-3 italic">Unavailable</p>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
