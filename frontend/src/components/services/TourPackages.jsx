import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';

const TourPackages = () => {
  const [packages] = useState([
    {
      id: 1,
      name: 'City Explorer Tour',
      duration: '8 hours',
      price: 75,
      currency: 'USD',
      maxGuests: 15,
      includes: ['Transportation', 'Guide', 'Lunch', 'Entrance Fees'],
      description: 'Discover the best of our city with visits to iconic landmarks, local markets, and hidden gems.',
      difficulty: 'Easy',
      available: true,
      rating: 4.8,
      totalBookings: 145
    },
    {
      id: 2,
      name: 'Mountain Adventure',
      duration: '2 days',
      price: 220,
      currency: 'USD',
      maxGuests: 8,
      includes: ['Accommodation', 'Meals', 'Equipment', 'Professional Guide'],
      description: 'Experience breathtaking mountain views, hiking trails, and overnight camping under the stars.',
      difficulty: 'Moderate',
      available: true,
      rating: 4.9,
      totalBookings: 89
    },
    {
      id: 3,
      name: 'Cultural Heritage Walk',
      duration: '4 hours',
      price: 45,
      currency: 'USD',
      maxGuests: 20,
      includes: ['Walking Tour', 'Local Guide', 'Cultural Sites', 'Traditional Snacks'],
      description: 'Immerse yourself in local culture, visiting traditional sites and learning about our rich history.',
      difficulty: 'Easy',
      available: false,
      rating: 4.7,
      totalBookings: 203
    },
    {
      id: 4,
      name: 'Coastal Adventure',
      duration: '6 hours',
      price: 95,
      currency: 'USD',
      maxGuests: 12,
      includes: ['Boat Trip', 'Snorkeling Gear', 'Lunch', 'Guide'],
      description: 'Explore pristine beaches, go snorkeling in crystal clear waters, and enjoy fresh seafood.',
      difficulty: 'Easy',
      available: true,
      rating: 4.6,
      totalBookings: 167
    }
  ]);

  const getDifficultyColor = (difficulty) => {
    switch (difficulty) {
      case 'Easy': return 'bg-green-100 text-green-800';
      case 'Moderate': return 'bg-yellow-100 text-yellow-800';
      case 'Hard': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const availablePackages = packages.filter(p => p.available).length;
  const totalRevenue = packages.reduce((sum, p) => sum + (p.price * p.totalBookings), 0);
  const avgRating = (packages.reduce((sum, p) => sum + p.rating, 0) / packages.length).toFixed(1);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Tour Packages</h1>
          <p className="text-gray-600 mt-2">Manage your tour offerings and experiences</p>
        </div>
        <Button className="bg-green-600 hover:bg-green-700">
          <span className="mr-2">🗺️</span>
          Create Package
        </Button>
      </div>

      {/* Package Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-blue-600">{packages.length}</div>
            <p className="text-sm text-gray-600">Total Packages</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-green-600">{availablePackages}</div>
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

      {/* Tour Packages Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {packages.map((pkg) => (
          <Card key={pkg.id} className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle className="text-xl">{pkg.name}</CardTitle>
                  <div className="flex items-center space-x-4 mt-2">
                    <span className="text-sm text-gray-600">⏱️ {pkg.duration}</span>
                    <span className="text-sm text-gray-600">👥 Max {pkg.maxGuests} guests</span>
                    <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getDifficultyColor(pkg.difficulty)}`}>
                      {pkg.difficulty}
                    </span>
                  </div>
                </div>
                <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
                  pkg.available 
                    ? 'bg-green-100 text-green-800' 
                    : 'bg-red-100 text-red-800'
                }`}>
                  {pkg.available ? 'Available' : 'Unavailable'}
                </span>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-gray-700">{pkg.description}</p>
              
              <div>
                <h4 className="font-medium text-gray-900 mb-2">What's Included</h4>
                <div className="flex flex-wrap gap-2">
                  {pkg.includes.map((item, index) => (
                    <span 
                      key={index}
                      className="inline-flex items-center px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full"
                    >
                      ✓ {item}
                    </span>
                  ))}
                </div>
              </div>

              <div className="flex items-center justify-between pt-4 border-t">
                <div className="flex items-center space-x-4">
                  <div>
                    <span className="text-2xl font-bold text-gray-900">
                      ${pkg.price}
                    </span>
                    <span className="text-gray-600"> / person</span>
                  </div>
                  <div className="text-sm text-gray-600">
                    <div className="flex items-center">
                      <span className="text-yellow-400 mr-1">⭐</span>
                      {pkg.rating} ({pkg.totalBookings} bookings)
                    </div>
                  </div>
                </div>
                <div className="flex space-x-2">
                  <Button size="sm" variant="outline">
                    Edit
                  </Button>
                  <Button size="sm" variant="outline">
                    View Stats
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Popular Packages */}
      <Card>
        <CardHeader>
          <CardTitle>Performance Overview</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {packages
              .sort((a, b) => b.totalBookings - a.totalBookings)
              .slice(0, 3)
              .map((pkg, index) => (
                <div key={pkg.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center text-white font-bold ${
                      index === 0 ? 'bg-yellow-500' : index === 1 ? 'bg-gray-400' : 'bg-orange-500'
                    }`}>
                      {index + 1}
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-900">{pkg.name}</h4>
                      <p className="text-sm text-gray-600">{pkg.totalBookings} bookings • ${pkg.price}/person</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-lg font-semibold text-gray-900">
                      ${(pkg.price * pkg.totalBookings).toLocaleString()}
                    </div>
                    <div className="text-sm text-gray-600">
                      {pkg.rating}⭐ rating
                    </div>
                  </div>
                </div>
              ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default TourPackages;