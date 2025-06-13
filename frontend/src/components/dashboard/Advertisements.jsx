import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';

const Advertisements = () => {
  const [ads] = useState([
    {
      id: 1,
      title: 'Ocean View Suite Special',
      type: 'Promotion',
      status: 'active',
      views: 1250,
      clicks: 89,
      budget: 200,
      spent: 145,
      startDate: '2024-03-01',
      endDate: '2024-03-31'
    },
    {
      id: 2,
      title: 'City Tour Package Deal',
      type: 'Featured Listing',
      status: 'paused',
      views: 890,
      clicks: 56,
      budget: 150,
      spent: 92,
      startDate: '2024-03-05',
      endDate: '2024-03-25'
    },
    {
      id: 3,
      title: 'Summer Beach Villa Offer',
      type: 'Promotion',
      status: 'draft',
      views: 0,
      clicks: 0,
      budget: 300,
      spent: 0,
      startDate: '2024-04-01',
      endDate: '2024-04-30'
    }
  ]);

  const totalSpent = ads.reduce((sum, ad) => sum + ad.spent, 0);
  const totalViews = ads.reduce((sum, ad) => sum + ad.views, 0);
  const totalClicks = ads.reduce((sum, ad) => sum + ad.clicks, 0);
  const avgCTR = totalViews > 0 ? ((totalClicks / totalViews) * 100).toFixed(2) : 0;

  const getStatusColor = (status) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800';
      case 'paused': return 'bg-yellow-100 text-yellow-800';
      case 'draft': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'active': return '🟢';
      case 'paused': return '⏸️';
      case 'draft': return '📝';
      default: return '❓';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Advertisements</h1>
          <p className="text-gray-600 mt-2">Promote your services and track performance</p>
        </div>
        <Button className="bg-purple-600 hover:bg-purple-700">
          <span className="mr-2">➕</span>
          Create Ad
        </Button>
      </div>

      {/* Ad Performance Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Total Spent</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-900">${totalSpent}</div>
            <p className="text-xs text-gray-500 mt-1">This month</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Total Views</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">{totalViews.toLocaleString()}</div>
            <p className="text-xs text-green-600 mt-1">+12% from last month</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Total Clicks</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">{totalClicks}</div>
            <p className="text-xs text-green-600 mt-1">+8% from last month</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Average CTR</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-purple-600">{avgCTR}%</div>
            <p className="text-xs text-green-600 mt-1">Above industry average</p>
          </CardContent>
        </Card>
      </div>

      {/* Ad Campaigns */}
      <Card>
        <CardHeader>
          <CardTitle>Your Campaigns</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {ads.map((ad) => (
              <div key={ad.id} className="p-4 border rounded-lg hover:shadow-md transition-shadow">
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <div className="flex items-center space-x-3">
                      <span className="text-xl">{getStatusIcon(ad.status)}</span>
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900">{ad.title}</h3>
                        <p className="text-sm text-gray-600">{ad.type}</p>
                        <p className="text-xs text-gray-500 mt-1">
                          {ad.startDate} - {ad.endDate}
                        </p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-6">
                    {/* Performance Metrics */}
                    <div className="text-center">
                      <div className="text-lg font-semibold text-gray-900">{ad.views.toLocaleString()}</div>
                      <div className="text-xs text-gray-500">Views</div>
                    </div>
                    <div className="text-center">
                      <div className="text-lg font-semibold text-gray-900">{ad.clicks}</div>
                      <div className="text-xs text-gray-500">Clicks</div>
                    </div>
                    <div className="text-center">
                      <div className="text-lg font-semibold text-gray-900">
                        {ad.views > 0 ? ((ad.clicks / ad.views) * 100).toFixed(1) : 0}%
                      </div>
                      <div className="text-xs text-gray-500">CTR</div>
                    </div>
                    
                    {/* Budget */}
                    <div className="text-center">
                      <div className="text-lg font-semibold text-gray-900">${ad.spent}</div>
                      <div className="text-xs text-gray-500">of ${ad.budget}</div>
                      <div className="w-20 bg-gray-200 rounded-full h-1.5 mt-1">
                        <div 
                          className="bg-blue-600 h-1.5 rounded-full" 
                          style={{ width: `${(ad.spent / ad.budget) * 100}%` }}
                        ></div>
                      </div>
                    </div>
                    
                    {/* Status */}
                    <div className="text-center">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(ad.status)}`}>
                        {ad.status}
                      </span>
                    </div>
                    
                    {/* Actions */}
                    <div className="flex space-x-2">
                      <Button size="sm" variant="outline">
                        Edit
                      </Button>
                      <Button 
                        size="sm" 
                        variant={ad.status === 'active' ? 'outline' : 'default'}
                        className={ad.status === 'active' ? '' : 'bg-green-600 hover:bg-green-700'}
                      >
                        {ad.status === 'active' ? 'Pause' : 'Start'}
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Ad Types */}
      <Card>
        <CardHeader>
          <CardTitle>Available Ad Types</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 border rounded-lg text-center hover:shadow-md transition-shadow cursor-pointer">
              <div className="text-3xl mb-3">🎯</div>
              <h3 className="font-semibold text-gray-900 mb-2">Promoted Listings</h3>
              <p className="text-sm text-gray-600 mb-3">
                Boost your services to appear higher in search results
              </p>
              <Button size="sm" variant="outline">Learn More</Button>
            </div>
            
            <div className="p-4 border rounded-lg text-center hover:shadow-md transition-shadow cursor-pointer">
              <div className="text-3xl mb-3">💰</div>
              <h3 className="font-semibold text-gray-900 mb-2">Special Offers</h3>
              <p className="text-sm text-gray-600 mb-3">
                Create discount campaigns to attract more customers
              </p>
              <Button size="sm" variant="outline">Learn More</Button>
            </div>
            
            <div className="p-4 border rounded-lg text-center hover:shadow-md transition-shadow cursor-pointer">
              <div className="text-3xl mb-3">⭐</div>
              <h3 className="font-semibold text-gray-900 mb-2">Featured Badge</h3>
              <p className="text-sm text-gray-600 mb-3">
                Get a featured badge to stand out from competitors
              </p>
              <Button size="sm" variant="outline">Learn More</Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Advertisements;