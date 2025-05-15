import { Part, InventoryStatus } from '../types/types';

export const getInventoryStatus = (quantity: number): InventoryStatus => {
  if (quantity === 0) return 'out-of-stock';
  if (quantity < 5) return 'low-stock';
  return 'in-stock';
};

export const getStatusColor = (status: InventoryStatus): string => {
  switch (status) {
    case 'in-stock':
      return 'bg-green-500 text-white';
    case 'low-stock':
      return 'bg-amber-500 text-white';
    case 'out-of-stock':
    default:
      return 'bg-red-500 text-white';
  }
};

export const getStatusText = (status: InventoryStatus): string => {
  switch (status) {
    case 'in-stock':
      return 'In Stock';
    case 'low-stock':
      return 'Low Stock';
    case 'out-of-stock':
    default:
      return 'Out of Stock';
  }
};

export const filterParts = (parts: Part[], search: string, category: string): Part[] => {
  return parts.filter((part) => {
    const matchesSearch = search.trim() === '' || 
      part.name.toLowerCase().includes(search.toLowerCase()) ||
      part.partNumber.toLowerCase().includes(search.toLowerCase()) ||
      part.description.toLowerCase().includes(search.toLowerCase());
    
    const matchesCategory = category === 'All Categories' || part.category === category;
    
    return matchesSearch && matchesCategory;
  });
};

export const validateTicket = (ticketNumber: string): boolean => {
  // In a real application, this would validate against a backend
  return /^[A-Z]{2}\d{5}$/.test(ticketNumber);
};

export const formatDate = (dateString: string): string => {
  const date = new Date(dateString);
  return new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  }).format(date);
};