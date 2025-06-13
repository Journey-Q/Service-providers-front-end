// Mock data for JourneyQ Service Provider Dashboard

export const mockUser = {
  id: 1,
  name: "John Smith",
  email: "john@example.com",
  serviceType: "hotel", // hotel, tour-guide, travel-service, general
  profileImage: null,
  businessName: "Grand Vista Hotel",
  phone: "+1234567890",
  address: "123 Paradise Street, Miami, FL",
  rating: 4.5,
  totalReviews: 234,
  joinedDate: "2023-01-15"
};

export const mockServices = [
  {
    id: 1,
    name: "Deluxe Ocean View Room",
    description: "Spacious room with stunning ocean views and modern amenities",
    price: 299,
    category: "accommodation",
    images: [],
    availability: true,
    rating: 4.7,
    reviews: 45
  },
  {
    id: 2,
    name: "Presidential Suite",
    description: "Luxury suite with private balcony and premium services",
    price: 799,
    category: "accommodation",
    images: [],
    availability: true,
    rating: 4.9,
    reviews: 23
  }
];

export const mockTourPackages = [
  {
    id: 1,
    title: "Miami Beach Sunset Tour",
    description: "Experience the most beautiful sunset views in Miami",
    duration: "3 hours",
    price: 89,
    maxPeople: 12,
    images: [],
    rating: 4.8,
    reviews: 67,
    itinerary: [
      "Pick up from hotel",
      "South Beach exploration",
      "Scenic drive along Ocean Drive",
      "Sunset viewing at Key Biscayne"
    ]
  },
  {
    id: 2,
    title: "Everglades Adventure",
    description: "Full day adventure in the Florida Everglades",
    duration: "8 hours",
    price: 199,
    maxPeople: 8,
    images: [],
    rating: 4.9,
    reviews: 89,
    itinerary: [
      "Early morning departure",
      "Airboat ride",
      "Wildlife spotting",
      "Lunch in nature",
      "Hiking trails",
      "Return to city"
    ]
  }
];

export const mockVehicles = [
  {
    id: 1,
    type: "Luxury Sedan",
    model: "Mercedes E-Class",
    capacity: 4,
    pricePerDay: 149,
    pricePerHour: 25,
    features: ["AC", "GPS", "Bluetooth", "Leather Seats"],
    availability: true,
    images: []
  },
  {
    id: 2,
    type: "SUV",
    model: "Toyota Highlander",
    capacity: 7,
    pricePerDay: 199,
    pricePerHour: 35,
    features: ["AC", "GPS", "Bluetooth", "3rd Row Seating"],
    availability: true,
    images: []
  }
];

export const mockBookings = [
  {
    id: 1,
    customerName: "Alice Johnson",
    customerEmail: "alice@example.com",
    serviceName: "Deluxe Ocean View Room",
    checkIn: "2024-02-15",
    checkOut: "2024-02-18",
    guests: 2,
    totalAmount: 897,
    status: "confirmed",
    paymentStatus: "paid",
    bookingDate: "2024-01-20"
  },
  {
    id: 2,
    customerName: "Bob Wilson",
    customerEmail: "bob@example.com",
    serviceName: "Miami Beach Sunset Tour",
    date: "2024-02-10",
    participants: 4,
    totalAmount: 356,
    status: "pending",
    paymentStatus: "pending",
    bookingDate: "2024-02-05"
  },
  {
    id: 3,
    customerName: "Carol Davis",
    customerEmail: "carol@example.com",
    serviceName: "Luxury Sedan Rental",
    startDate: "2024-02-20",
    endDate: "2024-02-22",
    totalAmount: 447,
    status: "confirmed",
    paymentStatus: "paid",
    bookingDate: "2024-02-01"
  }
];

export const mockPayments = [
  {
    id: 1,
    transactionId: "TXN-001",
    bookingId: 1,
    amount: 897,
    customerName: "Alice Johnson",
    paymentMethod: "Credit Card",
    status: "completed",
    date: "2024-01-20",
    serviceFee: 26.91,
    netAmount: 870.09
  },
  {
    id: 2,
    transactionId: "TXN-002",
    bookingId: 3,
    amount: 447,
    customerName: "Carol Davis",
    paymentMethod: "PayPal",
    status: "completed",
    date: "2024-02-01",
    serviceFee: 13.41,
    netAmount: 433.59
  }
];

export const mockAdvertisements = [
  {
    id: 1,
    title: "Summer Special - 30% Off",
    description: "Get 30% off on all ocean view rooms for summer bookings",
    budget: 500,
    startDate: "2024-06-01",
    endDate: "2024-08-31",
    status: "active",
    impressions: 12543,
    clicks: 234,
    conversions: 12
  },
  {
    id: 2,
    title: "Weekend Tour Package",
    description: "Special weekend rates for Miami city tours",
    budget: 300,
    startDate: "2024-02-01",
    endDate: "2024-02-29",
    status: "completed",
    impressions: 8765,
    clicks: 156,
    conversions: 8
  }
];

export const mockMessages = [
  {
    id: 1,
    customerName: "Alice Johnson",
    customerAvatar: null,
    lastMessage: "Hi, I'd like to know about room availability for next week",
    timestamp: "2024-02-08T10:30:00Z",
    unread: true,
    bookingId: 1
  },
  {
    id: 2,
    customerName: "Bob Wilson",
    customerAvatar: null,
    lastMessage: "Thank you for the tour information!",
    timestamp: "2024-02-07T15:45:00Z",
    unread: false,
    bookingId: 2
  }
];

export const mockAnalytics = {
  totalRevenue: 15420,
  monthlyRevenue: 3240,
  totalBookings: 89,
  monthlyBookings: 15,
  avgRating: 4.7,
  totalReviews: 234,
  conversionRate: 12.5,
  topServices: [
    { name: "Deluxe Ocean View Room", bookings: 45, revenue: 8950 },
    { name: "Presidential Suite", bookings: 12, revenue: 4200 },
    { name: "Miami Beach Sunset Tour", bookings: 32, revenue: 2270 }
  ]
};