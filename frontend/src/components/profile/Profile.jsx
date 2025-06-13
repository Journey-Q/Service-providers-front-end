import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Textarea } from '../ui/textarea';
import { useAuth } from '../../contexts/AuthContext';

const Profile = () => {
  const { user, updateProfile } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    businessName: user?.businessName || '',
    phone: user?.phone || '',
    address: user?.address || '',
    serviceType: user?.serviceType || '',
    bio: user?.bio || 'Passionate about providing exceptional travel experiences...',
    website: user?.website || '',
    languages: user?.languages || 'English, Spanish',
    experience: user?.experience || '5+ years'
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSave = () => {
    updateProfile(formData);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setFormData({
      name: user?.name || '',
      email: user?.email || '',
      businessName: user?.businessName || '',
      phone: user?.phone || '',
      address: user?.address || '',
      serviceType: user?.serviceType || '',
      bio: user?.bio || 'Passionate about providing exceptional travel experiences...',
      website: user?.website || '',
      languages: user?.languages || 'English, Spanish',
      experience: user?.experience || '5+ years'
    });
    setIsEditing(false);
  };

  const serviceTypeLabels = {
    'hotel': 'Hotel Provider',
    'tour-guide': 'Tour Guide',
    'travel-service': 'Travel Service',
    'general': 'General Service Provider'
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Profile</h1>
          <p className="text-gray-600 mt-2">Manage your professional profile and business information</p>
        </div>
        {!isEditing ? (
          <Button onClick={() => setIsEditing(true)} className="bg-blue-600 hover:bg-blue-700">
            <span className="mr-2">✏️</span>
            Edit Profile
          </Button>
        ) : (
          <div className="flex space-x-2">
            <Button onClick={handleSave} className="bg-green-600 hover:bg-green-700">
              Save Changes
            </Button>
            <Button onClick={handleCancel} variant="outline">
              Cancel
            </Button>
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Profile Overview */}
        <div className="lg:col-span-1">
          <Card>
            <CardContent className="text-center p-6">
              <div className="mb-4">
                <div className="w-24 h-24 mx-auto bg-gradient-to-r from-blue-600 to-cyan-500 rounded-full flex items-center justify-center">
                  <span className="text-3xl font-bold text-white">
                    {user?.name?.charAt(0)?.toUpperCase() || 'U'}
                  </span>
                </div>
              </div>
              <h2 className="text-xl font-bold text-gray-900 mb-1">{user?.name}</h2>
              <p className="text-gray-600 mb-3">{serviceTypeLabels[user?.serviceType] || user?.serviceType}</p>
              <p className="text-sm text-gray-500 mb-4">{user?.businessName}</p>
              
              <div className="border-t pt-4">
                <div className="grid grid-cols-2 gap-4 text-center">
                  <div>
                    <div className="text-2xl font-bold text-blue-600">{user?.rating || 4.8}</div>
                    <div className="text-xs text-gray-600">Rating</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-green-600">{user?.totalReviews || 127}</div>
                    <div className="text-xs text-gray-600">Reviews</div>
                  </div>
                </div>
              </div>
              
              <div className="mt-4 pt-4 border-t">
                <p className="text-xs text-gray-500">
                  Member since {user?.joinedDate || '2023-01-15'}
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Quick Stats */}
          <Card className="mt-6">
            <CardHeader>
              <CardTitle className="text-lg">Quick Stats</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Profile Completion</span>
                <span className="text-sm font-medium text-gray-900">85%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-blue-600 h-2 rounded-full" style={{ width: '85%' }}></div>
              </div>
              
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Response Rate</span>
                <span className="text-sm font-medium text-green-600">98%</span>
              </div>
              
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Active Services</span>
                <span className="text-sm font-medium text-gray-900">12</span>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Profile Details */}
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>Business Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {isEditing ? (
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="name">Full Name</Label>
                      <Input
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                      />
                    </div>
                    <div>
                      <Label htmlFor="email">Email Address</Label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleChange}
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="businessName">Business Name</Label>
                      <Input
                        id="businessName"
                        name="businessName"
                        value={formData.businessName}
                        onChange={handleChange}
                      />
                    </div>
                    <div>
                      <Label htmlFor="phone">Phone Number</Label>
                      <Input
                        id="phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                      />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="address">Business Address</Label>
                    <Textarea
                      id="address"
                      name="address"
                      value={formData.address}
                      onChange={handleChange}
                      rows={3}
                    />
                  </div>

                  <div>
                    <Label htmlFor="bio">Professional Bio</Label>
                    <Textarea
                      id="bio"
                      name="bio"
                      value={formData.bio}
                      onChange={handleChange}
                      rows={4}
                      placeholder="Tell potential customers about your experience and what makes your services special..."
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="website">Website</Label>
                      <Input
                        id="website"
                        name="website"
                        value={formData.website}
                        onChange={handleChange}
                        placeholder="https://your-website.com"
                      />
                    </div>
                    <div>
                      <Label htmlFor="experience">Years of Experience</Label>
                      <Input
                        id="experience"
                        name="experience"
                        value={formData.experience}
                        onChange={handleChange}
                        placeholder="e.g., 5+ years"
                      />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="languages">Languages Spoken</Label>
                    <Input
                      id="languages"
                      name="languages"
                      value={formData.languages}
                      onChange={handleChange}
                      placeholder="e.g., English, Spanish, French"
                    />
                  </div>
                </div>
              ) : (
                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <h3 className="text-sm font-medium text-gray-500 mb-1">Full Name</h3>
                      <p className="text-gray-900">{user?.name}</p>
                    </div>
                    <div>
                      <h3 className="text-sm font-medium text-gray-500 mb-1">Email Address</h3>
                      <p className="text-gray-900">{user?.email}</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <h3 className="text-sm font-medium text-gray-500 mb-1">Business Name</h3>
                      <p className="text-gray-900">{user?.businessName}</p>
                    </div>
                    <div>
                      <h3 className="text-sm font-medium text-gray-500 mb-1">Phone Number</h3>
                      <p className="text-gray-900">{user?.phone}</p>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-sm font-medium text-gray-500 mb-1">Business Address</h3>
                    <p className="text-gray-900">{user?.address}</p>
                  </div>

                  <div>
                    <h3 className="text-sm font-medium text-gray-500 mb-1">Professional Bio</h3>
                    <p className="text-gray-900">{formData.bio}</p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <h3 className="text-sm font-medium text-gray-500 mb-1">Website</h3>
                      <p className="text-gray-900">{formData.website || 'Not provided'}</p>
                    </div>
                    <div>
                      <h3 className="text-sm font-medium text-gray-500 mb-1">Experience</h3>
                      <p className="text-gray-900">{formData.experience}</p>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-sm font-medium text-gray-500 mb-1">Languages Spoken</h3>
                    <p className="text-gray-900">{formData.languages}</p>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Verification Status */}
          <Card className="mt-6">
            <CardHeader>
              <CardTitle>Verification Status</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <span className="text-green-500">✅</span>
                    <span className="text-gray-900">Email Verified</span>
                  </div>
                  <span className="text-sm text-green-600">Verified</span>
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <span className="text-green-500">✅</span>
                    <span className="text-gray-900">Phone Verified</span>
                  </div>
                  <span className="text-sm text-green-600">Verified</span>
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <span className="text-yellow-500">⏳</span>
                    <span className="text-gray-900">Business License</span>
                  </div>
                  <Button size="sm" variant="outline">Upload</Button>
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <span className="text-yellow-500">⏳</span>
                    <span className="text-gray-900">Insurance Certificate</span>
                  </div>
                  <Button size="sm" variant="outline">Upload</Button>
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