import { useState } from 'react';
import { motion } from 'framer-motion';
import { ScanLine, Package, CheckCircle2, X } from 'lucide-react';
import { Card } from '../ui/card';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';

export default function SuperetteScan() {
  const [scannedQR, setScannedQR] = useState('');
  const [bottleCount, setBottleCount] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleScan = () => {
    // Simulate QR scanning
    const mockQR = `greencan:customer:${Math.random().toString(36).substring(7)}`;
    setScannedQR(mockQR);
  };

  const handleSubmit = async () => {
    if (!scannedQR || !bottleCount) {
      alert('Please scan QR code and enter bottle count');
      return;
    }

    setIsProcessing(true);
    // Simulate processing (2-3 seconds)
    setTimeout(() => {
      setIsProcessing(false);
      setIsSuccess(true);
      setTimeout(() => {
        setIsSuccess(false);
        setScannedQR('');
        setBottleCount('');
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
        <h1 className="text-3xl font-bold text-slate-900">Scan Customer QR</h1>
        <p className="text-slate-600">Scan customer QR code and enter number of bottles</p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
      >
        <Card className="p-6">
          <div className="space-y-6">
            <div className="flex flex-col items-center space-y-4">
              <div className="w-32 h-32 bg-cyan-100 rounded-2xl flex items-center justify-center">
                <ScanLine className="w-16 h-16 text-cyan-600" />
              </div>
              <Button
                onClick={handleScan}
                className="bg-cyan-600 hover:bg-cyan-700 text-white"
                size="lg"
              >
                <ScanLine className="w-5 h-5 mr-2" />
                Scan QR Code
              </Button>
            </div>

            {scannedQR && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                className="space-y-4"
              >
                <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-lg">
                  <div className="flex items-center gap-2 text-emerald-700 mb-2">
                    <CheckCircle2 className="w-5 h-5" />
                    <span className="font-medium">QR Code Scanned</span>
                  </div>
                  <p className="text-sm text-slate-600">Customer ID: {scannedQR.substring(scannedQR.lastIndexOf(':') + 1)}</p>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="bottles">Number of Bottles</Label>
                  <Input
                    id="bottles"
                    type="number"
                    placeholder="Enter number of bottles"
                    value={bottleCount}
                    onChange={(e) => setBottleCount(e.target.value)}
                    min="1"
                  />
                </div>

                <Button
                  onClick={handleSubmit}
                  disabled={isProcessing || isSuccess}
                  className="w-full bg-cyan-600 hover:bg-cyan-700 text-white"
                  size="lg"
                >
                  {isProcessing ? (
                    'Processing...'
                  ) : isSuccess ? (
                    <>
                      <CheckCircle2 className="w-5 h-5 mr-2" />
                      Points Added Successfully!
                    </>
                  ) : (
                    'Add Points to Customer'
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

