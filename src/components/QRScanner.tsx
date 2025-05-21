import React, { useState } from 'react';
import Webcam from 'react-webcam';
import { QrReader } from 'react-qr-reader';
import { toast } from '@/hooks/use-toast';

interface QRScannerProps {
  onScan: (data: string) => void;
  onError?: (error: string) => void;
}

const QRScanner: React.FC<QRScannerProps> = ({ onScan, onError }) => {
  const [hasPermission, setHasPermission] = useState<boolean | null>(null);

  const handleError = (error: any) => {
    console.error('QR Scanner Error:', error);
    setHasPermission(false);
    if (onError) {
      onError(error.message || 'Failed to access camera');
    }
    toast({
      title: "Camera Access Error",
      description: "Please check your camera permissions and try again.",
      variant: "destructive",
    });
  };

  const handleScan = (data: any) => {
    if (data) {
      onScan(data);
    }
  };

  // Request camera permission on component mount
  React.useEffect(() => {
    navigator.mediaDevices.getUserMedia({ video: true })
      .then(() => setHasPermission(true))
      .catch((error) => {
        console.error('Camera permission error:', error);
        setHasPermission(false);
        handleError(error);
      });
  }, []);

  if (hasPermission === null) {
    return (
      <div className="text-center p-4">
        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-dsk-blue mx-auto"></div>
        <p className="mt-2">Requesting camera access...</p>
      </div>
    );
  }

  if (hasPermission === false) {
    return (
      <div className="text-center p-4 bg-red-50 rounded-lg">
        <p className="text-red-600 font-medium">Camera access denied</p>
        <p className="text-sm text-red-500 mt-1">
          Please enable camera access in your browser settings to scan QR codes.
        </p>
        <button
          onClick={() => setHasPermission(null)}
          className="mt-4 px-4 py-2 bg-dsk-blue text-white rounded-md hover:bg-opacity-90"
        >
          Try Again
        </button>
      </div>
    );
  }

  return (
    <div className="relative">
      <QrReader
        constraints={{ facingMode: 'environment' }}
        onResult={(result, error) => {
          if (result) {
            handleScan(result?.text);
          }
          if (error) {
            handleError(error);
          }
        }}
        className="w-full max-w-md mx-auto rounded-lg overflow-hidden"
        videoStyle={{ objectFit: 'cover' }}
      />
      <div className="absolute inset-0 border-2 border-dsk-blue rounded-lg pointer-events-none"></div>
    </div>
  );
};

export default QRScanner;