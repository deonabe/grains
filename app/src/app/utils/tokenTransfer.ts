// app/utils/tokenTransfer.ts

import {
    getAssociatedTokenAddress,
    getAccount,
    createTransferInstruction,
  } from '@solana/spl-token';
  import {
    Connection,
    PublicKey,
    Transaction,
  } from '@solana/web3.js';
  import { WalletContextState } from '@solana/wallet-adapter-react';
  
  // Constants – you MUST replace these with your real token addresses
  const USDC_MINT = new PublicKey('4zMMC9srt5Ri5X14GAgXhaHii3GnPAEERYPJgZJDncDU');
  const GRAIN_MINT = new PublicKey('8ZQ1g5pmLpgGqgmvyZhGpYuNLWz6HcRvc6kipvnLW1SX');
  const TREASURY_USDC_ACCOUNT = new PublicKey('6ir7P5771bXxpDPZ7fdiVWxhjFS2wc4gxQnuuUXpGEd2');
  const TREASURY_GRAIN_ACCOUNT = new PublicKey('7oTU8rGw3TyQK2wmuKgse6CD5H5S8trN56JGAuzNxLLe');
  
  export async function swapUSDCForGrain({
    connection,
    wallet,
    amount,
  }: {
    connection: Connection;
    wallet: WalletContextState;
    amount: number; // amount in USDC, e.g. 10 for 10 USDC
  }) {
    if (!wallet.publicKey || !wallet.signTransaction) {
      throw new Error('Wallet not connected');
    }
  
    // 1. Get user's USDC associated token account
    const userUSDC = await getAssociatedTokenAddress(USDC_MINT, wallet.publicKey);
  
    // 2. Get or create user's GRAIN associated token account
    const userGRAIN = await getAssociatedTokenAddress(GRAIN_MINT, wallet.publicKey);
  
    // 3. Create transfer instruction (user sends USDC to treasury)
    const ix1 = createTransferInstruction(
      userUSDC,
      TREASURY_USDC_ACCOUNT,
      wallet.publicKey,
      amount * 10 ** 6 // convert to smallest unit (assumes 6 decimals)
    );
  
    // 4. Create transfer instruction (treasury sends GRAIN to user)
    const ix2 = createTransferInstruction(
      TREASURY_GRAIN_ACCOUNT,
      userGRAIN,
      wallet.publicKey, // WARNING: must be authorized – fine if you're using PDA
      amount * 10 ** 6 // 1:1 swap ratio (customize this as needed)
    );
  
    const tx = new Transaction().add(ix1, ix2);
    tx.feePayer = wallet.publicKey;
  
    const latestBlockhash = await connection.getLatestBlockhash();
    tx.recentBlockhash = latestBlockhash.blockhash;
  
    const signedTx = await wallet.signTransaction(tx);
    const txid = await connection.sendRawTransaction(signedTx.serialize());
  
    await connection.confirmTransaction(txid);
    return txid;
  }
  