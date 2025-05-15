'use client';

import { FC, useState } from 'react';
import { useWallet, useConnection } from '@solana/wallet-adapter-react';
import { swapUSDCForGrain } from '../utils/tokenTransfer';

interface SwapFormProps {
  defaultAmount?: number;
}

const SwapForm: FC<SwapFormProps> = ({ defaultAmount = 10 }) => {
  const [amount, setAmount] = useState(defaultAmount);
  const [loading, setLoading] = useState(false);

  const { wallet, publicKey, connected } = useWallet();
  const { connection } = useConnection();
  const walletContext = useWallet();

  const handleSwap = async () => {
    if (!connected || !publicKey || !wallet) {
      alert('Connect your wallet first.');
      return;
    }

    try {
      setLoading(true);

      const txid = await swapUSDCForGrain({
        connection,
        wallet: walletContext,
        amount,
      });

      alert(`✅ Swap successful! TX ID: ${txid}`);
    } catch (err: any) {
      console.error(err);
      alert(`❌ Swap failed: ${err.message || err}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mt-6 p-4 border rounded-md bg-gray-100">
      <h2 className="text-lg font-bold mb-4">Swap USDC → GRAIN</h2>

      <div className="flex flex-col space-y-4">
        <label className="flex flex-col">
          Amount (USDC):
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(Number(e.target.value))}
            className="p-2 border rounded-md mt-1"
            min="0"
            step="0.01"
          />
        </label>

        <button
          onClick={handleSwap}
          disabled={loading}
          className={`bg-green-600 text-white px-6 py-2 rounded-md hover:bg-green-700 transition ${
            loading ? 'opacity-50 cursor-not-allowed' : ''
          }`}
        >
          {loading ? 'Swapping...' : 'Confirm Swap'}
        </button>
      </div>
    </div>
  );
};

export default SwapForm;
