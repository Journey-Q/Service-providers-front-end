import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Input } from '../ui/input';
import { Textarea } from '../ui/textarea';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '../ui/dialog';
import { useToast } from '../../hooks/use-toast';
import { 
  MessageCircle, 
  Send, 
  Search, 
  Clock, 
  User,
  Phone,
  Mail,
  Calendar,
  Eye,
  MoreVertical
} from 'lucide-react';
import { mockMessages, mockBookings } from '../../utils/mockData';

const Messages = () => {
  const [messages, setMessages] = useState(mockMessages);
  const [selectedConversation, setSelectedConversation] = useState(null);
  const [newMessage, setNewMessage] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const { toast } = useToast();

  // Mock conversation messages
  const [conversationMessages, setConversationMessages] = useState({
    1: [
      {
        id: 1,
        senderId: 'customer',
        message: "Hi, I'd like to know about room availability for next week",
        timestamp: "2024-02-08T10:30:00Z",
        isRead: true
      },
      {
        id: 2,
        senderId: 'provider',
        message: "Hello! I'd be happy to help you with room availability. Which dates were you looking at specifically?",
        timestamp: "2024-02-08T10:35:00Z",
        isRead: true
      },
      {
        id: 3,
        senderId: 'customer',
        message: "I'm looking for February 15-18, for 2 guests. Do you have any ocean view rooms available?",
        timestamp: "2024-02-08T10:45:00Z",
        isRead: true
      },
      {
        id: 4,
        senderId: 'provider',
        message: "Perfect! Yes, we have our Deluxe Ocean View Room available for those dates. It's $299 per night and includes complimentary breakfast. Would you like me to hold this for you?",
        timestamp: "2024-02-08T11:00:00Z",
        isRead: true
      }
    ],
    2: [
      {
        id: 1,
        senderId: 'customer',
        message: "Thank you for the tour information!",
        timestamp: "2024-02-07T15:45:00Z",
        isRead: true
      },
      {
        id: 2,
        senderId: 'provider',
        message: "You're welcome! If you have any other questions about the Miami Beach Sunset Tour, feel free to ask.",
        timestamp: "2024-02-07T16:00:00Z",
        isRead: true
      }
    ]
  });

  const filteredMessages = messages.filter(message =>
    message.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    message.lastMessage.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const unreadCount = messages.filter(msg => msg.unread).length;

  const handleSendMessage = () => {
    if (!newMessage.trim() || !selectedConversation) return;

    const messageId = Date.now();
    const newMsg = {
      id: messageId,
      senderId: 'provider',
      message: newMessage,
      timestamp: new Date().toISOString(),
      isRead: true
    };

    setConversationMessages(prev => ({
      ...prev,
      [selectedConversation.id]: [...(prev[selectedConversation.id] || []), newMsg]
    }));

    // Update last message in conversations list
    setMessages(prev => prev.map(msg => 
      msg.id === selectedConversation.id 
        ? { ...msg, lastMessage: newMessage, timestamp: new Date().toISOString(), unread: false }
        : msg
    ));

    setNewMessage('');
    
    toast({
      title: "Message Sent",
      description: "Your message has been sent successfully",
    });
  };

  const handleMarkAsRead = (messageId) => {
    setMessages(prev => prev.map(msg => 
      msg.id === messageId ? { ...msg, unread: false } : msg
    ));
  };

  const formatTime = (timestamp) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diffInHours = Math.abs(now - date) / 36e5;

    if (diffInHours < 1) {
      return 'Just now';
    } else if (diffInHours < 24) {
      return `${Math.floor(diffInHours)}h ago`;
    } else {
      return date.toLocaleDateString();
    }
  };

  const ConversationList = () => (
    <div className="space-y-2">
      {filteredMessages.map((message) => {
        const booking = mockBookings.find(b => b.id === message.bookingId);
        
        return (
          <Card 
            key={message.id} 
            className={`cursor-pointer transition-all duration-200 hover-scale ${
              selectedConversation?.id === message.id ? 'ring-2 ring-blue-500 bg-blue-50' : ''
            } ${message.unread ? 'border-l-4 border-l-blue-500' : ''}`}
            onClick={() => {
              setSelectedConversation(message);
              handleMarkAsRead(message.id);
            }}
          >
            <CardContent className="p-4">
              <div className="flex items-start space-x-3">
                <Avatar className="h-10 w-10">
                  <AvatarImage src={message.customerAvatar} />
                  <AvatarFallback className="bg-gradient-to-r from-blue-600 to-cyan-500 text-white">
                    {message.customerName.charAt(0)}
                  </AvatarFallback>
                </Avatar>
                
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <h4 className="text-sm font-medium text-gray-900 truncate">
                      {message.customerName}
                    </h4>
                    <div className="flex items-center space-x-2">
                      {message.unread && (
                        <Badge className="bg-blue-600 text-white text-xs">New</Badge>
                      )}
                      <span className="text-xs text-gray-500">
                        {formatTime(message.timestamp)}
                      </span>
                    </div>
                  </div>
                  
                  <p className="text-sm text-gray-600 truncate mt-1">
                    {message.lastMessage}
                  </p>
                  
                  {booking && (
                    <p className="text-xs text-blue-600 mt-1">
                      Re: {booking.serviceName}
                    </p>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );

  const ConversationView = () => {
    if (!selectedConversation) {
      return (
        <Card className="h-full">
          <CardContent className="h-full flex items-center justify-center">
            <div className="text-center">
              <MessageCircle className="h-12 w-12 mx-auto text-gray-400 mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">Select a conversation</h3>
              <p className="text-gray-500">Choose a conversation from the list to start messaging</p>
            </div>
          </CardContent>
        </Card>
      );
    }

    const booking = mockBookings.find(b => b.id === selectedConversation.bookingId);
    const messages = conversationMessages[selectedConversation.id] || [];

    return (
      <Card className="h-full flex flex-col">
        {/* Conversation Header */}
        <CardHeader className="border-b border-gray-200">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Avatar className="h-10 w-10">
                <AvatarImage src={selectedConversation.customerAvatar} />
                <AvatarFallback className="bg-gradient-to-r from-blue-600 to-cyan-500 text-white">
                  {selectedConversation.customerName.charAt(0)}
                </AvatarFallback>
              </Avatar>
              <div>
                <h3 className="text-lg font-semibold text-gray-900">
                  {selectedConversation.customerName}
                </h3>
                {booking && (
                  <p className="text-sm text-gray-600">
                    Booking: {booking.serviceName}
                  </p>
                )}
              </div>
            </div>
            
            <div className="flex items-center space-x-2">
              {booking && (
                <Dialog>
                  <DialogTrigger asChild>
                    <Button variant="outline" size="sm">
                      <Eye className="h-4 w-4 mr-1" />
                      Booking Details
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Booking Information</DialogTitle>
                      <DialogDescription>
                        Details for booking #{booking.id}
                      </DialogDescription>
                    </DialogHeader>
                    <div className="space-y-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <p className="text-sm text-gray-600">Service</p>
                          <p className="font-medium">{booking.serviceName}</p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-600">Amount</p>
                          <p className="font-medium">${booking.totalAmount}</p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-600">Date</p>
                          <p className="font-medium">
                            {booking.checkIn ? `${booking.checkIn} - ${booking.checkOut}` : booking.date}
                          </p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-600">Status</p>
                          <Badge>{booking.status}</Badge>
                        </div>
                      </div>
                    </div>
                  </DialogContent>
                </Dialog>
              )}
              <Button variant="outline" size="sm">
                <MoreVertical className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </CardHeader>

        {/* Messages */}
        <CardContent className="flex-1 p-0 overflow-y-auto">
          <div className="p-4 space-y-4">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.senderId === 'provider' ? 'justify-end' : 'justify-start'}`}
              >
                <div className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                  message.senderId === 'provider'
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-100 text-gray-900'
                }`}>
                  <p className="text-sm">{message.message}</p>
                  <p className={`text-xs mt-1 ${
                    message.senderId === 'provider' ? 'text-blue-100' : 'text-gray-500'
                  }`}>
                    {formatTime(message.timestamp)}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>

        {/* Message Input */}
        <div className="border-t border-gray-200 p-4">
          <div className="flex items-center space-x-2">
            <Textarea
              placeholder="Type your message..."
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              className="flex-1 min-h-0 resize-none"
              rows={2}
              onKeyPress={(e) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                  e.preventDefault();
                  handleSendMessage();
                }
              }}
            />
            <Button 
              onClick={handleSendMessage}
              disabled={!newMessage.trim()}
              className="bg-blue-600 hover:bg-blue-700"
            >
              <Send className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </Card>
    );
  };

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Messages</h1>
          <p className="text-gray-600">Communicate with your customers</p>
        </div>
        <div className="flex items-center space-x-4">
          {unreadCount > 0 && (
            <Badge className="bg-red-600 text-white">
              {unreadCount} unread
            </Badge>
          )}
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Total Conversations</p>
                <p className="text-2xl font-bold text-gray-900">{messages.length}</p>
              </div>
              <MessageCircle className="h-8 w-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Unread Messages</p>
                <p className="text-2xl font-bold text-red-600">{unreadCount}</p>
              </div>
              <Badge className="h-8 w-8 bg-red-600 text-white rounded-full flex items-center justify-center">
                {unreadCount}
              </Badge>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Avg Response Time</p>
                <p className="text-2xl font-bold text-green-600">2.3h</p>
              </div>
              <Clock className="h-8 w-8 text-green-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Messages Interface */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 h-[600px]">
        {/* Conversations List */}
        <div className="lg:col-span-1">
          <Card className="h-full">
            <CardHeader>
              <CardTitle>Conversations</CardTitle>
              <CardDescription>Your customer messages</CardDescription>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Search conversations..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </CardHeader>
            <CardContent className="overflow-y-auto">
              <ConversationList />
            </CardContent>
          </Card>
        </div>

        {/* Conversation View */}
        <div className="lg:col-span-2">
          <ConversationView />
        </div>
      </div>

      {filteredMessages.length === 0 && (
        <Card>
          <CardContent className="p-12 text-center">
            <MessageCircle className="h-12 w-12 mx-auto text-gray-400 mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No conversations found</h3>
            <p className="text-gray-500">
              {searchTerm 
                ? 'Try adjusting your search criteria'
                : 'Customer messages will appear here'
              }
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default Messages;