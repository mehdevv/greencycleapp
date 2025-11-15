import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useAuth } from '../context/AuthContext';
import { signOutUser, getUserData } from '../services/authService';
import { 
  Shield, LogOut, CheckCircle2, XCircle, Package, Store, 
  Users, TrendingUp, AlertCircle, RefreshCw
} from 'lucide-react';
import { Button } from '../components/ui/button';
import { Card } from '../components/ui/card';
import { collection, query, where, getDocs, updateDoc, doc } from 'firebase/firestore';
import { db } from '../config/firebase';

export default function AdminDashboard() {
  const { currentUser } = useAuth();
  const [pendingSuperettes, setPendingSuperettes] = useState([]);
  const [pendingRecyclers, setPendingRecyclers] = useState([]);
  const [recyclingPoints, setRecyclingPoints] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('superettes');

  useEffect(() => {
    if (currentUser?.user) {
      loadPendingData();
    }
  }, [currentUser]);

  const loadPendingData = async () => {
    setLoading(true);
    try {
      // Load all superettes (users with role 'superette')
      const superettesQuery = query(
        collection(db, 'users'),
        where('role', '==', 'superette')
      );
      const superettesSnapshot = await getDocs(superettesQuery);
      const superettes = superettesSnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      // Filter to show only unapproved or pending superettes
      setPendingSuperettes(superettes.filter(s => !s.approved && !s.rejected));

      // Load all recyclers
      const recyclersQuery = query(
        collection(db, 'users'),
        where('role', '==', 'recycler')
      );
      const recyclersSnapshot = await getDocs(recyclersQuery);
      const recyclers = recyclersSnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      // Filter to show only unapproved or pending recyclers
      setPendingRecyclers(recyclers.filter(r => !r.approved && !r.rejected));

      // Load recycling points (deposits that need approval)
      // This would come from a 'deposits' or 'transactions' collection
      setRecyclingPoints([]);
    } catch (error) {
      console.error('Error loading pending data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleApprove = async (userId, type) => {
    try {
      const userRef = doc(db, 'users', userId);
      await updateDoc(userRef, {
        approved: true,
        approvedAt: new Date(),
        approvedBy: currentUser.user.uid
      });
      
      if (type === 'superette') {
        setPendingSuperettes(prev => prev.filter(s => s.id !== userId));
      } else if (type === 'recycler') {
        setPendingRecyclers(prev => prev.filter(r => r.id !== userId));
      }
    } catch (error) {
      console.error('Error approving user:', error);
      alert('Error approving user. Please try again.');
    }
  };

  const handleReject = async (userId, type) => {
    if (!confirm('Are you sure you want to reject this user?')) return;
    
    try {
      const userRef = doc(db, 'users', userId);
      await updateDoc(userRef, {
        approved: false,
        rejected: true,
        rejectedAt: new Date(),
        rejectedBy: currentUser.user.uid
      });
      
      if (type === 'superette') {
        setPendingSuperettes(prev => prev.filter(s => s.id !== userId));
      } else if (type === 'recycler') {
        setPendingRecyclers(prev => prev.filter(r => r.id !== userId));
      }
    } catch (error) {
      console.error('Error rejecting user:', error);
      alert('Error rejecting user. Please try again.');
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

  const tabs = [
    { id: 'superettes', label: 'Superettes', icon: Store, count: pendingSuperettes.length },
    { id: 'recyclers', label: 'Recyclers', icon: Package, count: pendingRecyclers.length },
    { id: 'points', label: 'Recycling Points', icon: TrendingUp, count: recyclingPoints.length },
  ];

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-slate-50 via-white to-emerald-50/30">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-md border-b border-slate-200 fixed top-0 left-0 right-0 z-50 w-full">
        <div className="w-full px-3 sm:px-4 md:px-6 lg:max-w-7xl lg:mx-auto lg:px-8">
          <div className="flex items-center justify-between h-14 sm:h-16">
            <div className="flex items-center gap-2 sm:gap-3">
              <img src="/logo1.png" alt="GREENCYCLE" className="h-8 sm:h-10 w-auto" />
              <div className="flex items-center gap-1.5 sm:gap-2">
                <Shield className="w-4 h-4 sm:w-5 sm:h-5 text-emerald-600" />
                <span className="text-base sm:text-xl font-bold text-slate-900">Admin</span>
              </div>
            </div>
            <Button variant="ghost" onClick={handleLogout} className="flex items-center gap-1.5 sm:gap-2 h-8 sm:h-10 px-2 sm:px-4">
              <LogOut className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
              <span className="hidden sm:inline">Logout</span>
            </Button>
          </div>
        </div>
      </header>

      {/* Tabs */}
      <div className="bg-white border-b border-slate-200 fixed top-14 sm:top-16 left-0 right-0 z-40 w-full">
        <div className="w-full px-3 sm:px-4 md:px-6 lg:max-w-7xl lg:mx-auto lg:px-8">
          <div className="flex gap-2 sm:gap-4 overflow-x-auto">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-2.5 sm:py-3 border-b-2 transition-colors whitespace-nowrap ${
                    isActive
                      ? 'border-emerald-600 text-emerald-600'
                      : 'border-transparent text-slate-500 hover:text-slate-700'
                  }`}
                >
                  <Icon className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                  <span className="font-medium text-sm sm:text-base">{tab.label}</span>
                  {tab.count > 0 && (
                    <span className={`px-1.5 sm:px-2 py-0.5 rounded-full text-xs font-semibold ${
                      isActive ? 'bg-emerald-100 text-emerald-700' : 'bg-slate-100 text-slate-600'
                    }`}>
                      {tab.count}
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="w-full px-3 sm:px-4 md:px-6 lg:max-w-7xl lg:mx-auto lg:px-8 py-4 sm:py-6 md:py-8 pt-32 sm:pt-36">
        {loading ? (
          <div className="flex items-center justify-center min-h-[400px]">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-600"></div>
          </div>
        ) : (
          <>
            {activeTab === 'superettes' && (
              <div className="space-y-3 sm:space-y-4">
                <div className="flex items-center justify-between gap-2">
                  <h2 className="text-lg sm:text-xl md:text-2xl font-bold text-slate-900">Pending Superettes</h2>
                  <Button variant="outline" size="sm" onClick={loadPendingData} className="h-8 sm:h-9 px-2 sm:px-3">
                    <RefreshCw className="w-3.5 h-3.5 sm:w-4 sm:h-4 sm:mr-2" />
                    <span className="hidden sm:inline">Refresh</span>
                  </Button>
                </div>
                {pendingSuperettes.length === 0 ? (
                  <Card className="p-6 sm:p-8 text-center">
                    <CheckCircle2 className="w-10 h-10 sm:w-12 sm:h-12 text-emerald-600 mx-auto mb-3 sm:mb-4" />
                    <p className="text-sm sm:text-base text-slate-600">No pending superettes to review</p>
                  </Card>
                ) : (
                  <div className="grid gap-3 sm:gap-4">
                    {pendingSuperettes.map((superette) => (
                      <Card key={superette.id} className="p-4 sm:p-6">
                        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3 sm:gap-4">
                          <div className="flex-1 min-w-0">
                            <h3 className="text-base sm:text-lg font-semibold text-slate-900 mb-2 break-words">
                              {superette.registreCommerce || 'N/A'}
                            </h3>
                            <div className="space-y-1 text-xs sm:text-sm text-slate-600">
                              <p><strong>Email:</strong> <span className="break-all">{superette.email}</span></p>
                              <p><strong>Address:</strong> {superette.address || 'N/A'}</p>
                              <p><strong>Wilaya:</strong> {superette.wilaya || 'N/A'}</p>
                              <p><strong>Commune:</strong> {superette.commune || 'N/A'}</p>
                              {superette.googleMapsLocation && (
                                <p>
                                  <strong>Location:</strong>{' '}
                                  <a href={superette.googleMapsLocation} target="_blank" rel="noopener noreferrer" className="text-emerald-600 hover:underline break-all">
                                    View on Maps
                                  </a>
                                </p>
                              )}
                            </div>
                          </div>
                          <div className="flex gap-2 sm:ml-4 flex-shrink-0">
                            <Button
                              onClick={() => handleApprove(superette.id, 'superette')}
                              className="bg-emerald-600 hover:bg-emerald-700 text-white h-9 sm:h-10 px-3 sm:px-4 text-sm"
                            >
                              <CheckCircle2 className="w-3.5 h-3.5 sm:w-4 sm:h-4 sm:mr-2" />
                              <span className="hidden sm:inline">Approve</span>
                            </Button>
                            <Button
                              onClick={() => handleReject(superette.id, 'superette')}
                              variant="destructive"
                              className="h-9 sm:h-10 px-3 sm:px-4 text-sm"
                            >
                              <XCircle className="w-3.5 h-3.5 sm:w-4 sm:h-4 sm:mr-2" />
                              <span className="hidden sm:inline">Reject</span>
                            </Button>
                          </div>
                        </div>
                      </Card>
                    ))}
                  </div>
                )}
              </div>
            )}

            {activeTab === 'recyclers' && (
              <div className="space-y-3 sm:space-y-4">
                <div className="flex items-center justify-between gap-2">
                  <h2 className="text-lg sm:text-xl md:text-2xl font-bold text-slate-900">Pending Recyclers</h2>
                  <Button variant="outline" size="sm" onClick={loadPendingData} className="h-8 sm:h-9 px-2 sm:px-3">
                    <RefreshCw className="w-3.5 h-3.5 sm:w-4 sm:h-4 sm:mr-2" />
                    <span className="hidden sm:inline">Refresh</span>
                  </Button>
                </div>
                {pendingRecyclers.length === 0 ? (
                  <Card className="p-6 sm:p-8 text-center">
                    <CheckCircle2 className="w-10 h-10 sm:w-12 sm:h-12 text-emerald-600 mx-auto mb-3 sm:mb-4" />
                    <p className="text-sm sm:text-base text-slate-600">No pending recyclers to review</p>
                  </Card>
                ) : (
                  <div className="grid gap-3 sm:gap-4">
                    {pendingRecyclers.map((recycler) => (
                      <Card key={recycler.id} className="p-4 sm:p-6">
                        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3 sm:gap-4">
                          <div className="flex-1 min-w-0">
                            <h3 className="text-base sm:text-lg font-semibold text-slate-900 mb-2 break-words">
                              {recycler.registreCommerce || 'N/A'}
                            </h3>
                            <div className="space-y-1 text-xs sm:text-sm text-slate-600">
                              <p><strong>Email:</strong> <span className="break-all">{recycler.email}</span></p>
                              <p><strong>NIF:</strong> {recycler.nif || 'N/A'}</p>
                              <p><strong>Address:</strong> {recycler.address || 'N/A'}</p>
                              <p><strong>Wilaya:</strong> {recycler.wilaya || 'N/A'}</p>
                              <p><strong>Commune:</strong> {recycler.commune || 'N/A'}</p>
                              {recycler.googleMapsLocation && (
                                <p>
                                  <strong>Location:</strong>{' '}
                                  <a href={recycler.googleMapsLocation} target="_blank" rel="noopener noreferrer" className="text-emerald-600 hover:underline break-all">
                                    View on Maps
                                  </a>
                                </p>
                              )}
                            </div>
                          </div>
                          <div className="flex gap-2 sm:ml-4 flex-shrink-0">
                            <Button
                              onClick={() => handleApprove(recycler.id, 'recycler')}
                              className="bg-emerald-600 hover:bg-emerald-700 text-white h-9 sm:h-10 px-3 sm:px-4 text-sm"
                            >
                              <CheckCircle2 className="w-3.5 h-3.5 sm:w-4 sm:h-4 sm:mr-2" />
                              <span className="hidden sm:inline">Approve</span>
                            </Button>
                            <Button
                              onClick={() => handleReject(recycler.id, 'recycler')}
                              variant="destructive"
                              className="h-9 sm:h-10 px-3 sm:px-4 text-sm"
                            >
                              <XCircle className="w-3.5 h-3.5 sm:w-4 sm:h-4 sm:mr-2" />
                              <span className="hidden sm:inline">Reject</span>
                            </Button>
                          </div>
                        </div>
                      </Card>
                    ))}
                  </div>
                )}
              </div>
            )}

            {activeTab === 'points' && (
              <div className="space-y-3 sm:space-y-4">
                <div className="flex items-center justify-between gap-2">
                  <h2 className="text-lg sm:text-xl md:text-2xl font-bold text-slate-900">Recycling Points</h2>
                  <Button variant="outline" size="sm" onClick={loadPendingData} className="h-8 sm:h-9 px-2 sm:px-3">
                    <RefreshCw className="w-3.5 h-3.5 sm:w-4 sm:h-4 sm:mr-2" />
                    <span className="hidden sm:inline">Refresh</span>
                  </Button>
                </div>
                <Card className="p-6 sm:p-8 text-center">
                  <AlertCircle className="w-10 h-10 sm:w-12 sm:h-12 text-slate-400 mx-auto mb-3 sm:mb-4" />
                  <p className="text-sm sm:text-base text-slate-600">Recycling points management coming soon</p>
                </Card>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}

