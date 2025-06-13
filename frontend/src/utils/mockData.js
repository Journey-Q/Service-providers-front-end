// Mock data for the JourneyQ application

export const mockUser = {
  id: 1,
  name: 'John Doe',
  email: 'john@example.com',
  serviceType: 'hotel',
  businessName: 'Sunset Resort & Spa',
  phone: '+1-555-0123',
  address: '123 Ocean View Drive, Miami Beach, FL 33139',
  profileImage: null,
  rating: 4.8,
  totalReviews: 127,
  joinedDate: '2023-01-15'
};

export const mockStats = {
  totalBookings: 145,
  totalRevenue: 28750,
  activeBookings: 12,
  completedBookings: 133,
  averageRating: 4.8,
  totalReviews: 89
};

export const mockBookings = [
  {
    id: 1,
    guestName: 'Alice Johnson',
    service: 'Ocean View Suite',
    checkIn: '2024-03-15',
    checkOut: '2024-03-18',
    status: 'confirmed',
    amount: 450,
    guests: 2
  },
  {
    id: 2,
    guestName: 'Bob Smith',
    service: 'City Tour Package',
    checkIn: '2024-03-20',
    checkOut: '2024-03-22',
    status: 'pending',
    amount: 280,
    guests: 4
  }
];

export const mockReviews = [
  {
    id: 1,
    guestName: 'Sarah Wilson',
    rating: 5,
    comment: 'Amazing experience! The service was exceptional and the location was perfect.',
    date: '2024-03-10',
    service: 'Beach Villa'
  },
  {
    id: 2,
    guestName: 'Mike Davis',
    rating: 4,
    comment: 'Great value for money. Clean rooms and friendly staff.',
    date: '2024-03-08',
    service: 'Standard Room'
  }
];

export const mockServices = [
  {
    id: 1,
    name: 'Ocean View Suite',
    type: 'accommodation',
    price: 150,
    currency: 'USD',
    availability: true,
    description: 'Luxurious suite with panoramic ocean views'
  },
  {
    id: 2,
    name: 'City Tour Package',
    type: 'tour',
    price: 70,
    currency: 'USD',
    availability: true,
    description: 'Comprehensive city exploration with local guide'
  }
];