'use client';

import React, { useState, useRef, useMemo } from 'react';
import { useWallet } from '@solana/wallet-adapter-react';
import { WalletModalButton } from '@solana/wallet-adapter-react-ui';
import { useOutsideClick } from '../hooks/useOutsideClick'; // Optional helper

const ConnectWalletButton: React.FC = () => {
  const { publicKey, connected, disconnect } = useWallet();
  const [menuOpen, setMenuOpen] = useState(false);
  const dropdownRef = useRef<HTMLUListElement>(null!);

  const shortAddress = useMemo(() => {
    if (!publicKey) return '';
    const base58 = publicKey.toBase58();
    return `${base58.slice(0, 4)}...${base58.slice(-4)}`;
  }, [publicKey]);

  // Close dropdown when clicking outside
  useOutsideClick(dropdownRef, () => setMenuOpen(false));

  if (!connected || !publicKey) {
    return (
      <WalletModalButton className="bg-gradient-to-r from-[#9945FF] to-[#14F195] text-white font-semibold px-4 py-2 rounded-lg shadow hover:opacity-90 transition" />
    );
  }

  return (
    <div className="relative">
      <button
        onClick={() => setMenuOpen((prev) => !prev)}
        className="bg-gradient-to-r from-[#9945FF] to-[#14F195] text-white font-semibold px-4 py-2 rounded-lg shadow hover:opacity-90 transition"
      >
        {shortAddress}
      </button>

      {menuOpen && (
        <ul
          ref={dropdownRef}
          className="absolute right-0 mt-2 w-40 bg-black text-white border border-gray-700 rounded-lg shadow-lg z-50"
        >
          <li
            className="cursor-pointer hover:bg-gray-800 px-4 py-2 rounded"
            onClick={() => {
              disconnect();
              setMenuOpen(false);
            }}
          >
            Disconnect
          </li>
        </ul>
      )}
    </div>
  );
};

export default ConnectWalletButton;
