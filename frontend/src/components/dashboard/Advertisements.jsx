import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Input } from '../ui/input';
import { Textarea } from '../ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '../ui/dialog';
import { Label } from '../ui/label';
import { useToast } from '../../hooks/use-toast';
import { 
  Megaphone, 
  Plus, 
  Eye, 
  Edit, 
  Trash2, 
  Play, 
  Pause, 
  TrendingUp,
  MousePointer,
  Users,
  DollarSign,
  Calendar
} from 'lucide-react';
import { mockAdvertisements } from '../../utils/mockData';

const Advertisements = () => {
  const [ads, setAds] = useState(mockAdvertisements);
  const [selectedAd, setSelectedAd] = useState(null);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    budget: '',
    startDate: '',
    endDate: ''
  });
  const { toast } = useToast();

  const handleCreateAd = () => {
    if (!formData.title || !formData.description || !formData.budget) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields",
        variant: "destructive"
      });
      return;
    }

    const newAd = {
      id: Date.now(),
      title: formData.title,
      description: formData.description,
      budget: parseFloat(formData.budget),
      startDate: formData.startDate,
      endDate: formData.endDate,
      status: 'active',
      impressions: 0,
      clicks: 0,
      conversions: 0
    };

    setAds([...ads, newAd]);
    setFormData({
      title: '',
      description: '',
      budget: '',
      startDate: '',
      endDate: ''
    });
    setIsCreateModalOpen(false);

    toast({
      title: "Advertisement Created",
      description: "Your advertisement has been created and is now active",
    });
  };

  const handleStatusToggle = (adId) => {
    setAds(ads.map(ad => 
      ad.id === adId 
        ? { ...ad, status: ad.status === 'active' ? 'paused' : 'active' }
        : ad
    ));
    
    const ad = ads.find(a => a.id === adId);
    toast({
      title: "Status Updated",
      description: `Advertisement ${ad.status === 'active' ? 'paused' : 'activated'}`,
    });
  };

  const handleDeleteAd = (adId) => {
    setAds(ads.filter(ad => ad.id !== adId));
    toast({
      title: "Advertisement Deleted",
      description: "The advertisement has been removed",
    });
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800';
      case 'paused': return 'bg-yellow-100 text-yellow-800';
      case 'completed': return 'bg-blue-100 text-blue-800';
      case 'expired': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const calculateCTR = (clicks, impressions) => {
    if (impressions === 0) return 0;
    return ((clicks / impressions) * 100).toFixed(2);
  };

  const calculateCPC = (budget, clicks) => {
    if (clicks === 0) return 0;
    return (budget / clicks).toFixed(2);
  };

  const AdCard = ({ ad }) => (
    <Card className="hover-scale transition-all duration-200">
      <CardContent className="p-6">
        <div className="flex items-start justify-between mb-4">
          <div className="flex-1">
            <h3 className="text-lg font-semibold text-gray-900 mb-1">{ad.title}</h3>
            <p className="text-sm text-gray-600 mb-2">{ad.description}</p>
            <div className="flex items-center space-x-4 text-xs text-gray-500">
              <span>{ad.startDate} - {ad.endDate}</span>
            </div>
          </div>
          <Badge className={getStatusColor(ad.status)}>
            {ad.status}
          </Badge>
        </div>

        <div className="grid grid-cols-3 gap-4 mb-4">
          <div className="text-center">
            <p className="text-lg font-bold text-blue-600">{ad.impressions.toLocaleString()}</p>
            <p className="text-xs text-gray-500">Impressions</p>
          </div>
          <div className="text-center">
            <p className="text-lg font-bold text-green-600">{ad.clicks}</p>
            <p className="text-xs text-gray-500">Clicks</p>
          </div>
          <div className="text-center">
            <p className="text-lg font-bold text-purple-600">{ad.conversions}</p>
            <p className="text-xs text-gray-500">Conversions</p>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4 mb-4 text-sm">
          <div className="flex justify-between">
            <span className="text-gray-600">Budget:</span>
            <span className="font-medium">${ad.budget}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">CTR:</span>
            <span className="font-medium">{calculateCTR(ad.clicks, ad.impressions)}%</span>
          </div>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Dialog>
              <DialogTrigger asChild>
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => setSelectedAd(ad)}
                >
                  <Eye className="h-4 w-4 mr-1" />
                  Details
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-2xl">
                <DialogHeader>
                  <DialogTitle>Advertisement Details</DialogTitle>
                  <DialogDescription>
                    Performance metrics and settings for "{ad.title}"
                  </DialogDescription>
                </DialogHeader>
                {selectedAd && <AdDetails ad={selectedAd} />}
              </DialogContent>
            </Dialog>
            <Button variant="outline" size="sm">
              <Edit className="h-4 w-4 mr-1" />
              Edit
            </Button>
          </div>
          <div className="flex items-center space-x-2">
            <Button 
              size="sm" 
              variant={ad.status === 'active' ? 'secondary' : 'default'}
              onClick={() => handleStatusToggle(ad.id)}
            >
              {ad.status === 'active' ? (
                <>
                  <Pause className="h-4 w-4 mr-1" />
                  Pause
                </>
              ) : (
                <>
                  <Play className="h-4 w-4 mr-1" />
                  Resume
                </>
              )}
            </Button>
            <Button 
              size="sm" 
              variant="destructive"
              onClick={() => handleDeleteAd(ad.id)}
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );

  const AdDetails = ({ ad }) => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-4">
          <div>
            <h4 className="font-medium text-gray-900 mb-2">Campaign Information</h4>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">Title:</span>
                <span className="text-sm font-medium">{ad.title}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">Status:</span>
                <Badge className={getStatusColor(ad.status)}>{ad.status}</Badge>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">Budget:</span>
                <span className="text-sm font-medium">${ad.budget}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">Duration:</span>
                <span className="text-sm font-medium">{ad.startDate} - {ad.endDate}</span>
              </div>
            </div>
          </div>
          
          <div>
            <h4 className="font-medium text-gray-900 mb-2">Description</h4>
            <p className="text-sm text-gray-600">{ad.description}</p>
          </div>
        </div>

        <div className="space-y-4">
          <div>
            <h4 className="font-medium text-gray-900 mb-2">Performance Metrics</h4>
            <div className="space-y-3">
              <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
                <div className="flex items-center space-x-2">
                  <Eye className="h-5 w-5 text-blue-600" />
                  <span className="text-sm font-medium">Impressions</span>
                </div>
                <span className="text-lg font-bold text-blue-600">{ad.impressions.toLocaleString()}</span>
              </div>
              
              <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                <div className="flex items-center space-x-2">
                  <MousePointer className="h-5 w-5 text-green-600" />
                  <span className="text-sm font-medium">Clicks</span>
                </div>
                <span className="text-lg font-bold text-green-600">{ad.clicks}</span>
              </div>
              
              <div className="flex items-center justify-between p-3 bg-purple-50 rounded-lg">
                <div className="flex items-center space-x-2">
                  <Users className="h-5 w-5 text-purple-600" />
                  <span className="text-sm font-medium">Conversions</span>
                </div>
                <span className="text-lg font-bold text-purple-600">{ad.conversions}</span>
              </div>
            </div>
          </div>

          <div>
            <h4 className="font-medium text-gray-900 mb-2">Key Metrics</h4>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">Click-through Rate:</span>
                <span className="text-sm font-medium">{calculateCTR(ad.clicks, ad.impressions)}%</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">Cost per Click:</span>
                <span className="text-sm font-medium">${calculateCPC(ad.budget, ad.clicks)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">Conversion Rate:</span>
                <span className="text-sm font-medium">
                  {ad.clicks > 0 ? ((ad.conversions / ad.clicks) * 100).toFixed(2) : 0}%
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const stats = {
    totalBudget: ads.reduce((sum, ad) => sum + ad.budget, 0),
    activeAds: ads.filter(ad => ad.status === 'active').length,
    totalImpressions: ads.reduce((sum, ad) => sum + ad.impressions, 0),
    totalClicks: ads.reduce((sum, ad) => sum + ad.clicks, 0),
  };

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Advertisements</h1>
          <p className="text-gray-600">Promote your services and track campaign performance</p>
        </div>
        <div className="flex items-center space-x-4">
          <Dialog open={isCreateModalOpen} onOpenChange={setIsCreateModalOpen}>
            <DialogTrigger asChild>
              <Button className="bg-blue-600 hover:bg-blue-700">
                <Plus className="h-4 w-4 mr-2" />
                Create Ad
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Create New Advertisement</DialogTitle>
                <DialogDescription>
                  Set up a new promotional campaign for your services
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="title">Advertisement Title *</Label>
                  <Input
                    id="title"
                    value={formData.title}
                    onChange={(e) => setFormData({...formData, title: e.target.value})}
                    placeholder="Enter advertisement title"
                  />
                </div>
                <div>
                  <Label htmlFor="description">Description *</Label>
                  <Textarea
                    id="description"
                    value={formData.description}
                    onChange={(e) => setFormData({...formData, description: e.target.value})}
                    placeholder="Describe your promotion or offer"
                    rows={3}
                  />
                </div>
                <div>
                  <Label htmlFor="budget">Budget ($) *</Label>
                  <Input
                    id="budget"
                    type="number"
                    value={formData.budget}
                    onChange={(e) => setFormData({...formData, budget: e.target.value})}
                    placeholder="Enter campaign budget"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="startDate">Start Date</Label>
                    <Input
                      id="startDate"
                      type="date"
                      value={formData.startDate}
                      onChange={(e) => setFormData({...formData, startDate: e.target.value})}
                    />
                  </div>
                  <div>
                    <Label htmlFor="endDate">End Date</Label>
                    <Input
                      id="endDate"
                      type="date"
                      value={formData.endDate}
                      onChange={(e) => setFormData({...formData, endDate: e.target.value})}
                    />
                  </div>
                </div>
                <div className="flex justify-end space-x-2">
                  <Button variant="outline" onClick={() => setIsCreateModalOpen(false)}>
                    Cancel
                  </Button>
                  <Button onClick={handleCreateAd} className="bg-blue-600 hover:bg-blue-700">
                    Create Advertisement
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
                <p className="text-sm text-gray-600">Total Budget</p>
                <p className="text-2xl font-bold text-gray-900">${stats.totalBudget}</p>
              </div>
              <DollarSign className="h-8 w-8 text-green-600" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Active Ads</p>
                <p className="text-2xl font-bold text-blue-600">{stats.activeAds}</p>
              </div>
              <Megaphone className="h-8 w-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Total Impressions</p>
                <p className="text-2xl font-bold text-purple-600">{stats.totalImpressions.toLocaleString()}</p>
              </div>
              <Eye className="h-8 w-8 text-purple-600" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Total Clicks</p>
                <p className="text-2xl font-bold text-orange-600">{stats.totalClicks}</p>
              </div>
              <MousePointer className="h-8 w-8 text-orange-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Advertisements List */}
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
        {ads.map((ad) => (
          <AdCard key={ad.id} ad={ad} />
        ))}
      </div>

      {ads.length === 0 && (
        <Card>
          <CardContent className="p-12 text-center">
            <Megaphone className="h-12 w-12 mx-auto text-gray-400 mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No advertisements yet</h3>
            <p className="text-gray-500 mb-4">
              Start promoting your services to reach more customers
            </p>
            <Button 
              onClick={() => setIsCreateModalOpen(true)}
              className="bg-blue-600 hover:bg-blue-700"
            >
              <Plus className="h-4 w-4 mr-2" />
              Create Your First Ad
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default Advertisements;