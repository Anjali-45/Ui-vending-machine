import React, { createContext, useState, useContext, ReactNode } from 'react';
import { Part, RequestHistory } from '../types/types';
import { mockParts, mockRequestHistory } from '../utils/mockData';

interface InventoryContextType {
  parts: Part[];
  requestHistory: RequestHistory[];
  updatePartQuantity: (partId: string, newQuantity: number) => void;
  addRequest: (request: Omit<RequestHistory, 'id' | 'requestDate'>) => void;
}

const InventoryContext = createContext<InventoryContextType | undefined>(undefined);

export const InventoryProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [parts, setParts] = useState<Part[]>(mockParts);
  const [requestHistory, setRequestHistory] = useState<RequestHistory[]>(mockRequestHistory);

  const updatePartQuantity = (partId: string, newQuantity: number) => {
    setParts((prevParts) =>
      prevParts.map((part) =>
        part.id === partId ? { ...part, quantity: Math.max(0, newQuantity) } : part
      )
    );
  };

  const addRequest = (request: Omit<RequestHistory, 'id' | 'requestDate'>) => {
    const newRequest: RequestHistory = {
      ...request,
      id: `${requestHistory.length + 1}`,
      requestDate: new Date().toISOString(),
    };
    
    setRequestHistory((prev) => [...prev, newRequest]);
    
    // Update inventory quantities
    request.items.forEach((item) => {
      updatePartQuantity(item.id, Math.max(0, item.quantity - item.requestedQuantity));
    });
  };

  return (
    <InventoryContext.Provider
      value={{
        parts,
        requestHistory,
        updatePartQuantity,
        addRequest,
      }}
    >
      {children}
    </InventoryContext.Provider>
  );
};

export const useInventory = (): InventoryContextType => {
  const context = useContext(InventoryContext);
  if (context === undefined) {
    throw new Error('useInventory must be used within an InventoryProvider');
  }
  return context;
};