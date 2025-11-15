import { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Smartphone, Store, Truck, ArrowRight, ArrowLeft } from 'lucide-react';
import { useAuth } from './context/AuthContext';
import { LoginForm } from './components/LoginForm';
import { SignUpForm } from './components/SignUpForm';
import WelcomePage from './components/WelcomePage';
import { Card } from './components/ui/card';
import { Button } from './components/ui/button';
import CustomerDashboard from './pages/CustomerDashboard';
import SuperetteDashboard from './pages/SuperetteDashboard';
import RecyclerDashboard from './pages/RecyclerDashboard';
import AdminDashboard from './pages/AdminDashboard';
import AdminLogin from './components/AdminLogin';

const userTypes = [
  {
    id: 'customer',
    icon: Smartphone,
    title: 'Customer',
    subtitle: 'Citizens & Recyclers',
    description: 'Earn points by depositing bottles and cans',
    gradient: 'from-emerald-500 to-teal-600',
    hoverGradient: 'from-emerald-400 to-teal-500',
  },
  {
    id: 'superette',
    icon: Store,
    title: 'Superette',
    subtitle: 'Partner Shops & Retailers',
    description: 'Manage customer deposits and rewards',
    gradient: 'from-cyan-500 to-blue-600',
    hoverGradient: 'from-cyan-400 to-blue-500',
  },
  {
    id: 'recycler',
    icon: Truck,
    title: 'Recycler',
    subtitle: 'Recycling Centers & Logistics',
    description: 'Optimize collection routes and operations',
    gradient: 'from-teal-500 to-emerald-600',
    hoverGradient: 'from-teal-400 to-emerald-500',
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 20, scale: 0.95 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      type: 'spring',
      stiffness: 100,
      damping: 15,
    },
  },
  hover: {
    y: -8,
    scale: 1.02,
    transition: {
      type: 'spring',
      stiffness: 400,
      damping: 17,
    },
  },
};

const headerVariants = {
  hidden: { opacity: 0, y: -20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: 'spring',
      stiffness: 100,
      damping: 15,
    },
  },
};

// Protected Route Component
function ProtectedRoute({ children, requiredRole }) {
  const { currentUser, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-emerald-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-slate-600">Loading...</p>
        </div>
      </div>
    );
  }

  if (!currentUser) {
    return <Navigate to="/" replace />;
  }

  if (currentUser.role !== requiredRole) {
    return <Navigate to="/" replace />;
  }

  // Check if superette or recycler is approved
  if ((requiredRole === 'superette' || requiredRole === 'recycler') && !currentUser.approved) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 via-white to-emerald-50/30 p-4">
        <div className="max-w-md w-full bg-white border-2 border-slate-200 rounded-lg shadow-xl p-6 sm:p-8 text-center">
          <div className="w-16 h-16 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
          </div>
          <h2 className="text-xl sm:text-2xl font-bold text-slate-900 mb-2">Account Pending Approval</h2>
          <p className="text-slate-600 mb-4">
            Your {requiredRole === 'superette' ? 'superette' : 'recycling center'} account is currently under review by our admin team.
          </p>
          <p className="text-sm text-slate-500 mb-6">
            You will be able to access your dashboard once your account has been approved. This usually takes 24-48 hours.
          </p>
          <button
            onClick={() => {
              window.location.href = '/';
            }}
            className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-semibold py-2 px-4 rounded-lg transition-colors"
          >
            Return to Home
          </button>
        </div>
      </div>
    );
  }

  return children;
}

// Landing Page Component
function LandingPage() {
  const [showWelcome, setShowWelcome] = useState(true);
  const [selectedUserType, setSelectedUserType] = useState(null);
  const [isSignUp, setIsSignUp] = useState(false);
  const [highlightedRole, setHighlightedRole] = useState(null);

  useEffect(() => {
    const handleSwitchToSignUp = (event) => {
      setIsSignUp(true);
    };

    const handleSwitchToLogin = (event) => {
      setIsSignUp(false);
    };

    window.addEventListener('switchToSignUp', handleSwitchToSignUp);
    window.addEventListener('switchToLogin', handleSwitchToLogin);
    return () => {
      window.removeEventListener('switchToSignUp', handleSwitchToSignUp);
      window.removeEventListener('switchToLogin', handleSwitchToLogin);
    };
  }, []);

  const handleBack = () => {
    setSelectedUserType(null);
    setIsSignUp(false);
    setHighlightedRole(null);
  };

  const handleWelcomeNext = () => {
    setShowWelcome(false);
  };

  const handleRoleSelect = (roleId) => {
    setHighlightedRole(roleId);
  };

  const handleContinue = () => {
    if (highlightedRole) {
      setSelectedUserType(highlightedRole);
    }
  };

  const handleSignUpSuccess = (result) => {
    setIsSignUp(false);
    alert('Account created successfully! Please login with your credentials.');
  };

  if (showWelcome) {
    return <WelcomePage onNext={handleWelcomeNext} />;
  }

  if (selectedUserType) {
    return (
      <AnimatePresence mode="wait">
        {isSignUp ? (
          <motion.div
            key={`signup-${selectedUserType}`}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
          >
            <SignUpForm 
              userType={selectedUserType} 
              onBack={handleBack}
              onSuccess={handleSignUpSuccess}
            />
          </motion.div>
        ) : (
          <motion.div
            key={`login-${selectedUserType}`}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
          >
            <LoginForm 
              userType={selectedUserType} 
              onBack={handleBack}
            />
          </motion.div>
        )}
      </AnimatePresence>
    );
  }

  return (
    <motion.div
      key="selection"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      className="h-screen bg-gradient-to-br from-emerald-50 via-white to-teal-50 flex flex-col relative overflow-hidden"
    >
      {/* Decorative Frame */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <img 
          src="/Green Recycling Harmony.png" 
          alt="Decorative Frame" 
          className="w-full h-full object-cover opacity-40 md:opacity-50"
          style={{ mixBlendMode: 'multiply' }}
        />
      </div>

      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
        <motion.div
          className="absolute top-20 left-10 w-72 h-72 bg-emerald-200/20 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
            x: [0, 50, 0],
            y: [0, 30, 0],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute bottom-20 right-10 w-96 h-96 bg-teal-200/20 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.3, 1],
            x: [0, -50, 0],
            y: [0, -30, 0],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      </div>

      {/* Header */}
      <motion.div
        variants={headerVariants}
        initial="hidden"
        animate="visible"
        className="relative z-10 flex-shrink-0 pt-4 md:pt-8 pb-3 md:pb-6"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Back Button */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
            className="mb-3 md:mb-6"
          >
            <Button
              onClick={() => {
                setShowWelcome(true);
                setHighlightedRole(null);
              }}
              className="bg-white border-2 border-slate-200 shadow-xl hover:shadow-2xl hover:border-emerald-300 text-slate-700 hover:text-slate-900 text-sm md:text-base transition-all duration-300"
              size="sm"
            >
              <ArrowLeft className="w-3 h-3 md:w-4 md:h-4 mr-1.5 md:mr-2" />
              Back
            </Button>
          </motion.div>

          <div className="text-center">
            <motion.div
              initial={{ opacity: 0, y: 20, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{
                type: 'spring',
                stiffness: 200,
                damping: 15,
                delay: 0.2,
              }}
              className="mb-2 md:mb-4"
            >
              <img src="/logo1.png" alt="GREENCYCLE" className="h-12 md:h-20 w-auto mx-auto mb-1 md:mb-2" />
            </motion.div>
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="text-2xl md:text-5xl font-bold text-slate-900 mb-1 md:mb-3"
            >
              Choose Your <span className="text-emerald-600">Role</span>
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="text-sm md:text-base text-slate-600 max-w-2xl mx-auto font-light"
            >
              Select the account type that best describes you
            </motion.p>
          </div>
        </div>
      </motion.div>

      {/* User Type Selection */}
      <div className="relative z-10 max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 py-2 md:py-4 flex-1 flex flex-col items-center justify-start overflow-hidden">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid md:grid-cols-3 gap-3 md:gap-6 w-full max-w-5xl mb-3 md:mb-6 mt-2 md:mt-4"
        >
          {userTypes.map((type, index) => {
            const Icon = type.icon;
            const isSelected = highlightedRole === type.id;
            return (
              <motion.div
                key={type.id}
                variants={cardVariants}
                initial="hidden"
                animate="visible"
                whileHover="hover"
                className="h-full"
              >
                <Card
                  className={`relative h-full bg-white border-2 shadow-xl cursor-pointer group overflow-hidden transition-all duration-300 flex flex-col ${
                    isSelected 
                      ? `border-emerald-500 shadow-2xl ring-4 ring-emerald-200/50 scale-105` 
                      : 'border-slate-200 hover:border-emerald-300 hover:shadow-2xl'
                  }`}
                  onClick={() => handleRoleSelect(type.id)}
                >
                  {/* Gradient background when selected */}
                  <motion.div
                    className={`absolute inset-0 bg-gradient-to-br ${type.gradient} transition-opacity duration-300 ${
                      isSelected ? 'opacity-15' : 'opacity-0 group-hover:opacity-10'
                    }`}
                  />
                  
                  <div className="relative p-4 md:p-6 space-y-3 md:space-y-4 flex flex-col h-full justify-between">
                    {/* Icon */}
                    <motion.div
                      className={`w-12 h-12 md:w-16 md:h-16 bg-gradient-to-br ${type.gradient} rounded-xl md:rounded-2xl flex items-center justify-center shadow-lg transition-transform duration-300 mx-auto ${
                        isSelected ? 'scale-110' : 'group-hover:scale-110'
                      }`}
                      whileHover={{ rotate: [0, -10, 10, -10, 0] }}
                      transition={{ duration: 0.5 }}
                    >
                      <Icon className="w-6 h-6 md:w-8 md:h-8 text-white" />
                    </motion.div>

                    {/* Title */}
                    <div className="space-y-1.5 md:space-y-2 text-center flex-grow flex flex-col justify-center">
                      <h3 className={`text-lg md:text-xl tracking-tight font-bold transition-colors ${
                        isSelected ? 'text-emerald-600' : 'text-slate-900 group-hover:text-emerald-600'
                      }`}>
                        {type.title}
                      </h3>
                      <p className="text-slate-500 tracking-wide uppercase text-[10px] md:text-xs font-semibold">
                        {type.subtitle}
                      </p>
                      <p className="text-slate-600 text-xs md:text-sm mt-1.5 md:mt-2 leading-tight md:leading-relaxed">
                        {type.description}
                      </p>
                    </div>

                    {/* Selection Indicator */}
                    {isSelected && (
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        className="flex items-center justify-center text-emerald-600 font-medium"
                      >
                        <motion.div
                          animate={{ scale: [1, 1.2, 1] }}
                          transition={{ duration: 1, repeat: Infinity }}
                          className="w-2.5 h-2.5 md:w-3 md:h-3 bg-emerald-600 rounded-full mr-1.5 md:mr-2"
                        />
                        <span className="text-xs md:text-sm">Selected</span>
                      </motion.div>
                    )}
                  </div>
                </Card>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Continue Button */}
        <AnimatePresence>
          {highlightedRole && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              transition={{ duration: 0.3 }}
            >
              <Button
                onClick={handleContinue}
                size="lg"
                className="bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white px-6 md:px-10 py-3 md:py-6 text-sm md:text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
              >
                Continue
                <ArrowRight className="w-3 h-3 md:w-5 md:h-5 ml-2" />
              </Button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}

function App() {
  const { currentUser } = useAuth();

  return (
    <BrowserRouter>
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-emerald-50/30">
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route
            path="/dashboard/customer"
            element={
              <ProtectedRoute requiredRole="customer">
                <CustomerDashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/dashboard/superette"
            element={
              <ProtectedRoute requiredRole="superette">
                <SuperetteDashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/dashboard/recycler"
            element={
              <ProtectedRoute requiredRole="recycler">
                <RecyclerDashboard />
              </ProtectedRoute>
            }
          />
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route
            path="/admin"
            element={
              <ProtectedRoute requiredRole="admin">
                <AdminDashboard />
              </ProtectedRoute>
            }
          />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
