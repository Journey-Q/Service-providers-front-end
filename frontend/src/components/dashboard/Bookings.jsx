import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { mockBookings } from '../../utils/mockData';

const Bookings = () => {
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [bookings, setBookings] = useState(mockBookings);

  const filteredBookings = selectedStatus === 'all' 
    ? bookings 
    : bookings.filter(booking => booking.status === selectedStatus);

  const statusOptions = [
    { value: 'all', label: 'All Bookings', count: bookings.length },
    { value: 'confirmed', label: 'Confirmed', count: bookings.filter(b => b.status === 'confirmed').length },
    { value: 'pending', label: 'Pending', count: bookings.filter(b => b.status === 'pending').length },
    { value: 'cancelled', label: 'Cancelled', count: bookings.filter(b => b.status === 'cancelled').length },
  ];

  const handleStatusChange = (bookingId, newStatus) => {
    setBookings(prev => 
      prev.map(booking => 
        booking.id === bookingId 
          ? { ...booking, status: newStatus }
          : booking
      )
    );
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Bookings</h1>
          <p className="text-gray-600 mt-2">Manage your customer bookings and reservations</p>
        </div>
        <Button className="bg-blue-600 hover:bg-blue-700">
          <span className="mr-2">➕</span>
          New Booking
        </Button>
      </div>

      {/* Status Filter */}
      <div className="flex space-x-4 overflow-x-auto">
        {statusOptions.map((option) => (
          <button
            key={option.value}
            onClick={() => setSelectedStatus(option.value)}
            className={`flex-shrink-0 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              selectedStatus === option.value
                ? 'bg-blue-100 text-blue-700 border border-blue-200'
                : 'bg-white text-gray-600 border border-gray-200 hover:bg-gray-50'
            }`}
          >
            {option.label} ({option.count})
          </button>
        ))}
      </div>

      {/* Bookings List */}
      <div className="space-y-4">
        {filteredBookings.length === 0 ? (
          <Card>
            <CardContent className="text-center py-12">
              <div className="text-4xl mb-4">📅</div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">No bookings found</h3>
              <p className="text-gray-600 mb-4">
                {selectedStatus === 'all' 
                  ? "You don't have any bookings yet." 
                  : `No ${selectedStatus} bookings found.`}
              </p>
              <Button>Create New Booking</Button>
            </CardContent>
          </Card>
        ) : (
          filteredBookings.map((booking) => (
            <Card key={booking.id} className="hover:shadow-md transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <div className="flex items-center space-x-4">
                      <div className="flex-shrink-0">
                        <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
                          <span className="text-white font-semibold text-lg">
                            {booking.guestName.charAt(0)}
                          </span>
                        </div>
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="text-lg font-semibold text-gray-900">
                          {booking.guestName}
                        </h3>
                        <p className="text-sm text-gray-600">{booking.service}</p>
                        <div className="flex items-center space-x-4 mt-2 text-sm text-gray-500">
                          <span>📅 {booking.checkIn} - {booking.checkOut}</span>
                          <span>👥 {booking.guests} guests</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4">
                    <div className="text-right">
                      <div className="text-2xl font-bold text-gray-900">
                        ${booking.amount}
                      </div>
                      <div className="flex items-center space-x-2 mt-2">
                        <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${
                          booking.status === 'confirmed' 
                            ? 'bg-green-100 text-green-800' 
                            : booking.status === 'pending'
                            ? 'bg-yellow-100 text-yellow-800'
                            : 'bg-red-100 text-red-800'
                        }`}>
                          {booking.status}
                        </span>
                      </div>
                    </div>
                    <div className="flex flex-col space-y-2">
                      {booking.status === 'pending' && (
                        <>
                          <Button
                            size="sm"
                            onClick={() => handleStatusChange(booking.id, 'confirmed')}
                            className="bg-green-600 hover:bg-green-700"
                          >
                            Confirm
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => handleStatusChange(booking.id, 'cancelled')}
                          >
                            Cancel
                          </Button>
                        </>
                      )}
                      <Button size="sm" variant="outline">
                        View Details
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </div>
  );
};

export default Bookings;