import React, { useState, useEffect, useRef } from 'react';
import { BrowserMultiFormatReader } from '@zxing/browser';

const QRScanner = () => {
  const [slotNumber, setSlotNumber] = useState('');
  const [isScanning, setIsScanning] = useState(false);
  const videoRef = useRef(null);

  const handleScan = (result) => {
    if (result) {
      setSlotNumber(result.text);
      setIsScanning(false);
    }
  };
  
  const handleSubmit = async () => {
    const statusToUpdate = slotNumber && window.confirm(`Toggle status for slot ${slotNumber}?`);

    if (statusToUpdate) {
      try {
        const response = await fetch('http://localhost:5000/api/slots/update', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            slotNumber: slotNumber,
            status: 'occupied',
            userName: 'Ramkishan Gupta',
          }),
        });

        const result = await response.json();
        alert('Slot status updated successfully!');
      } catch (err) {
        alert('Failed to update slot status.');
        console.error(err);
      }
    }
  };

  useEffect(() => {
    if (isScanning) {
      const codeReader = new BrowserMultiFormatReader();
      codeReader.decodeFromVideoDevice(null, videoRef.current, (result, error) => {
        if (result) {
          handleScan(result);
          codeReader.reset(); 
        }
        if (error) {
          console.error(error.message);
        }
      });

      return () => {
        codeReader.reset(); 
      };
    }
  }, [isScanning]);

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100 font-sans">
      <h1 className="text-xl font-bold mb-6">SCAN QR</h1>
      <div className="w-64 h-64 border-2 border-gray-400 rounded-lg flex items-center justify-center mb-6 relative">
        {!isScanning ? (
          <div
            className="w-full h-full flex items-center justify-center cursor-pointer absolute top-0 left-0"
            onClick={() => setIsScanning(true)}
          >
            <p className="text-gray-600 text-sm">Tap to Scan</p>
          </div>
        ) : (
          <video ref={videoRef} className="w-full h-full rounded-lg" />
        )}
      </div>

      <button
        onClick={handleSubmit}
        className="bg-purple-600 text-white py-2 px-6 rounded shadow-md hover:bg-purple-700 transition"
      >
        SUBMIT
      </button>
    </div>
  );
};

export default QRScanner;
