import { useState } from 'react';
import { motion } from 'framer-motion';
import { Gift, Plus, Edit, Trash2 } from 'lucide-react';
import { Card } from '../ui/card';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';

export default function SuperetteRewards() {
  const [rewards, setRewards] = useState([
    { id: 1, name: '5 DA Discount', type: 'discount', points: 50 },
    { id: 2, name: '1 Free Product', type: 'free', points: 100 },
  ]);
  const [showAddForm, setShowAddForm] = useState(false);
  const [newReward, setNewReward] = useState({ name: '', type: 'discount', points: '' });

  const handleAddReward = () => {
    if (newReward.name && newReward.points) {
      setRewards([...rewards, {
        id: rewards.length + 1,
        ...newReward,
        points: parseInt(newReward.points),
      }]);
      setNewReward({ name: '', type: 'discount', points: '' });
      setShowAddForm(false);
    }
  };

  return (
    <div className="space-y-6 pb-20">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center justify-between"
      >
        <div>
          <h1 className="text-3xl font-bold text-slate-900">My Rewards</h1>
          <p className="text-slate-600">Manage rewards offered to customers</p>
        </div>
        <Button
          onClick={() => setShowAddForm(!showAddForm)}
          className="bg-cyan-600 hover:bg-cyan-700 text-white"
        >
          <Plus className="w-4 h-4 mr-2" />
          Add Reward
        </Button>
      </motion.div>

      {showAddForm && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
        >
          <Card className="p-6">
            <div className="space-y-4">
              <div className="space-y-2">
                <Label>Reward Name</Label>
                <Input
                  placeholder="e.g., 5 DA Discount"
                  value={newReward.name}
                  onChange={(e) => setNewReward({ ...newReward, name: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label>Reward Type</Label>
                <select
                  className="w-full h-9 px-3 rounded-md border border-input bg-input-background"
                  value={newReward.type}
                  onChange={(e) => setNewReward({ ...newReward, type: e.target.value })}
                >
                  <option value="discount">Discount</option>
                  <option value="free">Free Product</option>
                  <option value="special">Special Offer</option>
                </select>
              </div>
              <div className="space-y-2">
                <Label>Points Required</Label>
                <Input
                  type="number"
                  placeholder="50"
                  value={newReward.points}
                  onChange={(e) => setNewReward({ ...newReward, points: e.target.value })}
                />
              </div>
              <div className="flex gap-2">
                <Button
                  onClick={handleAddReward}
                  className="bg-cyan-600 hover:bg-cyan-700 text-white"
                >
                  Add Reward
                </Button>
                <Button
                  variant="outline"
                  onClick={() => setShowAddForm(false)}
                >
                  Cancel
                </Button>
              </div>
            </div>
          </Card>
        </motion.div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {rewards.map((reward, index) => (
          <motion.div
            key={reward.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Card className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-cyan-100 rounded-lg flex items-center justify-center">
                    <Gift className="w-6 h-6 text-cyan-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-slate-900">{reward.name}</h3>
                    <p className="text-sm text-slate-500">{reward.points} points</p>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button variant="ghost" size="sm">
                    <Edit className="w-4 h-4" />
                  </Button>
                  <Button variant="ghost" size="sm">
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

