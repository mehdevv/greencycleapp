import { useState } from 'react';
import { motion } from 'framer-motion';
import { Package, QrCode, CheckCircle2, Plus } from 'lucide-react';
import { Card } from '../ui/card';
import { Button } from '../ui/button';
import QRCode from 'react-qr-code';

export default function SuperetteSacks() {
  const [sacks, setSacks] = useState([
    { id: 1, status: 'full', qrCode: 'sack-001', createdAt: '2024-01-15' },
    { id: 2, status: 'half', qrCode: 'sack-002', createdAt: '2024-01-14' },
    { id: 3, status: 'empty', qrCode: 'sack-003', createdAt: '2024-01-13' },
  ]);

  const markAsFull = (id) => {
    setSacks(sacks.map(sack => 
      sack.id === id ? { ...sack, status: 'full' } : sack
    ));
  };

  const createNewSack = () => {
    const newSack = {
      id: sacks.length + 1,
      status: 'empty',
      qrCode: `sack-${String(sacks.length + 1).padStart(3, '0')}`,
      createdAt: new Date().toISOString().split('T')[0],
    };
    setSacks([...sacks, newSack]);
  };

  return (
    <div className="space-y-6 pb-20">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center justify-between"
      >
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Sack Management</h1>
          <p className="text-slate-600">Manage your collection sacks</p>
        </div>
        <Button
          onClick={createNewSack}
          className="bg-cyan-600 hover:bg-cyan-700 text-white"
        >
          <Plus className="w-4 h-4 mr-2" />
          New Sack
        </Button>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {sacks.map((sack, index) => (
          <motion.div
            key={sack.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Card className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="font-semibold text-slate-900">Sack #{sack.id}</h3>
                  <p className="text-sm text-slate-500">{sack.qrCode}</p>
                </div>
                <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                  sack.status === 'full' ? 'bg-emerald-100 text-emerald-700' :
                  sack.status === 'half' ? 'bg-amber-100 text-amber-700' :
                  'bg-slate-100 text-slate-700'
                }`}>
                  {sack.status === 'full' ? 'Full' : sack.status === 'half' ? 'Half Full' : 'Empty'}
                </span>
              </div>

              <div className="bg-white p-4 rounded-lg mb-4 flex justify-center items-center min-h-[128px]">
                {sack.qrCode ? (
                  <QRCode
                    value={`greencan:sack:${sack.qrCode}`}
                    size={128}
                    level="H"
                    style={{ height: "auto", maxWidth: "100%", width: "100%" }}
                  />
                ) : (
                  <div className="text-slate-400 text-sm">No QR Code</div>
                )}
              </div>

              <div className="space-y-2">
                <p className="text-sm text-slate-600">Created: {sack.createdAt}</p>
                {sack.status !== 'full' && (
                  <Button
                    onClick={() => markAsFull(sack.id)}
                    className="w-full bg-cyan-600 hover:bg-cyan-700 text-white"
                    size="sm"
                  >
                    <CheckCircle2 className="w-4 h-4 mr-2" />
                    Mark as Full
                  </Button>
                )}
              </div>
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

