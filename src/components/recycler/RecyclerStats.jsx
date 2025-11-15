import { motion } from 'framer-motion';
import { Package, TrendingUp, MapPin, Clock } from 'lucide-react';
import { Card } from '../ui/card';

export default function RecyclerStats() {
  const stats = {
    wasteCollected: '2.5 tons',
    sacksCollected: 125,
    bestArea: 'Algiers Centre',
    avgTime: '15 minutes',
    efficiency: '92%',
  };

  return (
    <div className="space-y-6 pb-20">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="space-y-4"
      >
        <h1 className="text-3xl font-bold text-slate-900">Statistics & Reports</h1>
        <p className="text-slate-600">Track your collection performance</p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <Card className="p-6">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-16 h-16 bg-teal-100 rounded-xl flex items-center justify-center">
                <Package className="w-8 h-8 text-teal-600" />
              </div>
              <div>
                <p className="text-3xl font-bold text-slate-900">{stats.wasteCollected}</p>
                <p className="text-sm text-slate-500">Waste Collected</p>
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
              <div className="w-16 h-16 bg-emerald-100 rounded-xl flex items-center justify-center">
                <Package className="w-8 h-8 text-emerald-600" />
              </div>
              <div>
                <p className="text-3xl font-bold text-slate-900">{stats.sacksCollected}</p>
                <p className="text-sm text-slate-500">Sacks Collected</p>
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
              <div className="w-16 h-16 bg-blue-100 rounded-xl flex items-center justify-center">
                <MapPin className="w-8 h-8 text-blue-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-slate-900">{stats.bestArea}</p>
                <p className="text-sm text-slate-500">Best Performing Area</p>
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
                <Clock className="w-8 h-8 text-purple-600" />
              </div>
              <div>
                <p className="text-3xl font-bold text-slate-900">{stats.avgTime}</p>
                <p className="text-sm text-slate-500">Avg. Collection Time</p>
              </div>
            </div>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="md:col-span-2"
        >
          <Card className="p-6">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 bg-amber-100 rounded-xl flex items-center justify-center">
                <TrendingUp className="w-8 h-8 text-amber-600" />
              </div>
              <div>
                <p className="text-3xl font-bold text-slate-900">{stats.efficiency}</p>
                <p className="text-sm text-slate-500">Collection Efficiency</p>
              </div>
            </div>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}

