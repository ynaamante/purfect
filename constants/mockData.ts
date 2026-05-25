export interface Alert {
  id: string;
  title: string;
  message: string;
  read: boolean;
  timestamp: string;
  severity: 'high' | 'moderate' | 'low';
  type: 'disease' | 'vaccine' | 'appointment' | 'reminder';
  date: string;
}

export const mockAlerts: Alert[] = [
  {
    id: '1',
    title: 'Vaccination Reminder',
    message: 'Your pet needs a vaccination',
    read: false,
    timestamp: '2026-05-07T10:00:00',
    severity: 'high',
    type: 'vaccine',
    date: 'May 7',
  },
  {
    id: '2',
    title: 'Appointment Confirmed',
    message: 'Your appointment is confirmed for May 10',
    read: true,
    timestamp: '2026-05-06T15:30:00',
    severity: 'low',
    type: 'appointment',
    date: 'May 6',
  },
  {
    id: '3',
    title: 'Prescription Ready',
    message: 'Your pet\'s prescription is ready for pickup',
    read: false,
    timestamp: '2026-05-05T09:15:00',
    severity: 'moderate',
    type: 'reminder',
    date: 'May 5',
  },
];

export interface Pet {
  id: string;
  name: string;
  species: string;
  breed: string;
  age: number;
  weight: number;
  lastVisit: string;
  image?: string;
  type?: string;
}

export const mockPets: Pet[] = [
  {
    id: '1',
    name: 'Buddy',
    species: 'Dog',
    breed: 'Golden Retriever',
    age: 3,
    weight: 28.5,
    lastVisit: '2026-04-15',
    image: 'https://via.placeholder.com/150',
    type: 'dog',
  },
  {
    id: '2',
    name: 'Whiskers',
    species: 'Cat',
    breed: 'Persian',
    age: 5,
    weight: 4.2,
    lastVisit: '2026-03-20',
    image: 'https://via.placeholder.com/150',
    type: 'cat',
  },
];

export interface Appointment {
  id: string;
  petId: string;
  petName: string;
  date: string;
  time: string;
  reason: string;
  type: string;
  status: 'upcoming' | 'completed' | 'cancelled';
  doctor?: string;
}

export const mockAppointments: Appointment[] = [
  {
    id: '1',
    petId: '1',
    petName: 'Buddy',
    date: '2026-05-10',
    time: '10:00 AM',
    reason: 'Routine Checkup',
    type: 'Checkup',
    status: 'upcoming',
    doctor: 'Dr. Sarah',
  },
  {
    id: '2',
    petId: '2',
    petName: 'Whiskers',
    date: '2026-05-12',
    time: '2:00 PM',
    reason: 'Vaccination',
    type: 'Vaccination',
    status: 'upcoming',
    doctor: 'Dr. Mike',
  },
  {
    id: '3',
    petId: '1',
    petName: 'Buddy',
    date: '2026-04-15',
    time: '3:00 PM',
    reason: 'Follow-up',
    type: 'Follow-up',
    status: 'completed',
    doctor: 'Dr. Sarah',
  },
];

export interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  address: string;
  location?: string;
}

export const mockUser: User = {
  id: '1',
  name: 'John Doe',
  email: 'john@example.com',
  phone: '555-0123',
  address: '123 Pet Street, Pet City, PC 12345',
  location: 'Pet City, PC',
};

export interface Clinic {
  id: string;
  name: string;
  address: string;
  phone: string;
  email: string;
  hours: string;
}

export const mockClinic: Clinic = {
  id: '1',
  name: 'PetCare Veterinary Clinic',
  address: '456 Vet Avenue, Vet City, VC 67890',
  phone: '555-9876',
  email: 'info@petcare.com',
  hours: 'Mon-Fri: 9AM-6PM, Sat: 10AM-4PM',
};
