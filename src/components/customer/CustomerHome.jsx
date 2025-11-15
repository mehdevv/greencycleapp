import { motion } from 'framer-motion';
import { TrendingUp, Leaf, Sparkles, ArrowRight, MapPin, Gift } from 'lucide-react';
import { Button } from '../ui/button';
import { Card } from '../ui/card';

export default function CustomerHome({ points, bottlesRecycled, co2Saved }) {
  return (
    <div className="space-y-6 pb-20">
      {/* Welcome Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="space-y-4"
      >
        <h1 className="text-3xl font-bold text-slate-900">Welcome Back! 👋</h1>
        <p className="text-slate-600">Keep recycling and earning rewards</p>
      </motion.div>

      {/* Points Card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
      >
        <Card className="bg-gradient-to-br from-emerald-500 to-teal-600 text-white p-6 border-0 shadow-lg">
          <div className="flex items-center justify-between mb-4">
            <div>
              <p className="text-emerald-100 text-sm mb-1">Your Points</p>
              <h2 className="text-4xl font-bold">{points.toLocaleString()}</h2>
            </div>
            <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center">
              <Sparkles className="w-8 h-8" />
            </div>
          </div>
          <Button
            className="w-full bg-white text-emerald-600 hover:bg-emerald-50"
            size="lg"
          >
            Deposit Now
            <ArrowRight className="ml-2 w-4 h-4" />
          </Button>
        </Card>
      </motion.div>

      {/* Impact Stats */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="grid grid-cols-2 gap-4"
      >
        <Card className="p-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-emerald-100 rounded-lg flex items-center justify-center">
              <Leaf className="w-6 h-6 text-emerald-600" />
            </div>
            <div>
              <p className="text-2xl font-bold text-slate-900">{bottlesRecycled}</p>
              <p className="text-xs text-slate-500">Bottles Recycled</p>
            </div>
          </div>
        </Card>
        <Card className="p-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-teal-100 rounded-lg flex items-center justify-center">
              <TrendingUp className="w-6 h-6 text-teal-600" />
            </div>
            <div>
              <p className="text-2xl font-bold text-slate-900">{co2Saved} kg</p>
              <p className="text-xs text-slate-500">CO₂ Saved</p>
            </div>
          </div>
        </Card>
      </motion.div>

      {/* Quick Actions */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="space-y-3"
      >
        <h3 className="text-lg font-semibold text-slate-900">Quick Actions</h3>
        <div className="grid grid-cols-2 gap-4">
          <Card className="p-4 cursor-pointer hover:shadow-md transition-shadow">
            <div className="flex flex-col items-center gap-2">
              <div className="w-12 h-12 bg-cyan-100 rounded-lg flex items-center justify-center">
                <MapPin className="w-6 h-6 text-cyan-600" />
              </div>
              <p className="text-sm font-medium text-slate-900">Find Partners</p>
            </div>
          </Card>
          <Card className="p-4 cursor-pointer hover:shadow-md transition-shadow">
            <div className="flex flex-col items-center gap-2">
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                <Gift className="w-6 h-6 text-purple-600" />
              </div>
              <p className="text-sm font-medium text-slate-900">Redeem Rewards</p>
            </div>
          </Card>
        </div>
      </motion.div>

      {/* Promotions */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
      >
        <Card className="p-4 bg-gradient-to-r from-purple-500 to-pink-500 text-white border-0">
          <div className="flex items-center justify-between">
            <div>
              <p className="font-semibold mb-1">Special Bonus! 🎉</p>
              <p className="text-sm text-white/90">Get 2x points this week</p>
            </div>
            <Sparkles className="w-8 h-8" />
          </div>
        </Card>
      </motion.div>
    </div>
  );
}

