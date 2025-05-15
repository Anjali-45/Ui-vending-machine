import { Part, RequestHistory, User } from '../types/types';

export const mockParts: Part[] = [
  {
    id: '1',
    name: 'Allen Key Set',
    category: 'Hand Tools',
    description: 'Set of metric Allen keys from 1.5mm to 10mm',
    imageUrl: 'https://images.pexels.com/photos/162553/keys-workshop-mechanic-tools-162553.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    quantity: 15,
    location: 'Drawer A-1',
    partNumber: 'AK-2023-M',
  },
  {
    id: '2',
    name: 'Digital Caliper',
    category: 'Measuring Tools',
    description: 'Digital caliper with metric and imperial measurements',
    imageUrl: 'https://images.pexels.com/photos/8985425/pexels-photo-8985425.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    quantity: 8,
    location: 'Cabinet B-3',
    partNumber: 'DC-150-D',
  },
  {
    id: '3',
    name: 'Torque Wrench',
    category: 'Hand Tools',
    description: 'Adjustable torque wrench 10-150 Nm',
    imageUrl: 'https://images.pexels.com/photos/209235/pexels-photo-209235.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    quantity: 5,
    location: 'Cabinet C-2',
    partNumber: 'TW-150-A',
  },
  {
    id: '4',
    name: 'Bearing Kit',
    category: 'Machine Parts',
    description: 'Assorted bearings for industrial applications',
    imageUrl: 'https://images.pexels.com/photos/6444/pencil-typography-black-design.jpg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    quantity: 12,
    location: 'Bin D-4',
    partNumber: 'BK-2022-I',
  },
  {
    id: '5',
    name: 'Safety Gloves',
    category: 'Safety Equipment',
    description: 'Cut-resistant gloves, size L',
    imageUrl: 'https://images.pexels.com/photos/4792071/pexels-photo-4792071.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    quantity: 25,
    location: 'Shelf E-1',
    partNumber: 'SG-L-CR',
  },
  {
    id: '6',
    name: 'Hydraulic Fluid',
    category: 'Fluids',
    description: 'Premium hydraulic fluid, 1L bottle',
    imageUrl: 'https://images.pexels.com/photos/128421/pexels-photo-128421.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    quantity: 18,
    location: 'Cabinet F-3',
    partNumber: 'HF-1L-P',
  },
  {
    id: '7',
    name: 'Circuit Tester',
    category: 'Electrical',
    description: 'Digital multimeter for electrical testing',
    imageUrl: 'https://images.pexels.com/photos/159412/helmet-cables-tools-computer-159412.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    quantity: 0,
    location: 'Drawer G-2',
    partNumber: 'CT-2023-D',
  },
  {
    id: '8',
    name: 'Motor Coupling',
    category: 'Machine Parts',
    description: 'Flexible motor coupling for 15mm shaft',
    imageUrl: 'https://images.pexels.com/photos/162553/keys-workshop-mechanic-tools-162553.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    quantity: 3,
    location: 'Bin H-5',
    partNumber: 'MC-15-F',
  },
];

export const mockUsers: User[] = [
  {
    id: '1',
    name: 'John Smith',
    department: 'Maintenance',
    ticketNumber: 'MT12345',
    role: 'technician',
    shift: 'morning'
  },
  {
    id: '2',
    name: 'Jane Doe',
    department: 'Production',
    ticketNumber: 'PR67890',
    role: 'operator',
    shift: 'evening'
  },
  {
    id: '3',
    name: 'Mike Johnson',
    department: 'Engineering',
    ticketNumber: 'EN45678',
    role: 'engineer',
    shift: 'morning'
  },
  {
    id: '4',
    name: 'Sarah Williams',
    department: 'Quality Control',
    ticketNumber: 'QC34567',
    role: 'inspector',
    shift: 'night'
  },
  {
    id: '5',
    name: 'Robert Chen',
    department: 'Maintenance',
    ticketNumber: 'MT89012',
    role: 'supervisor',
    shift: 'evening'
  },
  {
    id: '6',
    name: 'Mrunal Patil',
    department: 'EV Shop',
    ticketNumber: '99989150',
    role: 'engineer',
    shift: 'morning'
  },
  {
    id: '7',
    name: 'Shravani Shitolte',
    department: 'EV Shop',
    ticketNumber: '99989151',
    role: 'engineer',
    shift: 'morning'
  },
  {
    id: '8',
    name: 'anjali deshpande',
    department: 'EV Shop',
    ticketNumber: '99989153',
    role: 'engineer',
    shift: 'morning'
  },
  {
    id: '9',
    name: 'sanket p.',
    department: 'EV Shop',
    ticketNumber: '99989154',
    role: 'engineer',
    shift: 'morning'
  },
  {
    id: '10',
    name: 'kunjal',
    department: 'EV Shop',
    ticketNumber: '99989155',
    role: 'engineer',
    shift: 'morning'
  },
  {
    id: '11',
    name: 'Kalyani T.',
    department: 'EV Shop',
    ticketNumber: '99989156',
    role: 'engineer',
    shift: 'morning'
  },
];

export const mockRequestHistory: RequestHistory[] = [
  {
    id: '1',
    ticketNumber: 'MT12345',
    userId: '1',
    items: [
      {
        ...mockParts[0],
        requestedQuantity: 1,
      },
      {
        ...mockParts[2],
        requestedQuantity: 1,
      },
    ],
    requestDate: '2023-05-15T10:30:00Z',
    status: 'completed',
  },
  {
    id: '2',
    ticketNumber: 'PR67890',
    userId: '2',
    items: [
      {
        ...mockParts[4],
        requestedQuantity: 2,
      },
    ],
    requestDate: '2023-05-16T14:45:00Z',
    status: 'pending',
  },
];

export const categories = [
  'All Categories',
  'Hand Tools',
  'Measuring Tools',
  'Machine Parts',
  'Safety Equipment',
  'Electrical',
  'Fluids',
];

export const validTickets = [
  { number: 'MT12345', department: 'Maintenance', role: 'technician' },
  { number: 'PR67890', department: 'Production', role: 'operator' },
  { number: 'EN45678', department: 'Engineering', role: 'engineer' },
  { number: 'QC34567', department: 'Quality Control', role: 'inspector' },
  { number: 'MT89012', department: 'Maintenance', role: 'supervisor' }
];