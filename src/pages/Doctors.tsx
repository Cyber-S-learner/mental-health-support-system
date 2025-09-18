import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Badge } from '../components/ui/badge';
import { Avatar, AvatarFallback } from '../components/ui/avatar';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select';
import { Search, Star, MapPin, Clock, Phone, Mail, Calendar } from 'lucide-react';
import { doctors } from '../data/mockData';

export function Doctors() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSpecialty, setSelectedSpecialty] = useState('all');
  const [sortBy, setSortBy] = useState('rating');

  const specialties = [
    'all',
    'Anxiety & Panic Disorders',
    'Depression & Mood Disorders',
    'Stress & Trauma Therapy',
    'Mindfulness & Meditation',
    'Family & Relationship Therapy',
    'Addiction & Recovery',
  ];

  const filteredDoctors = doctors
    .filter(doctor => {
      const matchesSearch = doctor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           doctor.specialization.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesSpecialty = selectedSpecialty === 'all' || doctor.specialization === selectedSpecialty;
      return matchesSearch && matchesSpecialty;
    })
    .sort((a, b) => {
      if (sortBy === 'rating') return b.rating - a.rating;
      if (sortBy === 'experience') return parseInt(b.experience) - parseInt(a.experience);
      return a.name.localeCompare(b.name);
    });

  const handleBookAppointment = (doctorName: string) => {
    alert(`Booking appointment with ${doctorName}. In a real app, this would open a booking form or redirect to a scheduling system.`);
  };

  const handleContactDoctor = (doctorName: string) => {
    alert(`Contacting ${doctorName}. In a real app, this would open a contact form or messaging system.`);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-3xl mb-2">Find Mental Health Professionals</h1>
        <p className="text-muted-foreground">
          Connect with licensed therapists and counselors who can provide personalized support for your mental health journey.
        </p>
      </div>

      {/* Search and Filters */}
      <Card className="mb-8">
        <CardContent className="pt-6">
          <div className="grid md:grid-cols-4 gap-4">
            <div className="md:col-span-2">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                <Input
                  placeholder="Search by name or specialization..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            
            <Select value={selectedSpecialty} onValueChange={setSelectedSpecialty}>
              <SelectTrigger>
                <SelectValue placeholder="Specialization" />
              </SelectTrigger>
              <SelectContent>
                {specialties.map(specialty => (
                  <SelectItem key={specialty} value={specialty}>
                    {specialty === 'all' ? 'All Specializations' : specialty}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            
            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger>
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="rating">Rating</SelectItem>
                <SelectItem value="experience">Experience</SelectItem>
                <SelectItem value="name">Name</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Results Count */}
      <div className="mb-6">
        <p className="text-muted-foreground">
          Found {filteredDoctors.length} mental health professional{filteredDoctors.length !== 1 ? 's' : ''}
        </p>
      </div>

      {/* Doctor Cards */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredDoctors.map((doctor) => (
          <Card key={doctor.id} className="h-full flex flex-col">
            <CardHeader>
              <div className="flex items-start space-x-4">
                <Avatar className="w-16 h-16">
                  <AvatarFallback>{doctor.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                </Avatar>
                <div className="flex-1 min-w-0">
                  <CardTitle className="text-lg">{doctor.name}</CardTitle>
                  <CardDescription className="text-sm font-medium text-primary">
                    {doctor.specialization}
                  </CardDescription>
                  
                  <div className="flex items-center space-x-4 mt-2 text-sm text-muted-foreground">
                    <div className="flex items-center space-x-1">
                      <Star className="w-4 h-4 fill-current text-yellow-500" />
                      <span>{doctor.rating}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Clock className="w-4 h-4" />
                      <span>{doctor.experience}</span>
                    </div>
                  </div>
                </div>
              </div>
            </CardHeader>
            
            <CardContent className="flex-1 flex flex-col justify-between">
              <div className="space-y-4 mb-6">
                <p className="text-sm text-muted-foreground">
                  {doctor.description}
                </p>
                
                <div className="space-y-2">
                  <Badge variant="secondary" className="text-xs">
                    Licensed Professional
                  </Badge>
                  <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                    <MapPin className="w-4 h-4" />
                    <span>Available for online sessions</span>
                  </div>
                </div>

                <div className="space-y-1 text-sm">
                  <div className="flex items-center space-x-2 text-muted-foreground">
                    <Calendar className="w-4 h-4" />
                    <span>Next available: Today</span>
                  </div>
                  <div className="flex items-center space-x-2 text-muted-foreground">
                    <Clock className="w-4 h-4" />
                    <span>45-60 min sessions</span>
                  </div>
                </div>
              </div>
              
              <div className="space-y-2">
                <Button 
                  className="w-full"
                  onClick={() => handleBookAppointment(doctor.name)}
                >
                  <Calendar className="w-4 h-4 mr-2" />
                  Book Appointment
                </Button>
                <div className="grid grid-cols-2 gap-2">
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => handleContactDoctor(doctor.name)}
                  >
                    <Mail className="w-4 h-4 mr-1" />
                    Message
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => handleContactDoctor(doctor.name)}
                  >
                    <Phone className="w-4 h-4 mr-1" />
                    Call
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredDoctors.length === 0 && (
        <Card>
          <CardContent className="py-12 text-center">
            <Search className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-medium mb-2">No professionals found</h3>
            <p className="text-muted-foreground">
              Try adjusting your search criteria or filters to find more results.
            </p>
          </CardContent>
        </Card>
      )}

      {/* Emergency Support */}
      <Card className="mt-12 border-red-200 bg-red-50">
        <CardHeader>
          <CardTitle className="text-red-800">Emergency Support</CardTitle>
          <CardDescription className="text-red-700">
            If you're experiencing a mental health emergency or having thoughts of self-harm, please seek immediate help.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-3 gap-4 text-sm">
            <div className="bg-white p-4 rounded-lg">
              <h4 className="font-medium mb-2">Crisis Text Line</h4>
              <p className="text-muted-foreground mb-2">Text HOME to 741741</p>
              <p className="text-xs text-muted-foreground">24/7 crisis support via text</p>
            </div>
            <div className="bg-white p-4 rounded-lg">
              <h4 className="font-medium mb-2">National Suicide Prevention Lifeline</h4>
              <p className="text-muted-foreground mb-2">988</p>
              <p className="text-xs text-muted-foreground">24/7 phone support</p>
            </div>
            <div className="bg-white p-4 rounded-lg">
              <h4 className="font-medium mb-2">Emergency Services</h4>
              <p className="text-muted-foreground mb-2">911</p>
              <p className="text-xs text-muted-foreground">For immediate emergencies</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}