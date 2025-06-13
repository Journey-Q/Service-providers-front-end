import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';

const Vehicles = () => {
  const [vehicles] = useState([
    {
      id: 1,
      name: 'Luxury Sedan',
      type: 'Car',
      capacity: 4,
      pricePerHour: 35,
      pricePerDay: 200,
      features: ['Air Conditioning', 'GPS Navigation', 'Bluetooth', 'Leather Seats'],
      available: true,
      condition: 'Excellent',
      year: 2022,
      mileage: 15000,
      fuelType: 'Hybrid'
    },
    {
      id: 2,
      name: 'Tourist Van',
      type: 'Van',
      capacity: 12,
      pricePerHour: 65,
      pricePerDay: 380,
      features: ['Air Conditioning', 'WiFi', 'Comfortable Seating', 'Storage Space'],
      available: true,
      condition: 'Very Good',
      year: 2021,
      mileage: 35000,
      fuelType: 'Diesel'
    },
    {
      id: 3,
      name: 'Beach Buggy',
      type: 'Specialty',
      capacity: 2,
      pricePerHour: 45,
      pricePerDay: 180,
      features: ['Open Top', 'Beach Tires', 'Waterproof Seats', 'Sound System'],
      available: false,
      condition: 'Good',
      year: 2020,
      mileage: 28000,
      fuelType: 'Gasoline'
    },
    {
      id: 4,
      name: 'Mountain SUV',
      type: 'SUV',
      capacity: 7,
      pricePerHour: 55,
      pricePerDay: 320,
      features: ['4WD', 'GPS', 'Emergency Kit', 'Roof Rack', 'Tow Hitch'],
      available: true,
      condition: 'Excellent',
      year: 2023,
      mileage: 8000,
      fuelType: 'Gasoline'
    }
  ]);

  const [selectedFilter, setSelectedFilter] = useState('all');

  const getConditionColor = (condition) => {
    switch (condition) {
      case 'Excellent': return 'bg-green-100 text-green-800';
      case 'Very Good': return 'bg-blue-100 text-blue-800';
      case 'Good': return 'bg-yellow-100 text-yellow-800';
      case 'Fair': return 'bg-orange-100 text-orange-800';
      case 'Poor': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getVehicleIcon = (type) => {
    switch (type) {
      case 'Car': return '🚗';
      case 'Van': return '🚐';
      case 'SUV': return '🚙';
      case 'Specialty': return '🏎️';
      default: return '🚗';
    }
  };

  const filteredVehicles = selectedFilter === 'all' 
    ? vehicles 
    : vehicles.filter(vehicle => 
        selectedFilter === 'available' ? vehicle.available : !vehicle.available
      );

  const availableCount = vehicles.filter(v => v.available).length;
  const totalRevenue = vehicles.reduce((sum, v) => sum + (v.pricePerDay * 10), 0); // Estimate monthly revenue
  const avgPrice = Math.round(vehicles.reduce((sum, v) => sum + v.pricePerDay, 0) / vehicles.length);

  const filters = [
    { value: 'all', label: 'All Vehicles', count: vehicles.length },
    { value: 'available', label: 'Available', count: availableCount },
    { value: 'unavailable', label: 'Unavailable', count: vehicles.length - availableCount }
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Vehicles</h1>
          <p className="text-gray-600 mt-2">Manage your vehicle fleet for tours and rentals</p>
        </div>
        <Button className="bg-blue-600 hover:bg-blue-700">
          <span className="mr-2">🚗</span>
          Add Vehicle
        </Button>
      </div>

      {/* Vehicle Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-blue-600">{vehicles.length}</div>
            <p className="text-sm text-gray-600">Total Vehicles</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-green-600">{availableCount}</div>
            <p className="text-sm text-gray-600">Available</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-purple-600">${totalRevenue.toLocaleString()}</div>
            <p className="text-sm text-gray-600">Est. Monthly Revenue</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-orange-600">${avgPrice}</div>
            <p className="text-sm text-gray-600">Avg. Daily Rate</p>
          </CardContent>
        </Card>
      </div>

      {/* Filter Buttons */}
      <div className="flex space-x-4">
        {filters.map((filter) => (
          <button
            key={filter.value}
            onClick={() => setSelectedFilter(filter.value)}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              selectedFilter === filter.value
                ? 'bg-blue-100 text-blue-700 border border-blue-200'
                : 'bg-white text-gray-600 border border-gray-200 hover:bg-gray-50'
            }`}
          >
            {filter.label} ({filter.count})
          </button>
        ))}
      </div>

      {/* Vehicles Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {filteredVehicles.map((vehicle) => (
          <Card key={vehicle.id} className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="flex justify-between items-start">
                <div className="flex items-center space-x-3">
                  <span className="text-3xl">{getVehicleIcon(vehicle.type)}</span>
                  <div>
                    <CardTitle className="text-xl">{vehicle.name}</CardTitle>
                    <p className="text-sm text-gray-600">
                      {vehicle.type} • {vehicle.year} • Up to {vehicle.capacity} passengers
                    </p>
                  </div>
                </div>
                <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
                  vehicle.available 
                    ? 'bg-green-100 text-green-800' 
                    : 'bg-red-100 text-red-800'
                }`}>
                  {vehicle.available ? 'Available' : 'In Use'}
                </span>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Vehicle Details */}
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="text-gray-600">Condition:</span>
                  <span className={`ml-2 inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getConditionColor(vehicle.condition)}`}>
                    {vehicle.condition}
                  </span>
                </div>
                <div>
                  <span className="text-gray-600">Fuel Type:</span>
                  <span className="ml-2 font-medium text-gray-900">{vehicle.fuelType}</span>
                </div>
                <div>
                  <span className="text-gray-600">Mileage:</span>
                  <span className="ml-2 font-medium text-gray-900">{vehicle.mileage.toLocaleString()} km</span>
                </div>
                <div>
                  <span className="text-gray-600">Capacity:</span>
                  <span className="ml-2 font-medium text-gray-900">{vehicle.capacity} passengers</span>
                </div>
              </div>

              {/* Features */}
              <div>
                <h4 className="font-medium text-gray-900 mb-2">Features</h4>
                <div className="flex flex-wrap gap-2">
                  {vehicle.features.map((feature, index) => (
                    <span 
                      key={index}
                      className="inline-flex items-center px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full"
                    >
                      {feature}
                    </span>
                  ))}
                </div>
              </div>

              {/* Pricing and Actions */}
              <div className="flex justify-between items-end pt-4 border-t">
                <div>
                  <div className="text-lg font-bold text-gray-900">
                    ${vehicle.pricePerHour}/hr
                  </div>
                  <div className="text-sm text-gray-600">
                    ${vehicle.pricePerDay}/day
                  </div>
                </div>
                <div className="flex space-x-2">
                  <Button size="sm" variant="outline">
                    Edit
                  </Button>
                  <Button size="sm" variant="outline">
                    Bookings
                  </Button>
                  <Button 
                    size="sm" 
                    variant={vehicle.available ? "outline" : "default"}
                    className={vehicle.available ? '' : 'bg-green-600 hover:bg-green-700'}
                  >
                    {vehicle.available ? 'Mark Busy' : 'Mark Available'}
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredVehicles.length === 0 && (
        <Card>
          <CardContent className="text-center py-12">
            <div className="text-4xl mb-4">🚗</div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">No vehicles found</h3>
            <p className="text-gray-600 mb-4">
              {selectedFilter === 'all' 
                ? "You haven't added any vehicles yet." 
                : `No ${selectedFilter} vehicles found.`}
            </p>
            <Button>Add Your First Vehicle</Button>
          </CardContent>
        </Card>
      )}

      {/* Fleet Overview */}
      <Card>
        <CardHeader>
          <CardTitle>Fleet Overview</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center p-4 bg-blue-50 rounded-lg">
              <div className="text-2xl mb-2">🚗</div>
              <h3 className="font-semibold text-gray-900 mb-1">Most Popular</h3>
              <p className="text-sm text-gray-600">
                {vehicles.length > 0 ? vehicles[0].name : 'No vehicles'}
              </p>
            </div>
            <div className="text-center p-4 bg-green-50 rounded-lg">
              <div className="text-2xl mb-2">💰</div>
              <h3 className="font-semibold text-gray-900 mb-1">Highest Earning</h3>
              <p className="text-sm text-gray-600">
                {vehicles.length > 0 
                  ? vehicles.reduce((best, v) => v.pricePerDay > best.pricePerDay ? v : best).name
                  : 'No vehicles'
                }
              </p>
            </div>
            <div className="text-center p-4 bg-purple-50 rounded-lg">
              <div className="text-2xl mb-2">⚡</div>
              <h3 className="font-semibold text-gray-900 mb-1">Fleet Utilization</h3>
              <p className="text-sm text-gray-600">
                {vehicles.length > 0 
                  ? Math.round((availableCount / vehicles.length) * 100) + '% available'
                  : 'No data'
                }
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Vehicles;