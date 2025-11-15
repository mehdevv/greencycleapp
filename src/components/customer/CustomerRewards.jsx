import { useState } from 'react';
import { motion } from 'framer-motion';
import { Gift, Sparkles, CheckCircle2, Star } from 'lucide-react';
import { Card } from '../ui/card';
import { Button } from '../ui/button';

export default function CustomerRewards({ points, setPoints }) {
  const [redeemedRewards, setRedeemedRewards] = useState([]);

  const rewards = [
    {
      id: 1,
      name: '5 DA Discount',
      points: 50,
      type: 'discount',
      description: 'Get 5 DA off your next purchase',
      icon: '💰',
    },
    {
      id: 2,
      name: 'Free Product',
      points: 100,
      type: 'free',
      description: 'Choose any product under 200 DA',
      icon: '🎁',
    },
    {
      id: 3,
      name: 'Sponsor Gift',
      points: 500,
      type: 'gift',
      description: 'Exclusive sponsor merchandise',
      icon: '⭐',
    },
    {
      id: 4,
      name: 'Digital Badge',
      points: 200,
      type: 'badge',
      description: 'Eco Warrior Badge',
      icon: '🏆',
    },
  ];

  const handleRedeem = (reward) => {
    if (points >= reward.points && !redeemedRewards.includes(reward.id)) {
      setPoints(points - reward.points);
      setRedeemedRewards([...redeemedRewards, reward.id]);
      alert(`Successfully redeemed ${reward.name}!`);
    } else if (redeemedRewards.includes(reward.id)) {
      alert('You have already redeemed this reward!');
    } else {
      alert(`You need ${reward.points - points} more points to redeem this reward.`);
    }
  };

  return (
    <div className="space-y-6 pb-20">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="space-y-4"
      >
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-slate-900">Rewards</h1>
            <p className="text-slate-600">Exchange your points for amazing rewards</p>
          </div>
          <div className="flex items-center gap-2 px-4 py-2 bg-emerald-100 rounded-full">
            <Sparkles className="w-5 h-5 text-emerald-600" />
            <span className="font-bold text-emerald-700">{points} pts</span>
          </div>
        </div>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {rewards.map((reward, index) => {
          const isRedeemed = redeemedRewards.includes(reward.id);
          const canAfford = points >= reward.points;

          return (
            <motion.div
              key={reward.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className={`p-6 ${isRedeemed ? 'opacity-60' : ''}`}>
                <div className="flex items-start justify-between mb-4">
                  <div className="text-4xl">{reward.icon}</div>
                  {isRedeemed && (
                    <div className="flex items-center gap-1 text-emerald-600">
                      <CheckCircle2 className="w-5 h-5" />
                      <span className="text-sm font-medium">Redeemed</span>
                    </div>
                  )}
                </div>
                <h3 className="text-xl font-semibold text-slate-900 mb-2">
                  {reward.name}
                </h3>
                <p className="text-sm text-slate-600 mb-4">{reward.description}</p>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Star className="w-4 h-4 text-amber-500" />
                    <span className="font-bold text-slate-900">{reward.points} pts</span>
                  </div>
                  <Button
                    onClick={() => handleRedeem(reward)}
                    disabled={isRedeemed || !canAfford}
                    className={canAfford && !isRedeemed ? 'bg-emerald-600 hover:bg-emerald-700' : ''}
                    size="sm"
                  >
                    {isRedeemed ? 'Redeemed' : canAfford ? 'Redeem' : 'Not Enough'}
                  </Button>
                </div>
              </Card>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}

