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
  Car,
  Users,
  DollarSign,
  Calendar,
  Fuel,
  Settings,
  Star,
  CheckCircle,
  Clock
} from 'lucide-react';
import { mockVehicles } from '../../utils/mockData';

const Vehicles = () => {
  const [vehicles, setVehicles] = useState(mockVehicles);
  const [selectedVehicle, setSelectedVehicle] = useState(null);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    type: '',
    model: '',
    year: '',
    capacity: '',
    pricePerDay: '',
    pricePerHour: '',
    features: [],
    description: '',
    fuelType: '',
    transmission: '',
    availability: true,
    licenseRequired: '',
    totalVehicles: '',
    availableVehicles: ''
  });
  const { toast } = useToast();

  const vehicleTypes = [
    'Sedan',
    'SUV',
    'Hatchback',
    'Luxury Sedan',
    'Van',
    'Minibus',
    'Motorcycle',
    'Convertible',
    'Truck',
    'Electric Vehicle'
  ];

  const fuelTypes = ['Gasoline', 'Diesel', 'Electric', 'Hybrid'];
  const transmissionTypes = ['Manual', 'Automatic'];
  const licenseTypes = ['Standard', 'International', 'Commercial'];

  const availableFeatures = [
    'AC', 'GPS', 'Bluetooth', 'WiFi', 'Leather Seats', 'Sunroof', 
    'USB Charging', 'Child Seats', 'Roof Rack', 'Parking Sensors',
    'Backup Camera', 'Heated Seats', 'Cruise Control', 'All Wheel Drive'
  ];

  const handleCreateVehicle = () => {
    if (!formData.type || !formData.model || !formData.capacity || !formData.pricePerDay) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields",
        variant: "destructive"
      });
      return;
    }

    const newVehicle = {
      id: Date.now(),
      type: formData.type,
      model: formData.model,
      year: parseInt(formData.year) || new Date().getFullYear(),
      capacity: parseInt(formData.capacity),
      pricePerDay: parseFloat(formData.pricePerDay),
      pricePerHour: parseFloat(formData.pricePerHour) || 0,
      features: formData.features,
      description: formData.description,
      fuelType: formData.fuelType,
      transmission: formData.transmission,
      availability: formData.availability,
      licenseRequired: formData.licenseRequired,
      totalVehicles: parseInt(formData.totalVehicles) || 1,
      availableVehicles: parseInt(formData.availableVehicles) || parseInt(formData.totalVehicles) || 1,
      images: [],
      rating: 0,
      reviews: 0,
      bookings: 0
    };

    setVehicles([...vehicles, newVehicle]);
    setFormData({
      type: '',
      model: '',
      year: '',
      capacity: '',
      pricePerDay: '',
      pricePerHour: '',
      features: [],
      description: '',
      fuelType: '',
      transmission: '',
      availability: true,
      licenseRequired: '',
      totalVehicles: '',
      availableVehicles: ''
    });
    setIsCreateModalOpen(false);

    toast({
      title: "Vehicle Added",
      description: "New vehicle has been added to your fleet",
    });
  };

  const handleToggleAvailability = (vehicleId) => {
    setVehicles(vehicles.map(vehicle => 
      vehicle.id === vehicleId 
        ? { ...vehicle, availability: !vehicle.availability }
        : vehicle
    ));
    
    toast({
      title: "Availability Updated",
      description: "Vehicle availability has been changed",
    });
  };

  const handleDeleteVehicle = (vehicleId) => {
    setVehicles(vehicles.filter(vehicle => vehicle.id !== vehicleId));
    toast({
      title: "Vehicle Deleted",
      description: "The vehicle has been removed from your fleet",
    });
  };

  const handleFeatureToggle = (feature) => {
    setFormData(prev => ({
      ...prev,
      features: prev.features.includes(feature)
        ? prev.features.filter(f => f !== feature)
        : [...prev.features, feature]
    }));
  };

  const VehicleCard = ({ vehicle }) => (
    <Card className="hover-scale transition-all duration-200">
      <CardContent className="p-6">
        <div className="flex items-start justify-between mb-4">
          <div className="flex-1">
            <h3 className="text-lg font-semibold text-gray-900 mb-1">
              {vehicle.model} {vehicle.year}
            </h3>
            <p className="text-sm text-gray-600 mb-2">{vehicle.type}</p>
            <div className="flex items-center space-x-4 text-xs text-gray-500">
              <span className="flex items-center">
                <Users className="h-3 w-3 mr-1" />
                {vehicle.capacity} seats
              </span>
              {vehicle.fuelType && (
                <span className="flex items-center">
                  <Fuel className="h-3 w-3 mr-1" />
                  {vehicle.fuelType}
                </span>
              )}
              {vehicle.transmission && (
                <span className="flex items-center">
                  <Settings className="h-3 w-3 mr-1" />
                  {vehicle.transmission}
                </span>
              )}
            </div>
          </div>
          <div className="flex flex-col items-end space-y-2">
            <div className="text-right">
              <div className="text-lg font-bold text-blue-600">
                ${vehicle.pricePerDay}/day
              </div>
              {vehicle.pricePerHour > 0 && (
                <div className="text-sm text-gray-600">
                  ${vehicle.pricePerHour}/hour
                </div>
              )}
            </div>
            <Badge variant={vehicle.availability ? 'default' : 'secondary'}>
              {vehicle.availability ? 'Available' : 'Unavailable'}
            </Badge>
          </div>
        </div>

        {/* Features */}
        <div className="mb-4">
          <div className="flex flex-wrap gap-1">
            {vehicle.features.slice(0, 4).map((feature, index) => (
              <Badge key={index} variant="outline" className="text-xs">
                {feature}
              </Badge>
            ))}
            {vehicle.features.length > 4 && (
              <Badge variant="outline" className="text-xs">
                +{vehicle.features.length - 4} more
              </Badge>
            )}
          </div>
        </div>

        {/* Availability Info */}
        <div className="grid grid-cols-2 gap-4 mb-4 text-sm">
          <div className="flex justify-between">
            <span className="text-gray-600">In Fleet:</span>
            <span className="font-medium">{vehicle.totalVehicles || 1}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Available:</span>
            <span className={`font-medium ${(vehicle.availableVehicles || 0) > 0 ? 'text-green-600' : 'text-red-600'}`}>
              {vehicle.availableVehicles || 0}
            </span>
          </div>
        </div>

        {/* Rating & Bookings */}
        <div className="flex items-center justify-between mb-4 text-sm">
          {vehicle.reviews > 0 ? (
            <div className="flex items-center space-x-2">
              <Star className="h-4 w-4 text-yellow-400 fill-current" />
              <span className="font-medium">{vehicle.rating}</span>
              <span className="text-gray-500">({vehicle.reviews} reviews)</span>
            </div>
          ) : (
            <span className="text-gray-500">No reviews yet</span>
          )}
          <span className="text-gray-500">{vehicle.bookings || 0} bookings</span>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Dialog>
              <DialogTrigger asChild>
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => setSelectedVehicle(vehicle)}
                >
                  <Eye className="h-4 w-4 mr-1" />
                  Details
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-3xl">
                <DialogHeader>
                  <DialogTitle>Vehicle Details</DialogTitle>
                  <DialogDescription>
                    Complete information for {vehicle.model}
                  </DialogDescription>
                </DialogHeader>
                {selectedVehicle && <VehicleDetails vehicle={selectedVehicle} />}
              </DialogContent>
            </Dialog>
            <Button variant="outline" size="sm">
              <Edit className="h-4 w-4 mr-1" />
              Edit
            </Button>
          </div>
          <div className="flex items-center space-x-2">
            <div className="flex items-center space-x-2">
              <Label htmlFor={`availability-${vehicle.id}`} className="text-xs">Available</Label>
              <Switch
                id={`availability-${vehicle.id}`}
                checked={vehicle.availability}
                onCheckedChange={() => handleToggleAvailability(vehicle.id)}
              />
            </div>
            <Button 
              size="sm" 
              variant="destructive"
              onClick={() => handleDeleteVehicle(vehicle.id)}
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );

  const VehicleDetails = ({ vehicle }) => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-4">
          <div>
            <h4 className="font-medium text-gray-900 mb-2">Vehicle Information</h4>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">Model:</span>
                <span className="text-sm font-medium">{vehicle.model}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">Year:</span>
                <span className="text-sm font-medium">{vehicle.year}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">Type:</span>
                <span className="text-sm font-medium">{vehicle.type}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">Capacity:</span>
                <span className="text-sm font-medium">{vehicle.capacity} seats</span>
              </div>
              {vehicle.fuelType && (
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Fuel Type:</span>
                  <span className="text-sm font-medium">{vehicle.fuelType}</span>
                </div>
              )}
              {vehicle.transmission && (
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Transmission:</span>
                  <span className="text-sm font-medium">{vehicle.transmission}</span>
                </div>
              )}
              {vehicle.licenseRequired && (
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">License Required:</span>
                  <span className="text-sm font-medium">{vehicle.licenseRequired}</span>
                </div>
              )}
            </div>
          </div>
          
          {vehicle.description && (
            <div>
              <h4 className="font-medium text-gray-900 mb-2">Description</h4>
              <p className="text-sm text-gray-600">{vehicle.description}</p>
            </div>
          )}
        </div>

        <div className="space-y-4">
          <div>
            <h4 className="font-medium text-gray-900 mb-2">Pricing & Availability</h4>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">Price per Day:</span>
                <span className="text-sm font-medium">${vehicle.pricePerDay}</span>
              </div>
              {vehicle.pricePerHour > 0 && (
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Price per Hour:</span>
                  <span className="text-sm font-medium">${vehicle.pricePerHour}</span>
                </div>
              )}
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">Status:</span>
                <Badge variant={vehicle.availability ? 'default' : 'secondary'}>
                  {vehicle.availability ? 'Available' : 'Unavailable'}
                </Badge>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">In Fleet:</span>
                <span className="text-sm font-medium">{vehicle.totalVehicles || 1}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">Available Now:</span>
                <span className={`text-sm font-medium ${(vehicle.availableVehicles || 0) > 0 ? 'text-green-600' : 'text-red-600'}`}>
                  {vehicle.availableVehicles || 0}
                </span>
              </div>
            </div>
          </div>

          <div>
            <h4 className="font-medium text-gray-900 mb-2">Performance</h4>
            {vehicle.reviews > 0 ? (
              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <Star className="h-5 w-5 text-yellow-400 fill-current" />
                  <span className="font-medium">{vehicle.rating}</span>
                  <span className="text-sm text-gray-500">({vehicle.reviews} reviews)</span>
                </div>
                <div className="text-sm text-gray-600">
                  Total Bookings: {vehicle.bookings || 0}
                </div>
              </div>
            ) : (
              <p className="text-sm text-gray-500">No reviews yet</p>
            )}
          </div>
        </div>
      </div>

      <div>
        <h4 className="font-medium text-gray-900 mb-2">Features & Amenities</h4>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
          {vehicle.features.map((feature, index) => (
            <div key={index} className="flex items-center space-x-2 p-2 bg-gray-50 rounded">
              <CheckCircle className="h-4 w-4 text-green-600" />
              <span className="text-sm">{feature}</span>
            </div>
          ))}
        </div>
      </div>

      <div>
        <h4 className="font-medium text-gray-900 mb-2">Vehicle Images</h4>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {vehicle.images && vehicle.images.length > 0 ? (
            vehicle.images.map((image, index) => (
              <div key={index} className="aspect-video bg-gray-200 rounded-lg flex items-center justify-center">
                <img src={image} alt={`Vehicle ${index + 1}`} className="w-full h-full object-cover rounded-lg" />
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
          <h1 className="text-3xl font-bold text-gray-900">Vehicle Fleet</h1>
          <p className="text-gray-600">Manage your vehicle rental fleet and pricing</p>
        </div>
        <div className="flex items-center space-x-4">
          <Dialog open={isCreateModalOpen} onOpenChange={setIsCreateModalOpen}>
            <DialogTrigger asChild>
              <Button className="bg-blue-600 hover:bg-blue-700">
                <Plus className="h-4 w-4 mr-2" />
                Add Vehicle
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle>Add New Vehicle</DialogTitle>
                <DialogDescription>
                  Add a new vehicle to your rental fleet
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="type">Vehicle Type *</Label>
                    <Select onValueChange={(value) => setFormData({...formData, type: value})}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select vehicle type" />
                      </SelectTrigger>
                      <SelectContent>
                        {vehicleTypes.map((type) => (
                          <SelectItem key={type} value={type}>{type}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="model">Model *</Label>
                    <Input
                      id="model"
                      value={formData.model}
                      onChange={(e) => setFormData({...formData, model: e.target.value})}
                      placeholder="e.g., Toyota Camry"
                    />
                  </div>
                </div>
                
                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <Label htmlFor="year">Year</Label>
                    <Input
                      id="year"
                      type="number"
                      value={formData.year}
                      onChange={(e) => setFormData({...formData, year: e.target.value})}
                      placeholder="2023"
                    />
                  </div>
                  <div>
                    <Label htmlFor="capacity">Capacity *</Label>
                    <Input
                      id="capacity"
                      type="number"
                      value={formData.capacity}
                      onChange={(e) => setFormData({...formData, capacity: e.target.value})}
                      placeholder="5"
                    />
                  </div>
                  <div>
                    <Label htmlFor="totalVehicles">Quantity in Fleet</Label>
                    <Input
                      id="totalVehicles"
                      type="number"
                      value={formData.totalVehicles}
                      onChange={(e) => setFormData({...formData, totalVehicles: e.target.value, availableVehicles: e.target.value})}
                      placeholder="1"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="pricePerDay">Price per Day ($) *</Label>
                    <Input
                      id="pricePerDay"
                      type="number"
                      value={formData.pricePerDay}
                      onChange={(e) => setFormData({...formData, pricePerDay: e.target.value})}
                      placeholder="149"
                    />
                  </div>
                  <div>
                    <Label htmlFor="pricePerHour">Price per Hour ($)</Label>
                    <Input
                      id="pricePerHour"
                      type="number"
                      value={formData.pricePerHour}
                      onChange={(e) => setFormData({...formData, pricePerHour: e.target.value})}
                      placeholder="25"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <Label htmlFor="fuelType">Fuel Type</Label>
                    <Select onValueChange={(value) => setFormData({...formData, fuelType: value})}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select fuel type" />
                      </SelectTrigger>
                      <SelectContent>
                        {fuelTypes.map((fuel) => (
                          <SelectItem key={fuel} value={fuel}>{fuel}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="transmission">Transmission</Label>
                    <Select onValueChange={(value) => setFormData({...formData, transmission: value})}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select transmission" />
                      </SelectTrigger>
                      <SelectContent>
                        {transmissionTypes.map((trans) => (
                          <SelectItem key={trans} value={trans}>{trans}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="licenseRequired">License Required</Label>
                    <Select onValueChange={(value) => setFormData({...formData, licenseRequired: value})}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select license type" />
                      </SelectTrigger>
                      <SelectContent>
                        {licenseTypes.map((license) => (
                          <SelectItem key={license} value={license}>{license}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div>
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    value={formData.description}
                    onChange={(e) => setFormData({...formData, description: e.target.value})}
                    placeholder="Describe your vehicle..."
                    rows={3}
                  />
                </div>

                <div>
                  <Label>Features & Amenities</Label>
                  <div className="grid grid-cols-3 gap-2 mt-2">
                    {availableFeatures.map((feature) => (
                      <div key={feature} className="flex items-center space-x-2">
                        <Switch
                          id={feature}
                          checked={formData.features.includes(feature)}
                          onCheckedChange={() => handleFeatureToggle(feature)}
                        />
                        <Label htmlFor={feature} className="text-sm">{feature}</Label>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="flex justify-end space-x-2">
                  <Button variant="outline" onClick={() => setIsCreateModalOpen(false)}>
                    Cancel
                  </Button>
                  <Button onClick={handleCreateVehicle} className="bg-blue-600 hover:bg-blue-700">
                    Add Vehicle
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
                <p className="text-sm text-gray-600">Total Vehicles</p>
                <p className="text-2xl font-bold text-gray-900">{vehicles.length}</p>
              </div>
              <Car className="h-8 w-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Available</p>
                <p className="text-2xl font-bold text-green-600">
                  {vehicles.filter(v => v.availability && (v.availableVehicles || 0) > 0).length}
                </p>
              </div>
              <CheckCircle className="h-8 w-8 text-green-600" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Avg. Price/Day</p>
                <p className="text-2xl font-bold text-blue-600">
                  ${Math.round(vehicles.reduce((sum, v) => sum + v.pricePerDay, 0) / vehicles.length || 0)}
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
                <p className="text-sm text-gray-600">Total Bookings</p>
                <p className="text-2xl font-bold text-purple-600">
                  {vehicles.reduce((sum, v) => sum + (v.bookings || 0), 0)}
                </p>
              </div>
              <Calendar className="h-8 w-8 text-purple-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Vehicles Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
        {vehicles.map((vehicle) => (
          <VehicleCard key={vehicle.id} vehicle={vehicle} />
        ))}
      </div>

      {vehicles.length === 0 && (
        <Card>
          <CardContent className="p-12 text-center">
            <Car className="h-12 w-12 mx-auto text-gray-400 mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No vehicles in fleet</h3>
            <p className="text-gray-500 mb-4">
              Start by adding your first vehicle to begin offering rental services
            </p>
            <Button 
              onClick={() => setIsCreateModalOpen(true)}
              className="bg-blue-600 hover:bg-blue-700"
            >
              <Plus className="h-4 w-4 mr-2" />
              Add Your First Vehicle
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default Vehicles;