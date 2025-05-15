import React, { FC, useState, useRef, useMemo } from 'react';
import { useWallet } from '@solana/wallet-adapter-react';
import { useOutsideClick } from '../hooks/useOutsideClick';  // Custom hook to close dropdown when clicking outside
import { WalletModalButton } from '@solana/wallet-adapter-react-ui'; // Wallet modal button
import { CurrentUserBadge } from './CurrentUserBadge'; // Component to show the user’s public key/ID

const ConnectWalletButton: FC = () => {
  const { publicKey, connected, connecting, disconnect } = useWallet();
  const [active, setActive] = useState(false);
  const ref = useRef<HTMLUListElement>(null);

  // Memoize the public key
  const base58 = useMemo(() => publicKey?.toBase58(), [publicKey]);

  // Handle disconnect
  const onClickDisconnect = () => {
    setActive(false);
    disconnect();
  };

  // Close the dropdown if clicked outside
  const closePopup = () => {
    setActive(false);
  };
  useOutsideClick(ref, closePopup);

  // If not connected, show the wallet modal button
  if ((!connected && !connecting) || !base58) {
    return (
      <div className="relative">
        <WalletModalButton className="bg-transparent border border-white px-4 py-2 rounded-lg">
          Connect Wallet
        </WalletModalButton>
      </div>
    );
  }

  // If connected, show the public key and dropdown with Disconnect option
  return (
    <div className="relative">
      <div onClick={() => setActive(!active)} className="cursor-pointer flex items-center">
        <CurrentUserBadge />
      </div>

      {active && (
        <ul
          aria-label="dropdown-list"
          className="absolute top-10 right-0 text-sm bg-black rounded-lg p-2 text-white"
          ref={ref}
          role="menu"
        >
          <li onClick={onClickDisconnect} role="menuitem">
            <span>Disconnect</span>
          </li>
        </ul>
      )}
    </div>
  );
};

export default ConnectWalletButton;
