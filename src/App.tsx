import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Navbar } from './components/Navbar';
import { Dashboard } from './pages/Dashboard';
import { Rooms } from './pages/Rooms';
import { RoomDetail } from './pages/RoomDetail';
import { Chatbot } from './pages/Chatbot';
import { Community } from './pages/Community';
import { Doctors } from './pages/Doctors';

export default function App() {
  return (
    <Router>
      <div className="min-h-screen bg-background">
        <Navbar />
        <main>
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/rooms" element={<Rooms />} />
            <Route path="/rooms/:roomId" element={<RoomDetail />} />
            <Route path="/chatbot" element={<Chatbot />} />
            <Route path="/community" element={<Community />} />
            <Route path="/doctors" element={<Doctors />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}