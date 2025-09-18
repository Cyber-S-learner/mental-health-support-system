import { Link } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Progress } from '../components/ui/progress';
import { Badge } from '../components/ui/badge';
import { Clock, Users, Star } from 'lucide-react';
import { mentalHealthRooms } from '../data/mockData';
import { getRoomProgress } from '../utils/progressUtils';

export function Rooms() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-3xl mb-2">Mental Health Programs</h1>
        <p className="text-muted-foreground">
          Choose from our evidence-based 7-day programs designed to support your mental health journey.
        </p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {mentalHealthRooms.map((room) => {
          const progress = getRoomProgress(room.id, room.modules.length);
          const isStarted = progress > 0;
          
          return (
            <Card key={room.id} className="h-full flex flex-col">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className={`w-16 h-16 rounded-xl ${room.color} flex items-center justify-center text-white text-2xl mb-4`}>
                    {room.icon}
                  </div>
                  {isStarted && (
                    <Badge variant="secondary" className="ml-2">
                      In Progress
                    </Badge>
                  )}
                </div>
                <CardTitle className="text-xl">{room.title}</CardTitle>
                <CardDescription className="text-sm">
                  {room.description}
                </CardDescription>
              </CardHeader>
              
              <CardContent className="flex-1 flex flex-col justify-between">
                <div className="space-y-4 mb-6">
                  <div className="flex items-center justify-between text-sm text-muted-foreground">
                    <div className="flex items-center space-x-1">
                      <Clock className="w-4 h-4" />
                      <span>7 days</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Users className="w-4 h-4" />
                      <span>1.2k participants</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Star className="w-4 h-4 fill-current text-yellow-500" />
                      <span>4.8</span>
                    </div>
                  </div>
                  
                  {isStarted && (
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Progress</span>
                        <span>{progress}%</span>
                      </div>
                      <Progress value={progress} />
                    </div>
                  )}
                  
                  <div className="text-sm">
                    <h4 className="font-medium mb-2">What you'll learn:</h4>
                    <ul className="space-y-1 text-muted-foreground">
                      <li>• Understanding the condition</li>
                      <li>• Practical coping strategies</li>
                      <li>• Building healthy habits</li>
                      <li>• Long-term management</li>
                    </ul>
                  </div>
                </div>
                
                <Link to={`/rooms/${room.id}`} className="w-full">
                  <Button className="w-full">
                    {isStarted ? 'Continue Program' : 'Start Program'}
                  </Button>
                </Link>
              </CardContent>
            </Card>
          );
        })}
      </div>
      
      <div className="mt-12 text-center">
        <Card className="max-w-2xl mx-auto">
          <CardHeader>
            <CardTitle>Need Personalized Support?</CardTitle>
            <CardDescription>
              Our programs are designed to complement professional help, not replace it.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Link to="/doctors">
              <Button variant="outline" size="lg">
                Find a Mental Health Professional
              </Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}