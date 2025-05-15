'use client';

import { FC, ReactNode, useMemo, useState } from 'react';
import { WalletProvider } from '@solana/wallet-adapter-react';
import { PhantomWalletAdapter, SolflareWalletAdapter } from '@solana/wallet-adapter-wallets';
import { WalletModalProvider } from '@solana/wallet-adapter-react-ui';
import { clusterApiUrl } from '@solana/web3.js';

// The WalletContextProvider component will provide the necessary context for wallet connections.
const WalletContextProvider: FC<{ children: ReactNode }> = ({ children }) => {
  // Create wallet adapters (you can add more if needed)
  const wallets = useMemo(() => [
    new PhantomWalletAdapter(),
    new SolflareWalletAdapter(),
  ], []);

  // Using the devnet for testing (change to 'mainnet' or 'testnet' in production)
  const endpoint = clusterApiUrl('devnet');

  return (
    <WalletProvider wallets={wallets} autoConnect>
      <WalletModalProvider>
        {/* This will allow children components to access wallet context */}
        {children}
      </WalletModalProvider>
    </WalletProvider>
  );
};

export default WalletContextProvider;
