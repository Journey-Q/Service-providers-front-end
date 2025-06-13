import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { 
  TrendingUp, 
  TrendingDown, 
  DollarSign, 
  Users, 
  Calendar, 
  Star,
  Eye,
  MousePointer,
  Percent,
  Download
} from 'lucide-react';
import { mockAnalytics, mockBookings, mockPayments } from '../../utils/mockData';

const Analytics = () => {
  const [timeRange, setTimeRange] = useState('month');

  // Mock analytics data based on time range
  const getAnalyticsData = () => {
    const baseData = {
      revenue: {
        current: timeRange === 'week' ? 850 : timeRange === 'month' ? 3240 : 15420,
        previous: timeRange === 'week' ? 720 : timeRange === 'month' ? 2980 : 13450,
        change: timeRange === 'week' ? 18.1 : timeRange === 'month' ? 8.7 : 14.6
      },
      bookings: {
        current: timeRange === 'week' ? 4 : timeRange === 'month' ? 15 : 89,
        previous: timeRange === 'week' ? 3 : timeRange === 'month' ? 12 : 76,
        change: timeRange === 'week' ? 33.3 : timeRange === 'month' ? 25.0 : 17.1
      },
      conversion: {
        current: timeRange === 'week' ? 14.2 : timeRange === 'month' ? 12.5 : 11.8,
        previous: timeRange === 'week' ? 12.8 : timeRange === 'month' ? 11.2 : 10.5,
        change: timeRange === 'week' ? 10.9 : timeRange === 'month' ? 11.6 : 12.4
      },
      views: timeRange === 'week' ? 1240 : timeRange === 'month' ? 5680 : 34200,
      clicks: timeRange === 'week' ? 176 : timeRange === 'month' ? 710 : 4035
    };
    return baseData;
  };

  const analytics = getAnalyticsData();

  const MetricCard = ({ title, value, change, changeType, icon: Icon, description, prefix = '', suffix = '' }) => (
    <Card className="hover-scale transition-all duration-200">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium text-gray-600">{title}</CardTitle>
        <Icon className="h-5 w-5 text-blue-600" />
      </CardHeader>
      <CardContent>
        <div className="text-3xl font-bold text-gray-900 mb-2">
          {prefix}{typeof value === 'number' ? value.toLocaleString() : value}{suffix}
        </div>
        <div className="flex items-center text-sm">
          {changeType === 'positive' ? (
            <TrendingUp className="h-4 w-4 text-green-600 mr-1" />
          ) : changeType === 'negative' ? (
            <TrendingDown className="h-4 w-4 text-red-600 mr-1" />
          ) : null}
          <span className={`font-medium ${
            changeType === 'positive' ? 'text-green-600' : 
            changeType === 'negative' ? 'text-red-600' : 'text-gray-500'
          }`}>
            {changeType !== 'neutral' && (changeType === 'positive' ? '+' : '')}{change}%
          </span>
          <span className="text-gray-500 ml-1">vs last {timeRange}</span>
        </div>
        <p className="text-xs text-gray-500 mt-1">{description}</p>
      </CardContent>
    </Card>
  );

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Analytics</h1>
          <p className="text-gray-600">Track your business performance and growth</p>
        </div>
        <div className="flex items-center space-x-4">
          <Select value={timeRange} onValueChange={setTimeRange}>
            <SelectTrigger className="w-32">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="week">This Week</SelectItem>
              <SelectItem value="month">This Month</SelectItem>
              <SelectItem value="year">This Year</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline" size="sm">
            <Download className="h-4 w-4 mr-2" />
            Export
          </Button>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <MetricCard
          title="Revenue"
          value={analytics.revenue.current}
          change={analytics.revenue.change}
          changeType="positive"
          icon={DollarSign}
          description={`Total earnings this ${timeRange}`}
          prefix="$"
        />
        <MetricCard
          title="Bookings"
          value={analytics.bookings.current}
          change={analytics.bookings.change}
          changeType="positive"
          icon={Calendar}
          description={`New bookings this ${timeRange}`}
        />
        <MetricCard
          title="Conversion Rate"
          value={analytics.conversion.current}
          change={analytics.conversion.change}
          changeType="positive"
          icon={Percent}
          description="Views to bookings ratio"
          suffix="%"
        />
        <MetricCard
          title="Average Rating"
          value={mockAnalytics.avgRating}
          change="neutral"
          changeType="neutral"
          icon={Star}
          description={`Based on ${mockAnalytics.totalReviews} reviews`}
        />
      </div>

      <Tabs defaultValue="performance" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="performance">Performance</TabsTrigger>
          <TabsTrigger value="revenue">Revenue</TabsTrigger>
          <TabsTrigger value="bookings">Bookings</TabsTrigger>
          <TabsTrigger value="engagement">Engagement</TabsTrigger>
        </TabsList>

        <TabsContent value="performance" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Performance Overview */}
            <Card>
              <CardHeader>
                <CardTitle>Performance Overview</CardTitle>
                <CardDescription>Key performance indicators for this {timeRange}</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <Eye className="h-4 w-4 text-blue-600" />
                      <span className="text-sm font-medium">Profile Views</span>
                    </div>
                    <span className="text-lg font-bold">{analytics.views.toLocaleString()}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <MousePointer className="h-4 w-4 text-green-600" />
                      <span className="text-sm font-medium">Service Clicks</span>
                    </div>
                    <span className="text-lg font-bold">{analytics.clicks.toLocaleString()}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <Calendar className="h-4 w-4 text-purple-600" />
                      <span className="text-sm font-medium">Bookings</span>
                    </div>
                    <span className="text-lg font-bold">{analytics.bookings.current}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <Percent className="h-4 w-4 text-orange-600" />
                      <span className="text-sm font-medium">Conversion Rate</span>
                    </div>
                    <span className="text-lg font-bold">{analytics.conversion.current}%</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Top Services */}
            <Card>
              <CardHeader>
                <CardTitle>Top Performing Services</CardTitle>
                <CardDescription>Your most successful offerings</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {mockAnalytics.topServices.map((service, index) => (
                    <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div className="flex-1">
                        <h4 className="font-medium text-gray-900">{service.name}</h4>
                        <p className="text-sm text-gray-600">{service.bookings} bookings</p>
                      </div>
                      <div className="text-right">
                        <p className="font-semibold text-green-600">${service.revenue.toLocaleString()}</p>
                        <Badge variant="secondary" className="text-xs">
                          #{index + 1}
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="revenue" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <Card className="lg:col-span-2">
              <CardHeader>
                <CardTitle>Revenue Breakdown</CardTitle>
                <CardDescription>Detailed revenue analysis</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-64 flex items-center justify-center text-gray-500">
                  <div className="text-center">
                    <TrendingUp className="h-12 w-12 mx-auto mb-4 text-blue-600" />
                    <p>Revenue chart visualization would go here</p>
                    <p className="text-sm">Integration with charting library needed</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Payment Methods</CardTitle>
                <CardDescription>Revenue by payment type</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm">Credit Card</span>
                  <span className="font-semibold">68%</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">PayPal</span>
                  <span className="font-semibold">22%</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Bank Transfer</span>
                  <span className="font-semibold">10%</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="bookings" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Booking Trends</CardTitle>
              <CardDescription>Analysis of booking patterns and trends</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-64 flex items-center justify-center text-gray-500">
                <div className="text-center">
                  <Calendar className="h-12 w-12 mx-auto mb-4 text-blue-600" />
                  <p>Booking trends chart would go here</p>
                  <p className="text-sm">Shows booking patterns over time</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="engagement" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Customer Engagement</CardTitle>
                <CardDescription>How customers interact with your services</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
                  <div>
                    <p className="font-medium">Average Response Time</p>
                    <p className="text-sm text-gray-600">Time to respond to messages</p>
                  </div>
                  <Badge className="bg-blue-600">2.3 hours</Badge>
                </div>
                <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                  <div>
                    <p className="font-medium">Customer Satisfaction</p>
                    <p className="text-sm text-gray-600">Based on reviews and ratings</p>
                  </div>
                  <Badge className="bg-green-600">92%</Badge>
                </div>
                <div className="flex items-center justify-between p-3 bg-purple-50 rounded-lg">
                  <div>
                    <p className="font-medium">Repeat Customers</p>
                    <p className="text-sm text-gray-600">Customers who booked again</p>
                  </div>
                  <Badge className="bg-purple-600">34%</Badge>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Review Summary</CardTitle>
                <CardDescription>Customer feedback overview</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {[5, 4, 3, 2, 1].map((rating) => (
                  <div key={rating} className="flex items-center space-x-3">
                    <span className="text-sm w-8">{rating} ★</span>
                    <div className="flex-1 bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-blue-600 h-2 rounded-full" 
                        style={{ width: `${rating === 5 ? 60 : rating === 4 ? 25 : rating === 3 ? 10 : rating === 2 ? 3 : 2}%` }}
                      ></div>
                    </div>
                    <span className="text-sm text-gray-600 w-8">
                      {rating === 5 ? 60 : rating === 4 ? 25 : rating === 3 ? 10 : rating === 2 ? 3 : 2}%
                    </span>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Analytics;