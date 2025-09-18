import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Navbar } from './components/Navbar';
import { Dashboard } from './pages/Dashboard';
import { Rooms } from './pages/Rooms';
import { RoomDetail } from './pages/RoomDetail';
import { Chatbot } from './pages/Chatbot';
import { Community } from './pages/Community';
import { Doctors } from './pages/Doctors';
import LoginPage from './components/login';
import SignupPage from './components/signup';
import UserDashboard from './components/userdashboard';
import {useState} from "react";

export default function App() {

  const [userProgress] = useState<{ [key: string]: number }>({
    depression: 25,
    anxiety: 60,
    stress: 10,
    sleep: 0,
  });

  const [completedModules] = useState<{ [key: string]: number[] }>({
    depression: [1, 2, 3],
    anxiety: [1, 2, 3, 4, 5, 6, 7, 8],
    stress: [1],
    sleep: [],
  });
  return (
    <Router>
      <div className="min-h-screen bg-background">
        <Navbar />
        <main>
          <Routes>
            <Route path='/' element={<LoginPage/>}/>
            <Route path='/signup' element={<SignupPage/> }/>
            <Route path="/Home" element={<Dashboard />} />
            <Route path="/rooms" element={<Rooms />} />
            <Route path="/rooms/:roomId" element={<RoomDetail />} />
            <Route path="/chatbot" element={<Chatbot />} />
            <Route path="/community" element={<Community />} />
            <Route path="/doctors" element={<Doctors />} />
            
             <Route
              path="/userdashboard"
              element={
                <UserDashboard
                  userProgress={userProgress}
                  completedModules={completedModules}
                />
              }
            />
          </Routes>
        </main>
      </div>
    </Router>
  );
}