import React, { createContext, useContext, useState } from 'react';

// Create a Context for the wallet
const WalletContext = createContext();

// Create a provider component
export const WalletProvider = ({ children }) => {
  const [wallet, setWallet] = useState(2000); // Default balance

  return (
    <WalletContext.Provider value={{ wallet, setWallet }}>
      {children}
    </WalletContext.Provider>
  );
};

// Custom hook to use the wallet context
export const useWallet = () => useContext(WalletContext);

// UniversalWallet Component
const Universalwallet = () => {
  const { wallet } = useWallet();
  return (
    <div className="universalwallet">
      <p>Wallet Balance: ₹{wallet.toFixed(2)}</p>
    </div>
  );
};

export default Universalwallet;
