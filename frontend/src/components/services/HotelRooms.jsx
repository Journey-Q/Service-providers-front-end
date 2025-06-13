import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Textarea } from '../ui/textarea';

const HotelRooms = () => {
  const [rooms, setRooms] = useState([
    {
      id: 1,
      name: 'Ocean View Suite',
      type: 'Suite',
      capacity: 4,
      price: 250,
      currency: 'USD',
      amenities: ['Ocean View', 'Balcony', 'Mini Bar', 'WiFi'],
      available: true,
      description: 'Luxurious suite with panoramic ocean views and premium amenities.'
    },
    {
      id: 2,
      name: 'Standard Room',
      type: 'Standard',
      capacity: 2,
      price: 120,
      currency: 'USD',
      amenities: ['WiFi', 'TV', 'Air Conditioning'],
      available: true,
      description: 'Comfortable standard room with essential amenities.'
    },
    {
      id: 3,
      name: 'Family Villa',
      type: 'Villa',
      capacity: 6,
      price: 350,
      currency: 'USD',
      amenities: ['Private Pool', 'Kitchen', 'Garden', 'WiFi', 'Parking'],
      available: false,
      description: 'Spacious family villa with private pool and garden.'
    }
  ]);

  const [showAddForm, setShowAddForm] = useState(false);
  const [newRoom, setNewRoom] = useState({
    name: '',
    type: '',
    capacity: '',
    price: '',
    description: '',
    amenities: ''
  });

  const handleAddRoom = () => {
    if (newRoom.name && newRoom.type && newRoom.capacity && newRoom.price) {
      const room = {
        id: rooms.length + 1,
        ...newRoom,
        capacity: parseInt(newRoom.capacity),
        price: parseFloat(newRoom.price),
        currency: 'USD',
        amenities: newRoom.amenities.split(',').map(a => a.trim()).filter(a => a),
        available: true
      };
      setRooms([...rooms, room]);
      setNewRoom({ name: '', type: '', capacity: '', price: '', description: '', amenities: '' });
      setShowAddForm(false);
    }
  };

  const toggleAvailability = (roomId) => {
    setRooms(rooms.map(room => 
      room.id === roomId 
        ? { ...room, available: !room.available }
        : room
    ));
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Hotel Rooms</h1>
          <p className="text-gray-600 mt-2">Manage your accommodation offerings</p>
        </div>
        <Button 
          onClick={() => setShowAddForm(!showAddForm)}
          className="bg-blue-600 hover:bg-blue-700"
        >
          <span className="mr-2">🏨</span>
          Add Room
        </Button>
      </div>

      {/* Room Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-blue-600">{rooms.length}</div>
            <p className="text-sm text-gray-600">Total Rooms</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-green-600">
              {rooms.filter(r => r.available).length}
            </div>
            <p className="text-sm text-gray-600">Available</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-red-600">
              {rooms.filter(r => !r.available).length}
            </div>
            <p className="text-sm text-gray-600">Unavailable</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-purple-600">
              ${Math.round(rooms.reduce((sum, r) => sum + r.price, 0) / rooms.length)}
            </div>
            <p className="text-sm text-gray-600">Avg. Price</p>
          </CardContent>
        </Card>
      </div>

      {/* Add Room Form */}
      {showAddForm && (
        <Card>
          <CardHeader>
            <CardTitle>Add New Room</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="roomName">Room Name</Label>
                <Input
                  id="roomName"
                  value={newRoom.name}
                  onChange={(e) => setNewRoom({...newRoom, name: e.target.value})}
                  placeholder="Enter room name"
                />
              </div>
              <div>
                <Label htmlFor="roomType">Room Type</Label>
                <Input
                  id="roomType"
                  value={newRoom.type}
                  onChange={(e) => setNewRoom({...newRoom, type: e.target.value})}
                  placeholder="e.g., Suite, Standard, Villa"
                />
              </div>
              <div>
                <Label htmlFor="capacity">Capacity (guests)</Label>
                <Input
                  id="capacity"
                  type="number"
                  value={newRoom.capacity}
                  onChange={(e) => setNewRoom({...newRoom, capacity: e.target.value})}
                  placeholder="Number of guests"
                />
              </div>
              <div>
                <Label htmlFor="price">Price per night ($)</Label>
                <Input
                  id="price"
                  type="number"
                  value={newRoom.price}
                  onChange={(e) => setNewRoom({...newRoom, price: e.target.value})}
                  placeholder="Price in USD"
                />
              </div>
            </div>
            <div>
              <Label htmlFor="amenities">Amenities (comma-separated)</Label>
              <Input
                id="amenities"
                value={newRoom.amenities}
                onChange={(e) => setNewRoom({...newRoom, amenities: e.target.value})}
                placeholder="WiFi, TV, Balcony, etc."
              />
            </div>
            <div>
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                value={newRoom.description}
                onChange={(e) => setNewRoom({...newRoom, description: e.target.value})}
                placeholder="Describe the room features and highlights"
                rows={3}
              />
            </div>
            <div className="flex space-x-2">
              <Button onClick={handleAddRoom}>Add Room</Button>
              <Button variant="outline" onClick={() => setShowAddForm(false)}>Cancel</Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Rooms List */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {rooms.map((room) => (
          <Card key={room.id} className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle className="text-xl">{room.name}</CardTitle>
                  <p className="text-sm text-gray-600 mt-1">{room.type} • Up to {room.capacity} guests</p>
                </div>
                <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
                  room.available 
                    ? 'bg-green-100 text-green-800' 
                    : 'bg-red-100 text-red-800'
                }`}>
                  {room.available ? 'Available' : 'Unavailable'}
                </span>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-gray-700">{room.description}</p>
              
              <div>
                <h4 className="font-medium text-gray-900 mb-2">Amenities</h4>
                <div className="flex flex-wrap gap-2">
                  {room.amenities.map((amenity, index) => (
                    <span 
                      key={index}
                      className="inline-flex items-center px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full"
                    >
                      {amenity}
                    </span>
                  ))}
                </div>
              </div>
              
              <div className="flex justify-between items-center pt-4 border-t">
                <div>
                  <span className="text-2xl font-bold text-gray-900">
                    ${room.price}
                  </span>
                  <span className="text-gray-600"> / night</span>
                </div>
                <div className="flex space-x-2">
                  <Button size="sm" variant="outline">
                    Edit
                  </Button>
                  <Button 
                    size="sm" 
                    variant={room.available ? "outline" : "default"}
                    onClick={() => toggleAvailability(room.id)}
                    className={room.available ? '' : 'bg-green-600 hover:bg-green-700'}
                  >
                    {room.available ? 'Disable' : 'Enable'}
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {rooms.length === 0 && (
        <Card>
          <CardContent className="text-center py-12">
            <div className="text-4xl mb-4">🏨</div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">No rooms yet</h3>
            <p className="text-gray-600 mb-4">
              Start by adding your first accommodation offering
            </p>
            <Button onClick={() => setShowAddForm(true)}>Add Your First Room</Button>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default HotelRooms;