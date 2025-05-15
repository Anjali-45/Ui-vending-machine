import React, { useState } from 'react';
import Header from './components/Header';
import TicketValidation from './components/TicketValidation';
import PartsList from './components/PartsList';
import Cart from './components/Cart';
import Checkout from './components/Checkout';
import RequestHistory from './components/RequestHistory';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import { CartProvider } from './contexts/CartContext';
import { InventoryProvider } from './contexts/InventoryContext';

function MainApp() {
  const { isAuthenticated } = useAuth();
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  
  const handleCartClick = () => {
    setIsCartOpen(true);
  };
  
  const handleCheckout = () => {
    setIsCartOpen(false);
    setIsCheckoutOpen(true);
  };
  
  return (
    <div className="min-h-screen bg-gray-100">
      <Header onCartClick={handleCartClick} />
      
      <main className="container mx-auto px-4 py-6">
        {!isAuthenticated ? (
          <div className="my-12">
            <TicketValidation />
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="md:col-span-2">
              <PartsList />
            </div>
            <div className="md:col-span-1">
              <h2 className="text-2xl font-bold text-gray-800 mb-6">Request History</h2>
              <RequestHistory />
            </div>
          </div>
        )}
      </main>
      
      <Cart 
        isOpen={isCartOpen} 
        onClose={() => setIsCartOpen(false)} 
        onCheckout={handleCheckout} 
      />
      
      <Checkout 
        isOpen={isCheckoutOpen} 
        onClose={() => setIsCheckoutOpen(false)} 
      />
    </div>
  );
}

function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <InventoryProvider>
          <MainApp />
        </InventoryProvider>
      </CartProvider>
    </AuthProvider>
  );
}

export default App;