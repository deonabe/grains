'use client';

import React, { FC, useEffect, useState } from 'react';
import { useWallet, useConnection } from '@solana/wallet-adapter-react';
import { PublicKey } from '@solana/web3.js';
import {
  getAssociatedTokenAddress,
  AccountLayout,
} from '@solana/spl-token';
import { DEMO_MODE } from '../utils/constants';

interface Props {
  refreshKey?: number;
  lastSwapAmount?: number;
}

const USDC_MINT = new PublicKey('4zMMC9srt5Ri5X14GAgXhaHii3GnPAEERYPJgZJDncDU');
const GRAIN_MINT = new PublicKey('8ZQ1g5pmLpgGqgmvyZhGpYuNLWz6HcRvc6kipvnLW1SX');

const TokenBalances: FC<Props> = ({ refreshKey, lastSwapAmount }) => {
  const { publicKey } = useWallet();
  const { connection } = useConnection();

  const [usdcBalance, setUsdcBalance] = useState<number | null>(250);
  const [grainBalance, setGrainBalance] = useState<number | null>(750);

  const fetchBalances = async () => {
    if (!publicKey) return;

    if (DEMO_MODE) {
      const swapUSDC = lastSwapAmount ?? 0;
      console.log(`🧪 Demo mode: simulating swap of ${swapUSDC} USDC`);
      setUsdcBalance((prev) => (prev !== null ? prev - swapUSDC : 250 - swapUSDC));
      setGrainBalance((prev) => (prev !== null ? prev + swapUSDC * 10 : swapUSDC * 10));
      return;
    }

    try {
      const usdcAta = await getAssociatedTokenAddress(USDC_MINT, publicKey);
      const grainAta = await getAssociatedTokenAddress(GRAIN_MINT, publicKey);

      const usdcInfo = await connection.getAccountInfo(usdcAta);
      const grainInfo = await connection.getAccountInfo(grainAta);

      if (usdcInfo) {
        const data = AccountLayout.decode(usdcInfo.data);
        setUsdcBalance(Number(data.amount) / 1_000_000);
      } else {
        setUsdcBalance(0);
      }

      if (grainInfo) {
        const data = AccountLayout.decode(grainInfo.data);
        setGrainBalance(Number(data.amount) / 1_000_000_000);
      } else {
        setGrainBalance(0);
      }
    } catch (err) {
      console.error('Error fetching balances:', err);
      setUsdcBalance(null);
      setGrainBalance(null);
    }
  };

  useEffect(() => {
    fetchBalances();
  }, [refreshKey, publicKey]);

  return (
    <div className="mt-8 bg-gray-100 dark:bg-gray-800 p-6 rounded-lg shadow-md">
      <h3 className="text-xl font-semibold mb-4">Your Balances</h3>

      {publicKey ? (
        <ul className="space-y-2 text-sm">
          <li>
            <strong>USDC:</strong>{' '}
            {usdcBalance !== null ? `${usdcBalance.toFixed(2)} USDC` : 'Loading...'}
          </li>
          <li>
            <strong>GRAIN:</strong>{' '}
            {grainBalance !== null ? `${grainBalance.toFixed(4)} GRAIN` : 'Loading...'}
          </li>
        </ul>
      ) : (
        <p className="text-red-500">Please connect your wallet to view balances.</p>
      )}

      <button
        onClick={fetchBalances}
        className="mt-6 bg-gradient-to-r from-[#9945FF] to-[#14F195] text-white px-4 py-2 rounded-full font-semibold hover:opacity-90 transition"
      >
        Refresh Balances
      </button>
    </div>
  );
};

export default TokenBalances;
