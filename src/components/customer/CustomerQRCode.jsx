import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import QRCode from 'react-qr-code';
import { Download, Printer, Share2, CheckCircle2 } from 'lucide-react';
import { Card } from '../ui/card';
import { Button } from '../ui/button';

export default function CustomerQRCode({ userId }) {
  const [qrValue, setQrValue] = useState('greencan:customer:loading');

  useEffect(() => {
    // Generate unique QR code based on user ID
    if (userId) {
      setQrValue(`greencan:customer:${userId}`);
    } else {
      // Fallback value if userId is not available yet
      setQrValue('greencan:customer:loading');
    }
  }, [userId]);

  const handleDownload = () => {
    if (!qrValue || qrValue === 'greencan:customer:loading') return;
    
    const svg = document.getElementById('qr-code')?.querySelector('svg');
    if (!svg) return;
    
    const svgData = new XMLSerializer().serializeToString(svg);
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    const img = new Image();
    
    img.onload = () => {
      canvas.width = img.width;
      canvas.height = img.height;
      ctx.drawImage(img, 0, 0);
      const pngFile = canvas.toDataURL('image/png');
      const downloadLink = document.createElement('a');
      downloadLink.download = 'greencan-qr-code.png';
      downloadLink.href = pngFile;
      downloadLink.click();
    };
    
    img.src = 'data:image/svg+xml;base64,' + btoa(unescape(encodeURIComponent(svgData)));
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="space-y-6 pb-20">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="space-y-4"
      >
        <h1 className="text-3xl font-bold text-slate-900">Your QR Code</h1>
        <p className="text-slate-600">Show this QR code at partner shops to deposit bottles</p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.2 }}
      >
        <Card className="p-8 flex flex-col items-center space-y-6">
          {qrValue && qrValue !== 'greencan:customer:loading' ? (
            <>
              <div className="bg-white p-6 rounded-2xl shadow-lg" id="qr-code">
                <QRCode
                  value={qrValue}
                  size={256}
                  level="H"
                  style={{ height: "auto", maxWidth: "100%", width: "100%" }}
                />
              </div>

              <div className="text-center space-y-2">
                <div className="flex items-center justify-center gap-2 text-emerald-600">
                  <CheckCircle2 className="w-5 h-5" />
                  <span className="font-medium">QR Code Active</span>
                </div>
                <p className="text-sm text-slate-500">
                  Your unique ID: {userId ? userId.substring(0, 8) : 'Loading'}...
                </p>
              </div>
            </>
          ) : (
            <div className="flex flex-col items-center space-y-4 py-8">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-600"></div>
              <p className="text-slate-500">Loading your QR code...</p>
            </div>
          )}

          {qrValue && qrValue !== 'greencan:customer:loading' && (
            <div className="flex flex-col sm:flex-row gap-3 w-full">
              <Button
                onClick={handleDownload}
                variant="outline"
                className="flex-1"
              >
                <Download className="w-4 h-4 mr-2" />
                Download
              </Button>
              <Button
                onClick={handlePrint}
                variant="outline"
                className="flex-1"
              >
                <Printer className="w-4 h-4 mr-2" />
                Print
              </Button>
              <Button
                onClick={() => {
                  if (navigator.share) {
                    navigator.share({
                      title: 'My GREENCYCLE QR Code',
                      text: 'Scan this QR code to see my recycling profile',
                    });
                  }
                }}
                variant="outline"
                className="flex-1"
              >
                <Share2 className="w-4 h-4 mr-2" />
                Share
              </Button>
            </div>
          )}

          <div className="bg-emerald-50 border border-emerald-200 rounded-lg p-4 w-full">
            <p className="text-sm text-emerald-800">
              <strong>Tip for elderly users:</strong> You can print this QR code on a flashcard 
              and keep it with you. Show it at any partner shop to deposit bottles.
            </p>
          </div>
        </Card>
      </motion.div>
    </div>
  );
}

