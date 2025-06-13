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
  MapPin,
  Users,
  DollarSign,
  Clock,
  Star,
  Calendar,
  Mountain,
  Camera,
  Route,
  CheckCircle
} from 'lucide-react';
import { mockTourPackages } from '../../utils/mockData';

const TourPackages = () => {
  const [packages, setPackages] = useState(mockTourPackages);
  const [selectedPackage, setSelectedPackage] = useState(null);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    duration: '',
    price: '',
    maxPeople: '',
    category: '',
    difficulty: '',
    includes: '',
    excludes: '',
    itinerary: [''],
    meetingPoint: '',
    availability: true
  });
  const { toast } = useToast();

  const categories = [
    'City Tour',
    'Adventure',
    'Cultural',
    'Nature',
    'Food & Drink',
    'Photography',
    'Historical',
    'Beach',
    'Wildlife',
    'Nightlife'
  ];

  const difficulties = ['Easy', 'Moderate', 'Challenging', 'Expert'];

  const handleCreatePackage = () => {
    if (!formData.title || !formData.price || !formData.duration || !formData.maxPeople) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields",
        variant: "destructive"
      });
      return;
    }

    const newPackage = {
      id: Date.now(),
      title: formData.title,
      description: formData.description,
      duration: formData.duration,
      price: parseFloat(formData.price),
      maxPeople: parseInt(formData.maxPeople),
      category: formData.category,
      difficulty: formData.difficulty,
      includes: formData.includes.split(',').map(item => item.trim()).filter(item => item),
      excludes: formData.excludes.split(',').map(item => item.trim()).filter(item => item),
      itinerary: formData.itinerary.filter(item => item.trim()),
      meetingPoint: formData.meetingPoint,
      images: [],
      rating: 0,
      reviews: 0,
      availability: formData.availability,
      bookings: 0
    };

    setPackages([...packages, newPackage]);
    setFormData({
      title: '',
      description: '',
      duration: '',
      price: '',
      maxPeople: '',
      category: '',
      difficulty: '',
      includes: '',
      excludes: '',
      itinerary: [''],
      meetingPoint: '',
      availability: true
    });
    setIsCreateModalOpen(false);

    toast({
      title: "Tour Package Created",
      description: "New tour package has been added successfully",
    });
  };

  const handleToggleAvailability = (packageId) => {
    setPackages(packages.map(pkg => 
      pkg.id === packageId 
        ? { ...pkg, availability: !pkg.availability }
        : pkg
    ));
    
    toast({
      title: "Availability Updated",
      description: "Package availability has been changed",
    });
  };

  const handleDeletePackage = (packageId) => {
    setPackages(packages.filter(pkg => pkg.id !== packageId));
    toast({
      title: "Package Deleted",
      description: "The tour package has been removed",
    });
  };

  const addItineraryItem = () => {
    setFormData(prev => ({
      ...prev,
      itinerary: [...prev.itinerary, '']
    }));
  };

  const updateItineraryItem = (index, value) => {
    setFormData(prev => ({
      ...prev,
      itinerary: prev.itinerary.map((item, i) => i === index ? value : item)
    }));
  };

  const removeItineraryItem = (index) => {
    setFormData(prev => ({
      ...prev,
      itinerary: prev.itinerary.filter((_, i) => i !== index)
    }));
  };

  const getDifficultyColor = (difficulty) => {
    switch (difficulty) {
      case 'Easy': return 'bg-green-100 text-green-800';
      case 'Moderate': return 'bg-yellow-100 text-yellow-800';
      case 'Challenging': return 'bg-orange-100 text-orange-800';
      case 'Expert': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const PackageCard = ({ pkg }) => (
    <Card className="hover-scale transition-all duration-200">
      <CardContent className="p-6">
        <div className="flex items-start justify-between mb-4">
          <div className="flex-1">
            <h3 className="text-lg font-semibold text-gray-900 mb-1">{pkg.title}</h3>
            <p className="text-sm text-gray-600 mb-2 line-clamp-2">{pkg.description}</p>
            <div className="flex items-center space-x-4 text-xs text-gray-500">
              <span className="flex items-center">
                <Clock className="h-3 w-3 mr-1" />
                {pkg.duration}
              </span>
              <span className="flex items-center">
                <Users className="h-3 w-3 mr-1" />
                Max {pkg.maxPeople}
              </span>
              {pkg.category && (
                <Badge variant="outline" className="text-xs">
                  {pkg.category}
                </Badge>
              )}
            </div>
          </div>
          <div className="flex flex-col items-end space-y-2">
            <div className="text-xl font-bold text-blue-600">
              ${pkg.price}
            </div>
            <Badge variant={pkg.availability ? 'default' : 'secondary'}>
              {pkg.availability ? 'Available' : 'Unavailable'}
            </Badge>
          </div>
        </div>

        {/* Difficulty Badge */}
        {pkg.difficulty && (
          <div className="mb-4">
            <Badge className={getDifficultyColor(pkg.difficulty)}>
              <Mountain className="h-3 w-3 mr-1" />
              {pkg.difficulty}
            </Badge>
          </div>
        )}

        {/* Rating */}
        {pkg.reviews > 0 ? (
          <div className="flex items-center space-x-2 mb-4">
            <div className="flex items-center">
              <Star className="h-4 w-4 text-yellow-400 fill-current" />
              <span className="text-sm font-medium ml-1">{pkg.rating}</span>
            </div>
            <span className="text-xs text-gray-500">({pkg.reviews} reviews)</span>
            <span className="text-xs text-gray-500">• {pkg.bookings || 0} bookings</span>
          </div>
        ) : (
          <div className="mb-4">
            <span className="text-xs text-gray-500">No reviews yet • {pkg.bookings || 0} bookings</span>
          </div>
        )}

        {/* Meeting Point */}
        {pkg.meetingPoint && (
          <div className="flex items-center text-sm text-gray-600 mb-4">
            <MapPin className="h-4 w-4 mr-1" />
            <span className="truncate">{pkg.meetingPoint}</span>
          </div>
        )}

        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Dialog>
              <DialogTrigger asChild>
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => setSelectedPackage(pkg)}
                >
                  <Eye className="h-4 w-4 mr-1" />
                  Details
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                  <DialogTitle>Tour Package Details</DialogTitle>
                  <DialogDescription>
                    Complete information for {pkg.title}
                  </DialogDescription>
                </DialogHeader>
                {selectedPackage && <PackageDetails package={selectedPackage} />}
              </DialogContent>
            </Dialog>
            <Button variant="outline" size="sm">
              <Edit className="h-4 w-4 mr-1" />
              Edit
            </Button>
          </div>
          <div className="flex items-center space-x-2">
            <div className="flex items-center space-x-2">
              <Label htmlFor={`availability-${pkg.id}`} className="text-xs">Available</Label>
              <Switch
                id={`availability-${pkg.id}`}
                checked={pkg.availability}
                onCheckedChange={() => handleToggleAvailability(pkg.id)}
              />
            </div>
            <Button 
              size="sm" 
              variant="destructive"
              onClick={() => handleDeletePackage(pkg.id)}
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );

  const PackageDetails = ({ package: pkg }) => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-4">
          <div>
            <h4 className="font-medium text-gray-900 mb-2">Package Information</h4>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">Title:</span>
                <span className="text-sm font-medium">{pkg.title}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">Price:</span>
                <span className="text-sm font-medium">${pkg.price}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">Duration:</span>
                <span className="text-sm font-medium">{pkg.duration}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">Max People:</span>
                <span className="text-sm font-medium">{pkg.maxPeople}</span>
              </div>
              {pkg.category && (
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Category:</span>
                  <Badge variant="outline">{pkg.category}</Badge>
                </div>
              )}
              {pkg.difficulty && (
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Difficulty:</span>
                  <Badge className={getDifficultyColor(pkg.difficulty)}>{pkg.difficulty}</Badge>
                </div>
              )}
            </div>
          </div>
          
          <div>
            <h4 className="font-medium text-gray-900 mb-2">Description</h4>
            <p className="text-sm text-gray-600">{pkg.description}</p>
          </div>

          {pkg.meetingPoint && (
            <div>
              <h4 className="font-medium text-gray-900 mb-2">Meeting Point</h4>
              <div className="flex items-center text-sm text-gray-600">
                <MapPin className="h-4 w-4 mr-2" />
                {pkg.meetingPoint}
              </div>
            </div>
          )}
        </div>

        <div className="space-y-4">
          <div>
            <h4 className="font-medium text-gray-900 mb-2">Availability & Performance</h4>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">Status:</span>
                <Badge variant={pkg.availability ? 'default' : 'secondary'}>
                  {pkg.availability ? 'Available' : 'Unavailable'}
                </Badge>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">Total Bookings:</span>
                <span className="text-sm font-medium">{pkg.bookings || 0}</span>
              </div>
              {pkg.reviews > 0 ? (
                <>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Rating:</span>
                    <div className="flex items-center">
                      <Star className="h-4 w-4 text-yellow-400 fill-current mr-1" />
                      <span className="text-sm font-medium">{pkg.rating}</span>
                    </div>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Reviews:</span>
                    <span className="text-sm font-medium">{pkg.reviews}</span>
                  </div>
                </>
              ) : (
                <div className="text-sm text-gray-500">No reviews yet</div>
              )}
            </div>
          </div>

          {pkg.includes && pkg.includes.length > 0 && (
            <div>
              <h4 className="font-medium text-gray-900 mb-2">Includes</h4>
              <div className="space-y-1">
                {pkg.includes.map((item, index) => (
                  <div key={index} className="flex items-center text-sm text-gray-600">
                    <CheckCircle className="h-3 w-3 text-green-600 mr-2" />
                    {item}
                  </div>
                ))}
              </div>
            </div>
          )}

          {pkg.excludes && pkg.excludes.length > 0 && (
            <div>
              <h4 className="font-medium text-gray-900 mb-2">Excludes</h4>
              <div className="space-y-1">
                {pkg.excludes.map((item, index) => (
                  <div key={index} className="flex items-center text-sm text-gray-600">
                    <span className="h-3 w-3 text-red-600 mr-2">✗</span>
                    {item}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {pkg.itinerary && pkg.itinerary.length > 0 && (
        <div>
          <h4 className="font-medium text-gray-900 mb-2">Itinerary</h4>
          <div className="space-y-2">
            {pkg.itinerary.map((item, index) => (
              <div key={index} className="flex items-start space-x-3 p-3 bg-gray-50 rounded-lg">
                <div className="flex-shrink-0 w-6 h-6 bg-blue-600 text-white text-xs rounded-full flex items-center justify-center">
                  {index + 1}
                </div>
                <span className="text-sm text-gray-700">{item}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      <div>
        <h4 className="font-medium text-gray-900 mb-2">Package Images</h4>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {pkg.images && pkg.images.length > 0 ? (
            pkg.images.map((image, index) => (
              <div key={index} className="aspect-video bg-gray-200 rounded-lg flex items-center justify-center">
                <img src={image} alt={`Package ${index + 1}`} className="w-full h-full object-cover rounded-lg" />
              </div>
            ))
          ) : (
            <div className="col-span-full p-8 border-2 border-dashed border-gray-300 rounded-lg text-center">
              <Camera className="h-8 w-8 mx-auto text-gray-400 mb-2" />
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
          <h1 className="text-3xl font-bold text-gray-900">Tour Packages</h1>
          <p className="text-gray-600">Manage your tour packages and itineraries</p>
        </div>
        <div className="flex items-center space-x-4">
          <Dialog open={isCreateModalOpen} onOpenChange={setIsCreateModalOpen}>
            <DialogTrigger asChild>
              <Button className="bg-blue-600 hover:bg-blue-700">
                <Plus className="h-4 w-4 mr-2" />
                Add Package
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle>Create New Tour Package</DialogTitle>
                <DialogDescription>
                  Design a new tour experience for your customers
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="title">Package Title *</Label>
                    <Input
                      id="title"
                      value={formData.title}
                      onChange={(e) => setFormData({...formData, title: e.target.value})}
                      placeholder="e.g., Miami Beach Sunset Tour"
                    />
                  </div>
                  <div>
                    <Label htmlFor="price">Price ($) *</Label>
                    <Input
                      id="price"
                      type="number"
                      value={formData.price}
                      onChange={(e) => setFormData({...formData, price: e.target.value})}
                      placeholder="89"
                    />
                  </div>
                </div>
                
                <div>
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    value={formData.description}
                    onChange={(e) => setFormData({...formData, description: e.target.value})}
                    placeholder="Describe your tour experience..."
                    rows={3}
                  />
                </div>

                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <Label htmlFor="duration">Duration *</Label>
                    <Input
                      id="duration"
                      value={formData.duration}
                      onChange={(e) => setFormData({...formData, duration: e.target.value})}
                      placeholder="3 hours"
                    />
                  </div>
                  <div>
                    <Label htmlFor="maxPeople">Max People *</Label>
                    <Input
                      id="maxPeople"
                      type="number"
                      value={formData.maxPeople}
                      onChange={(e) => setFormData({...formData, maxPeople: e.target.value})}
                      placeholder="12"
                    />
                  </div>
                  <div>
                    <Label htmlFor="category">Category</Label>
                    <Select onValueChange={(value) => setFormData({...formData, category: value})}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select category" />
                      </SelectTrigger>
                      <SelectContent>
                        {categories.map((cat) => (
                          <SelectItem key={cat} value={cat}>{cat}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="difficulty">Difficulty Level</Label>
                    <Select onValueChange={(value) => setFormData({...formData, difficulty: value})}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select difficulty" />
                      </SelectTrigger>
                      <SelectContent>
                        {difficulties.map((diff) => (
                          <SelectItem key={diff} value={diff}>{diff}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="meetingPoint">Meeting Point</Label>
                    <Input
                      id="meetingPoint"
                      value={formData.meetingPoint}
                      onChange={(e) => setFormData({...formData, meetingPoint: e.target.value})}
                      placeholder="Hotel lobby, address, etc."
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="includes">Includes (comma separated)</Label>
                    <Textarea
                      id="includes"
                      value={formData.includes}
                      onChange={(e) => setFormData({...formData, includes: e.target.value})}
                      placeholder="Professional guide, Transportation, Refreshments"
                      rows={2}
                    />
                  </div>
                  <div>
                    <Label htmlFor="excludes">Excludes (comma separated)</Label>
                    <Textarea
                      id="excludes"
                      value={formData.excludes}
                      onChange={(e) => setFormData({...formData, excludes: e.target.value})}
                      placeholder="Personal expenses, Tips, Meals"
                      rows={2}
                    />
                  </div>
                </div>

                <div>
                  <Label>Itinerary</Label>
                  <div className="space-y-2">
                    {formData.itinerary.map((item, index) => (
                      <div key={index} className="flex items-center space-x-2">
                        <div className="flex-shrink-0 w-6 h-6 bg-blue-600 text-white text-xs rounded-full flex items-center justify-center">
                          {index + 1}
                        </div>
                        <Input
                          value={item}
                          onChange={(e) => updateItineraryItem(index, e.target.value)}
                          placeholder={`Step ${index + 1} of the tour`}
                          className="flex-1"
                        />
                        {formData.itinerary.length > 1 && (
                          <Button
                            type="button"
                            variant="outline"
                            size="sm"
                            onClick={() => removeItineraryItem(index)}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        )}
                      </div>
                    ))}
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={addItineraryItem}
                      className="w-full"
                    >
                      <Plus className="h-4 w-4 mr-2" />
                      Add Itinerary Step
                    </Button>
                  </div>
                </div>

                <div className="flex justify-end space-x-2">
                  <Button variant="outline" onClick={() => setIsCreateModalOpen(false)}>
                    Cancel
                  </Button>
                  <Button onClick={handleCreatePackage} className="bg-blue-600 hover:bg-blue-700">
                    Create Package
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
                <p className="text-sm text-gray-600">Total Packages</p>
                <p className="text-2xl font-bold text-gray-900">{packages.length}</p>
              </div>
              <Route className="h-8 w-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Available</p>
                <p className="text-2xl font-bold text-green-600">
                  {packages.filter(p => p.availability).length}
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
                  ${Math.round(packages.reduce((sum, p) => sum + p.price, 0) / packages.length || 0)}
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
                  {(packages.reduce((sum, p) => sum + (p.rating || 0), 0) / packages.length || 0).toFixed(1)}
                </p>
              </div>
              <Star className="h-8 w-8 text-yellow-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Packages Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
        {packages.map((pkg) => (
          <PackageCard key={pkg.id} pkg={pkg} />
        ))}
      </div>

      {packages.length === 0 && (
        <Card>
          <CardContent className="p-12 text-center">
            <Route className="h-12 w-12 mx-auto text-gray-400 mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No tour packages yet</h3>
            <p className="text-gray-500 mb-4">
              Start by creating your first tour package to attract customers
            </p>
            <Button 
              onClick={() => setIsCreateModalOpen(true)}
              className="bg-blue-600 hover:bg-blue-700"
            >
              <Plus className="h-4 w-4 mr-2" />
              Create Your First Package
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default TourPackages;