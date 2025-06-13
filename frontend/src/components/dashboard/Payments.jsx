import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Input } from '../ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '../ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { useToast } from '../../hooks/use-toast';
import { 
  DollarSign, 
  CreditCard, 
  TrendingUp, 
  Download, 
  Eye, 
  Search,
  Calendar,
  RefreshCw,
  AlertCircle,
  CheckCircle,
  XCircle,
  Clock
} from 'lucide-react';
import { mockPayments, mockBookings } from '../../utils/mockData';

const Payments = () => {
  const [payments, setPayments] = useState(mockPayments);
  const [filteredPayments, setFilteredPayments] = useState(mockPayments);
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedPayment, setSelectedPayment] = useState(null);
  const { toast } = useToast();

  // Filter payments based on status and search
  React.useEffect(() => {
    let filtered = payments;
    
    if (selectedStatus !== 'all') {
      filtered = filtered.filter(payment => payment.status === selectedStatus);
    }
    
    if (searchTerm) {
      filtered = filtered.filter(payment => 
        payment.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        payment.transactionId.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    setFilteredPayments(filtered);
  }, [payments, selectedStatus, searchTerm]);

  const getStatusColor = (status) => {
    switch (status) {
      case 'completed': return 'bg-green-100 text-green-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'failed': return 'bg-red-100 text-red-800';
      case 'refunded': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'completed': return <CheckCircle className="h-4 w-4" />;
      case 'pending': return <Clock className="h-4 w-4" />;
      case 'failed': return <XCircle className="h-4 w-4" />;
      case 'refunded': return <RefreshCw className="h-4 w-4" />;
      default: return <AlertCircle className="h-4 w-4" />;
    }
  };

  const handleRefund = (paymentId) => {
    setPayments(payments.map(payment => 
      payment.id === paymentId ? { ...payment, status: 'refunded' } : payment
    ));
    
    toast({
      title: "Refund Processed",
      description: "Payment has been refunded successfully",
    });
  };

  const PaymentCard = ({ payment }) => (
    <Card className="hover-scale transition-all duration-200">
      <CardContent className="p-6">
        <div className="flex items-start justify-between mb-4">
          <div className="flex-1">
            <h3 className="text-lg font-semibold text-gray-900">{payment.customerName}</h3>
            <p className="text-sm text-gray-600 font-mono">{payment.transactionId}</p>
            <p className="text-xs text-gray-500 mt-1">{payment.date}</p>
          </div>
          <div className="flex flex-col items-end space-y-2">
            <div className="text-xl font-bold text-green-600">
              +${payment.amount}
            </div>
            <Badge className={getStatusColor(payment.status)}>
              {getStatusIcon(payment.status)}
              <span className="ml-1">{payment.status}</span>
            </Badge>
          </div>
        </div>

        <div className="space-y-2 mb-4">
          <div className="flex items-center justify-between text-sm">
            <span className="text-gray-600">Payment Method:</span>
            <span className="font-medium">{payment.paymentMethod}</span>
          </div>
          <div className="flex items-center justify-between text-sm">
            <span className="text-gray-600">Service Fee:</span>
            <span className="text-red-600">-${payment.serviceFee}</span>
          </div>
          <div className="flex items-center justify-between text-sm border-t pt-2">
            <span className="text-gray-600 font-medium">Net Amount:</span>
            <span className="font-bold text-green-600">${payment.netAmount}</span>
          </div>
        </div>

        <div className="flex items-center justify-between">
          <div className="text-xs text-gray-500">
            Booking #{payment.bookingId}
          </div>
          <div className="flex items-center space-x-2">
            <Dialog>
              <DialogTrigger asChild>
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => setSelectedPayment(payment)}
                >
                  <Eye className="h-4 w-4 mr-1" />
                  Details
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-2xl">
                <DialogHeader>
                  <DialogTitle>Payment Details</DialogTitle>
                  <DialogDescription>
                    Complete information for transaction {payment.transactionId}
                  </DialogDescription>
                </DialogHeader>
                {selectedPayment && <PaymentDetails payment={selectedPayment} />}
              </DialogContent>
            </Dialog>
            
            {payment.status === 'completed' && (
              <Button 
                size="sm" 
                variant="outline"
                onClick={() => handleRefund(payment.id)}
              >
                <RefreshCw className="h-4 w-4 mr-1" />
                Refund
              </Button>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );

  const PaymentDetails = ({ payment }) => {
    const booking = mockBookings.find(b => b.id === payment.bookingId);
    
    return (
      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div>
              <h4 className="font-medium text-gray-900">Transaction Information</h4>
              <div className="mt-2 space-y-2">
                <p className="text-sm text-gray-600">
                  <strong>Transaction ID:</strong> {payment.transactionId}
                </p>
                <p className="text-sm text-gray-600">
                  <strong>Date:</strong> {payment.date}
                </p>
                <p className="text-sm text-gray-600">
                  <strong>Method:</strong> {payment.paymentMethod}
                </p>
                <div className="flex items-center space-x-2">
                  <strong className="text-sm text-gray-600">Status:</strong>
                  <Badge className={getStatusColor(payment.status)}>
                    {getStatusIcon(payment.status)}
                    <span className="ml-1">{payment.status}</span>
                  </Badge>
                </div>
              </div>
            </div>
            
            <div>
              <h4 className="font-medium text-gray-900">Customer Information</h4>
              <div className="mt-2 space-y-2">
                <p className="text-sm text-gray-600">
                  <strong>Name:</strong> {payment.customerName}
                </p>
                {booking && (
                  <p className="text-sm text-gray-600">
                    <strong>Email:</strong> {booking.customerEmail}
                  </p>
                )}
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <div>
              <h4 className="font-medium text-gray-900">Financial Breakdown</h4>
              <div className="mt-2 space-y-2">
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Gross Amount:</span>
                  <span className="text-sm font-medium">${payment.amount}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Service Fee:</span>
                  <span className="text-sm text-red-600">-${payment.serviceFee}</span>
                </div>
                <div className="flex justify-between border-t pt-2">
                  <span className="text-sm font-medium text-gray-900">Net Amount:</span>
                  <span className="text-sm font-bold text-green-600">${payment.netAmount}</span>
                </div>
              </div>
            </div>

            {booking && (
              <div>
                <h4 className="font-medium text-gray-900">Booking Details</h4>
                <div className="mt-2 space-y-2">
                  <p className="text-sm text-gray-600">
                    <strong>Service:</strong> {booking.serviceName}
                  </p>
                  <p className="text-sm text-gray-600">
                    <strong>Date:</strong> {booking.checkIn ? `${booking.checkIn} - ${booking.checkOut}` : booking.date}
                  </p>
                  <p className="text-sm text-gray-600">
                    <strong>Guests:</strong> {booking.guests || booking.participants}
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  };

  const stats = {
    totalRevenue: payments.reduce((sum, p) => sum + p.netAmount, 0),
    totalTransactions: payments.length,
    completedPayments: payments.filter(p => p.status === 'completed').length,
    pendingPayments: payments.filter(p => p.status === 'pending').length,
  };

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Payments</h1>
          <p className="text-gray-600">Track your earnings and payment history</p>
        </div>
        <div className="flex items-center space-x-4">
          <Button variant="outline" size="sm">
            <Download className="h-4 w-4 mr-2" />
            Export
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Total Revenue</p>
                <p className="text-2xl font-bold text-green-600">${stats.totalRevenue.toFixed(2)}</p>
              </div>
              <DollarSign className="h-8 w-8 text-green-600" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Transactions</p>
                <p className="text-2xl font-bold text-gray-900">{stats.totalTransactions}</p>
              </div>
              <CreditCard className="h-8 w-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Completed</p>
                <p className="text-2xl font-bold text-green-600">{stats.completedPayments}</p>
              </div>
              <CheckCircle className="h-8 w-8 text-green-600" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Pending</p>
                <p className="text-2xl font-bold text-yellow-600">{stats.pendingPayments}</p>
              </div>
              <Clock className="h-8 w-8 text-yellow-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0">
            <div className="flex items-center space-x-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Search payments..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 w-64"
                />
              </div>
              <Select value={selectedStatus} onValueChange={setSelectedStatus}>
                <SelectTrigger className="w-40">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="completed">Completed</SelectItem>
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="failed">Failed</SelectItem>
                  <SelectItem value="refunded">Refunded</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="text-sm text-gray-600">
              Showing {filteredPayments.length} of {payments.length} payments
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Payments List */}
      <Tabs defaultValue="grid" className="space-y-6">
        <TabsList>
          <TabsTrigger value="grid">Grid View</TabsTrigger>
          <TabsTrigger value="list">List View</TabsTrigger>
        </TabsList>

        <TabsContent value="grid">
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
            {filteredPayments.map((payment) => (
              <PaymentCard key={payment.id} payment={payment} />
            ))}
          </div>
        </TabsContent>

        <TabsContent value="list">
          <Card>
            <CardContent className="p-0">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Transaction
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Customer
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Amount
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Method
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Status
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {filteredPayments.map((payment) => (
                      <tr key={payment.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div>
                            <div className="text-sm font-medium text-gray-900">{payment.transactionId}</div>
                            <div className="text-sm text-gray-500">{payment.date}</div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {payment.customerName}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm font-medium text-gray-900">${payment.amount}</div>
                          <div className="text-sm text-green-600">Net: ${payment.netAmount}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {payment.paymentMethod}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <Badge className={getStatusColor(payment.status)}>
                            {getStatusIcon(payment.status)}
                            <span className="ml-1">{payment.status}</span>
                          </Badge>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                          <div className="flex items-center space-x-2">
                            <Button variant="outline" size="sm">
                              <Eye className="h-4 w-4" />
                            </Button>
                            {payment.status === 'completed' && (
                              <Button size="sm" variant="outline" onClick={() => handleRefund(payment.id)}>
                                <RefreshCw className="h-4 w-4" />
                              </Button>
                            )}
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {filteredPayments.length === 0 && (
        <Card>
          <CardContent className="p-12 text-center">
            <DollarSign className="h-12 w-12 mx-auto text-gray-400 mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No payments found</h3>
            <p className="text-gray-500">
              {searchTerm || selectedStatus !== 'all' 
                ? 'Try adjusting your search criteria'
                : 'Payment transactions will appear here'
              }
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default Payments;