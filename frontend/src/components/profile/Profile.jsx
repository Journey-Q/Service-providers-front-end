import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Input } from '../ui/input';
import { Textarea } from '../ui/textarea';
import { Label } from '../ui/label';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { Switch } from '../ui/switch';
import { useAuth } from '../../contexts/AuthContext';
import { useToast } from '../../hooks/use-toast';
import { 
  User, 
  Mail, 
  Phone, 
  MapPin, 
  Camera, 
  Star,
  Calendar,
  DollarSign,
  Users,
  Edit,
  Save,
  Upload,
  Building,
  Globe,
  Clock
} from 'lucide-react';

const Profile = () => {
  const { user, updateProfile } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    phone: user?.phone || '',
    address: user?.address || '',
    businessName: user?.businessName || '',
    description: user?.description || '',
    website: user?.website || '',
    operatingHours: user?.operatingHours || '',
    profileImage: user?.profileImage || null
  });
  const { toast } = useToast();

  const handleSave = () => {
    updateProfile(formData);
    setIsEditing(false);
    toast({
      title: "Profile Updated",
      description: "Your profile has been saved successfully",
    });
  };

  const handleCancel = () => {
    setFormData({
      name: user?.name || '',
      email: user?.email || '',
      phone: user?.phone || '',
      address: user?.address || '',
      businessName: user?.businessName || '',
      description: user?.description || '',
      website: user?.website || '',
      operatingHours: user?.operatingHours || '',
      profileImage: user?.profileImage || null
    });
    setIsEditing(false);
  };

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      // In a real app, you would upload to a server
      // For now, we'll use a placeholder
      const reader = new FileReader();
      reader.onload = (e) => {
        setFormData({ ...formData, profileImage: e.target.result });
      };
      reader.readAsDataURL(file);
    }
  };

  const getServiceTypeLabel = (type) => {
    const labels = {
      'hotel': 'Hotel Provider',
      'tour-guide': 'Tour Guide',
      'travel-service': 'Travel Service',
      'general': 'General Service Provider'
    };
    return labels[type] || type;
  };

  // Mock statistics (in a real app, these would come from the backend)
  const stats = {
    totalBookings: 156,
    totalRevenue: 24680,
    avgRating: 4.7,
    totalReviews: 89,
    memberSince: user?.joinedDate || '2023-01-15',
    responseRate: 95,
    responseTime: '2.3 hours'
  };

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Profile</h1>
          <p className="text-gray-600">Manage your business profile and information</p>
        </div>
        <div className="flex items-center space-x-4">
          {isEditing ? (
            <>
              <Button variant="outline" onClick={handleCancel}>
                Cancel
              </Button>
              <Button onClick={handleSave} className="bg-blue-600 hover:bg-blue-700">
                <Save className="h-4 w-4 mr-2" />
                Save Changes
              </Button>
            </>
          ) : (
            <Button onClick={() => setIsEditing(true)} className="bg-blue-600 hover:bg-blue-700">
              <Edit className="h-4 w-4 mr-2" />
              Edit Profile
            </Button>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Profile Overview */}
        <div className="lg:col-span-1 space-y-6">
          <Card>
            <CardContent className="p-6">
              <div className="text-center">
                <div className="relative inline-block mb-4">
                  <Avatar className="h-24 w-24 mx-auto">
                    <AvatarImage src={formData.profileImage} />
                    <AvatarFallback className="bg-gradient-to-r from-blue-600 to-cyan-500 text-white text-xl">
                      {formData.name?.charAt(0) || 'U'}
                    </AvatarFallback>
                  </Avatar>
                  {isEditing && (
                    <label htmlFor="profile-image" className="absolute bottom-0 right-0 bg-blue-600 rounded-full p-2 cursor-pointer hover:bg-blue-700 transition-colors">
                      <Camera className="h-4 w-4 text-white" />
                      <input
                        id="profile-image"
                        type="file"
                        accept="image/*"
                        onChange={handleImageUpload}
                        className="hidden"
                      />
                    </label>
                  )}
                </div>
                
                <h2 className="text-xl font-bold text-gray-900 mb-1">{user?.name}</h2>
                <Badge className="mb-2">
                  {getServiceTypeLabel(user?.serviceType)}
                </Badge>
                
                <div className="space-y-2 text-sm text-gray-600">
                  <div className="flex items-center justify-center">
                    <Building className="h-4 w-4 mr-2" />
                    {user?.businessName}
                  </div>
                  <div className="flex items-center justify-center">
                    <Calendar className="h-4 w-4 mr-2" />
                    Member since {new Date(stats.memberSince).getFullYear()}
                  </div>
                </div>

                {stats.avgRating > 0 && (
                  <div className="flex items-center justify-center mt-4 space-x-2">
                    <Star className="h-5 w-5 text-yellow-400 fill-current" />
                    <span className="font-semibold">{stats.avgRating}</span>
                    <span className="text-gray-500">({stats.totalReviews} reviews)</span>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Quick Stats */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Performance Stats</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Calendar className="h-4 w-4 text-blue-600" />
                  <span className="text-sm text-gray-600">Total Bookings</span>
                </div>
                <span className="font-semibold">{stats.totalBookings}</span>
              </div>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <DollarSign className="h-4 w-4 text-green-600" />
                  <span className="text-sm text-gray-600">Total Revenue</span>
                </div>
                <span className="font-semibold">${stats.totalRevenue.toLocaleString()}</span>
              </div>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Users className="h-4 w-4 text-purple-600" />
                  <span className="text-sm text-gray-600">Response Rate</span>
                </div>
                <span className="font-semibold">{stats.responseRate}%</span>
              </div>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Clock className="h-4 w-4 text-orange-600" />
                  <span className="text-sm text-gray-600">Avg Response Time</span>
                </div>
                <span className="font-semibold">{stats.responseTime}</span>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Profile Details */}
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Personal Information</CardTitle>
              <CardDescription>Your basic contact and business information</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="name">Full Name</Label>
                  {isEditing ? (
                    <Input
                      id="name"
                      value={formData.name}
                      onChange={(e) => setFormData({...formData, name: e.target.value})}
                      placeholder="Enter your full name"
                    />
                  ) : (
                    <div className="flex items-center mt-1">
                      <User className="h-4 w-4 mr-2 text-gray-400" />
                      <span>{user?.name || 'Not provided'}</span>
                    </div>
                  )}
                </div>
                
                <div>
                  <Label htmlFor="email">Email Address</Label>
                  {isEditing ? (
                    <Input
                      id="email"
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({...formData, email: e.target.value})}
                      placeholder="Enter your email"
                    />
                  ) : (
                    <div className="flex items-center mt-1">
                      <Mail className="h-4 w-4 mr-2 text-gray-400" />
                      <span>{user?.email || 'Not provided'}</span>
                    </div>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="phone">Phone Number</Label>
                  {isEditing ? (
                    <Input
                      id="phone"
                      value={formData.phone}
                      onChange={(e) => setFormData({...formData, phone: e.target.value})}
                      placeholder="Enter your phone number"
                    />
                  ) : (
                    <div className="flex items-center mt-1">
                      <Phone className="h-4 w-4 mr-2 text-gray-400" />
                      <span>{user?.phone || 'Not provided'}</span>
                    </div>
                  )}
                </div>
                
                <div>
                  <Label htmlFor="website">Website</Label>
                  {isEditing ? (
                    <Input
                      id="website"
                      value={formData.website}
                      onChange={(e) => setFormData({...formData, website: e.target.value})}
                      placeholder="https://your-website.com"
                    />
                  ) : (
                    <div className="flex items-center mt-1">
                      <Globe className="h-4 w-4 mr-2 text-gray-400" />
                      <span>{user?.website || 'Not provided'}</span>
                    </div>
                  )}
                </div>
              </div>

              <div>
                <Label htmlFor="address">Business Address</Label>
                {isEditing ? (
                  <Textarea
                    id="address"
                    value={formData.address}
                    onChange={(e) => setFormData({...formData, address: e.target.value})}
                    placeholder="Enter your business address"
                    rows={2}
                  />
                ) : (
                  <div className="flex items-start mt-1">
                    <MapPin className="h-4 w-4 mr-2 text-gray-400 mt-0.5" />
                    <span>{user?.address || 'Not provided'}</span>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Business Information</CardTitle>
              <CardDescription>Details about your business and services</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="businessName">Business Name</Label>
                {isEditing ? (
                  <Input
                    id="businessName"
                    value={formData.businessName}
                    onChange={(e) => setFormData({...formData, businessName: e.target.value})}
                    placeholder="Enter your business name"
                  />
                ) : (
                  <div className="flex items-center mt-1">
                    <Building className="h-4 w-4 mr-2 text-gray-400" />
                    <span>{user?.businessName || 'Not provided'}</span>
                  </div>
                )}
              </div>

              <div>
                <Label htmlFor="description">Business Description</Label>
                {isEditing ? (
                  <Textarea
                    id="description"
                    value={formData.description}
                    onChange={(e) => setFormData({...formData, description: e.target.value})}
                    placeholder="Describe your business and services..."
                    rows={4}
                  />
                ) : (
                  <div className="mt-1">
                    <p className="text-gray-700">
                      {user?.description || 'No description provided. Add a description to help customers understand your services better.'}
                    </p>
                  </div>
                )}
              </div>

              <div>
                <Label htmlFor="operatingHours">Operating Hours</Label>
                {isEditing ? (
                  <Input
                    id="operatingHours"
                    value={formData.operatingHours}
                    onChange={(e) => setFormData({...formData, operatingHours: e.target.value})}
                    placeholder="e.g., Mon-Fri: 9AM-6PM, Sat-Sun: 10AM-4PM"
                  />
                ) : (
                  <div className="flex items-center mt-1">
                    <Clock className="h-4 w-4 mr-2 text-gray-400" />
                    <span>{user?.operatingHours || 'Not provided'}</span>
                  </div>
                )}
              </div>

              <div>
                <Label>Service Type</Label>
                <div className="mt-1">
                  <Badge variant="outline" className="capitalize">
                    {getServiceTypeLabel(user?.serviceType)}
                  </Badge>
                </div>
                <p className="text-xs text-gray-500 mt-1">
                  Contact support to change your service type
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Verification Status */}
          <Card>
            <CardHeader>
              <CardTitle>Account Verification</CardTitle>
              <CardDescription>Verification status and requirements</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                  <div>
                    <p className="font-medium text-green-900">Email Verified</p>
                    <p className="text-sm text-green-700">Your email is verified</p>
                  </div>
                  <Badge className="bg-green-600">Verified</Badge>
                </div>
                
                <div className="flex items-center justify-between p-3 bg-yellow-50 rounded-lg">
                  <div>
                    <p className="font-medium text-yellow-900">Phone Verification</p>
                    <p className="text-sm text-yellow-700">Verify your phone number</p>
                  </div>
                  <Badge variant="outline">Pending</Badge>
                </div>
                
                <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
                  <div>
                    <p className="font-medium text-blue-900">Business License</p>
                    <p className="text-sm text-blue-700">Upload business documents</p>
                  </div>
                  <Badge variant="outline">Optional</Badge>
                </div>
                
                <div className="flex items-center justify-between p-3 bg-purple-50 rounded-lg">
                  <div>
                    <p className="font-medium text-purple-900">Profile Complete</p>
                    <p className="text-sm text-purple-700">85% completed</p>
                  </div>
                  <Badge className="bg-purple-600">85%</Badge>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Profile;