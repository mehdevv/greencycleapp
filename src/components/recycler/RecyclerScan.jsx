import { useState } from 'react';
import { motion } from 'framer-motion';
import { ScanLine, Package, CheckCircle2, Scale } from 'lucide-react';
import { Card } from '../ui/card';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';

export default function RecyclerScan() {
  const [scannedSack, setScannedSack] = useState('');
  const [weight, setWeight] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleScan = () => {
    const mockQR = `greencan:sack:sack-${Math.random().toString(36).substring(7)}`;
    setScannedSack(mockQR);
  };

  const handleValidate = async () => {
    if (!scannedSack || !weight) {
      alert('Please scan sack QR and enter weight');
      return;
    }

    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      setIsSuccess(true);
      setTimeout(() => {
        setIsSuccess(false);
        setScannedSack('');
        setWeight('');
      }, 2000);
    }, 2000);
  };

  return (
    <div className="space-y-6 pb-20">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="space-y-4"
      >
        <h1 className="text-3xl font-bold text-slate-900">Scan Sack QR</h1>
        <p className="text-slate-600">Validate sack pickup and enter weight</p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
      >
        <Card className="p-6">
          <div className="space-y-6">
            <div className="flex flex-col items-center space-y-4">
              <div className="w-32 h-32 bg-teal-100 rounded-2xl flex items-center justify-center">
                <ScanLine className="w-16 h-16 text-teal-600" />
              </div>
              <Button
                onClick={handleScan}
                className="bg-teal-600 hover:bg-teal-700 text-white"
                size="lg"
              >
                <ScanLine className="w-5 h-5 mr-2" />
                Scan Sack QR Code
              </Button>
            </div>

            {scannedSack && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                className="space-y-4"
              >
                <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-lg">
                  <div className="flex items-center gap-2 text-emerald-700 mb-2">
                    <CheckCircle2 className="w-5 h-5" />
                    <span className="font-medium">Sack QR Scanned</span>
                  </div>
                  <p className="text-sm text-slate-600">Sack ID: {scannedSack.substring(scannedSack.lastIndexOf(':') + 1)}</p>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="weight">Weight (kg)</Label>
                  <div className="relative">
                    <Scale className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                    <Input
                      id="weight"
                      type="number"
                      placeholder="Enter weight in kg"
                      className="pl-10"
                      value={weight}
                      onChange={(e) => setWeight(e.target.value)}
                      min="0"
                      step="0.1"
                    />
                  </div>
                </div>

                <Button
                  onClick={handleValidate}
                  disabled={isProcessing || isSuccess}
                  className="w-full bg-teal-600 hover:bg-teal-700 text-white"
                  size="lg"
                >
                  {isProcessing ? (
                    'Validating...'
                  ) : isSuccess ? (
                    <>
                      <CheckCircle2 className="w-5 h-5 mr-2" />
                      Pickup Validated!
                    </>
                  ) : (
                    'Validate Pickup'
                  )}
                </Button>
              </motion.div>
            )}
          </div>
        </Card>
      </motion.div>
    </div>
  );
}

