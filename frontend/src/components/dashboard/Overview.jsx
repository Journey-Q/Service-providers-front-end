import React from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Badge } from '../ui/badge';
import { Progress } from '../ui/progress';
import { 
  DollarSign, 
  Calendar, 
  Star, 
  TrendingUp, 
  Users, 
  MessageCircle,
  Eye,
  MousePointer
} from 'lucide-react';
import { mockAnalytics, mockBookings, mockPayments, mockMessages } from '../../utils/mockData';

const Overview = () => {
  const { user } = useAuth();
  
  const stats = [
    {
      title: "Total Revenue",
      value: `$${mockAnalytics.totalRevenue.toLocaleString()}`,
      change: "+12.5%",
      changeType: "positive",
      icon: DollarSign,
      description: "Total earnings this year"
    },
    {
      title: "Monthly Revenue",
      value: `$${mockAnalytics.monthlyRevenue.toLocaleString()}`,
      change: "+8.2%",
      changeType: "positive",
      icon: TrendingUp,
      description: "This month's earnings"
    },
    {
      title: "Total Bookings",
      value: mockAnalytics.totalBookings,
      change: "+15.3%",
      changeType: "positive",
      icon: Calendar,
      description: "All time bookings"
    },
    {
      title: "Average Rating",
      value: mockAnalytics.avgRating.toFixed(1),
      change: `${mockAnalytics.totalReviews} reviews`,
      changeType: "neutral",
      icon: Star,
      description: "Customer satisfaction"
    }
  ];

  const recentBookings = mockBookings.slice(0, 3);
  const recentPayments = mockPayments.slice(0, 3);
  const unreadMessages = mockMessages.filter(msg => msg.unread);

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Welcome Section */}
      <div className="bg-gradient-to-r from-blue-600 to-cyan-500 rounded-2xl p-8 text-white">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold mb-2">Welcome back, {user?.name}!</h1>
            <p className="text-blue-100 text-lg">
              {user?.businessName} • {user?.serviceType?.replace('-', ' ')} Provider
            </p>
            <div className="flex items-center mt-4 space-x-4">
              <div className="flex items-center">
                <Star className="h-5 w-5 mr-1 fill-yellow-400 text-yellow-400" />
                <span className="font-semibold">{mockAnalytics.avgRating}</span>
              </div>
              <Badge variant="secondary" className="bg-white/20 text-white border-white/30">
                {mockAnalytics.totalReviews} Reviews
              </Badge>
            </div>
          </div>
          <div className="text-right">
            <p className="text-blue-100">Member since</p>
            <p className="text-xl font-semibold">{new Date(user?.joinedDate).getFullYear()}</p>
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <Card key={index} className="hover-scale hover-glow transition-all duration-200">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">
                {stat.title}
              </CardTitle>
              <stat.icon className="h-5 w-5 text-blue-600" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-gray-900 mb-1">
                {stat.value}
              </div>
              <div className="flex items-center text-sm">
                <span className={`${
                  stat.changeType === 'positive' ? 'text-green-600' : 'text-gray-500'
                } font-medium`}>
                  {stat.change}
                </span>
              </div>
              <p className="text-xs text-gray-500 mt-1">{stat.description}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Recent Bookings */}
        <Card className="hover-scale transition-all duration-200">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Calendar className="h-5 w-5 mr-2 text-blue-600" />
              Recent Bookings
            </CardTitle>
            <CardDescription>Latest booking requests and confirmations</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {recentBookings.map((booking) => (
              <div key={booking.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div className="flex-1">
                  <h4 className="font-semibold text-gray-900">{booking.customerName}</h4>
                  <p className="text-sm text-gray-600">{booking.serviceName}</p>
                  <p className="text-xs text-gray-500">
                    {booking.checkIn ? `${booking.checkIn} - ${booking.checkOut}` : booking.date}
                  </p>
                </div>
                <div className="text-right">
                  <p className="font-semibold text-gray-900">${booking.totalAmount}</p>
                  <Badge 
                    variant={booking.status === 'confirmed' ? 'default' : 'secondary'}
                    className="text-xs"
                  >
                    {booking.status}
                  </Badge>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Recent Payments */}
        <Card className="hover-scale transition-all duration-200">
          <CardHeader>
            <CardTitle className="flex items-center">
              <DollarSign className="h-5 w-5 mr-2 text-green-600" />
              Recent Payments
            </CardTitle>
            <CardDescription>Latest payment transactions</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {recentPayments.map((payment) => (
              <div key={payment.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div className="flex-1">
                  <h4 className="font-semibold text-gray-900">{payment.customerName}</h4>
                  <p className="text-sm text-gray-600">{payment.transactionId}</p>
                  <p className="text-xs text-gray-500">{payment.paymentMethod}</p>
                </div>
                <div className="text-right">
                  <p className="font-semibold text-green-600">+${payment.netAmount}</p>
                  <p className="text-xs text-gray-500">{payment.date}</p>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Top Services */}
        <Card className="lg:col-span-2 hover-scale transition-all duration-200">
          <CardHeader>
            <CardTitle className="flex items-center">
              <TrendingUp className="h-5 w-5 mr-2 text-blue-600" />
              Top Performing Services
            </CardTitle>
            <CardDescription>Your most popular services this month</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {mockAnalytics.topServices.map((service, index) => (
              <div key={index} className="space-y-2">
                <div className="flex items-center justify-between">
                  <h4 className="font-medium text-gray-900">{service.name}</h4>
                  <span className="text-sm font-semibold text-blue-600">${service.revenue}</span>
                </div>
                <div className="flex items-center justify-between text-sm text-gray-600">
                  <span>{service.bookings} bookings</span>
                  <span>{Math.round((service.bookings / mockAnalytics.totalBookings) * 100)}%</span>
                </div>
                <Progress 
                  value={(service.bookings / mockAnalytics.totalBookings) * 100} 
                  className="h-2"
                />
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Messages & Notifications */}
        <Card className="hover-scale transition-all duration-200">
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <div className="flex items-center">
                <MessageCircle className="h-5 w-5 mr-2 text-blue-600" />
                Messages
              </div>
              {unreadMessages.length > 0 && (
                <Badge variant="destructive" className="text-xs">
                  {unreadMessages.length} new
                </Badge>
              )}
            </CardTitle>
            <CardDescription>Recent customer messages</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {mockMessages.slice(0, 3).map((message) => (
              <div key={message.id} className={`p-3 rounded-lg border-l-4 ${
                message.unread ? 'bg-blue-50 border-blue-500' : 'bg-gray-50 border-gray-300'
              }`}>
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-medium text-gray-900">{message.customerName}</h4>
                  <span className="text-xs text-gray-500">
                    {new Date(message.timestamp).toLocaleDateString()}
                  </span>
                </div>
                <p className="text-sm text-gray-600 line-clamp-2">{message.lastMessage}</p>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Overview;