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
  Briefcase,
  DollarSign,
  Clock,
  Star,
  Users,
  Calendar,
  CheckCircle,
  Settings
} from 'lucide-react';

const GeneralServices = () => {
  const [services, setServices] = useState([
    {
      id: 1,
      name: "Professional Photography Session",
      description: "High-quality photography services for events, portraits, and commercial needs",
      category: "Photography",
      price: 250,
      duration: "2 hours",
      availability: true,
      rating: 4.8,
      reviews: 32,
      bookings: 45,
      images: [],
      includes: ["Professional photographer", "Equipment", "Basic editing", "Digital gallery"],
      requirements: ["Location details", "2 days advance booking"]
    },
    {
      id: 2,
      name: "Event Planning & Coordination",
      description: "Complete event planning services from concept to execution",
      category: "Event Services",
      price: 1500,
      duration: "Full service",
      availability: true,
      rating: 4.9,
      reviews: 18,
      bookings: 23,
      images: [],
      includes: ["Planning consultation", "Vendor coordination", "Day-of coordination", "Setup supervision"],
      requirements: ["Event details", "1 month advance booking", "Venue confirmation"]
    }
  ]);

  const [selectedService, setSelectedService] = useState(null);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    category: '',
    price: '',
    duration: '',
    priceType: 'fixed',
    includes: [''],
    requirements: [''],
    availability: true
  });
  const { toast } = useToast();

  const serviceCategories = [
    'Photography',
    'Event Services',
    'Consulting',
    'Transportation',
    'Wellness & Spa',
    'Food & Catering',
    'Entertainment',
    'Education & Training',
    'Technical Services',
    'Personal Services',
    'Business Services',
    'Health & Medical',
    'Home Services',
    'Beauty & Grooming',
    'Sports & Fitness'
  ];

  const priceTypes = [
    { value: 'fixed', label: 'Fixed Price' },
    { value: 'hourly', label: 'Per Hour' },
    { value: 'daily', label: 'Per Day' },
    { value: 'project', label: 'Per Project' },
    { value: 'custom', label: 'Custom Pricing' }
  ];

  const handleCreateService = () => {
    if (!formData.name || !formData.category || !formData.price) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields",
        variant: "destructive"
      });
      return;
    }

    const newService = {
      id: Date.now(),
      name: formData.name,
      description: formData.description,
      category: formData.category,
      price: parseFloat(formData.price),
      priceType: formData.priceType,
      duration: formData.duration,
      availability: formData.availability,
      includes: formData.includes.filter(item => item.trim()),
      requirements: formData.requirements.filter(item => item.trim()),
      images: [],
      rating: 0,
      reviews: 0,
      bookings: 0
    };

    setServices([...services, newService]);
    setFormData({
      name: '',
      description: '',
      category: '',
      price: '',
      duration: '',
      priceType: 'fixed',
      includes: [''],
      requirements: [''],
      availability: true
    });
    setIsCreateModalOpen(false);

    toast({
      title: "Service Created",
      description: "New service has been added successfully",
    });
  };

  const handleToggleAvailability = (serviceId) => {
    setServices(services.map(service => 
      service.id === serviceId 
        ? { ...service, availability: !service.availability }
        : service
    ));
    
    toast({
      title: "Availability Updated",
      description: "Service availability has been changed",
    });
  };

  const handleDeleteService = (serviceId) => {
    setServices(services.filter(service => service.id !== serviceId));
    toast({
      title: "Service Deleted",
      description: "The service has been removed",
    });
  };

  const addListItem = (listType) => {
    setFormData(prev => ({
      ...prev,
      [listType]: [...prev[listType], '']
    }));
  };

  const updateListItem = (listType, index, value) => {
    setFormData(prev => ({
      ...prev,
      [listType]: prev[listType].map((item, i) => i === index ? value : item)
    }));
  };

  const removeListItem = (listType, index) => {
    setFormData(prev => ({
      ...prev,
      [listType]: prev[listType].filter((_, i) => i !== index)
    }));
  };

  const formatPrice = (price, priceType) => {
    const formattedPrice = `$${price}`;
    switch (priceType) {
      case 'hourly': return `${formattedPrice}/hr`;
      case 'daily': return `${formattedPrice}/day`;
      case 'project': return `${formattedPrice}/project`;
      case 'custom': return `${formattedPrice} (custom)`;
      default: return formattedPrice;
    }
  };

  const ServiceCard = ({ service }) => (
    <Card className="hover-scale transition-all duration-200">
      <CardContent className="p-6">
        <div className="flex items-start justify-between mb-4">
          <div className="flex-1">
            <h3 className="text-lg font-semibold text-gray-900 mb-1">{service.name}</h3>
            <p className="text-sm text-gray-600 mb-2 line-clamp-2">{service.description}</p>
            <div className="flex items-center space-x-4 text-xs text-gray-500">
              <Badge variant="outline" className="text-xs">
                {service.category}
              </Badge>
              {service.duration && (
                <span className="flex items-center">
                  <Clock className="h-3 w-3 mr-1" />
                  {service.duration}
                </span>
              )}
            </div>
          </div>
          <div className="flex flex-col items-end space-y-2">
            <div className="text-xl font-bold text-blue-600">
              {formatPrice(service.price, service.priceType)}
            </div>
            <Badge variant={service.availability ? 'default' : 'secondary'}>
              {service.availability ? 'Available' : 'Unavailable'}
            </Badge>
          </div>
        </div>

        {/* What's Included Preview */}
        {service.includes && service.includes.length > 0 && (
          <div className="mb-4">
            <h5 className="text-xs font-medium text-gray-700 mb-1">Includes:</h5>
            <div className="space-y-1">
              {service.includes.slice(0, 2).map((item, index) => (
                <div key={index} className="flex items-center text-xs text-gray-600">
                  <CheckCircle className="h-3 w-3 text-green-600 mr-1" />
                  {item}
                </div>
              ))}
              {service.includes.length > 2 && (
                <div className="text-xs text-gray-500">
                  +{service.includes.length - 2} more included
                </div>
              )}
            </div>
          </div>
        )}

        {/* Rating & Bookings */}
        <div className="flex items-center justify-between mb-4 text-sm">
          {service.reviews > 0 ? (
            <div className="flex items-center space-x-2">
              <Star className="h-4 w-4 text-yellow-400 fill-current" />
              <span className="font-medium">{service.rating}</span>
              <span className="text-gray-500">({service.reviews} reviews)</span>
            </div>
          ) : (
            <span className="text-gray-500">No reviews yet</span>
          )}
          <span className="text-gray-500">{service.bookings || 0} bookings</span>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Dialog>
              <DialogTrigger asChild>
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => setSelectedService(service)}
                >
                  <Eye className="h-4 w-4 mr-1" />
                  Details
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                  <DialogTitle>Service Details</DialogTitle>
                  <DialogDescription>
                    Complete information for {service.name}
                  </DialogDescription>
                </DialogHeader>
                {selectedService && <ServiceDetails service={selectedService} />}
              </DialogContent>
            </Dialog>
            <Button variant="outline" size="sm">
              <Edit className="h-4 w-4 mr-1" />
              Edit
            </Button>
          </div>
          <div className="flex items-center space-x-2">
            <div className="flex items-center space-x-2">
              <Label htmlFor={`availability-${service.id}`} className="text-xs">Available</Label>
              <Switch
                id={`availability-${service.id}`}
                checked={service.availability}
                onCheckedChange={() => handleToggleAvailability(service.id)}
              />
            </div>
            <Button 
              size="sm" 
              variant="destructive"
              onClick={() => handleDeleteService(service.id)}
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );

  const ServiceDetails = ({ service }) => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-4">
          <div>
            <h4 className="font-medium text-gray-900 mb-2">Service Information</h4>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">Name:</span>
                <span className="text-sm font-medium">{service.name}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">Category:</span>
                <Badge variant="outline">{service.category}</Badge>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">Price:</span>
                <span className="text-sm font-medium">{formatPrice(service.price, service.priceType)}</span>
              </div>
              {service.duration && (
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Duration:</span>
                  <span className="text-sm font-medium">{service.duration}</span>
                </div>
              )}
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">Status:</span>
                <Badge variant={service.availability ? 'default' : 'secondary'}>
                  {service.availability ? 'Available' : 'Unavailable'}
                </Badge>
              </div>
            </div>
          </div>
          
          <div>
            <h4 className="font-medium text-gray-900 mb-2">Description</h4>
            <p className="text-sm text-gray-600">{service.description || 'No description provided'}</p>
          </div>
        </div>

        <div className="space-y-4">
          <div>
            <h4 className="font-medium text-gray-900 mb-2">Performance</h4>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">Total Bookings:</span>
                <span className="text-sm font-medium">{service.bookings || 0}</span>
              </div>
              {service.reviews > 0 ? (
                <>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Rating:</span>
                    <div className="flex items-center">
                      <Star className="h-4 w-4 text-yellow-400 fill-current mr-1" />
                      <span className="text-sm font-medium">{service.rating}</span>
                    </div>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Reviews:</span>
                    <span className="text-sm font-medium">{service.reviews}</span>
                  </div>
                </>
              ) : (
                <div className="text-sm text-gray-500">No reviews yet</div>
              )}
            </div>
          </div>
        </div>
      </div>

      {service.includes && service.includes.length > 0 && (
        <div>
          <h4 className="font-medium text-gray-900 mb-2">What's Included</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
            {service.includes.map((item, index) => (
              <div key={index} className="flex items-center space-x-2 p-2 bg-green-50 rounded">
                <CheckCircle className="h-4 w-4 text-green-600" />
                <span className="text-sm">{item}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {service.requirements && service.requirements.length > 0 && (
        <div>
          <h4 className="font-medium text-gray-900 mb-2">Requirements</h4>
          <div className="space-y-2">
            {service.requirements.map((requirement, index) => (
              <div key={index} className="flex items-center space-x-2 p-2 bg-blue-50 rounded">
                <Settings className="h-4 w-4 text-blue-600" />
                <span className="text-sm">{requirement}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      <div>
        <h4 className="font-medium text-gray-900 mb-2">Service Images</h4>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {service.images && service.images.length > 0 ? (
            service.images.map((image, index) => (
              <div key={index} className="aspect-video bg-gray-200 rounded-lg flex items-center justify-center">
                <img src={image} alt={`Service ${index + 1}`} className="w-full h-full object-cover rounded-lg" />
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
          <h1 className="text-3xl font-bold text-gray-900">Services</h1>
          <p className="text-gray-600">Manage your service offerings and pricing</p>
        </div>
        <div className="flex items-center space-x-4">
          <Dialog open={isCreateModalOpen} onOpenChange={setIsCreateModalOpen}>
            <DialogTrigger asChild>
              <Button className="bg-blue-600 hover:bg-blue-700">
                <Plus className="h-4 w-4 mr-2" />
                Add Service
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle>Create New Service</DialogTitle>
                <DialogDescription>
                  Add a new service to your offerings
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="name">Service Name *</Label>
                    <Input
                      id="name"
                      value={formData.name}
                      onChange={(e) => setFormData({...formData, name: e.target.value})}
                      placeholder="e.g., Professional Photography"
                    />
                  </div>
                  <div>
                    <Label htmlFor="category">Category *</Label>
                    <Select onValueChange={(value) => setFormData({...formData, category: value})}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select category" />
                      </SelectTrigger>
                      <SelectContent>
                        {serviceCategories.map((category) => (
                          <SelectItem key={category} value={category}>{category}</SelectItem>
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
                    placeholder="Describe your service..."
                    rows={3}
                  />
                </div>

                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <Label htmlFor="price">Price ($) *</Label>
                    <Input
                      id="price"
                      type="number"
                      value={formData.price}
                      onChange={(e) => setFormData({...formData, price: e.target.value})}
                      placeholder="250"
                    />
                  </div>
                  <div>
                    <Label htmlFor="priceType">Price Type</Label>
                    <Select onValueChange={(value) => setFormData({...formData, priceType: value})}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select pricing" />
                      </SelectTrigger>
                      <SelectContent>
                        {priceTypes.map((type) => (
                          <SelectItem key={type.value} value={type.value}>{type.label}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="duration">Duration</Label>
                    <Input
                      id="duration"
                      value={formData.duration}
                      onChange={(e) => setFormData({...formData, duration: e.target.value})}
                      placeholder="2 hours"
                    />
                  </div>
                </div>

                <div>
                  <Label>What's Included</Label>
                  <div className="space-y-2">
                    {formData.includes.map((item, index) => (
                      <div key={index} className="flex items-center space-x-2">
                        <CheckCircle className="h-4 w-4 text-green-600" />
                        <Input
                          value={item}
                          onChange={(e) => updateListItem('includes', index, e.target.value)}
                          placeholder={`What's included ${index + 1}`}
                          className="flex-1"
                        />
                        {formData.includes.length > 1 && (
                          <Button
                            type="button"
                            variant="outline"
                            size="sm"
                            onClick={() => removeListItem('includes', index)}
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
                      onClick={() => addListItem('includes')}
                      className="w-full"
                    >
                      <Plus className="h-4 w-4 mr-2" />
                      Add Included Item
                    </Button>
                  </div>
                </div>

                <div>
                  <Label>Requirements</Label>
                  <div className="space-y-2">
                    {formData.requirements.map((requirement, index) => (
                      <div key={index} className="flex items-center space-x-2">
                        <Settings className="h-4 w-4 text-blue-600" />
                        <Input
                          value={requirement}
                          onChange={(e) => updateListItem('requirements', index, e.target.value)}
                          placeholder={`Requirement ${index + 1}`}
                          className="flex-1"
                        />
                        {formData.requirements.length > 1 && (
                          <Button
                            type="button"
                            variant="outline"
                            size="sm"
                            onClick={() => removeListItem('requirements', index)}
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
                      onClick={() => addListItem('requirements')}
                      className="w-full"
                    >
                      <Plus className="h-4 w-4 mr-2" />
                      Add Requirement
                    </Button>
                  </div>
                </div>

                <div className="flex justify-end space-x-2">
                  <Button variant="outline" onClick={() => setIsCreateModalOpen(false)}>
                    Cancel
                  </Button>
                  <Button onClick={handleCreateService} className="bg-blue-600 hover:bg-blue-700">
                    Create Service
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
                <p className="text-sm text-gray-600">Total Services</p>
                <p className="text-2xl font-bold text-gray-900">{services.length}</p>
              </div>
              <Briefcase className="h-8 w-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Available</p>
                <p className="text-2xl font-bold text-green-600">
                  {services.filter(s => s.availability).length}
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
                <p className="text-sm text-gray-600">Avg. Price</p>
                <p className="text-2xl font-bold text-blue-600">
                  ${Math.round(services.reduce((sum, s) => sum + s.price, 0) / services.length || 0)}
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
                  {services.reduce((sum, s) => sum + (s.bookings || 0), 0)}
                </p>
              </div>
              <Calendar className="h-8 w-8 text-purple-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Services Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
        {services.map((service) => (
          <ServiceCard key={service.id} service={service} />
        ))}
      </div>

      {services.length === 0 && (
        <Card>
          <CardContent className="p-12 text-center">
            <Briefcase className="h-12 w-12 mx-auto text-gray-400 mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No services yet</h3>
            <p className="text-gray-500 mb-4">
              Start by adding your first service to begin attracting customers
            </p>
            <Button 
              onClick={() => setIsCreateModalOpen(true)}
              className="bg-blue-600 hover:bg-blue-700"
            >
              <Plus className="h-4 w-4 mr-2" />
              Add Your First Service
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default GeneralServices;