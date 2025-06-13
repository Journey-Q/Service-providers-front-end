import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';

const PastTours = () => {
  const [pastTours] = useState([
    {
      id: 1,
      packageName: 'City Explorer Tour',
      customerName: 'Alice Johnson',
      date: '2024-03-15',
      duration: '8 hours',
      guests: 4,
      revenue: 300,
      rating: 5,
      review: 'Amazing tour! Our guide was incredibly knowledgeable and showed us hidden gems we never would have found on our own.',
      status: 'completed'
    },
    {
      id: 2,
      packageName: 'Mountain Adventure',
      customerName: 'Bob Smith',
      date: '2024-03-10',
      duration: '2 days',
      guests: 2,
      revenue: 440,
      rating: 4,
      review: 'Great experience! The mountain views were breathtaking. Only minor issue was the weather on day 2.',
      status: 'completed'
    },
    {
      id: 3,
      packageName: 'Cultural Heritage Walk',
      customerName: 'Sarah Wilson',
      date: '2024-03-08',
      duration: '4 hours',
      guests: 6,
      revenue: 270,
      rating: 5,
      review: 'Absolutely wonderful! Learned so much about the local culture and history. Highly recommend!',
      status: 'completed'
    },
    {
      id: 4,
      packageName: 'Coastal Adventure',
      customerName: 'Mike Davis',
      date: '2024-03-05',
      duration: '6 hours',
      guests: 3,
      revenue: 285,
      rating: 4,
      review: 'Beautiful coastline and great snorkeling spots. The lunch was delicious too!',
      status: 'completed'
    },
    {
      id: 5,
      packageName: 'City Explorer Tour',
      customerName: 'Emma Brown',
      date: '2024-03-03',
      duration: '8 hours',
      guests: 2,
      revenue: 150,
      rating: 5,
      review: 'Perfect introduction to the city! Our guide was friendly and accommodating.',
      status: 'completed'
    },
    {
      id: 6,
      packageName: 'Mountain Adventure',
      customerName: 'Tom Wilson',
      date: '2024-02-28',
      duration: '2 days',
      guests: 4,
      revenue: 880,
      rating: 3,
      review: 'Good tour overall, but the accommodation could have been better.',
      status: 'completed'
    }
  ]);

  const [selectedPeriod, setSelectedPeriod] = useState('all');

  const filterTours = () => {
    const now = new Date();
    const currentMonth = now.getMonth();
    const currentYear = now.getFullYear();

    switch (selectedPeriod) {
      case 'this-month':
        return pastTours.filter(tour => {
          const tourDate = new Date(tour.date);
          return tourDate.getMonth() === currentMonth && tourDate.getFullYear() === currentYear;
        });
      case 'last-month':
        const lastMonth = currentMonth === 0 ? 11 : currentMonth - 1;
        const lastMonthYear = currentMonth === 0 ? currentYear - 1 : currentYear;
        return pastTours.filter(tour => {
          const tourDate = new Date(tour.date);
          return tourDate.getMonth() === lastMonth && tourDate.getFullYear() === lastMonthYear;
        });
      default:
        return pastTours;
    }
  };

  const filteredTours = filterTours();
  const totalRevenue = filteredTours.reduce((sum, tour) => sum + tour.revenue, 0);
  const totalGuests = filteredTours.reduce((sum, tour) => sum + tour.guests, 0);
  const averageRating = filteredTours.length > 0 
    ? (filteredTours.reduce((sum, tour) => sum + tour.rating, 0) / filteredTours.length).toFixed(1)
    : 0;

  const periods = [
    { value: 'all', label: 'All Time' },
    { value: 'this-month', label: 'This Month' },
    { value: 'last-month', label: 'Last Month' }
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Past Tours</h1>
          <p className="text-gray-600 mt-2">Review your completed tours and customer feedback</p>
        </div>
        <Button className="bg-blue-600 hover:bg-blue-700">
          <span className="mr-2">📊</span>
          Export Report
        </Button>
      </div>

      {/* Period Filter */}
      <div className="flex space-x-4">
        {periods.map((period) => (
          <button
            key={period.value}
            onClick={() => setSelectedPeriod(period.value)}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              selectedPeriod === period.value
                ? 'bg-blue-100 text-blue-700 border border-blue-200'
                : 'bg-white text-gray-600 border border-gray-200 hover:bg-gray-50'
            }`}
          >
            {period.label}
          </button>
        ))}
      </div>

      {/* Summary Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-blue-600">{filteredTours.length}</div>
            <p className="text-sm text-gray-600">Completed Tours</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-green-600">${totalRevenue.toLocaleString()}</div>
            <p className="text-sm text-gray-600">Total Revenue</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-purple-600">{totalGuests}</div>
            <p className="text-sm text-gray-600">Total Guests</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-orange-600">{averageRating}⭐</div>
            <p className="text-sm text-gray-600">Average Rating</p>
          </CardContent>
        </Card>
      </div>

      {/* Past Tours List */}
      <div className="space-y-4">
        {filteredTours.length === 0 ? (
          <Card>
            <CardContent className="text-center py-12">
              <div className="text-4xl mb-4">📋</div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">No tours found</h3>
              <p className="text-gray-600">
                No completed tours found for the selected period.
              </p>
            </CardContent>
          </Card>
        ) : (
          filteredTours.map((tour) => (
            <Card key={tour.id} className="hover:shadow-md transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center space-x-4 mb-3">
                      <div className="flex-shrink-0">
                        <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-blue-500 rounded-full flex items-center justify-center">
                          <span className="text-white font-semibold text-lg">
                            {tour.customerName.charAt(0)}
                          </span>
                        </div>
                      </div>
                      <div className="flex-1">
                        <h3 className="text-lg font-semibold text-gray-900">
                          {tour.packageName}
                        </h3>
                        <p className="text-sm text-gray-600">
                          Customer: {tour.customerName}
                        </p>
                        <div className="flex items-center space-x-4 mt-1 text-sm text-gray-500">
                          <span>📅 {tour.date}</span>
                          <span>⏱️ {tour.duration}</span>
                          <span>👥 {tour.guests} guests</span>
                        </div>
                      </div>
                    </div>

                    {/* Customer Review */}
                    <div className="bg-gray-50 p-4 rounded-lg mb-3">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center">
                          <span className="text-yellow-400 mr-1">⭐</span>
                          <span className="font-medium text-gray-900">{tour.rating}/5</span>
                        </div>
                        <span className="text-sm text-gray-500">Customer Review</span>
                      </div>
                      <p className="text-gray-700 italic">"{tour.review}"</p>
                    </div>
                  </div>

                  {/* Revenue and Actions */}
                  <div className="flex flex-col items-end space-y-3 ml-6">
                    <div className="text-right">
                      <div className="text-2xl font-bold text-green-600">
                        ${tour.revenue}
                      </div>
                      <div className="text-sm text-gray-600">
                        Revenue
                      </div>
                    </div>
                    
                    <div className="flex space-x-2">
                      <Button size="sm" variant="outline">
                        View Details
                      </Button>
                      <Button size="sm" variant="outline">
                        Contact Customer
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>

      {/* Performance Insights */}
      <Card>
        <CardHeader>
          <CardTitle>Performance Insights</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center p-4 bg-green-50 rounded-lg">
              <div className="text-2xl mb-2">🏆</div>
              <h3 className="font-semibold text-gray-900 mb-1">Top Rated Tour</h3>
              <p className="text-sm text-gray-600">
                {filteredTours.length > 0 
                  ? filteredTours.reduce((best, tour) => tour.rating > best.rating ? tour : best).packageName
                  : 'No data'
                }
              </p>
            </div>
            <div className="text-center p-4 bg-blue-50 rounded-lg">
              <div className="text-2xl mb-2">💰</div>
              <h3 className="font-semibold text-gray-900 mb-1">Best Revenue Day</h3>
              <p className="text-sm text-gray-600">
                {filteredTours.length > 0 
                  ? filteredTours.reduce((best, tour) => tour.revenue > best.revenue ? tour : best).date
                  : 'No data'
                }
              </p>
            </div>
            <div className="text-center p-4 bg-purple-50 rounded-lg">
              <div className="text-2xl mb-2">👥</div>
              <h3 className="font-semibold text-gray-900 mb-1">Average Group Size</h3>
              <p className="text-sm text-gray-600">
                {filteredTours.length > 0 
                  ? Math.round(totalGuests / filteredTours.length) + ' guests'
                  : 'No data'
                }
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default PastTours;