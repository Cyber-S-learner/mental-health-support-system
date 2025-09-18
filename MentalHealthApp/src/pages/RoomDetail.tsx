import { useParams, Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Progress } from '../components/ui/progress';
import { Badge } from '../components/ui/badge';
import { Checkbox } from '../components/ui/checkbox';
import { ArrowLeft, Calendar, CheckCircle, Circle, Lock } from 'lucide-react';
import { mentalHealthRooms } from '../data/mockData';
import { getRoomProgress, markModuleComplete, isModuleComplete } from '../utils/progressUtils';

export function RoomDetail() {
  const { roomId } = useParams<{ roomId: string }>();
  const [selectedModule, setSelectedModule] = useState<number | null>(null);
  const [moduleProgress, setModuleProgress] = useState<{ [key: number]: boolean }>({});
  
  const room = mentalHealthRooms.find(r => r.id === roomId);
  
  useEffect(() => {
    if (room && roomId) {
      const progress: { [key: number]: boolean } = {};
      room.modules.forEach(module => {
        progress[module.id] = isModuleComplete(roomId, module.id);
      });
      setModuleProgress(progress);
    }
  }, [room, roomId]);

  if (!room) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center">
          <h1 className="text-2xl mb-4">Room not found</h1>
          <Link to="/rooms">
            <Button>Back to Rooms</Button>
          </Link>
        </div>
      </div>
    );
  }

  const progress = getRoomProgress(room.id, room.modules.length);
  const completedModules = Object.values(moduleProgress).filter(Boolean).length;

  const handleModuleComplete = (moduleId: number) => {
    if (roomId) {
      markModuleComplete(roomId, moduleId);
      setModuleProgress(prev => ({ ...prev, [moduleId]: true }));
    }
  };

  const getModuleStatus = (moduleIndex: number, moduleId: number) => {
    if (moduleProgress[moduleId]) return 'completed';
    if (moduleIndex === 0) return 'available';
    
    // Module is available if previous module is completed
    const prevModuleId = room.modules[moduleIndex - 1].id;
    return moduleProgress[prevModuleId] ? 'available' : 'locked';
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="mb-8">
        <Link to="/rooms" className="inline-flex items-center text-muted-foreground hover:text-foreground mb-4">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Rooms
        </Link>
        
        <div className="flex items-start space-x-6">
          <div className={`w-20 h-20 rounded-2xl ${room.color} flex items-center justify-center text-white text-3xl`}>
            {room.icon}
          </div>
          <div className="flex-1">
            <h1 className="text-3xl mb-2">{room.title}</h1>
            <p className="text-muted-foreground mb-4">{room.description}</p>
            
            <div className="flex items-center space-x-6 text-sm text-muted-foreground">
              <div className="flex items-center space-x-1">
                <Calendar className="w-4 h-4" />
                <span>7-day program</span>
              </div>
              <div className="flex items-center space-x-1">
                <CheckCircle className="w-4 h-4" />
                <span>{completedModules}/{room.modules.length} completed</span>
              </div>
            </div>
            
            <div className="mt-4">
              <div className="flex justify-between text-sm mb-2">
                <span>Overall Progress</span>
                <span>{progress}%</span>
              </div>
              <Progress value={progress} className="w-full" />
            </div>
          </div>
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Module List */}
        <div className="lg:col-span-1">
          <Card>
            <CardHeader>
              <CardTitle>Daily Modules</CardTitle>
              <CardDescription>Complete one module per day</CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
              {room.modules.map((module, index) => {
                const status = getModuleStatus(index, module.id);
                const isSelected = selectedModule === module.id;
                
                return (
                  <div
                    key={module.id}
                    className={`p-3 rounded-lg border cursor-pointer transition-colors ${
                      isSelected ? 'border-primary bg-primary/5' : 'hover:bg-accent'
                    } ${status === 'locked' ? 'opacity-50 cursor-not-allowed' : ''}`}
                    onClick={() => status !== 'locked' && setSelectedModule(module.id)}
                  >
                    <div className="flex items-center space-x-3">
                      <div className="flex-shrink-0">
                        {status === 'completed' && (
                          <CheckCircle className="w-5 h-5 text-green-500" />
                        )}
                        {status === 'available' && (
                          <Circle className="w-5 h-5 text-muted-foreground" />
                        )}
                        {status === 'locked' && (
                          <Lock className="w-5 h-5 text-muted-foreground" />
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center space-x-2">
                          <Badge variant="outline" className="text-xs">
                            Day {module.day}
                          </Badge>
                          {status === 'completed' && (
                            <Badge variant="secondary" className="text-xs">
                              Complete
                            </Badge>
                          )}
                        </div>
                        <p className="font-medium text-sm mt-1">{module.title}</p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </CardContent>
          </Card>
        </div>

        {/* Module Content */}
        <div className="lg:col-span-2">
          {selectedModule ? (
            (() => {
              const module = room.modules.find(m => m.id === selectedModule);
              const status = getModuleStatus(room.modules.findIndex(m => m.id === selectedModule), selectedModule);
              
              if (!module) return null;
              
              return (
                <Card>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <Badge variant="outline">Day {module.day}</Badge>
                      {status === 'completed' && (
                        <Badge variant="secondary">Completed</Badge>
                      )}
                    </div>
                    <CardTitle>{module.title}</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div>
                      <h3 className="font-medium mb-3">Content</h3>
                      <p className="text-muted-foreground leading-relaxed">
                        {module.content}
                      </p>
                    </div>
                    
                    <div>
                      <h3 className="font-medium mb-3">Today's Activities</h3>
                      <div className="space-y-2">
                        {module.activities.map((activity, index) => (
                          <div key={index} className="flex items-center space-x-2">
                            <Checkbox 
                              id={`activity-${index}`}
                              disabled={status === 'completed'}
                            
                              defaultChecked={status === 'completed'}
                              
                            />
                            <label 
                              htmlFor={`activity-${index}`}
                              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                            >
                              {activity}
                            </label>
                          </div>
                        ))}
                      </div>
                    </div>
                    
                    {status !== 'completed' && (
                      <div className="pt-4">
                        <Button 
                          onClick={() => handleModuleComplete(module.id)}
                          className="w-full"
                        >
                          Mark as Complete
                        </Button>
                      </div>
                    )}
                    
                    {status === 'completed' && (
                      <div className="pt-4 text-center">
                        <div className="inline-flex items-center space-x-2 text-green-600 bg-green-50 px-4 py-2 rounded-full">
                          <CheckCircle className="w-4 h-4" />
                          <span className="text-sm font-medium">Module Completed!</span>
                        </div>
                      </div>
                    )}
                  </CardContent>
                </Card>
              );
            })()
          ) : (
            <Card>
              <CardContent className="py-12 text-center">
                <Circle className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-medium mb-2">Select a Module</h3>
                <p className="text-muted-foreground">
                  Choose a module from the left to begin your daily activity.
                </p>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}