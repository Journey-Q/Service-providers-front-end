import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { mockStats } from '../../utils/mockData';

const Analytics = () => {
  const monthlyData = [
    { month: 'Jan', bookings: 23, revenue: 4500 },
    { month: 'Feb', bookings: 31, revenue: 6200 },
    { month: 'Mar', bookings: 45, revenue: 8900 },
    { month: 'Apr', bookings: 52, revenue: 10400 },
    { month: 'May', bookings: 38, revenue: 7600 },
    { month: 'Jun', bookings: 41, revenue: 8200 },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Analytics Dashboard</h1>
        <p className="text-gray-600 mt-2">Track your business performance and growth</p>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Total Revenue</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-900">${mockStats.totalRevenue.toLocaleString()}</div>
            <p className="text-xs text-green-600 flex items-center mt-1">
              <span className="mr-1">↗</span>
              +12% from last month
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Bookings</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-900">{mockStats.totalBookings}</div>
            <p className="text-xs text-green-600 flex items-center mt-1">
              <span className="mr-1">↗</span>
              +8% from last month
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Average Rating</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-900">{mockStats.averageRating}</div>
            <p className="text-xs text-green-600 flex items-center mt-1">
              <span className="mr-1">↗</span>
              +0.2 from last month
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Completion Rate</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-900">94%</div>
            <p className="text-xs text-green-600 flex items-center mt-1">
              <span className="mr-1">↗</span>
              +3% from last month
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Revenue Chart */}
        <Card>
          <CardHeader>
            <CardTitle>Revenue Trend</CardTitle>
            <CardDescription>Monthly revenue over the last 6 months</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-80 flex items-end justify-between space-x-2">
              {monthlyData.map((data, index) => (
                <div key={index} className="flex flex-col items-center flex-1">
                  <div 
                    className="w-full bg-blue-500 rounded-t-sm mb-2 min-h-4"
                    style={{ height: `${(data.revenue / 12000) * 200}px` }}
                  ></div>
                  <span className="text-xs text-gray-600">{data.month}</span>
                  <span className="text-xs text-gray-800 font-medium">${data.revenue}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Bookings Chart */}
        <Card>
          <CardHeader>
            <CardTitle>Booking Trend</CardTitle>
            <CardDescription>Number of bookings over the last 6 months</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-80 flex items-end justify-between space-x-2">
              {monthlyData.map((data, index) => (
                <div key={index} className="flex flex-col items-center flex-1">
                  <div 
                    className="w-full bg-green-500 rounded-t-sm mb-2 min-h-4"
                    style={{ height: `${(data.bookings / 60) * 200}px` }}
                  ></div>
                  <span className="text-xs text-gray-600">{data.month}</span>
                  <span className="text-xs text-gray-800 font-medium">{data.bookings}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Performance Insights */}
      <Card>
        <CardHeader>
          <CardTitle>Performance Insights</CardTitle>
          <CardDescription>Key insights about your business performance</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center p-4 bg-blue-50 rounded-lg">
              <div className="text-2xl mb-2">🏆</div>
              <h3 className="font-semibold text-gray-900 mb-1">Top Performer</h3>
              <p className="text-sm text-gray-600">Your Ocean View Suite is your most popular service</p>
            </div>
            <div className="text-center p-4 bg-green-50 rounded-lg">
              <div className="text-2xl mb-2">📈</div>
              <h3 className="font-semibold text-gray-900 mb-1">Growth Trend</h3>
              <p className="text-sm text-gray-600">Bookings have increased by 25% this quarter</p>
            </div>
            <div className="text-center p-4 bg-purple-50 rounded-lg">
              <div className="text-2xl mb-2">⭐</div>
              <h3 className="font-semibold text-gray-900 mb-1">Customer Satisfaction</h3>
              <p className="text-sm text-gray-600">95% of customers rate you 4+ stars</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Analytics;