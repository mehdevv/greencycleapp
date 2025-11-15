import { motion } from 'framer-motion';
import { User, Mail, Phone, Edit } from 'lucide-react';
import { Card } from '../ui/card';
import { Button } from '../ui/button';

export default function CustomerProfile({ userData }) {
  // Use actual user data from Firestore, with fallbacks
  const profileData = {
    firstName: userData?.firstName || 'N/A',
    lastName: userData?.lastName || 'N/A',
    email: userData?.email || 'N/A',
    phoneNumber: userData?.phoneNumber || 'N/A',
  };

  // Show loading state if userData is not yet loaded
  if (!userData) {
    return (
      <div className="space-y-6 pb-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-4"
        >
          <div>
            <h1 className="text-3xl font-bold text-slate-900">Profile</h1>
            <p className="text-slate-600">Manage your personal information</p>
          </div>
        </motion.div>
        <div className="flex items-center justify-center min-h-[400px]">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-600"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6 pb-20">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="space-y-4"
      >
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-slate-900">Profile</h1>
            <p className="text-slate-600">Manage your personal information</p>
          </div>
          <Button variant="outline" size="sm">
            <Edit className="w-4 h-4 mr-2" />
            Edit
          </Button>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
      >
        <Card className="p-6">
          <div className="flex flex-col items-center mb-6">
            <div className="w-24 h-24 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-full flex items-center justify-center mb-4">
              <User className="w-12 h-12 text-white" />
            </div>
            <h2 className="text-2xl font-bold text-slate-900">
              {profileData.firstName} {profileData.lastName}
            </h2>
            <p className="text-slate-600">Customer Account</p>
          </div>

          <div className="space-y-4">
            <div className="flex items-center gap-4 p-4 bg-slate-50 rounded-lg">
              <Mail className="w-5 h-5 text-slate-400" />
              <div>
                <p className="text-sm text-slate-500">Email</p>
                <p className="font-medium text-slate-900">{profileData.email}</p>
              </div>
            </div>

            <div className="flex items-center gap-4 p-4 bg-slate-50 rounded-lg">
              <Phone className="w-5 h-5 text-slate-400" />
              <div>
                <p className="text-sm text-slate-500">Phone Number</p>
                <p className="font-medium text-slate-900">{profileData.phoneNumber}</p>
              </div>
            </div>
          </div>
        </Card>
      </motion.div>
    </div>
  );
}

