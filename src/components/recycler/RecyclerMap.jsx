import { motion } from 'framer-motion';
import { MapPin, Package, Navigation2 } from 'lucide-react';
import { Card } from '../ui/card';
import { Button } from '../ui/button';

export default function RecyclerMap() {
  const sacks = [
    {
      id: 1,
      superette: 'Superette El Djazair',
      address: '123 Rue Didouche Mourad',
      status: 'full',
      sacks: 3,
      coordinates: { lat: 36.7538, lng: 3.0588 },
    },
    {
      id: 2,
      superette: 'Superette Centre',
      address: '45 Avenue de la République',
      status: 'full',
      sacks: 2,
      coordinates: { lat: 36.7638, lng: 3.0688 },
    },
    {
      id: 3,
      superette: 'Superette Ouest',
      address: '78 Boulevard Zirout Youcef',
      status: 'half',
      sacks: 1,
      coordinates: { lat: 36.7438, lng: 3.0488 },
    },
  ];

  return (
    <div className="space-y-6 pb-20">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="space-y-4"
      >
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-slate-900">Sack Map</h1>
            <p className="text-slate-600">View sacks ready for pickup</p>
          </div>
          <Button variant="outline" size="sm">
            <Navigation2 className="w-4 h-4 mr-2" />
            Optimize Route
          </Button>
        </div>
      </motion.div>

      {/* Map Placeholder */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
      >
        <Card className="h-96 bg-slate-100 rounded-xl flex items-center justify-center border-2 border-dashed border-slate-300">
          <div className="text-center space-y-2">
            <MapPin className="w-12 h-12 text-slate-400 mx-auto" />
            <p className="text-slate-500">Interactive Sack Map</p>
            <p className="text-sm text-slate-400">Map with sack locations will be displayed here</p>
          </div>
        </Card>
      </motion.div>

      {/* Sack List */}
      <div className="space-y-4">
        {sacks.map((sack, index) => (
          <motion.div
            key={sack.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 + index * 0.1 }}
          >
            <Card className="p-4 hover:shadow-md transition-shadow">
              <div className="flex items-start justify-between">
                <div className="flex items-start gap-4 flex-1">
                  <div className="w-12 h-12 bg-teal-100 rounded-lg flex items-center justify-center">
                    <Package className="w-6 h-6 text-teal-600" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <h3 className="font-semibold text-slate-900">{sack.superette}</h3>
                      <span className={`text-xs px-2 py-1 rounded-full ${
                        sack.status === 'full' ? 'bg-emerald-100 text-emerald-700' :
                        'bg-amber-100 text-amber-700'
                      }`}>
                        {sack.status === 'full' ? 'Full' : 'Half Full'}
                      </span>
                    </div>
                    <p className="text-sm text-slate-600 mb-2">{sack.address}</p>
                    <p className="text-sm text-slate-500">{sack.sacks} sack(s) ready</p>
                  </div>
                </div>
                <Button variant="outline" size="sm">
                  <Navigation2 className="w-4 h-4" />
                </Button>
              </div>
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

