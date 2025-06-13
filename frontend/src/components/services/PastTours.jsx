import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Input } from '../ui/input';
import { Textarea } from '../ui/textarea';
import { Label } from '../ui/label';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '../ui/dialog';
import { useToast } from '../../hooks/use-toast';
import { 
  Plus, 
  Upload, 
  Eye, 
  Edit,
  Trash2,
  Calendar,
  MapPin,
  Users,
  Camera,
  Star,
  Download,
  Share2
} from 'lucide-react';

const PastTours = () => {
  const [pastTours, setPastTours] = useState([
    {
      id: 1,
      title: "Miami Beach Sunset Photography",
      date: "2024-01-15",
      location: "South Beach, Miami",
      participants: 8,
      maxParticipants: 12,
      description: "Amazing sunset photography session with a lovely group of travelers",
      images: [],
      rating: 4.8,
      feedback: "Fantastic experience! The guide was knowledgeable and the spots were perfect for photos.",
      tourPackageId: 1,
      highlights: ["Perfect weather", "Great group dynamic", "Stunning sunset views"],
      duration: "3 hours"
    },
    {
      id: 2,
      title: "Everglades Adventure Expedition",
      date: "2024-01-08",
      location: "Everglades National Park",
      participants: 6,
      maxParticipants: 8,
      description: "Full day adventure exploring the unique ecosystem of the Everglades",
      images: [],
      rating: 4.9,
      feedback: "Best tour guide ever! Saw so much wildlife and learned a lot about the ecosystem.",
      tourPackageId: 2,
      highlights: ["Alligator sightings", "Bird watching", "Airboat experience"],
      duration: "8 hours"
    }
  ]);

  const [selectedTour, setSelectedTour] = useState(null);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    date: '',
    location: '',
    participants: '',
    maxParticipants: '',
    description: '',
    highlights: [''],
    duration: '',
    tourPackageId: '',
    feedback: '',
    rating: ''
  });
  const { toast } = useToast();

  const handleCreateTour = () => {
    if (!formData.title || !formData.date || !formData.location) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields",
        variant: "destructive"
      });
      return;
    }

    const newTour = {
      id: Date.now(),
      title: formData.title,
      date: formData.date,
      location: formData.location,
      participants: parseInt(formData.participants) || 0,
      maxParticipants: parseInt(formData.maxParticipants) || 0,
      description: formData.description,
      highlights: formData.highlights.filter(h => h.trim()),
      duration: formData.duration,
      tourPackageId: parseInt(formData.tourPackageId) || null,
      feedback: formData.feedback,
      rating: parseFloat(formData.rating) || 0,
      images: []
    };

    setPastTours([newTour, ...pastTours]);
    setFormData({
      title: '',
      date: '',
      location: '',
      participants: '',
      maxParticipants: '',
      description: '',
      highlights: [''],
      duration: '',
      tourPackageId: '',
      feedback: '',
      rating: ''
    });
    setIsCreateModalOpen(false);

    toast({
      title: "Past Tour Added",
      description: "Your tour experience has been documented successfully",
    });
  };

  const handleDeleteTour = (tourId) => {
    setPastTours(pastTours.filter(tour => tour.id !== tourId));
    toast({
      title: "Tour Deleted",
      description: "The past tour has been removed",
    });
  };

  const addHighlight = () => {
    setFormData(prev => ({
      ...prev,
      highlights: [...prev.highlights, '']
    }));
  };

  const updateHighlight = (index, value) => {
    setFormData(prev => ({
      ...prev,
      highlights: prev.highlights.map((item, i) => i === index ? value : item)
    }));
  };

  const removeHighlight = (index) => {
    setFormData(prev => ({
      ...prev,
      highlights: prev.highlights.filter((_, i) => i !== index)
    }));
  };

  const PastTourCard = ({ tour }) => (
    <Card className="hover-scale transition-all duration-200">
      <CardContent className="p-6">
        <div className="flex items-start justify-between mb-4">
          <div className="flex-1">
            <h3 className="text-lg font-semibold text-gray-900 mb-1">{tour.title}</h3>
            <div className="flex items-center space-x-4 text-sm text-gray-600 mb-2">
              <span className="flex items-center">
                <Calendar className="h-4 w-4 mr-1" />
                {new Date(tour.date).toLocaleDateString()}
              </span>
              <span className="flex items-center">
                <MapPin className="h-4 w-4 mr-1" />
                {tour.location}
              </span>
            </div>
            <div className="flex items-center space-x-4 text-xs text-gray-500">
              <span className="flex items-center">
                <Users className="h-3 w-3 mr-1" />
                {tour.participants}/{tour.maxParticipants} participants
              </span>
              {tour.duration && (
                <span>{tour.duration}</span>
              )}
            </div>
          </div>
          <div className="flex flex-col items-end space-y-2">
            {tour.rating > 0 && (
              <div className="flex items-center">
                <Star className="h-4 w-4 text-yellow-400 fill-current mr-1" />
                <span className="text-sm font-medium">{tour.rating}</span>
              </div>
            )}
            <Badge variant="outline">
              Completed
            </Badge>
          </div>
        </div>

        {tour.description && (
          <p className="text-sm text-gray-600 mb-4 line-clamp-2">{tour.description}</p>
        )}

        {/* Highlights */}
        {tour.highlights && tour.highlights.length > 0 && (
          <div className="mb-4">
            <div className="flex flex-wrap gap-1">
              {tour.highlights.slice(0, 3).map((highlight, index) => (
                <Badge key={index} variant="secondary" className="text-xs">
                  {highlight}
                </Badge>
              ))}
              {tour.highlights.length > 3 && (
                <Badge variant="secondary" className="text-xs">
                  +{tour.highlights.length - 3} more
                </Badge>
              )}
            </div>
          </div>
        )}

        {/* Image Gallery Preview */}
        <div className="mb-4">
          {tour.images && tour.images.length > 0 ? (
            <div className="grid grid-cols-3 gap-2">
              {tour.images.slice(0, 3).map((image, index) => (
                <div key={index} className="aspect-square bg-gray-200 rounded-lg">
                  <img src={image} alt={`Tour ${index + 1}`} className="w-full h-full object-cover rounded-lg" />
                </div>
              ))}
              {tour.images.length > 3 && (
                <div className="aspect-square bg-gray-100 rounded-lg flex items-center justify-center">
                  <span className="text-xs text-gray-500">+{tour.images.length - 3}</span>
                </div>
              )}
            </div>
          ) : (
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center">
              <Camera className="h-6 w-6 mx-auto text-gray-400 mb-1" />
              <p className="text-xs text-gray-500">No photos uploaded</p>
            </div>
          )}
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Dialog>
              <DialogTrigger asChild>
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => setSelectedTour(tour)}
                >
                  <Eye className="h-4 w-4 mr-1" />
                  Details
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                  <DialogTitle>Past Tour Details</DialogTitle>
                  <DialogDescription>
                    Complete information for {tour.title}
                  </DialogDescription>
                </DialogHeader>
                {selectedTour && <TourDetails tour={selectedTour} />}
              </DialogContent>
            </Dialog>
            <Button variant="outline" size="sm">
              <Edit className="h-4 w-4 mr-1" />
              Edit
            </Button>
            <Button variant="outline" size="sm">
              <Upload className="h-4 w-4 mr-1" />
              Add Photos
            </Button>
          </div>
          <div className="flex items-center space-x-2">
            <Button variant="outline" size="sm">
              <Share2 className="h-4 w-4" />
            </Button>
            <Button 
              size="sm" 
              variant="destructive"
              onClick={() => handleDeleteTour(tour.id)}
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );

  const TourDetails = ({ tour }) => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-4">
          <div>
            <h4 className="font-medium text-gray-900 mb-2">Tour Information</h4>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">Title:</span>
                <span className="text-sm font-medium">{tour.title}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">Date:</span>
                <span className="text-sm font-medium">{new Date(tour.date).toLocaleDateString()}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">Location:</span>
                <span className="text-sm font-medium">{tour.location}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">Duration:</span>
                <span className="text-sm font-medium">{tour.duration || 'N/A'}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">Participants:</span>
                <span className="text-sm font-medium">{tour.participants}/{tour.maxParticipants}</span>
              </div>
            </div>
          </div>
          
          <div>
            <h4 className="font-medium text-gray-900 mb-2">Description</h4>
            <p className="text-sm text-gray-600">{tour.description || 'No description provided'}</p>
          </div>
        </div>

        <div className="space-y-4">
          <div>
            <h4 className="font-medium text-gray-900 mb-2">Performance</h4>
            <div className="space-y-2">
              {tour.rating > 0 ? (
                <div className="flex items-center space-x-2">
                  <Star className="h-5 w-5 text-yellow-400 fill-current" />
                  <span className="font-medium">{tour.rating}</span>
                  <span className="text-sm text-gray-500">Customer Rating</span>
                </div>
              ) : (
                <p className="text-sm text-gray-500">No rating available</p>
              )}
            </div>
          </div>

          {tour.highlights && tour.highlights.length > 0 && (
            <div>
              <h4 className="font-medium text-gray-900 mb-2">Tour Highlights</h4>
              <div className="space-y-1">
                {tour.highlights.map((highlight, index) => (
                  <div key={index} className="flex items-center text-sm text-gray-600">
                    <span className="h-2 w-2 bg-blue-600 rounded-full mr-2"></span>
                    {highlight}
                  </div>
                ))}
              </div>
            </div>
          )}

          {tour.feedback && (
            <div>
              <h4 className="font-medium text-gray-900 mb-2">Customer Feedback</h4>
              <blockquote className="text-sm text-gray-600 italic border-l-4 border-blue-500 pl-3">
                "{tour.feedback}"
              </blockquote>
            </div>
          )}
        </div>
      </div>

      <div>
        <h4 className="font-medium text-gray-900 mb-2">Tour Photos</h4>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {tour.images && tour.images.length > 0 ? (
            tour.images.map((image, index) => (
              <div key={index} className="aspect-square bg-gray-200 rounded-lg">
                <img src={image} alt={`Tour photo ${index + 1}`} className="w-full h-full object-cover rounded-lg" />
              </div>
            ))
          ) : (
            <div className="col-span-full p-8 border-2 border-dashed border-gray-300 rounded-lg text-center">
              <Camera className="h-8 w-8 mx-auto text-gray-400 mb-2" />
              <p className="text-sm text-gray-500">No photos uploaded</p>
              <Button variant="outline" size="sm" className="mt-2">
                <Upload className="h-4 w-4 mr-2" />
                Upload Photos
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );

  const stats = {
    totalTours: pastTours.length,
    totalParticipants: pastTours.reduce((sum, tour) => sum + tour.participants, 0),
    avgRating: pastTours.length > 0 ? (pastTours.reduce((sum, tour) => sum + (tour.rating || 0), 0) / pastTours.length).toFixed(1) : 0,
    thisMonth: pastTours.filter(tour => {
      const tourDate = new Date(tour.date);
      const now = new Date();
      return tourDate.getMonth() === now.getMonth() && tourDate.getFullYear() === now.getFullYear();
    }).length
  };

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Past Tours</h1>
          <p className="text-gray-600">Document and showcase your completed tour experiences</p>
        </div>
        <div className="flex items-center space-x-4">
          <Dialog open={isCreateModalOpen} onOpenChange={setIsCreateModalOpen}>
            <DialogTrigger asChild>
              <Button className="bg-blue-600 hover:bg-blue-700">
                <Plus className="h-4 w-4 mr-2" />
                Add Past Tour
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle>Document Past Tour</DialogTitle>
                <DialogDescription>
                  Add details about a completed tour experience
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="title">Tour Title *</Label>
                    <Input
                      id="title"
                      value={formData.title}
                      onChange={(e) => setFormData({...formData, title: e.target.value})}
                      placeholder="e.g., Miami Beach Sunset Photography"
                    />
                  </div>
                  <div>
                    <Label htmlFor="date">Tour Date *</Label>
                    <Input
                      id="date"
                      type="date"
                      value={formData.date}
                      onChange={(e) => setFormData({...formData, date: e.target.value})}
                    />
                  </div>
                </div>
                
                <div>
                  <Label htmlFor="location">Location *</Label>
                  <Input
                    id="location"
                    value={formData.location}
                    onChange={(e) => setFormData({...formData, location: e.target.value})}
                    placeholder="e.g., South Beach, Miami"
                  />
                </div>

                <div>
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    value={formData.description}
                    onChange={(e) => setFormData({...formData, description: e.target.value})}
                    placeholder="Describe what happened during this tour..."
                    rows={3}
                  />
                </div>

                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <Label htmlFor="participants">Participants</Label>
                    <Input
                      id="participants"
                      type="number"
                      value={formData.participants}
                      onChange={(e) => setFormData({...formData, participants: e.target.value})}
                      placeholder="8"
                    />
                  </div>
                  <div>
                    <Label htmlFor="maxParticipants">Max Capacity</Label>
                    <Input
                      id="maxParticipants"
                      type="number"
                      value={formData.maxParticipants}
                      onChange={(e) => setFormData({...formData, maxParticipants: e.target.value})}
                      placeholder="12"
                    />
                  </div>
                  <div>
                    <Label htmlFor="duration">Duration</Label>
                    <Input
                      id="duration"
                      value={formData.duration}
                      onChange={(e) => setFormData({...formData, duration: e.target.value})}
                      placeholder="3 hours"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="rating">Customer Rating (0-5)</Label>
                    <Input
                      id="rating"
                      type="number"
                      step="0.1"
                      min="0"
                      max="5"
                      value={formData.rating}
                      onChange={(e) => setFormData({...formData, rating: e.target.value})}
                      placeholder="4.8"
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="feedback">Customer Feedback</Label>
                  <Textarea
                    id="feedback"
                    value={formData.feedback}
                    onChange={(e) => setFormData({...formData, feedback: e.target.value})}
                    placeholder="What did customers say about this tour?"
                    rows={2}
                  />
                </div>

                <div>
                  <Label>Tour Highlights</Label>
                  <div className="space-y-2">
                    {formData.highlights.map((highlight, index) => (
                      <div key={index} className="flex items-center space-x-2">
                        <span className="h-2 w-2 bg-blue-600 rounded-full"></span>
                        <Input
                          value={highlight}
                          onChange={(e) => updateHighlight(index, e.target.value)}
                          placeholder={`Highlight ${index + 1}`}
                          className="flex-1"
                        />
                        {formData.highlights.length > 1 && (
                          <Button
                            type="button"
                            variant="outline"
                            size="sm"
                            onClick={() => removeHighlight(index)}
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
                      onClick={addHighlight}
                      className="w-full"
                    >
                      <Plus className="h-4 w-4 mr-2" />
                      Add Highlight
                    </Button>
                  </div>
                </div>

                <div className="flex justify-end space-x-2">
                  <Button variant="outline" onClick={() => setIsCreateModalOpen(false)}>
                    Cancel
                  </Button>
                  <Button onClick={handleCreateTour} className="bg-blue-600 hover:bg-blue-700">
                    Add Past Tour
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
                <p className="text-sm text-gray-600">Total Tours</p>
                <p className="text-2xl font-bold text-gray-900">{stats.totalTours}</p>
              </div>
              <MapPin className="h-8 w-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Total Participants</p>
                <p className="text-2xl font-bold text-green-600">{stats.totalParticipants}</p>
              </div>
              <Users className="h-8 w-8 text-green-600" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Avg. Rating</p>
                <p className="text-2xl font-bold text-yellow-600">{stats.avgRating}</p>
              </div>
              <Star className="h-8 w-8 text-yellow-600" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">This Month</p>
                <p className="text-2xl font-bold text-purple-600">{stats.thisMonth}</p>
              </div>
              <Calendar className="h-8 w-8 text-purple-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Tours Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
        {pastTours.map((tour) => (
          <PastTourCard key={tour.id} tour={tour} />
        ))}
      </div>

      {pastTours.length === 0 && (
        <Card>
          <CardContent className="p-12 text-center">
            <Camera className="h-12 w-12 mx-auto text-gray-400 mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No past tours documented</h3>
            <p className="text-gray-500 mb-4">
              Start documenting your completed tours to showcase your experience
            </p>
            <Button 
              onClick={() => setIsCreateModalOpen(true)}
              className="bg-blue-600 hover:bg-blue-700"
            >
              <Plus className="h-4 w-4 mr-2" />
              Add Your First Past Tour
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default PastTours;