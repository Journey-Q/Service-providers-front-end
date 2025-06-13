import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { useAuth } from '../../contexts/AuthContext';
import { useToast } from '../../hooks/use-toast';

const Settings = () => {
  const { user, logout } = useAuth();
  const { toast } = useToast();
  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });
  const [notifications, setNotifications] = useState({
    emailBookings: true,
    emailPromotions: false,
    smsReminders: true,
    pushNotifications: true
  });
  const [privacy, setPrivacy] = useState({
    profileVisible: true,
    showContactInfo: true,
    allowReviews: true,
    showBusinessHours: true
  });

  const handlePasswordChange = (e) => {
    setPasswordData({
      ...passwordData,
      [e.target.name]: e.target.value
    });
  };

  const handlePasswordSubmit = (e) => {
    e.preventDefault();
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      toast({
        title: "Password Mismatch",
        description: "New passwords do not match",
        variant: "destructive"
      });
      return;
    }
    if (passwordData.newPassword.length < 6) {
      toast({
        title: "Weak Password",
        description: "Password must be at least 6 characters long",
        variant: "destructive"
      });
      return;
    }
    
    // Mock password change
    toast({
      title: "Password Updated",
      description: "Your password has been successfully changed"
    });
    setPasswordData({ currentPassword: '', newPassword: '', confirmPassword: '' });
  };

  const handleNotificationChange = (key) => {
    setNotifications({
      ...notifications,
      [key]: !notifications[key]
    });
  };

  const handlePrivacyChange = (key) => {
    setPrivacy({
      ...privacy,
      [key]: !privacy[key]
    });
  };

  const handleSaveSettings = () => {
    toast({
      title: "Settings Saved",
      description: "Your preferences have been updated successfully"
    });
  };

  const handleDeleteAccount = () => {
    if (window.confirm('Are you sure you want to delete your account? This action cannot be undone.')) {
      toast({
        title: "Account Deletion",
        description: "Account deletion request submitted. You will receive an email with further instructions.",
        variant: "destructive"
      });
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Settings</h1>
        <p className="text-gray-600 mt-2">Manage your account preferences and security settings</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Account Security */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <span className="mr-2">🔒</span>
              Account Security
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <form onSubmit={handlePasswordSubmit} className="space-y-4">
              <div>
                <Label htmlFor="currentPassword">Current Password</Label>
                <Input
                  id="currentPassword"
                  name="currentPassword"
                  type="password"
                  value={passwordData.currentPassword}
                  onChange={handlePasswordChange}
                  placeholder="Enter current password"
                />
              </div>
              <div>
                <Label htmlFor="newPassword">New Password</Label>
                <Input
                  id="newPassword"
                  name="newPassword"
                  type="password"
                  value={passwordData.newPassword}
                  onChange={handlePasswordChange}
                  placeholder="Enter new password"
                />
              </div>
              <div>
                <Label htmlFor="confirmPassword">Confirm New Password</Label>
                <Input
                  id="confirmPassword"
                  name="confirmPassword"
                  type="password"
                  value={passwordData.confirmPassword}
                  onChange={handlePasswordChange}
                  placeholder="Confirm new password"
                />
              </div>
              <Button type="submit" className="w-full">
                Update Password
              </Button>
            </form>

            <div className="border-t pt-4">
              <h4 className="font-medium text-gray-900 mb-3">Two-Factor Authentication</h4>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Add an extra layer of security</p>
                  <p className="text-xs text-gray-500">Status: Not Enabled</p>
                </div>
                <Button size="sm" variant="outline">
                  Enable 2FA
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Notification Preferences */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <span className="mr-2">🔔</span>
              Notification Preferences
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-900">Email - New Bookings</p>
                  <p className="text-xs text-gray-500">Get notified when you receive new bookings</p>
                </div>
                <button
                  onClick={() => handleNotificationChange('emailBookings')}
                  className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                    notifications.emailBookings ? 'bg-blue-600' : 'bg-gray-300'
                  }`}
                >
                  <span
                    className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                      notifications.emailBookings ? 'translate-x-6' : 'translate-x-1'
                    }`}
                  />
                </button>
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-900">Email - Promotions</p>
                  <p className="text-xs text-gray-500">Receive marketing emails and offers</p>
                </div>
                <button
                  onClick={() => handleNotificationChange('emailPromotions')}
                  className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                    notifications.emailPromotions ? 'bg-blue-600' : 'bg-gray-300'
                  }`}
                >
                  <span
                    className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                      notifications.emailPromotions ? 'translate-x-6' : 'translate-x-1'
                    }`}
                  />
                </button>
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-900">SMS Reminders</p>
                  <p className="text-xs text-gray-500">Get text reminders for upcoming tours</p>
                </div>
                <button
                  onClick={() => handleNotificationChange('smsReminders')}
                  className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                    notifications.smsReminders ? 'bg-blue-600' : 'bg-gray-300'
                  }`}
                >
                  <span
                    className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                      notifications.smsReminders ? 'translate-x-6' : 'translate-x-1'
                    }`}
                  />
                </button>
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-900">Push Notifications</p>
                  <p className="text-xs text-gray-500">Receive notifications in your browser</p>
                </div>
                <button
                  onClick={() => handleNotificationChange('pushNotifications')}
                  className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                    notifications.pushNotifications ? 'bg-blue-600' : 'bg-gray-300'
                  }`}
                >
                  <span
                    className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                      notifications.pushNotifications ? 'translate-x-6' : 'translate-x-1'
                    }`}
                  />
                </button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Privacy Settings */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <span className="mr-2">🛡️</span>
              Privacy Settings
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-900">Profile Visibility</p>
                  <p className="text-xs text-gray-500">Make your profile visible to customers</p>
                </div>
                <button
                  onClick={() => handlePrivacyChange('profileVisible')}
                  className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                    privacy.profileVisible ? 'bg-blue-600' : 'bg-gray-300'
                  }`}
                >
                  <span
                    className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                      privacy.profileVisible ? 'translate-x-6' : 'translate-x-1'
                    }`}
                  />
                </button>
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-900">Show Contact Information</p>
                  <p className="text-xs text-gray-500">Display phone and email on your profile</p>
                </div>
                <button
                  onClick={() => handlePrivacyChange('showContactInfo')}
                  className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                    privacy.showContactInfo ? 'bg-blue-600' : 'bg-gray-300'
                  }`}
                >
                  <span
                    className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                      privacy.showContactInfo ? 'translate-x-6' : 'translate-x-1'
                    }`}
                  />
                </button>
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-900">Allow Reviews</p>
                  <p className="text-xs text-gray-500">Let customers leave reviews on your services</p>
                </div>
                <button
                  onClick={() => handlePrivacyChange('allowReviews')}
                  className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                    privacy.allowReviews ? 'bg-blue-600' : 'bg-gray-300'
                  }`}
                >
                  <span
                    className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                      privacy.allowReviews ? 'translate-x-6' : 'translate-x-1'
                    }`}
                  />
                </button>
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-900">Show Business Hours</p>
                  <p className="text-xs text-gray-500">Display your operating hours publicly</p>
                </div>
                <button
                  onClick={() => handlePrivacyChange('showBusinessHours')}
                  className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                    privacy.showBusinessHours ? 'bg-blue-600' : 'bg-gray-300'
                  }`}
                >
                  <span
                    className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                      privacy.showBusinessHours ? 'translate-x-6' : 'translate-x-1'
                    }`}
                  />
                </button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Billing & Subscription */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <span className="mr-2">💳</span>
              Billing & Subscription
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="bg-blue-50 p-4 rounded-lg">
              <div className="flex items-center justify-between mb-2">
                <h4 className="font-medium text-gray-900">Current Plan</h4>
                <span className="bg-blue-100 text-blue-800 text-sm px-2 py-1 rounded">Professional</span>
              </div>
              <p className="text-sm text-gray-600 mb-3">
                Access to all features and unlimited bookings
              </p>
              <div className="flex items-center justify-between">
                <span className="text-lg font-bold text-gray-900">$29.99/month</span>
                <Button size="sm" variant="outline">
                  Change Plan
                </Button>
              </div>
            </div>

            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Next billing date</span>
                <span className="text-sm font-medium text-gray-900">April 15, 2024</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Payment method</span>
                <span className="text-sm font-medium text-gray-900">**** 4532</span>
              </div>
            </div>

            <div className="flex space-x-2">
              <Button size="sm" variant="outline" className="flex-1">
                Update Payment
              </Button>
              <Button size="sm" variant="outline" className="flex-1">
                Billing History
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Action Buttons */}
      <div className="flex justify-between items-center pt-6 border-t">
        <Button onClick={handleSaveSettings} className="bg-green-600 hover:bg-green-700">
          Save All Settings
        </Button>
        
        <div className="flex space-x-4">
          <Button variant="outline" onClick={logout}>
            Sign Out
          </Button>
          <Button 
            variant="destructive" 
            onClick={handleDeleteAccount}
            className="bg-red-600 hover:bg-red-700"
          >
            Delete Account
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Settings;