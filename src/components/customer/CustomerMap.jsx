import { useState } from 'react';
import { motion } from 'framer-motion';
import { MapPin, Navigation2, Filter, Clock, Gift } from 'lucide-react';
import { Card } from '../ui/card';
import { Button } from '../ui/button';

export default function CustomerMap() {
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [userLocation, setUserLocation] = useState(null);

  // Mock partner locations
  const partnerShops = [
    {
      id: 1,
      name: 'Superette El Djazair',
      type: 'superette',
      distance: '0.5 km',
      address: '123 Rue Didouche Mourad',
      openingHours: '8:00 - 20:00',
      rewards: ['5 DA discount', 'Free product'],
      sacks: 3,
      coordinates: { lat: 36.7538, lng: 3.0588 }
    },
    {
      id: 2,
      name: 'Collection Point Centre',
      type: 'collection',
      distance: '1.2 km',
      address: '45 Avenue de la République',
      openingHours: '24/7',
      rewards: ['10 DA discount'],
      sacks: 5,
      coordinates: { lat: 36.7638, lng: 3.0688 }
    },
  ];

  const getCurrentLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setUserLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude
          });
        },
        (error) => {
          console.error('Error getting location:', error);
        }
      );
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
            <h1 className="text-3xl font-bold text-slate-900">Find Partners</h1>
            <p className="text-slate-600">Discover nearby collection points</p>
          </div>
          <Button
            onClick={getCurrentLocation}
            variant="outline"
            size="sm"
          >
            <Navigation2 className="w-4 h-4 mr-2" />
            My Location
          </Button>
        </div>
      </motion.div>

      {/* Filters */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
      >
        <div className="flex items-center gap-2 overflow-x-auto pb-2">
          <Button
            variant={selectedFilter === 'all' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setSelectedFilter('all')}
            className={selectedFilter === 'all' ? 'bg-emerald-600' : ''}
          >
            All
          </Button>
          <Button
            variant={selectedFilter === 'superette' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setSelectedFilter('superette')}
            className={selectedFilter === 'superette' ? 'bg-emerald-600' : ''}
          >
            Superette
          </Button>
          <Button
            variant={selectedFilter === 'collection' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setSelectedFilter('collection')}
            className={selectedFilter === 'collection' ? 'bg-emerald-600' : ''}
          >
            Collection Point
          </Button>
          <Button
            variant={selectedFilter === 'rewards' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setSelectedFilter('rewards')}
            className={selectedFilter === 'rewards' ? 'bg-emerald-600' : ''}
          >
            <Gift className="w-4 h-4 mr-2" />
            Best Rewards
          </Button>
        </div>
      </motion.div>

      {/* Map Placeholder */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <Card className="h-96 bg-slate-100 rounded-xl flex items-center justify-center border-2 border-dashed border-slate-300">
          <div className="text-center space-y-2">
            <MapPin className="w-12 h-12 text-slate-400 mx-auto" />
            <p className="text-slate-500">Google Maps Integration</p>
            <p className="text-sm text-slate-400">Map will be displayed here</p>
          </div>
        </Card>
      </motion.div>

      {/* Partner List */}
      <div className="space-y-4">
        {partnerShops
          .filter(shop => selectedFilter === 'all' || shop.type === selectedFilter)
          .map((shop, index) => (
            <motion.div
              key={shop.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 + index * 0.1 }}
            >
              <Card className="p-4 hover:shadow-md transition-shadow cursor-pointer">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <h3 className="font-semibold text-slate-900">{shop.name}</h3>
                      <span className="text-xs px-2 py-1 bg-emerald-100 text-emerald-700 rounded-full">
                        {shop.distance}
                      </span>
                    </div>
                    <p className="text-sm text-slate-600 mb-2">{shop.address}</p>
                    <div className="flex items-center gap-4 text-xs text-slate-500">
                      <div className="flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        {shop.openingHours}
                      </div>
                      <div className="flex items-center gap-1">
                        <MapPin className="w-3 h-3" />
                        {shop.sacks} sacks
                      </div>
                    </div>
                    <div className="flex flex-wrap gap-2 mt-3">
                      {shop.rewards.map((reward, i) => (
                        <span
                          key={i}
                          className="text-xs px-2 py-1 bg-purple-100 text-purple-700 rounded-full"
                        >
                          {reward}
                        </span>
                      ))}
                    </div>
                  </div>
                  <Button variant="ghost" size="sm">
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

