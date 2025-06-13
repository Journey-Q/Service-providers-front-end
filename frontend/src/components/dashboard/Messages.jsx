import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Textarea } from '../ui/textarea';

const Messages = () => {
  const [messages] = useState([
    { 
      id: 1, 
      sender: 'Alice Johnson', 
      subject: 'Question about Ocean View Suite', 
      message: 'Hi, I wanted to ask about the amenities included with the Ocean View Suite...', 
      time: '2 hours ago',
      unread: true,
      type: 'inquiry'
    },
    { 
      id: 2, 
      sender: 'Bob Smith', 
      subject: 'Booking Confirmation', 
      message: 'Thank you for confirming my tour package booking. Looking forward to the trip!', 
      time: '5 hours ago',
      unread: false,
      type: 'confirmation'
    },
    { 
      id: 3, 
      sender: 'Sarah Wilson', 
      subject: 'Special Request', 
      message: 'Could you please arrange for a late check-in? My flight arrives at 11 PM...', 
      time: '1 day ago',
      unread: true,
      type: 'request'
    },
    { 
      id: 4, 
      sender: 'Mike Davis', 
      subject: 'Review - Amazing Stay!', 
      message: 'Just wanted to thank you for the wonderful experience. The service was exceptional...', 
      time: '2 days ago',
      unread: false,
      type: 'review'
    },
  ]);

  const [selectedMessage, setSelectedMessage] = useState(null);
  const [replyText, setReplyText] = useState('');

  const unreadCount = messages.filter(m => m.unread).length;

  const getMessageIcon = (type) => {
    switch (type) {
      case 'inquiry': return '❓';
      case 'confirmation': return '✅';
      case 'request': return '🙋';
      case 'review': return '⭐';
      default: return '💬';
    }
  };

  const handleReply = (messageId) => {
    console.log('Replying to message:', messageId, 'with:', replyText);
    setReplyText('');
    setSelectedMessage(null);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Messages</h1>
          <p className="text-gray-600 mt-2">
            Communicate with your customers ({unreadCount} unread)
          </p>
        </div>
        <Button className="bg-blue-600 hover:bg-blue-700">
          <span className="mr-2">✉️</span>
          New Message
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Messages List */}
        <div className="lg:col-span-1">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <span className="mr-2">📬</span>
                Inbox
                {unreadCount > 0 && (
                  <span className="ml-auto bg-red-500 text-white text-xs rounded-full px-2 py-1">
                    {unreadCount}
                  </span>
                )}
              </CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <div className="space-y-1">
                {messages.map((message) => (
                  <div
                    key={message.id}
                    onClick={() => setSelectedMessage(message)}
                    className={`p-4 cursor-pointer border-b hover:bg-gray-50 transition-colors ${
                      selectedMessage?.id === message.id ? 'bg-blue-50 border-blue-200' : ''
                    } ${message.unread ? 'border-l-4 border-l-blue-500' : ''}`}
                  >
                    <div className="flex items-start space-x-3">
                      <div className="text-lg">{getMessageIcon(message.type)}</div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between">
                          <p className={`text-sm font-medium text-gray-900 truncate ${
                            message.unread ? 'font-semibold' : ''
                          }`}>
                            {message.sender}
                          </p>
                          <p className="text-xs text-gray-500">{message.time}</p>
                        </div>
                        <p className={`text-sm text-gray-600 truncate ${
                          message.unread ? 'font-medium' : ''
                        }`}>
                          {message.subject}
                        </p>
                        <p className="text-xs text-gray-500 truncate mt-1">
                          {message.message}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Message Detail */}
        <div className="lg:col-span-2">
          {selectedMessage ? (
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="text-2xl">{getMessageIcon(selectedMessage.type)}</div>
                    <div>
                      <CardTitle>{selectedMessage.subject}</CardTitle>
                      <p className="text-sm text-gray-600">
                        From: {selectedMessage.sender} • {selectedMessage.time}
                      </p>
                    </div>
                  </div>
                  {selectedMessage.unread && (
                    <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full">
                      New
                    </span>
                  )}
                </div>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <p className="text-gray-800 leading-relaxed">
                    {selectedMessage.message}
                  </p>
                </div>

                {/* Reply Section */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-gray-900">Reply</h3>
                  <Textarea
                    placeholder="Type your reply..."
                    value={replyText}
                    onChange={(e) => setReplyText(e.target.value)}
                    rows={4}
                  />
                  <div className="flex justify-end space-x-2">
                    <Button variant="outline" onClick={() => setSelectedMessage(null)}>
                      Cancel
                    </Button>
                    <Button 
                      onClick={() => handleReply(selectedMessage.id)}
                      disabled={!replyText.trim()}
                    >
                      Send Reply
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ) : (
            <Card>
              <CardContent className="text-center py-12">
                <div className="text-4xl mb-4">💬</div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">Select a message</h3>
                <p className="text-gray-600">
                  Choose a message from the inbox to view and reply
                </p>
              </CardContent>
            </Card>
          )}
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-blue-600">{messages.length}</div>
            <p className="text-sm text-gray-600">Total Messages</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-red-600">{unreadCount}</div>
            <p className="text-sm text-gray-600">Unread</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-green-600">
              {messages.filter(m => m.type === 'review').length}
            </div>
            <p className="text-sm text-gray-600">Reviews</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-purple-600">95%</div>
            <p className="text-sm text-gray-600">Response Rate</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Messages;