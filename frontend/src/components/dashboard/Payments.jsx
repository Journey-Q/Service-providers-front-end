import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';

const Payments = () => {
  const [payments] = useState([
    { id: 1, booking: 'Ocean View Suite - Alice Johnson', amount: 450, status: 'completed', date: '2024-03-15', method: 'Credit Card' },
    { id: 2, booking: 'City Tour Package - Bob Smith', amount: 280, status: 'pending', date: '2024-03-14', method: 'PayPal' },
    { id: 3, booking: 'Beach Villa - Sarah Wilson', amount: 650, status: 'completed', date: '2024-03-13', method: 'Bank Transfer' },
    { id: 4, booking: 'Standard Room - Mike Davis', amount: 120, status: 'failed', date: '2024-03-12', method: 'Credit Card' },
  ]);

  const totalRevenue = payments.filter(p => p.status === 'completed').reduce((sum, p) => sum + p.amount, 0);
  const pendingPayments = payments.filter(p => p.status === 'pending').reduce((sum, p) => sum + p.amount, 0);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Payments</h1>
          <p className="text-gray-600 mt-2">Track your earnings and payment history</p>
        </div>
        <Button className="bg-green-600 hover:bg-green-700">
          <span className="mr-2">💳</span>
          Payment Settings
        </Button>
      </div>

      {/* Payment Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Total Revenue</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">${totalRevenue.toLocaleString()}</div>
            <p className="text-xs text-gray-500 mt-1">Completed payments</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Pending</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-yellow-600">${pendingPayments.toLocaleString()}</div>
            <p className="text-xs text-gray-500 mt-1">Awaiting payment</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">This Month</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">$1,200</div>
            <p className="text-xs text-green-600 mt-1">+15% from last month</p>
          </CardContent>
        </Card>
      </div>

      {/* Payment Methods */}
      <Card>
        <CardHeader>
          <CardTitle>Payment Methods</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 border rounded-lg text-center">
              <div className="text-2xl mb-2">💳</div>
              <h3 className="font-semibold">Credit Cards</h3>
              <p className="text-sm text-gray-600 mt-1">Visa, Mastercard, Amex</p>
              <span className="inline-block mt-2 px-2 py-1 bg-green-100 text-green-800 text-xs rounded">Active</span>
            </div>
            <div className="p-4 border rounded-lg text-center">
              <div className="text-2xl mb-2">🏦</div>
              <h3 className="font-semibold">Bank Transfer</h3>
              <p className="text-sm text-gray-600 mt-1">Direct bank payments</p>
              <span className="inline-block mt-2 px-2 py-1 bg-green-100 text-green-800 text-xs rounded">Active</span>
            </div>
            <div className="p-4 border rounded-lg text-center">
              <div className="text-2xl mb-2">📱</div>
              <h3 className="font-semibold">Digital Wallets</h3>
              <p className="text-sm text-gray-600 mt-1">PayPal, Apple Pay</p>
              <span className="inline-block mt-2 px-2 py-1 bg-green-100 text-green-800 text-xs rounded">Active</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Recent Payments */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Payments</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {payments.map((payment) => (
              <div key={payment.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div className="flex-1">
                  <h3 className="font-medium text-gray-900">{payment.booking}</h3>
                  <div className="flex items-center space-x-4 mt-1 text-sm text-gray-500">
                    <span>📅 {payment.date}</span>
                    <span>💳 {payment.method}</span>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="text-right">
                    <div className="text-lg font-semibold text-gray-900">
                      ${payment.amount}
                    </div>
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      payment.status === 'completed' 
                        ? 'bg-green-100 text-green-800' 
                        : payment.status === 'pending'
                        ? 'bg-yellow-100 text-yellow-800'
                        : 'bg-red-100 text-red-800'
                    }`}>
                      {payment.status}
                    </span>
                  </div>
                  <Button size="sm" variant="outline">
                    View
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Payments;