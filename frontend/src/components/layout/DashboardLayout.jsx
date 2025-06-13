import React, { useState } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { Button } from '../ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuSeparator, 
  DropdownMenuTrigger 
} from '../ui/dropdown-menu';
import { 
  Home, 
  Settings, 
  User, 
  LogOut, 
  Menu,
  X,
  MessageCircle,
  DollarSign,
  Calendar,
  BarChart3,
  Plus,
  Megaphone,
  MapPin,
  Car,
  Camera
} from 'lucide-react';

const DashboardLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const getNavigationItems = () => {
    const baseItems = [
      { icon: Home, label: 'Overview', path: '/dashboard' },
      { icon: BarChart3, label: 'Analytics', path: '/dashboard/analytics' },
      { icon: Calendar, label: 'Bookings', path: '/dashboard/bookings' },
      { icon: DollarSign, label: 'Payments', path: '/dashboard/payments' },
      { icon: MessageCircle, label: 'Messages', path: '/dashboard/messages' },
      { icon: Megaphone, label: 'Advertisements', path: '/dashboard/ads' },
    ];

    const serviceSpecificItems = {
      hotel: [
        { icon: Plus, label: 'Rooms', path: '/dashboard/rooms' },
      ],
      'tour-guide': [
        { icon: MapPin, label: 'Tour Packages', path: '/dashboard/tours' },
        { icon: Camera, label: 'Past Tours', path: '/dashboard/past-tours' },
      ],
      'travel-service': [
        { icon: Car, label: 'Vehicles', path: '/dashboard/vehicles' },
      ],
      general: [
        { icon: Plus, label: 'Services', path: '/dashboard/services' },
      ]
    };

    return [...baseItems, ...(serviceSpecificItems[user?.serviceType] || [])];
  };

  const Sidebar = ({ mobile = false }) => (
    <div className={`${mobile ? 'lg:hidden' : 'hidden lg:block'} fixed inset-y-0 left-0 z-50 w-64 bg-white shadow-lg border-r border-gray-200`}>
      <div className="flex flex-col h-full">
        {/* Logo */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-cyan-500 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold">JQ</span>
            </div>
            <div>
              <h1 className="text-xl font-bold text-gray-900">JourneyQ</h1>
              <p className="text-xs text-gray-500 capitalize">{user?.serviceType?.replace('-', ' ')} Dashboard</p>
            </div>
          </div>
          {mobile && (
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setSidebarOpen(false)}
            >
              <X className="h-5 w-5" />
            </Button>
          )}
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4 space-y-2">
          {getNavigationItems().map((item, index) => (
            <Button
              key={index}
              variant="ghost"
              className="w-full justify-start h-12 text-gray-700 hover:text-blue-600 hover:bg-blue-50"
              onClick={() => {
                navigate(item.path);
                if (mobile) setSidebarOpen(false);
              }}
            >
              <item.icon className="h-5 w-5 mr-3" />
              {item.label}
            </Button>
          ))}
        </nav>

        {/* User Profile */}
        <div className="p-4 border-t border-gray-200">
          <div className="flex items-center space-x-3 mb-4">
            <Avatar className="h-10 w-10">
              <AvatarImage src={user?.profileImage} />
              <AvatarFallback className="bg-gradient-to-r from-blue-600 to-cyan-500 text-white">
                {user?.name?.charAt(0) || 'U'}
              </AvatarFallback>
            </Avatar>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-gray-900 truncate">{user?.name}</p>
              <p className="text-xs text-gray-500 truncate">{user?.businessName}</p>
            </div>
          </div>
          <Button
            variant="outline"
            size="sm"
            className="w-full"
            onClick={handleLogout}
          >
            <LogOut className="h-4 w-4 mr-2" />
            Sign Out
          </Button>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Desktop Sidebar */}
      <Sidebar />

      {/* Mobile Sidebar Overlay */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 z-40 lg:hidden bg-black bg-opacity-50"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Mobile Sidebar */}
      {sidebarOpen && <Sidebar mobile />}

      {/* Main Content */}
      <div className="lg:ml-64">
        {/* Top Header */}
        <header className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-30">
          <div className="flex items-center justify-between px-4 py-4">
            <div className="flex items-center space-x-4">
              <Button
                variant="ghost"
                size="sm"
                className="lg:hidden"
                onClick={() => setSidebarOpen(true)}
              >
                <Menu className="h-5 w-5" />
              </Button>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
                <p className="text-sm text-gray-500">Welcome back, {user?.name}!</p>
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="relative h-10 w-10 rounded-full">
                    <Avatar className="h-10 w-10">
                      <AvatarImage src={user?.profileImage} />
                      <AvatarFallback className="bg-gradient-to-r from-blue-600 to-cyan-500 text-white">
                        {user?.name?.charAt(0) || 'U'}
                      </AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56" align="end">
                  <div className="flex items-center justify-start gap-2 p-2">
                    <div className="flex flex-col space-y-1 leading-none">
                      <p className="font-medium">{user?.name}</p>
                      <p className="w-[200px] truncate text-sm text-muted-foreground">
                        {user?.email}
                      </p>
                    </div>
                  </div>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={() => navigate('/dashboard/profile')}>
                    <User className="mr-2 h-4 w-4" />
                    Profile
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => navigate('/dashboard/settings')}>
                    <Settings className="mr-2 h-4 w-4" />
                    Settings
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={handleLogout}>
                    <LogOut className="mr-2 h-4 w-4" />
                    Sign Out
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;