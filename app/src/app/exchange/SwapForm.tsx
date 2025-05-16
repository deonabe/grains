import React, { useState } from 'react';
import { useConnection, useWallet } from '@solana/wallet-adapter-react';
import { swapUSDCForGrain } from '../utils/swapUSDCForGrain'; // adjust path as needed

export const SwapForm: React.FC = () => {
  const { connection } = useConnection();
  const wallet = useWallet();

  const [inputAmount, setInputAmount] = useState<string>('');
  const [loading, setLoading] = useState(false);

  const handleSwap = async () => {
    if (!inputAmount || isNaN(Number(inputAmount))) {
      alert('Please enter a valid amount');
      return;
    }
    setLoading(true);
    try {
      await swapUSDCForGrain({
        connection,
        wallet,
        amount: parseFloat(inputAmount),
      });
      alert('Swap successful!');
      setInputAmount('');
    } catch (error) {
      console.error(error);
      alert('Swap failed');
    }
    setLoading(false);
  };

  return (
    <div style={{ maxWidth: 400, margin: 'auto' }}>
      <h2>Swap USDC for GRAIN</h2>
      <input
        type="number"
        placeholder="Amount in USDC"
        value={inputAmount}
        onChange={(e) => setInputAmount(e.target.value)}
        disabled={loading}
        style={{ width: '100%', padding: 8, marginBottom: 12 }}
      />
      <button
        onClick={handleSwap}
        disabled={loading || !wallet.connected}
        style={{
          width: '100%',
          padding: 12,
          backgroundColor: '#4CAF50',
          color: 'white',
          border: 'none',
          cursor: loading ? 'not-allowed' : 'pointer',
        }}
      >
        {loading ? 'Swapping...' : 'Swap USDC → GRAIN'}
      </button>
      {!wallet.connected && (
        <p style={{ color: 'red', marginTop: 12 }}>
          Please connect your wallet first.
        </p>
      )}
    </div>
  );
};
