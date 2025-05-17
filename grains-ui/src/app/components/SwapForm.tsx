'use client';

import React, { useState } from 'react';
import { useConnection, useWallet } from '@solana/wallet-adapter-react';
import { swapUSDCForGrain } from '../utils/swapUSDCForGrain';

interface SwapFormProps {
  onSwapComplete?: (amount: number) => void;
  selectedTreasury: string;
}

export const SwapForm: React.FC<SwapFormProps> = ({
  onSwapComplete,
  selectedTreasury,
}) => {
  const { connection } = useConnection();
  const wallet = useWallet();

  const [inputAmount, setInputAmount] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSwap = async () => {
    const amount = parseFloat(inputAmount);
    if (!inputAmount || isNaN(amount) || amount <= 0) {
      alert('Please enter a valid amount greater than 0');
      return;
    }

    setLoading(true);
    try {
      const txSig = await swapUSDCForGrain({
        connection,
        wallet,
        amount,
        treasuryAddress: selectedTreasury,
      });
      alert(`✅ Swap successful!\n${txSig.startsWith('SIMULATED') ? 'Simulated transaction' : `View: https://explorer.solana.com/tx/${txSig}?cluster=devnet`}`);
      setInputAmount('');
      onSwapComplete?.(amount);
    } catch (error) {
      console.error(error);
      alert('❌ Swap failed. Check console for details.');
    }
    setLoading(false);
  };

  return (
    <div className="bg-gray-50 dark:bg-gray-900 border border-gray-300 dark:border-gray-700 p-6 rounded-lg shadow-lg mt-6">
      <h2 className="text-lg font-semibold mb-4 text-center">Swap USDC for GRAIN</h2>

      <input
        type="number"
        placeholder="Enter amount (USDC)"
        value={inputAmount}
        onChange={(e) => setInputAmount(e.target.value)}
        disabled={loading}
        step="0.01"
        min="0"
        className="w-full px-4 py-2 mb-4 rounded border bg-white dark:bg-gray-800 dark:text-white"
      />

      <button
        onClick={handleSwap}
        disabled={loading || !wallet.connected}
        className="w-full bg-gradient-to-r from-[#9945FF] to-[#14F195] text-white font-semibold px-4 py-3 rounded-full hover:opacity-90 transition"
      >
        {loading ? 'Swapping...' : 'Swap USDC → GRAIN'}
      </button>

      {!wallet.connected && (
        <p className="text-red-500 text-sm mt-4 text-center">Please connect your wallet first.</p>
      )}
    </div>
  );
};
