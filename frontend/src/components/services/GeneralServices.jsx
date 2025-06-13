import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';

const GeneralServices = () => {
  const [services] = useState([
    {
      id: 1,
      name: 'Airport Transfer',
      category: 'Transportation',
      price: 50,
      duration: '1 hour',
      description: 'Comfortable transfer service to and from the airport with professional drivers.',
      features: ['Professional Driver', 'Meet & Greet', 'Flight Tracking', 'Child Seats Available'],
      available: true,
      popularity: 95,
      bookings: 234
    },
    {
      id: 2,
      name: 'City Photography Session',
      category: 'Photography',
      price: 120,
      duration: '2 hours',
      description: 'Professional photography session capturing your vacation memories at iconic city locations.',
      features: ['Professional Photographer', 'Edited Photos', 'Multiple Locations', 'Props Included'],
      available: true,
      popularity: 87,
      bookings: 156
    },
    {
      id: 3,
      name: 'Local Cuisine Experience',
      category: 'Food & Dining',
      price: 75,
      duration: '3 hours',
      description: 'Guided culinary tour featuring authentic local dishes and hidden foodie gems.',
      features: ['Local Guide', 'Food Tastings', 'Cultural Stories', 'Recipe Cards'],
      available: true,
      popularity: 92,
      bookings: 189
    },
    {
      id: 4,
      name: 'Equipment Rental',
      category: 'Rental',
      price: 25,
      duration: 'Per day',
      description: 'Rent quality equipment for your adventures - cameras, sports gear, and more.',
      features: ['Quality Equipment', 'Delivery Service', 'Insurance Included', '24/7 Support'],
      available: false,
      popularity: 78,
      bookings: 98
    },
    {
      id: 5,
      name: 'Personal Concierge',
      category: 'Concierge',
      price: 100,
      duration: 'Per day',
      description: 'Dedicated personal assistant to help plan and coordinate your perfect day.',
      features: ['Personal Assistant', 'Custom Itinerary', 'Reservation Service', 'Local Insights'],
      available: true,
      popularity: 89,
      bookings: 145
    },
    {
      id: 6,
      name: 'Spa & Wellness',
      category: 'Wellness',
      price: 85,
      duration: '90 minutes',
      description: 'Relaxing spa treatments and wellness services to rejuvenate during your stay.',
      features: ['Professional Therapist', 'Quality Products', 'Flexible Scheduling', 'Home Service'],
      available: true,
      popularity: 91,
      bookings: 167
    }
  ]);

  const [selectedCategory, setSelectedCategory] = useState('all');

  const categories = [
    'all',
    ...Array.from(new Set(services.map(service => service.category)))
  ];

  const filteredServices = selectedCategory === 'all' 
    ? services 
    : services.filter(service => service.category === selectedCategory);

  const getCategoryIcon = (category) => {
    switch (category) {
      case 'Transportation': return '🚗';
      case 'Photography': return '📸';
      case 'Food & Dining': return '🍽️';
      case 'Rental': return '🎯';
      case 'Concierge': return '🛎️';
      case 'Wellness': return '🧘';
      default: return '⭐';
    }
  };

  const getPopularityColor = (popularity) => {
    if (popularity >= 90) return 'bg-green-100 text-green-800';
    if (popularity >= 80) return 'bg-blue-100 text-blue-800';
    if (popularity >= 70) return 'bg-yellow-100 text-yellow-800';
    return 'bg-gray-100 text-gray-800';
  };

  const totalServices = services.length;
  const availableServices = services.filter(s => s.available).length;
  const totalRevenue = services.reduce((sum, s) => sum + (s.price * s.bookings), 0);
  const avgRating = 4.7; // Mock average rating

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">General Services</h1>
          <p className="text-gray-600 mt-2">Manage your additional service offerings</p>
        </div>
        <Button className="bg-purple-600 hover:bg-purple-700">
          <span className="mr-2">➕</span>
          Add Service
        </Button>
      </div>

      {/* Service Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-blue-600">{totalServices}</div>
            <p className="text-sm text-gray-600">Total Services</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-green-600">{availableServices}</div>
            <p className="text-sm text-gray-600">Available</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-purple-600">${totalRevenue.toLocaleString()}</div>
            <p className="text-sm text-gray-600">Total Revenue</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-orange-600">{avgRating}⭐</div>
            <p className="text-sm text-gray-600">Average Rating</p>
          </CardContent>
        </Card>
      </div>

      {/* Category Filter */}
      <div className="flex flex-wrap gap-2">
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => setSelectedCategory(category)}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              selectedCategory === category
                ? 'bg-purple-100 text-purple-700 border border-purple-200'
                : 'bg-white text-gray-600 border border-gray-200 hover:bg-gray-50'
            }`}
          >
            {category === 'all' ? 'All Categories' : category}
          </button>
        ))}
      </div>

      {/* Services Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {filteredServices.map((service) => (
          <Card key={service.id} className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="flex justify-between items-start">
                <div className="flex items-center space-x-3">
                  <span className="text-2xl">{getCategoryIcon(service.category)}</span>
                  <div>
                    <CardTitle className="text-lg">{service.name}</CardTitle>
                    <p className="text-sm text-gray-600">{service.category} • {service.duration}</p>
                  </div>
                </div>
                <div className="flex flex-col items-end space-y-2">
                  <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
                    service.available 
                      ? 'bg-green-100 text-green-800' 
                      : 'bg-red-100 text-red-800'
                  }`}>
                    {service.available ? 'Available' : 'Unavailable'}
                  </span>
                  <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getPopularityColor(service.popularity)}`}>
                    {service.popularity}% popular
                  </span>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-gray-700 text-sm">{service.description}</p>
              
              {/* Features */}
              <div>
                <h4 className="font-medium text-gray-900 mb-2 text-sm">What's Included</h4>
                <div className="flex flex-wrap gap-1">
                  {service.features.map((feature, index) => (
                    <span 
                      key={index}
                      className="inline-flex items-center px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full"
                    >
                      ✓ {feature}
                    </span>
                  ))}
                </div>
              </div>

              {/* Performance Metrics */}
              <div className="bg-gray-50 p-3 rounded-lg">
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="text-gray-600">Total Bookings:</span>
                    <span className="ml-2 font-medium text-gray-900">{service.bookings}</span>
                  </div>
                  <div>
                    <span className="text-gray-600">Revenue:</span>
                    <span className="ml-2 font-medium text-gray-900">
                      ${(service.price * service.bookings).toLocaleString()}
                    </span>
                  </div>
                </div>
              </div>

              {/* Pricing and Actions */}
              <div className="flex justify-between items-center pt-2 border-t">
                <div>
                  <span className="text-2xl font-bold text-gray-900">
                    ${service.price}
                  </span>
                  <span className="text-gray-600 ml-1">
                    {service.duration.includes('day') ? '/day' : service.duration.includes('hour') ? '/session' : ''}
                  </span>
                </div>
                <div className="flex space-x-2">
                  <Button size="sm" variant="outline">
                    Edit
                  </Button>
                  <Button size="sm" variant="outline">
                    Analytics
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredServices.length === 0 && (
        <Card>
          <CardContent className="text-center py-12">
            <div className="text-4xl mb-4">🛎️</div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">No services found</h3>
            <p className="text-gray-600 mb-4">
              {selectedCategory === 'all' 
                ? "You haven't added any services yet." 
                : `No services found in the ${selectedCategory} category.`}
            </p>
            <Button>Add Your First Service</Button>
          </CardContent>
        </Card>
      )}

      {/* Service Categories Overview */}
      <Card>
        <CardHeader>
          <CardTitle>Service Categories Performance</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {categories.slice(1).map((category) => {
              const categoryServices = services.filter(s => s.category === category);
              const categoryRevenue = categoryServices.reduce((sum, s) => sum + (s.price * s.bookings), 0);
              
              return (
                <div key={category} className="text-center p-3 bg-gray-50 rounded-lg">
                  <div className="text-2xl mb-2">{getCategoryIcon(category)}</div>
                  <h4 className="font-medium text-gray-900 text-sm mb-1">{category}</h4>
                  <p className="text-xs text-gray-600">{categoryServices.length} services</p>
                  <p className="text-xs text-gray-600 font-medium">${categoryRevenue.toLocaleString()}</p>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default GeneralServices;