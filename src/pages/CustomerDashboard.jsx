import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useAuth } from '../context/AuthContext';
import { signOutUser, getCurrentUser, getUserData } from '../services/authService';
import { 
  Home, MapPin, Gift, History, User, LogOut, QrCode
} from 'lucide-react';
import { Button } from '../components/ui/button';
import { Card } from '../components/ui/card';
import CustomerHome from '../components/customer/CustomerHome';
import CustomerQRCode from '../components/customer/CustomerQRCode';
import CustomerMap from '../components/customer/CustomerMap';
import CustomerRewards from '../components/customer/CustomerRewards';
import CustomerHistory from '../components/customer/CustomerHistory';
import CustomerProfile from '../components/customer/CustomerProfile';

const menuItems = [
  { id: 'home', label: 'Home', icon: Home },
  { id: 'qr', label: 'QR Code', icon: QrCode },
  { id: 'map', label: 'Map', icon: MapPin },
  { id: 'rewards', label: 'Rewards', icon: Gift },
  { id: 'history', label: 'History', icon: History },
  { id: 'profile', label: 'Profile', icon: User },
];

export default function CustomerDashboard() {
  const { currentUser, loading } = useAuth();
  const [activeTab, setActiveTab] = useState('home');
  const [userData, setUserData] = useState(null);
  const [points, setPoints] = useState(0);
  const [bottlesRecycled, setBottlesRecycled] = useState(0);
  const [co2Saved, setCo2Saved] = useState(0);

  useEffect(() => {
    if (currentUser?.user) {
      loadUserData();
    }
  }, [currentUser]);

  const loadUserData = async () => {
    if (currentUser?.user) {
      try {
        // Load user data from Firestore
        const userDataFromFirestore = await getUserData(currentUser.user.uid);
        if (userDataFromFirestore) {
          setUserData(userDataFromFirestore);
        }
        // For now, using mock data for stats
        setPoints(1250);
        setBottlesRecycled(250);
        setCo2Saved(12.5);
      } catch (error) {
        console.error('Error loading user data:', error);
      }
    }
  };

  const handleLogout = async () => {
    try {
      await signOutUser();
      window.location.href = '/';
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  const renderContent = () => {
    if (loading) {
      return (
        <div className="flex items-center justify-center min-h-[400px]">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-600"></div>
        </div>
      );
    }

    if (!currentUser?.user) {
      return (
        <div className="flex items-center justify-center min-h-[400px]">
          <p className="text-slate-500">Please log in to continue.</p>
        </div>
      );
    }

    switch (activeTab) {
      case 'home':
        return <CustomerHome points={points} bottlesRecycled={bottlesRecycled} co2Saved={co2Saved} />;
      case 'qr':
        return <CustomerQRCode userId={currentUser.user.uid} />;
      case 'map':
        return <CustomerMap />;
      case 'rewards':
        return <CustomerRewards points={points} setPoints={setPoints} />;
      case 'history':
        return <CustomerHistory />;
      case 'profile':
        return <CustomerProfile userData={userData} />;
      default:
        return <CustomerHome points={points} bottlesRecycled={bottlesRecycled} co2Saved={co2Saved} />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-emerald-50/30">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-md border-b border-slate-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-3">
              <img src="/logo1.png" alt="GREENCYCLE" className="h-10 w-auto" />
              <span className="text-xl font-bold text-slate-900">GREENCYCLE</span>
            </div>
            <Button
              variant="ghost"
              onClick={handleLogout}
              className="flex items-center gap-2"
            >
              <LogOut className="w-4 h-4" />
              Logout
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {renderContent()}
      </div>

      {/* Bottom Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 bg-white/90 backdrop-blur-md border-t border-slate-200 z-50">
        <div className="max-w-7xl mx-auto px-2 sm:px-4">
          <div className="flex items-center justify-around h-14 sm:h-16">
            {menuItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <motion.button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className={`flex flex-col items-center gap-0.5 sm:gap-1 px-2 sm:px-4 py-1.5 sm:py-2 rounded-lg transition-colors relative ${
                    isActive
                      ? 'text-emerald-600'
                      : 'text-slate-500 hover:text-slate-700'
                  }`}
                  whileTap={{ scale: 0.95 }}
                >
                  <Icon className={`w-4 h-4 sm:w-5 sm:h-5 ${isActive ? 'text-emerald-600' : ''}`} />
                  <span className="text-[10px] sm:text-xs font-medium leading-tight">{item.label}</span>
                  {isActive && (
                    <motion.div
                      className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1 h-1 bg-emerald-600 rounded-full"
                      layoutId="activeTab"
                    />
                  )}
                </motion.button>
              );
            })}
          </div>
        </div>
      </nav>
    </div>
  );
}

