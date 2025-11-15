import { motion } from 'framer-motion';
import { Users, Package, TrendingUp, Award } from 'lucide-react';
import { Card } from '../ui/card';

export default function SuperetteStats() {
  const stats = {
    customersServed: 45,
    bottlesCollected: 1250,
    pointsGiven: 6250,
    loyaltyScore: 8.5,
  };

  return (
    <div className="space-y-6 pb-20">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="space-y-4"
      >
        <h1 className="text-3xl font-bold text-slate-900">Statistics</h1>
        <p className="text-slate-600">Track your shop's performance</p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <Card className="p-6">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-16 h-16 bg-cyan-100 rounded-xl flex items-center justify-center">
                <Users className="w-8 h-8 text-cyan-600" />
              </div>
              <div>
                <p className="text-3xl font-bold text-slate-900">{stats.customersServed}</p>
                <p className="text-sm text-slate-500">Customers Served</p>
              </div>
            </div>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <Card className="p-6">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-16 h-16 bg-blue-100 rounded-xl flex items-center justify-center">
                <Package className="w-8 h-8 text-blue-600" />
              </div>
              <div>
                <p className="text-3xl font-bold text-slate-900">{stats.bottlesCollected}</p>
                <p className="text-sm text-slate-500">Bottles Collected</p>
              </div>
            </div>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <Card className="p-6">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-16 h-16 bg-emerald-100 rounded-xl flex items-center justify-center">
                <TrendingUp className="w-8 h-8 text-emerald-600" />
              </div>
              <div>
                <p className="text-3xl font-bold text-slate-900">{stats.pointsGiven}</p>
                <p className="text-sm text-slate-500">Total Points Given</p>
              </div>
            </div>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <Card className="p-6">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-16 h-16 bg-purple-100 rounded-xl flex items-center justify-center">
                <Award className="w-8 h-8 text-purple-600" />
              </div>
              <div>
                <p className="text-3xl font-bold text-slate-900">{stats.loyaltyScore}/10</p>
                <p className="text-sm text-slate-500">Customer Loyalty Score</p>
              </div>
            </div>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}

