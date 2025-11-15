import { motion } from 'framer-motion';
import { Map, Package, TrendingUp, Clock } from 'lucide-react';
import { Card } from '../ui/card';
import { Button } from '../ui/button';

export default function RecyclerHome() {
  const stats = {
    sacksCollected: 125,
    wasteCollected: '2.5 tons',
    efficiency: '92%',
    avgTime: '15 min',
  };

  return (
    <div className="space-y-6 pb-20">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="space-y-4"
      >
        <h1 className="text-3xl font-bold text-slate-900">Recycler Dashboard</h1>
        <p className="text-slate-600">Optimize your collection routes and operations</p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
      >
        <Card className="p-6 bg-gradient-to-br from-teal-500 to-emerald-600 text-white border-0 shadow-lg">
          <div className="flex items-center justify-between mb-6">
            <div>
              <p className="text-teal-100 text-sm mb-1">Quick Action</p>
              <h2 className="text-2xl font-bold">View Sack Map</h2>
            </div>
            <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center">
              <Map className="w-8 h-8" />
            </div>
          </div>
          <Button className="w-full bg-white text-teal-600 hover:bg-teal-50" size="lg">
            Open Map
            <Map className="ml-2 w-4 h-4" />
          </Button>
        </Card>
      </motion.div>

      <div className="grid grid-cols-2 gap-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <Card className="p-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-teal-100 rounded-lg flex items-center justify-center">
                <Package className="w-6 h-6 text-teal-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-slate-900">{stats.sacksCollected}</p>
                <p className="text-xs text-slate-500">Sacks Collected</p>
              </div>
            </div>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <Card className="p-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-emerald-100 rounded-lg flex items-center justify-center">
                <TrendingUp className="w-6 h-6 text-emerald-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-slate-900">{stats.wasteCollected}</p>
                <p className="text-xs text-slate-500">Waste Collected</p>
              </div>
            </div>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <Card className="p-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <TrendingUp className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-slate-900">{stats.efficiency}</p>
                <p className="text-xs text-slate-500">Efficiency</p>
              </div>
            </div>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <Card className="p-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                <Clock className="w-6 h-6 text-purple-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-slate-900">{stats.avgTime}</p>
                <p className="text-xs text-slate-500">Avg. Time</p>
              </div>
            </div>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}

