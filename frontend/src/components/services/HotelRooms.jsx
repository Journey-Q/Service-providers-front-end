import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Input } from '../ui/input';
import { Textarea } from '../ui/textarea';
import { Label } from '../ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '../ui/dialog';
import { Switch } from '../ui/switch';
import { useToast } from '../../hooks/use-toast';
import { 
  Plus, 
  Edit, 
  Trash2, 
  Upload, 
  Eye, 
  Bed,
  Users,
  DollarSign,
  Calendar,
  Wifi,
  Car,
  Coffee,
  Tv,
  Wind,
  Bath
} from 'lucide-react';

const HotelRooms = () => {
  const [rooms, setRooms] = useState([
    {
      id: 1,
      name: "Deluxe Ocean View Room",
      description: "Spacious room with stunning ocean views and modern amenities",
      price: 299,
      capacity: 2,
      bedType: "King",
      size: "45 sqm",
      amenities: ["wifi", "ac", "tv", "minibar", "balcony"],
      images: [],
      availability: true,
      totalRooms: 5,
      availableRooms: 3,
      rating: 4.7,
      reviews: 45
    },
    {
      id: 2,
      name: "Presidential Suite",
      description: "Luxury suite with private balcony and premium services",
      price: 799,
      capacity: 4,
      bedType: "King + Sofa Bed",
      size: "120 sqm",
      amenities: ["wifi", "ac", "tv", "minibar", "balcony", "kitchen", "living_room"],
      images: [],
      availability: true,
      totalRooms: 2,
      availableRooms: 1,
      rating: 4.9,
      reviews: 23
    }
  ]);

  const [selectedRoom, setSelectedRoom] = useState(null);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    capacity: '',
    bedType: '',
    size: '',
    amenities: [],
    totalRooms: '',
    availability: true
  });
  const { toast } = useToast();

  const amenityIcons = {
    wifi: Wifi,
    ac: Wind,
    tv: Tv,
    minibar: Coffee,
    balcony: Eye,
    kitchen: Coffee,
    living_room: Bed,
    parking: Car,
    bathroom: Bath
  };

  const amenityLabels = {
    wifi: 'WiFi',
    ac: 'Air Conditioning',
    tv: 'Smart TV',
    minibar: 'Mini Bar',
    balcony: 'Balcony',
    kitchen: 'Kitchenette',
    living_room: 'Living Area',
    parking: 'Parking',
    bathroom: 'Private Bathroom'
  };

  const handleCreateRoom = () => {
    if (!formData.name || !formData.price || !formData.capacity) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields",
        variant: "destructive"
      });
      return;
    }

    const newRoom = {
      id: Date.now(),
      ...formData,
      price: parseFloat(formData.price),
      capacity: parseInt(formData.capacity),
      totalRooms: parseInt(formData.totalRooms) || 1,
      availableRooms: parseInt(formData.totalRooms) || 1,
      images: [],
      rating: 0,
      reviews: 0
    };

    setRooms([...rooms, newRoom]);
    setFormData({
      name: '',
      description: '',
      price: '',
      capacity: '',
      bedType: '',
      size: '',
      amenities: [],
      totalRooms: '',
      availability: true
    });
    setIsCreateModalOpen(false);

    toast({
      title: "Room Created",
      description: "New room has been added successfully",
    });
  };

  const handleToggleAvailability = (roomId) => {
    setRooms(rooms.map(room => 
      room.id === roomId 
        ? { ...room, availability: !room.availability }
        : room
    ));
    
    toast({
      title: "Availability Updated",
      description: "Room availability has been changed",
    });
  };

  const handleDeleteRoom = (roomId) => {
    setRooms(rooms.filter(room => room.id !== roomId));
    toast({
      title: "Room Deleted",
      description: "The room has been removed",
    });
  };

  const handleAmenityToggle = (amenity) => {
    setFormData(prev => ({
      ...prev,
      amenities: prev.amenities.includes(amenity)
        ? prev.amenities.filter(a => a !== amenity)
        : [...prev.amenities, amenity]
    }));
  };

  const RoomCard = ({ room }) => (
    <Card className="hover-scale transition-all duration-200">
      <CardContent className="p-6">
        <div className="flex items-start justify-between mb-4">
          <div className="flex-1">
            <h3 className="text-lg font-semibold text-gray-900 mb-1">{room.name}</h3>
            <p className="text-sm text-gray-600 mb-2">{room.description}</p>
            <div className="flex items-center space-x-4 text-xs text-gray-500">
              <span className="flex items-center">
                <Users className="h-3 w-3 mr-1" />
                {room.capacity} guests
              </span>
              <span className="flex items-center">
                <Bed className="h-3 w-3 mr-1" />
                {room.bedType}
              </span>
              {room.size && <span>{room.size}</span>}
            </div>
          </div>
          <div className="flex flex-col items-end space-y-2">
            <div className="text-xl font-bold text-blue-600">
              ${room.price}/night
            </div>
            <Badge variant={room.availability ? 'default' : 'secondary'}>
              {room.availability ? 'Available' : 'Unavailable'}
            </Badge>
          </div>
        </div>

        {/* Amenities */}
        <div className="mb-4">
          <div className="flex flex-wrap gap-2">
            {room.amenities.slice(0, 5).map((amenity) => {
              const Icon = amenityIcons[amenity];
              return (
                <div key={amenity} className="flex items-center space-x-1 bg-gray-100 px-2 py-1 rounded text-xs">
                  {Icon && <Icon className="h-3 w-3" />}
                  <span>{amenityLabels[amenity]}</span>
                </div>
              );
            })}
            {room.amenities.length > 5 && (
              <div className="bg-gray-100 px-2 py-1 rounded text-xs">
                +{room.amenities.length - 5} more
              </div>
            )}
          </div>
        </div>

        {/* Availability Info */}
        <div className="grid grid-cols-2 gap-4 mb-4 text-sm">
          <div className="flex justify-between">
            <span className="text-gray-600">Total Rooms:</span>
            <span className="font-medium">{room.totalRooms}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Available:</span>
            <span className={`font-medium ${room.availableRooms > 0 ? 'text-green-600' : 'text-red-600'}`}>
              {room.availableRooms}
            </span>
          </div>
        </div>

        {/* Rating */}
        {room.reviews > 0 && (
          <div className="flex items-center space-x-2 mb-4">
            <div className="flex items-center">
              <span className="text-yellow-400">★</span>
              <span className="text-sm font-medium ml-1">{room.rating}</span>
            </div>
            <span className="text-xs text-gray-500">({room.reviews} reviews)</span>
          </div>
        )}

        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Dialog>
              <DialogTrigger asChild>
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => setSelectedRoom(room)}
                >
                  <Eye className="h-4 w-4 mr-1" />
                  Details
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-3xl">
                <DialogHeader>
                  <DialogTitle>Room Details</DialogTitle>
                  <DialogDescription>
                    Complete information for {room.name}
                  </DialogDescription>
                </DialogHeader>
                {selectedRoom && <RoomDetails room={selectedRoom} />}
              </DialogContent>
            </Dialog>
            <Button variant="outline" size="sm">
              <Edit className="h-4 w-4 mr-1" />
              Edit
            </Button>
          </div>
          <div className="flex items-center space-x-2">
            <div className="flex items-center space-x-2">
              <Label htmlFor={`availability-${room.id}`} className="text-xs">Available</Label>
              <Switch
                id={`availability-${room.id}`}
                checked={room.availability}
                onCheckedChange={() => handleToggleAvailability(room.id)}
              />
            </div>
            <Button 
              size="sm" 
              variant="destructive"
              onClick={() => handleDeleteRoom(room.id)}
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );

  const RoomDetails = ({ room }) => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-4">
          <div>
            <h4 className="font-medium text-gray-900 mb-2">Room Information</h4>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">Name:</span>
                <span className="text-sm font-medium">{room.name}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">Price:</span>
                <span className="text-sm font-medium">${room.price}/night</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">Capacity:</span>
                <span className="text-sm font-medium">{room.capacity} guests</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">Bed Type:</span>
                <span className="text-sm font-medium">{room.bedType}</span>
              </div>
              {room.size && (
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Size:</span>
                  <span className="text-sm font-medium">{room.size}</span>
                </div>
              )}
            </div>
          </div>
          
          <div>
            <h4 className="font-medium text-gray-900 mb-2">Description</h4>
            <p className="text-sm text-gray-600">{room.description}</p>
          </div>
        </div>

        <div className="space-y-4">
          <div>
            <h4 className="font-medium text-gray-900 mb-2">Availability</h4>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">Status:</span>
                <Badge variant={room.availability ? 'default' : 'secondary'}>
                  {room.availability ? 'Available' : 'Unavailable'}
                </Badge>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">Total Rooms:</span>
                <span className="text-sm font-medium">{room.totalRooms}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">Available Now:</span>
                <span className={`text-sm font-medium ${room.availableRooms > 0 ? 'text-green-600' : 'text-red-600'}`}>
                  {room.availableRooms}
                </span>
              </div>
            </div>
          </div>

          <div>
            <h4 className="font-medium text-gray-900 mb-2">Guest Feedback</h4>
            {room.reviews > 0 ? (
              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <span className="text-yellow-400 text-lg">★</span>
                  <span className="font-medium">{room.rating}</span>
                  <span className="text-sm text-gray-500">({room.reviews} reviews)</span>
                </div>
              </div>
            ) : (
              <p className="text-sm text-gray-500">No reviews yet</p>
            )}
          </div>
        </div>
      </div>

      <div>
        <h4 className="font-medium text-gray-900 mb-2">Amenities</h4>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
          {room.amenities.map((amenity) => {
            const Icon = amenityIcons[amenity];
            return (
              <div key={amenity} className="flex items-center space-x-2 p-2 bg-gray-50 rounded">
                {Icon && <Icon className="h-4 w-4 text-blue-600" />}
                <span className="text-sm">{amenityLabels[amenity]}</span>
              </div>
            );
          })}
        </div>
      </div>

      <div>
        <h4 className="font-medium text-gray-900 mb-2">Room Images</h4>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {room.images.length > 0 ? (
            room.images.map((image, index) => (
              <div key={index} className="aspect-video bg-gray-200 rounded-lg flex items-center justify-center">
                <img src={image} alt={`Room ${index + 1}`} className="w-full h-full object-cover rounded-lg" />
              </div>
            ))
          ) : (
            <div className="col-span-full p-8 border-2 border-dashed border-gray-300 rounded-lg text-center">
              <Upload className="h-8 w-8 mx-auto text-gray-400 mb-2" />
              <p className="text-sm text-gray-500">No images uploaded</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Room Management</h1>
          <p className="text-gray-600">Manage your hotel rooms and availability</p>
        </div>
        <div className="flex items-center space-x-4">
          <Dialog open={isCreateModalOpen} onOpenChange={setIsCreateModalOpen}>
            <DialogTrigger asChild>
              <Button className="bg-blue-600 hover:bg-blue-700">
                <Plus className="h-4 w-4 mr-2" />
                Add Room
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl">
              <DialogHeader>
                <DialogTitle>Add New Room</DialogTitle>
                <DialogDescription>
                  Create a new room listing for your hotel
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="name">Room Name *</Label>
                    <Input
                      id="name"
                      value={formData.name}
                      onChange={(e) => setFormData({...formData, name: e.target.value})}
                      placeholder="e.g., Deluxe Ocean View"
                    />
                  </div>
                  <div>
                    <Label htmlFor="price">Price per Night ($) *</Label>
                    <Input
                      id="price"
                      type="number"
                      value={formData.price}
                      onChange={(e) => setFormData({...formData, price: e.target.value})}
                      placeholder="299"
                    />
                  </div>
                </div>
                
                <div>
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    value={formData.description}
                    onChange={(e) => setFormData({...formData, description: e.target.value})}
                    placeholder="Describe your room..."
                    rows={3}
                  />
                </div>

                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <Label htmlFor="capacity">Max Guests *</Label>
                    <Input
                      id="capacity"
                      type="number"
                      value={formData.capacity}
                      onChange={(e) => setFormData({...formData, capacity: e.target.value})}
                      placeholder="2"
                    />
                  </div>
                  <div>
                    <Label htmlFor="totalRooms">Total Rooms</Label>
                    <Input
                      id="totalRooms"
                      type="number"
                      value={formData.totalRooms}
                      onChange={(e) => setFormData({...formData, totalRooms: e.target.value})}
                      placeholder="1"
                    />
                  </div>
                  <div>
                    <Label htmlFor="size">Room Size</Label>
                    <Input
                      id="size"
                      value={formData.size}
                      onChange={(e) => setFormData({...formData, size: e.target.value})}
                      placeholder="45 sqm"
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="bedType">Bed Type</Label>
                  <Select onValueChange={(value) => setFormData({...formData, bedType: value})}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select bed type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Single">Single Bed</SelectItem>
                      <SelectItem value="Double">Double Bed</SelectItem>
                      <SelectItem value="Queen">Queen Bed</SelectItem>
                      <SelectItem value="King">King Bed</SelectItem>
                      <SelectItem value="Twin">Twin Beds</SelectItem>
                      <SelectItem value="King + Sofa Bed">King + Sofa Bed</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label>Amenities</Label>
                  <div className="grid grid-cols-3 gap-2 mt-2">
                    {Object.entries(amenityLabels).map(([key, label]) => (
                      <div key={key} className="flex items-center space-x-2">
                        <Switch
                          id={key}
                          checked={formData.amenities.includes(key)}
                          onCheckedChange={() => handleAmenityToggle(key)}
                        />
                        <Label htmlFor={key} className="text-sm">{label}</Label>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="flex justify-end space-x-2">
                  <Button variant="outline" onClick={() => setIsCreateModalOpen(false)}>
                    Cancel
                  </Button>
                  <Button onClick={handleCreateRoom} className="bg-blue-600 hover:bg-blue-700">
                    Create Room
                  </Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Total Rooms</p>
                <p className="text-2xl font-bold text-gray-900">{rooms.length}</p>
              </div>
              <Bed className="h-8 w-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Available</p>
                <p className="text-2xl font-bold text-green-600">
                  {rooms.filter(r => r.availability && r.availableRooms > 0).length}
                </p>
              </div>
              <Calendar className="h-8 w-8 text-green-600" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Avg. Price</p>
                <p className="text-2xl font-bold text-blue-600">
                  ${Math.round(rooms.reduce((sum, r) => sum + r.price, 0) / rooms.length || 0)}
                </p>
              </div>
              <DollarSign className="h-8 w-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Avg. Rating</p>
                <p className="text-2xl font-bold text-yellow-600">
                  {(rooms.reduce((sum, r) => sum + (r.rating || 0), 0) / rooms.length || 0).toFixed(1)}
                </p>
              </div>
              <span className="text-2xl">⭐</span>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Rooms Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
        {rooms.map((room) => (
          <RoomCard key={room.id} room={room} />
        ))}
      </div>

      {rooms.length === 0 && (
        <Card>
          <CardContent className="p-12 text-center">
            <Bed className="h-12 w-12 mx-auto text-gray-400 mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No rooms added yet</h3>
            <p className="text-gray-500 mb-4">
              Start by adding your first room to begin accepting bookings
            </p>
            <Button 
              onClick={() => setIsCreateModalOpen(true)}
              className="bg-blue-600 hover:bg-blue-700"
            >
              <Plus className="h-4 w-4 mr-2" />
              Add Your First Room
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default HotelRooms;