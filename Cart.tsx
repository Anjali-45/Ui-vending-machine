import React from 'react';
import { X, ShoppingCart, Trash2, ChevronRight } from 'lucide-react';
import { useCart } from '../contexts/CartContext';
import { useAuth } from '../contexts/AuthContext';
import { useInventory } from '../contexts/InventoryContext';

interface CartProps {
  isOpen: boolean;
  onClose: () => void;
  onCheckout: () => void;
}

const Cart: React.FC<CartProps> = ({ isOpen, onClose, onCheckout }) => {
  const { items, removeFromCart, updateQuantity, getTotalItems, clearCart } = useCart();
  const { currentUser } = useAuth();
  const { parts } = useInventory();
  
  if (!isOpen) return null;
  
  const handleCheckout = () => {
    if (items.length > 0) {
      onCheckout();
    }
  };
  
  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      <div className="absolute inset-0 bg-black bg-opacity-50" onClick={onClose}></div>
      
      <div className="absolute inset-y-0 right-0 max-w-full flex">
        <div className="relative w-screen max-w-md">
          <div className="h-full flex flex-col bg-white shadow-xl">
            {/* Header */}
            <div className="flex items-center justify-between px-4 py-3 bg-blue-600 text-white">
              <div className="flex items-center space-x-2">
                <ShoppingCart className="h-5 w-5" />
                <h2 className="text-lg font-medium">Your Cart ({getTotalItems()})</h2>
              </div>
              <button
                onClick={onClose}
                className="rounded-md p-2 hover:bg-blue-700 focus:outline-none"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            
            {/* Cart Items */}
            <div className="flex-1 overflow-y-auto p-4">
              {items.length === 0 ? (
                <div className="text-center py-10">
                  <ShoppingCart className="mx-auto h-12 w-12 text-gray-300 mb-4" />
                  <h3 className="text-lg font-medium text-gray-700">Your cart is empty</h3>
                  <p className="mt-1 text-gray-500">
                    Browse the parts catalog and add items to your cart.
                  </p>
                </div>
              ) : (
                <ul className="divide-y divide-gray-200">
                  {items.map((item) => {
                    const currentPartStock = parts.find(p => p.id === item.id)?.quantity || 0;
                    
                    return (
                      <li key={item.id} className="py-4">
                        <div className="flex items-start space-x-3">
                          <div className="flex-shrink-0 w-16 h-16 bg-gray-200 rounded-md overflow-hidden">
                            <img
                              src={item.imageUrl}
                              alt={item.name}
                              className="w-full h-full object-cover"
                            />
                          </div>
                          
                          <div className="flex-1 min-w-0">
                            <h4 className="text-base font-medium text-gray-800">{item.name}</h4>
                            <p className="text-sm text-gray-500">Part #: {item.partNumber}</p>
                            
                            <div className="mt-2 flex items-center space-x-2">
                              <span className="text-sm text-gray-600">Qty:</span>
                              <select
                                value={item.requestedQuantity}
                                onChange={(e) => updateQuantity(item.id, parseInt(e.target.value))}
                                className="border border-gray-300 rounded-md text-sm p-1"
                              >
                                {Array.from({ length: Math.min(currentPartStock, 10) }, (_, i) => i + 1).map((num) => (
                                  <option key={num} value={num}>
                                    {num}
                                  </option>
                                ))}
                              </select>
                            </div>
                          </div>
                          
                          <button
                            onClick={() => removeFromCart(item.id)}
                            className="text-gray-400 hover:text-red-500"
                          >
                            <Trash2 className="h-5 w-5" />
                          </button>
                        </div>
                      </li>
                    );
                  })}
                </ul>
              )}
            </div>
            
            {/* Footer */}
            <div className="border-t border-gray-200 p-4 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-base font-medium text-gray-700">Ticket Number:</span>
                <span className="text-base font-medium">{currentUser?.ticketNumber}</span>
              </div>
              
              <div className="flex items-center justify-between">
                <span className="text-base font-medium text-gray-700">Total Items:</span>
                <span className="text-base font-medium">{getTotalItems()}</span>
              </div>
              
              <div className="grid grid-cols-2 gap-2">
                <button
                  onClick={clearCart}
                  className="flex justify-center items-center px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
                >
                  Clear Cart
                </button>
                
                <button
                  onClick={handleCheckout}
                  disabled={items.length === 0}
                  className="flex justify-center items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed"
                >
                  Checkout
                  <ChevronRight className="ml-1 h-4 w-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;