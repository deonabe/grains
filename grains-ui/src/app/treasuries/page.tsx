import React from 'react';
import Link from 'next/link';

const treasuries = [
  {
    id: '3m',
    name: 'U.S. Treasury 3M',
    duration: '3 months',
    apy: '4.85%',
    available: true,
  },
  {
    id: '6m',
    name: 'U.S. Treasury 6M',
    duration: '6 months',
    apy: '5.12%',
    available: true,
  },
  {
    id: '12m',
    name: 'U.S. Treasury 12M',
    duration: '12 months',
    apy: '5.25%',
    available: false,
  },
];

export default function TreasuriesPage() {
  return (
    <div className="max-w-4xl mx-auto px-6 py-16 text-black dark:text-white">
      <h1 className="text-4xl font-bold text-center mb-10 text-yellow-400">Treasuries</h1>

      <p className="text-center text-gray-600 dark:text-gray-300 mb-12">
        Explore tokenized U.S. Treasury options. Simulated APYs for demo purposes.
      </p>

      <div className="grid gap-6 sm:grid-cols-2">
        {treasuries.map((t) => (
          <div
            key={t.id}
            className={`rounded-xl p-6 border shadow-lg transition ${
              t.available
                ? 'border-green-400 dark:border-green-500'
                : 'border-gray-300 dark:border-gray-600 opacity-60'
            }`}
          >
            <h2 className="text-xl font-semibold mb-2">{t.name}</h2>
            <p className="text-sm mb-1">Duration: {t.duration}</p>
            <p className="text-sm mb-3">APY: {t.apy}</p>

            {t.available ? (
              <Link
                href={`/exchange?treasury=${encodeURIComponent(t.name)}`}
                className="bg-green-600 hover:bg-green-700 text-white font-medium px-4 py-2 rounded inline-block text-center"
              >
                Allocate
              </Link>
            ) : (
              <span className="text-sm text-gray-400 italic">Coming soon</span>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
