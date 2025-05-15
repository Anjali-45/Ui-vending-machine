import React from 'react';
import { Clock, CheckCircle, AlertCircle } from 'lucide-react';
import { useInventory } from '../contexts/InventoryContext';
import { useAuth } from '../contexts/AuthContext';
import { formatDate } from '../utils/helpers';

const RequestHistory: React.FC = () => {
  const { requestHistory } = useInventory();
  const { currentUser } = useAuth();
  
  // Filter history for current user
  const userHistory = requestHistory.filter(
    (req) => req.userId === currentUser?.id
  ).sort((a, b) => new Date(b.requestDate).getTime() - new Date(a.requestDate).getTime());
  
  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed':
        return <CheckCircle className="h-5 w-5 text-green-500" />;
      case 'pending':
        return <Clock className="h-5 w-5 text-amber-500" />;
      case 'rejected':
        return <AlertCircle className="h-5 w-5 text-red-500" />;
      default:
        return null;
    }
  };
  
  const getStatusClass = (status: string) => {
    switch (status) {
      case 'completed':
        return 'bg-green-100 text-green-800';
      case 'pending':
        return 'bg-amber-100 text-amber-800';
      case 'rejected':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };
  
  if (userHistory.length === 0) {
    return (
      <div className="bg-white rounded-lg shadow-md p-8 text-center">
        <Clock className="mx-auto h-12 w-12 text-gray-300 mb-4" />
        <h3 className="text-xl font-medium text-gray-700 mb-2">No request history</h3>
        <p className="text-gray-500">
          Your part requests will appear here once you make your first request.
        </p>
      </div>
    );
  }
  
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <div className="px-6 py-4 bg-gray-50 border-b">
        <h3 className="text-lg font-medium text-gray-800">Your Request History</h3>
      </div>
      
      <ul className="divide-y divide-gray-200">
        {userHistory.map((request) => (
          <li key={request.id} className="p-4 hover:bg-gray-50 transition-colors">
            <div className="flex items-start justify-between mb-2">
              <div className="flex items-center space-x-2">
                <div className="font-medium text-gray-900">
                  Request #{request.id}
                </div>
                <div className={`text-xs px-2 py-1 rounded-full ${getStatusClass(request.status)}`}>
                  {request.status.charAt(0).toUpperCase() + request.status.slice(1)}
                </div>
              </div>
              <div className="flex items-center space-x-1 text-sm text-gray-500">
                <Clock className="h-4 w-4" />
                <span>{formatDate(request.requestDate)}</span>
              </div>
            </div>
            
            <div className="text-sm text-gray-500 mb-2">
              Ticket: {request.ticketNumber}
            </div>
            
            <div className="mt-2">
              <h4 className="text-sm font-medium text-gray-700 mb-1">Items:</h4>
              <ul className="text-sm text-gray-600 space-y-1">
                {request.items.map((item) => (
                  <li key={item.id} className="flex justify-between">
                    <span>{item.name}</span>
                    <span>Qty: {item.requestedQuantity}</span>
                  </li>
                ))}
              </ul>
            </div>
            
            {request.status === 'completed' && (
              <div className="mt-2 flex items-center text-sm text-green-600">
                <CheckCircle className="h-4 w-4 mr-1" />
                <span>Parts collected successfully</span>
              </div>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default RequestHistory;