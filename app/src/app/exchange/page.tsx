'use client';

import { FC, useState } from 'react';
import { useWallet } from '@solana/wallet-adapter-react';
import { Connection, Transaction, TransactionInstruction } from '@solana/web3.js';
import SwapForm from './SwapForm';

const Exchange: FC = () => {
  const { publicKey } = useWallet();
  const [selectedTreasury, setSelectedTreasury] = useState<string | null>(null);
  const [amount, setAmount] = useState<number>(0);

  // List of available tokenized treasuries (you should fetch this data dynamically)
  const treasuries = [
    { name: 'Treasury A', address: 'address_of_treasury_A' },
    { name: 'Treasury B', address: 'address_of_treasury_B' },
  ];

  const handleTreasuryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedTreasury(e.target.value);
  };

  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAmount(Number(e.target.value));
  };

  const handleExchange = () => {
    if (!publicKey) {
      alert("Please connect your wallet to proceed.");
      return;
    }

    if (!selectedTreasury || amount <= 0) {
      alert("Please select a treasury and enter a valid amount.");
      return;
    }

    // Call the SwapForm or handle the transaction here directly
    // Example: Open the SwapForm with parameters like amount and selectedTreasury
  };

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6">Exchange USDC for Tokenized Treasuries</h1>

      {/* Select Treasury Dropdown */}
      <div className="mb-4">
        <label htmlFor="treasury" className="block text-lg mb-2">
          Select Treasury:
        </label>
        <select
          id="treasury"
          className="p-2 border rounded-md w-full"
          value={selectedTreasury || ''}
          onChange={handleTreasuryChange}
        >
          <option value="" disabled>
            -- Select Treasury --
          </option>
          {treasuries.map((treasury) => (
            <option key={treasury.address} value={treasury.address}>
              {treasury.name}
            </option>
          ))}
        </select>
      </div>

      {/* Amount Input */}
      <div className="mb-4">
        <label htmlFor="amount" className="block text-lg mb-2">
          Amount (USDC):
        </label>
        <input
          type="number"
          id="amount"
          value={amount}
          onChange={handleAmountChange}
          className="p-2 border rounded-md w-full"
        />
      </div>

      {/* Submit Button */}
      <button
        onClick={handleExchange}
        className="bg-blue-600 text-white px-6 py-2 rounded-md"
      >
        Proceed to Swap
      </button>

      {/* Show Swap Form After Exchange Button */}
      {selectedTreasury && amount > 0 && (
        <SwapForm amount={amount} treasury={selectedTreasury} />
      )}
    </div>
  );
};

export default Exchange;
