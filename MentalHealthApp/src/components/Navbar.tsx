import { Link, useLocation } from 'react-router-dom';
import { Home, MessageCircle, Bot, Users, Stethoscope, User } from 'lucide-react';
import {useEffect, useState} from 'react';

const navItems = [
  { path: '/Home', icon: Home, label: 'Home' },
  { path: '/rooms', icon: MessageCircle, label: 'Rooms' },
  { path: '/chatbot', icon: Bot, label: 'Chatbot' },
  { path: '/community', icon: Users, label: 'Community' },
  { path: '/doctors', icon: Stethoscope, label: 'Doctors' },
  { path: '/userdashboard',icon: User, label: 'User' },
];

export function Navbar() {
  const location = useLocation();
   const [isDark, setIsDark] = useState(false);
   useEffect(() => {
    if (localStorage.getItem("theme") === "dark") {
      document.documentElement.classList.add("dark");
      setIsDark(true);
    }
  }, []);

  const toggleTheme = () => {
    if (isDark) {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
      setIsDark(false);
    } else {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
      setIsDark(true);
    }
  };


  return (
    <nav className="bg-card border-b border-border sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/Home" className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                <MessageCircle className="w-5 h-5 text-primary-foreground" />
              </div>
              <span className="text-xl font-semibold">MindCare</span>
            </Link>
          </div>
          
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center space-x-1 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                  location.pathname === item.path
                    ? 'bg-primary text-primary-foreground'
                    : 'text-muted-foreground hover:text-foreground hover:bg-accent'
                }`}
              >
                <item.icon className="w-4 h-4" />
                <span>{item.label}</span>
              </Link>
            ))}
          </div>
          
          {/* Mobile menu */}
          <div className="md:hidden flex items-center space-x-1">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`p-2 rounded-md transition-colors ${
                  location.pathname === item.path
                    ? 'bg-primary text-primary-foreground'
                    : 'text-muted-foreground hover:text-foreground hover:bg-accent'
                }`}
              >
                <item.icon className="w-5 h-5" />
              </Link>
            ))}
              
          </div>
            <button
        onClick={toggleTheme}
        className="ml-4 mt-2 mb-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors
bg-primary text-primary-foreground hover:bg-primary/80 w-auto
"
      >
        {isDark ? "🌙 Dark" : "☀️ Light"}
      </button>
        </div>
      </div>
    </nav>
  );
}