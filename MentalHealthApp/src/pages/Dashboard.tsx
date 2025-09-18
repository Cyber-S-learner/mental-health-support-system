import { Link } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Progress } from '../components/ui/progress';
import { MessageCircle, Bot, Users, Stethoscope, TrendingUp } from 'lucide-react';
import { mentalHealthRooms } from '../data/mockData';
import { getRoomProgress } from '../utils/progressUtils';
import UserDashboard from '../components/userdashboard';

export function Dashboard() {
  const quickStats = [
    { label: 'Programs Joined', value: '3', icon: MessageCircle, color: 'text-blue-500' },
    { label: 'Days Active', value: '12', icon: TrendingUp, color: 'text-green-500' },
    { label: 'Community Posts', value: '8', icon: Users, color: 'text-purple-500' },
    { label: 'Chat Sessions', value: '15', icon: Bot, color: 'text-orange-500' },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Welcome Section */}
      <div className="mb-8">
        <h1 className="text-3xl mb-2">Welcome back to MindCare! 👋</h1>
        <p className="text-muted-foreground">
          Your mental health journey continues. Take a moment to check in with yourself today.
        </p>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        {quickStats.map((stat) => (
          <Card key={stat.label}>
            <CardContent className="p-4">
              <div className="flex items-center space-x-2">
                <stat.icon className={`w-5 h-5 ${stat.color}`} />
                <div>
                  <p className="text-2xl font-semibold">{stat.value}</p>
                  <p className="text-sm text-muted-foreground">{stat.label}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Navigation Cards */}
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <Link to="/rooms">
          <Card className="h-full hover:shadow-lg transition-shadow cursor-pointer">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <MessageCircle className="w-5 h-5 text-blue-500" />
                <span>Therapy Rooms</span>
              </CardTitle>
              <CardDescription>
                Join guided 7-day programs for different mental health topics
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button className="w-full">Explore Rooms</Button>
            </CardContent>
          </Card>
        </Link>

        <Link to="/chatbot">
          <Card className="h-full hover:shadow-lg transition-shadow cursor-pointer">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Bot className="w-5 h-5 text-green-500" />
                <span>AI Chatbot</span>
              </CardTitle>
              <CardDescription>
                Get instant support and motivation from our AI companion
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button className="w-full" variant="secondary">Start Chat</Button>
            </CardContent>
          </Card>
        </Link>

        <Link to="/community">
          <Card className="h-full hover:shadow-lg transition-shadow cursor-pointer">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Users className="w-5 h-5 text-purple-500" />
                <span>Community</span>
              </CardTitle>
              <CardDescription>
                Connect with others on similar mental health journeys
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button className="w-full" variant="secondary">Join Community</Button>
            </CardContent>
          </Card>
        </Link>

        <Link to="/doctors">
          <Card className="h-full hover:shadow-lg transition-shadow cursor-pointer">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Stethoscope className="w-5 h-5 text-red-500" />
                <span>Find Doctors</span>
              </CardTitle>
              <CardDescription>
                Connect with licensed mental health professionals
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button className="w-full" variant="secondary">Browse Doctors</Button>
            </CardContent>
          </Card>
        </Link>
      </div>

      {/* Current Progress */}
      <Card>
        <CardHeader>
          <CardTitle>Your Current Programs</CardTitle>
          <CardDescription>
            Continue your mental health journey with these active programs
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {mentalHealthRooms.slice(0, 3).map((room) => {
              const progress = getRoomProgress(room.id, room.modules.length);
              return (
                <div key={room.id} className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex items-center space-x-4">
                    <div className={`w-12 h-12 rounded-lg ${room.color} flex items-center justify-center text-white text-xl`}>
                      {room.icon}
                    </div>
                    <div>
                      <h3 className="font-medium">{room.title}</h3>
                      <p className="text-sm text-muted-foreground">{progress}% Complete</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4">
                    <Progress value={progress} className="w-24" />
                    <Link to={`/rooms/${room.id}`}>
                      <Button size="sm">Continue</Button>
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        </CardContent>
        
      </Card>
      
    </div>
  );
}