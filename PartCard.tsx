import React, { useState } from 'react';
import { Plus, Minus, ShoppingCart } from 'lucide-react';
import { Part } from '../types/types';
import { getInventoryStatus, getStatusColor, getStatusText } from '../utils/helpers';
import { useCart } from '../contexts/CartContext';

interface PartCardProps {
  part: Part;
}

const PartCard: React.FC<PartCardProps> = ({ part }) => {
  const [quantity, setQuantity] = useState(1);
  const { addToCart } = useCart();
  const inventoryStatus = getInventoryStatus(part.quantity);
  const statusColor = getStatusColor(inventoryStatus);
  const statusText = getStatusText(inventoryStatus);
  
  const handleIncrement = () => {
    if (quantity < part.quantity) {
      setQuantity(quantity + 1);
    }
  };
  
  const handleDecrement = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };
  
  const handleAddToCart = () => {
    if (part.quantity > 0 && quantity <= part.quantity) {
      addToCart(part, quantity);
      // Reset quantity to 1 after adding to cart
      setQuantity(1);
    }
  };
  
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden transform transition duration-300 hover:shadow-lg hover:scale-[1.02]">
      <div className="h-48 overflow-hidden bg-gray-200">
        <img
          src={part.imageUrl}
          alt={part.name}
          className="w-full h-full object-cover"
        />
      </div>
      
      <div className="p-4">
        <div className="flex justify-between items-start mb-2">
          <h3 className="font-semibold text-lg text-gray-800">{part.name}</h3>
          <span className={`text-xs px-2 py-1 rounded-full ${statusColor}`}>
            {statusText}
          </span>
        </div>
        
        <p className="text-sm text-gray-600 mb-2">{part.description}</p>
        
        <div className="flex justify-between items-center text-sm text-gray-500 mb-3">
          <span>Part #: {part.partNumber}</span>
          <span>Location: {part.location}</span>
        </div>
        
        <div className="flex justify-between items-center border-t border-gray-100 pt-3">
          <div className="text-sm font-medium">
            Available: <span className="font-bold">{part.quantity}</span>
          </div>
          
          {part.quantity > 0 ? (
            <div className="flex items-center space-x-2">
              <div className="flex items-center border border-gray-300 rounded-md">
                <button
                  onClick={handleDecrement}
                  disabled={quantity <= 1}
                  className="px-2 py-1 disabled:opacity-50"
                >
                  <Minus className="h-4 w-4" />
                </button>
                <span className="w-8 text-center">{quantity}</span>
                <button
                  onClick={handleIncrement}
                  disabled={quantity >= part.quantity}
                  className="px-2 py-1 disabled:opacity-50"
                >
                  <Plus className="h-4 w-4" />
                </button>
              </div>
              
              <button
                onClick={handleAddToCart}
                className="flex items-center space-x-1 bg-blue-600 text-white px-3 py-1 rounded-md hover:bg-blue-700 transition-colors"
              >
                <ShoppingCart className="h-4 w-4" />
                <span className="text-sm">Add</span>
              </button>
            </div>
          ) : (
            <button
              disabled
              className="bg-gray-200 text-gray-500 px-3 py-1 rounded-md cursor-not-allowed"
            >
              Out of Stock
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default PartCard;