export interface Part {
  id: string;
  name: string;
  category: string;
  description: string;
  imageUrl: string;
  quantity: number;
  location: string;
  partNumber: string;
}

export interface CartItem extends Part {
  requestedQuantity: number;
}

export interface User {
  id: string;
  name: string;
  department: string;
  ticketNumber: string | null;
  role: string;
  shift: string;
}

export type InventoryStatus = 'in-stock' | 'low-stock' | 'out-of-stock';

export interface RequestHistory {
  id: string;
  ticketNumber: string;
  userId: string;
  items: CartItem[];
  requestDate: string;
  status: 'pending' | 'completed' | 'rejected';
}

export interface ValidTicket {
  number: string;
  department: string;
  role: string;
}