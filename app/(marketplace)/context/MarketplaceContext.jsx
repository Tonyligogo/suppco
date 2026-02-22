import React, { createContext, useContext } from 'react';
import { useCompare } from '../hooks/useCompare';
import { useCart } from '../hooks/useCart';

const MarketplaceContext = createContext(undefined);

export function MarketplaceProvider({ children }) {
  const cart = useCart();
  const compare = useCompare();

  return (
    <MarketplaceContext.Provider value={{ ...cart, ...compare }}>
      {children}
    </MarketplaceContext.Provider>
  );
}

export function useMarketplace() {
  const context = useContext(MarketplaceContext);
  if (!context) {
    throw new Error('useMarketplace must be used within a MarketplaceProvider');
  }
  return context;
}
