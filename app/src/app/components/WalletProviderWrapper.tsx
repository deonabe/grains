'use client';

import { WalletProvider, ConnectionProvider } from '@solana/wallet-adapter-react';
import { PhantomWalletAdapter, SolflareWalletAdapter } from '@solana/wallet-adapter-wallets';
import { clusterApiUrl } from '@solana/web3.js';

export const WalletProviderWrapper = ({ children }: { children: React.ReactNode }) => {
  const wallets = [new PhantomWalletAdapter(), new SolflareWalletAdapter()];
  return (
    <ConnectionProvider endpoint={clusterApiUrl('devnet')}>
      <WalletProvider wallets={wallets} autoConnect>
        {children}
      </WalletProvider>
    </ConnectionProvider>
  );
};
