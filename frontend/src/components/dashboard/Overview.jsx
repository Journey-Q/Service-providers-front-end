import React from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { mockStats, mockBookings, mockReviews } from '../../utils/mockData';

const Overview = () => {
  const { user } = useAuth();

  const stats = [
    { title: 'Total Bookings', value: mockStats.totalBookings, icon: '📅', color: 'bg-blue-500' },
    { title: 'Total Revenue', value: `$${mockStats.totalRevenue.toLocaleString()}`, icon: '💰', color: 'bg-green-500' },
    { title: 'Active Bookings', value: mockStats.activeBookings, icon: '🏃', color: 'bg-orange-500' },
    { title: 'Average Rating', value: mockStats.averageRating, icon: '⭐', color: 'bg-purple-500' },
  ];

  return (
    <div className="space-y-6">
      {/* Welcome Section */}
      <div className="bg-gradient-to-r from-blue-600 to-cyan-500 rounded-lg p-6 text-white">
        <h1 className="text-3xl font-bold mb-2">
          Welcome back, {user?.name}! 👋
        </h1>
        <p className="text-blue-100">
          Here's what's happening with your {user?.businessName} today.
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <Card key={index} className="hover:shadow-lg transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-center">
                <div className={`${stat.color} p-3 rounded-full text-white mr-4`}>
                  <span className="text-xl">{stat.icon}</span>
                </div>
                <div>
                  <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                  <p className="text-sm text-gray-600">{stat.title}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Bookings */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <span className="mr-2">📋</span>
              Recent Bookings
            </CardTitle>
            <CardDescription>
              Your latest booking requests
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {mockBookings.slice(0, 3).map((booking) => (
                <div key={booking.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div>
                    <p className="font-medium text-gray-900">{booking.guestName}</p>
                    <p className="text-sm text-gray-600">{booking.service}</p>
                    <p className="text-xs text-gray-500">{booking.checkIn} - {booking.checkOut}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold text-gray-900">${booking.amount}</p>
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      booking.status === 'confirmed' 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-yellow-100 text-yellow-800'
                    }`}>
                      {booking.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Recent Reviews */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <span className="mr-2">💬</span>
              Recent Reviews
            </CardTitle>
            <CardDescription>
              What your customers are saying
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {mockReviews.slice(0, 3).map((review) => (
                <div key={review.id} className="p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <p className="font-medium text-gray-900">{review.guestName}</p>
                    <div className="flex items-center">
                      <span className="text-yellow-400">{'⭐'.repeat(review.rating)}</span>
                      <span className="ml-1 text-sm text-gray-600">{review.rating}</span>
                    </div>
                  </div>
                  <p className="text-sm text-gray-600 mb-1">{review.comment}</p>
                  <p className="text-xs text-gray-500">{review.service} • {review.date}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <span className="mr-2">⚡</span>
            Quick Actions
          </CardTitle>
          <CardDescription>
            Common tasks to manage your business
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <button className="p-4 bg-blue-50 hover:bg-blue-100 rounded-lg text-center transition-colors">
              <span className="block text-2xl mb-2">🏨</span>
              <span className="text-sm font-medium text-gray-900">Manage Rooms</span>
            </button>
            <button className="p-4 bg-green-50 hover:bg-green-100 rounded-lg text-center transition-colors">
              <span className="block text-2xl mb-2">📅</span>
              <span className="text-sm font-medium text-gray-900">View Bookings</span>
            </button>
            <button className="p-4 bg-purple-50 hover:bg-purple-100 rounded-lg text-center transition-colors">
              <span className="block text-2xl mb-2">💳</span>
              <span className="text-sm font-medium text-gray-900">Payments</span>
            </button>
            <button className="p-4 bg-orange-50 hover:bg-orange-100 rounded-lg text-center transition-colors">
              <span className="block text-2xl mb-2">📊</span>
              <span className="text-sm font-medium text-gray-900">Analytics</span>
            </button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Overview;