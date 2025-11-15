import { useState } from 'react';
import { motion } from 'framer-motion';
import { useAuth } from '../context/AuthContext';
import { signOutUser } from '../services/authService';
import { 
  Map, ScanLine, BarChart3, LogOut, Home, Package
} from 'lucide-react';
import { Button } from '../components/ui/button';
import RecyclerMap from '../components/recycler/RecyclerMap';
import RecyclerScan from '../components/recycler/RecyclerScan';
import RecyclerStats from '../components/recycler/RecyclerStats';
import RecyclerHome from '../components/recycler/RecyclerHome';

const menuItems = [
  { id: 'home', label: 'Home', icon: Home },
  { id: 'map', label: 'Sack Map', icon: Map },
  { id: 'scan', label: 'Scan Sack', icon: ScanLine },
  { id: 'stats', label: 'Statistics', icon: BarChart3 },
];

export default function RecyclerDashboard() {
  const { currentUser } = useAuth();
  const [activeTab, setActiveTab] = useState('home');

  const handleLogout = async () => {
    try {
      await signOutUser();
      window.location.href = '/';
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'home':
        return <RecyclerHome />;
      case 'map':
        return <RecyclerMap />;
      case 'scan':
        return <RecyclerScan />;
      case 'stats':
        return <RecyclerStats />;
      default:
        return <RecyclerHome />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-teal-50/30">
      <header className="bg-white/80 backdrop-blur-md border-b border-slate-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-3">
              <img src="/logo1.png" alt="GREENCYCLE" className="h-10 w-auto" />
              <span className="text-xl font-bold text-slate-900">GREENCYCLE</span>
            </div>
            <Button variant="ghost" onClick={handleLogout} className="flex items-center gap-2">
              <LogOut className="w-4 h-4" />
              Logout
            </Button>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {renderContent()}
      </div>

      <nav className="fixed bottom-0 left-0 right-0 bg-white/90 backdrop-blur-md border-t border-slate-200 z-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-around h-16">
            {menuItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <motion.button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className={`flex flex-col items-center gap-1 px-4 py-2 rounded-lg transition-colors ${
                    isActive ? 'text-teal-600' : 'text-slate-500 hover:text-slate-700'
                  }`}
                  whileTap={{ scale: 0.95 }}
                >
                  <Icon className={`w-5 h-5 ${isActive ? 'text-teal-600' : ''}`} />
                  <span className="text-xs font-medium">{item.label}</span>
                </motion.button>
              );
            })}
          </div>
        </div>
      </nav>
    </div>
  );
}

