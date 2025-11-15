import { motion } from 'framer-motion';
import { Calendar, MapPin, TrendingUp, Package } from 'lucide-react';
import { Card } from '../ui/card';

export default function CustomerHistory() {
  // Mock transaction history
  const transactions = [
    {
      id: 1,
      date: '2024-01-15',
      bottles: 25,
      points: 125,
      location: 'Superette El Djazair',
      type: 'deposit',
    },
    {
      id: 2,
      date: '2024-01-12',
      bottles: 15,
      points: 75,
      location: 'Collection Point Centre',
      type: 'deposit',
    },
    {
      id: 3,
      date: '2024-01-10',
      bottles: 30,
      points: 150,
      location: 'Superette El Djazair',
      type: 'deposit',
    },
  ];

  return (
    <div className="space-y-6 pb-20">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="space-y-4"
      >
        <h1 className="text-3xl font-bold text-slate-900">Transaction History</h1>
        <p className="text-slate-600">View all your deposits and points earned</p>
      </motion.div>

      <div className="space-y-4">
        {transactions.map((transaction, index) => (
          <motion.div
            key={transaction.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Card className="p-4">
              <div className="flex items-start justify-between">
                <div className="flex items-start gap-4 flex-1">
                  <div className="w-12 h-12 bg-emerald-100 rounded-lg flex items-center justify-center">
                    <Package className="w-6 h-6 text-emerald-600" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="font-semibold text-slate-900">Deposit</h3>
                      <span className="text-xs px-2 py-1 bg-emerald-100 text-emerald-700 rounded-full">
                        {transaction.bottles} bottles
                      </span>
                    </div>
                    <div className="flex items-center gap-4 text-sm text-slate-600 mb-2">
                      <div className="flex items-center gap-1">
                        <Calendar className="w-4 h-4" />
                        {new Date(transaction.date).toLocaleDateString()}
                      </div>
                      <div className="flex items-center gap-1">
                        <MapPin className="w-4 h-4" />
                        {transaction.location}
                      </div>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-2 text-emerald-600">
                  <TrendingUp className="w-5 h-5" />
                  <span className="font-bold">+{transaction.points}</span>
                </div>
              </div>
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

