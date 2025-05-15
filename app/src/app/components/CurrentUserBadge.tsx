import { FC } from 'react';
import { useWallet } from '@solana/wallet-adapter-react';

export const CurrentUserBadge: FC = () => {
  const { publicKey } = useWallet();

  return (
    <div className="flex items-center space-x-2">
      <div className="rounded-full bg-gray-200 w-8 h-8">
        {/* Optionally display an avatar */}
      </div>
      <span className="text-white text-sm">
        {publicKey ? `${publicKey.toBase58().slice(0, 6)}...${publicKey.toBase58().slice(-4)}` : 'Not Connected'}
      </span>
    </div>
  );
};
