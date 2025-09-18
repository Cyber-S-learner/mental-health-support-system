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

export default function App() {
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
            <Route path='/userdashboard' element={<UserDashboard/>}/>
          </Routes>
        </main>
      </div>
    </Router>
  );
}