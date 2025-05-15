import React, { useState } from 'react';
import { CheckCircle, AlertTriangle, X } from 'lucide-react';
import { useCart } from '../contexts/CartContext';
import { useAuth } from '../contexts/AuthContext';
import { useInventory } from '../contexts/InventoryContext';

interface CheckoutProps {
  isOpen: boolean;
  onClose: () => void;
}

const Checkout: React.FC<CheckoutProps> = ({ isOpen, onClose }) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const { items, clearCart } = useCart();
  const { currentUser } = useAuth();
  const { addRequest } = useInventory();
  
  if (!isOpen) return null;
  
  const handleSubmit = () => {
    setIsSubmitting(true);
    
    // Simulate API request
    setTimeout(() => {
      // Add the request to history
      if (currentUser) {
        addRequest({
          ticketNumber: currentUser.ticketNumber!,
          userId: currentUser.id,
          items: items,
          status: 'pending',
        });
      }
      
      setIsSubmitting(false);
      setIsSuccess(true);
      
      // Reset success state and close modal after delay
      setTimeout(() => {
        setIsSuccess(false);
        clearCart();
        onClose();
      }, 3000);
    }, 1500);
  };
  
  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      <div className="absolute inset-0 bg-black bg-opacity-50" onClick={isSubmitting ? undefined : onClose}></div>
      
      <div className="absolute inset-0 flex items-center justify-center p-4">
        <div className="bg-white rounded-lg shadow-xl w-full max-w-md">
          {/* Header */}
          <div className="flex items-center justify-between px-6 py-4 border-b">
            <h2 className="text-xl font-semibold text-gray-800">Confirm Request</h2>
            {!isSubmitting && (
              <button
                onClick={onClose}
                className="text-gray-400 hover:text-gray-500"
              >
                <X className="h-5 w-5" />
              </button>
            )}
          </div>
          
          {/* Content */}
          <div className="px-6 py-4">
            {isSuccess ? (
              <div className="text-center py-6">
                <CheckCircle className="mx-auto h-16 w-16 text-green-500 mb-4" />
                <h3 className="text-lg font-medium text-gray-900">Request Successful!</h3>
                <p className="mt-2 text-gray-600">
                  Your parts request has been submitted successfully.
                </p>
              </div>
            ) : (
              <>
                <p className="mb-4 text-gray-600">
                  Please review your request before confirming.
                </p>
                
                <div className="bg-gray-50 rounded-md p-4 mb-4">
                  <h3 className="text-sm font-medium text-gray-700 mb-2">Request Details</h3>
                  <div className="text-sm text-gray-600 space-y-2">
                    <div className="flex justify-between">
                      <span>Ticket Number:</span>
                      <span className="font-medium">{currentUser?.ticketNumber}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Requested By:</span>
                      <span className="font-medium">{currentUser?.name}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Department:</span>
                      <span className="font-medium">{currentUser?.department}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Total Items:</span>
                      <span className="font-medium">{items.length}</span>
                    </div>
                  </div>
                </div>
                
                <div className="max-h-60 overflow-y-auto mb-4">
                  <h3 className="text-sm font-medium text-gray-700 mb-2">Requested Items</h3>
                  <ul className="divide-y divide-gray-200">
                    {items.map((item) => (
                      <li key={item.id} className="py-2">
                        <div className="flex justify-between">
                          <div>
                            <span className="text-sm font-medium text-gray-800">
                              {item.name}
                            </span>
                            <p className="text-xs text-gray-500">Part #: {item.partNumber}</p>
                          </div>
                          <span className="text-sm text-gray-600">
                            Qty: {item.requestedQuantity}
                          </span>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
                
                <div className="bg-yellow-50 rounded-md p-3 mb-4">
                  <div className="flex">
                    <div className="flex-shrink-0">
                      <AlertTriangle className="h-5 w-5 text-yellow-400" />
                    </div>
                    <div className="ml-3">
                      <p className="text-sm text-yellow-700">
                        By confirming this request, you acknowledge the receipt of these items for your work purposes.
                      </p>
                    </div>
                  </div>
                </div>
              </>
            )}
          </div>
          
          {/* Footer */}
          {!isSuccess && (
            <div className="px-6 py-4 border-t bg-gray-50 rounded-b-lg flex justify-end space-x-3">
              <button
                type="button"
                disabled={isSubmitting}
                onClick={onClose}
                className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                Cancel
              </button>
              <button
                type="button"
                disabled={isSubmitting}
                onClick={handleSubmit}
                className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:bg-blue-400"
              >
                {isSubmitting ? (
                  <span className="flex items-center">
                    <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Processing...
                  </span>
                ) : (
                  'Confirm Request'
                )}
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Checkout;