import React from 'react';
import { ShoppingCart, User, LogOut, PenTool as Tool } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { useCart } from '../contexts/CartContext';

interface HeaderProps {
  onCartClick: () => void;
}

const Header: React.FC<HeaderProps> = ({ onCartClick }) => {
  const { currentUser, logout } = useAuth();
  const { getTotalItems } = useCart();
  
  return (
    <header className="bg-blue-900 text-white shadow-md">
      <div className="container mx-auto px-4 py-3">
        <div className="flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <Tool className="h-7 w-7" />
            <h1 className="text-xl font-bold">PartsVend</h1>
          </div>
          
          {currentUser && (
            <div className="flex items-center space-x-4">
              <button
                onClick={onCartClick}
                className="relative p-2 rounded-full hover:bg-blue-800 transition-colors"
              >
                <ShoppingCart className="h-6 w-6" />
                {getTotalItems() > 0 && (
                  <span className="absolute -top-1 -right-1 bg-orange-500 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                    {getTotalItems()}
                  </span>
                )}
              </button>
              
              <div className="flex items-center space-x-2">
                <div className="flex items-center space-x-1">
                  <User className="h-5 w-5 text-blue-300" />
                  <span className="text-sm hidden sm:inline">{currentUser.name}</span>
                </div>
                <div className="text-xs bg-blue-700 px-2 py-1 rounded">
                  {currentUser.department}
                </div>
              </div>
              
              <button
                onClick={logout}
                className="p-2 rounded-full hover:bg-blue-800 transition-colors"
                title="Logout"
              >
                <LogOut className="h-5 w-5" />
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;