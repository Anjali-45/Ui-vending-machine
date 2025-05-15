import React, { useState, useRef } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { PauseCircle as CirclePause, QrCode, Ticket, Info, Upload } from 'lucide-react';
import { validTickets } from '../utils/mockData';
import { Html5QrcodeScanner } from 'html5-qrcode';
import Papa from 'papaparse';

const TicketValidation: React.FC = () => {
  const { ticketNumber, setTicketNumber, validateAndLogin } = useAuth();
  const [error, setError] = useState<string>('');
  const [showQrScanner, setShowQrScanner] = useState<boolean>(false);
  const [showValidTickets, setShowValidTickets] = useState<boolean>(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const qrScannerRef = useRef<Html5QrcodeScanner | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    if (!ticketNumber.trim()) {
      setError('Please enter a ticket number');
      return;
    }
    
    const isValid = validateAndLogin();
    if (!isValid) {
      setError('Invalid ticket number. Please try again.');
    }
  };

  const handleQrScan = () => {
    setShowQrScanner(!showQrScanner);
    if (!showQrScanner) {
      qrScannerRef.current = new Html5QrcodeScanner(
        "qr-reader",
        { fps: 10, qrbox: { width: 250, height: 250 } },
        false
      );
      
      qrScannerRef.current.render((decodedText) => {
        setTicketNumber(decodedText);
        if (qrScannerRef.current) {
          qrScannerRef.current.clear();
        }
        setShowQrScanner(false);
        validateAndLogin();
      }, (error) => {
        console.log(error);
      });
    } else {
      if (qrScannerRef.current) {
        qrScannerRef.current.clear();
      }
    }
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      Papa.parse(file, {
        header: true,
        complete: (results) => {
          console.log('Imported employee data:', results.data);
          // Here you would typically send this data to your backend
          alert(`Successfully imported ${results.data.length} employee records`);
        },
        error: (error) => {
          console.error('Error parsing CSV:', error);
          alert('Error importing CSV file. Please check the format.');
        }
      });
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="grid md:grid-cols-2 gap-8">
        <div className="bg-white rounded-lg shadow-lg p-6">
          <div className="text-center mb-6">
            <div className="inline-flex justify-center items-center w-20 h-20 bg-blue-100 rounded-full mb-4">
              <Ticket className="h-10 w-10 text-blue-600" />
            </div>
            <h2 className="text-2xl font-semibold text-gray-800">Access Parts Vending</h2>
            <p className="text-gray-600 mt-2">Enter your ticket number to continue</p>
          </div>

          {showQrScanner ? (
            <div className="text-center p-4 border-2 border-dashed border-gray-300 rounded-lg mb-4">
              <div id="qr-reader" className="w-full max-w-sm mx-auto"></div>
              <button
                onClick={() => setShowQrScanner(false)}
                className="mt-4 px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600"
              >
                Cancel Scanning
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label htmlFor="ticketNumber" className="block text-sm font-medium text-gray-700 mb-1">
                  Ticket Number
                </label>
                <input
                  type="text"
                  id="ticketNumber"
                  value={ticketNumber}
                  onChange={(e) => setTicketNumber(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Enter ticket number (e.g., MT12345)"
                />
                {error && <p className="mt-1 text-sm text-red-600">{error}</p>}
              </div>
              
              <div className="flex space-x-3">
                <button
                  type="submit"
                  className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                >
                  Validate Ticket
                </button>
                
                <button
                  type="button"
                  onClick={handleQrScan}
                  className="flex items-center justify-center bg-gray-100 text-gray-700 py-2 px-4 rounded-md hover:bg-gray-200 transition-colors focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
                >
                  <QrCode className="h-5 w-5" />
                </button>
              </div>
            </form>
          )}
        </div>

        <div className="bg-gray-50 rounded-lg shadow-lg p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-2">
              <Info className="h-5 w-5 text-blue-600" />
              <h3 className="text-lg font-medium text-gray-800">Employee Management</h3>
            </div>
            <div className="flex space-x-2">
              <button
                onClick={() => setShowValidTickets(!showValidTickets)}
                className="text-sm text-blue-600 hover:text-blue-800"
              >
                {showValidTickets ? 'Hide Details' : 'Show Details'}
              </button>
              <button
                onClick={() => fileInputRef.current?.click()}
                className="flex items-center space-x-1 text-sm text-green-600 hover:text-green-800"
              >
                <Upload className="h-4 w-4" />
                <span>Import CSV</span>
              </button>
              <input
                type="file"
                ref={fileInputRef}
                accept=".csv"
                className="hidden"
                onChange={handleFileUpload}
              />
            </div>
          </div>

          {showValidTickets ? (
            <div className="space-y-4">
              {validTickets.map((ticket) => (
                <div
                  key={ticket.number}
                  className="bg-white p-4 rounded-md border border-gray-200 hover:border-blue-300 transition-colors"
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="font-medium text-gray-800">{ticket.number}</p>
                      <p className="text-sm text-gray-600">{ticket.department}</p>
                    </div>
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                      {ticket.role}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8">
              <p className="text-gray-600">
                Click "Show Details" to view the list of valid ticket numbers for demonstration purposes.
              </p>
            </div>
          )}

          <div className="mt-6 bg-blue-50 border border-blue-100 rounded-md p-4">
            <h4 className="text-sm font-medium text-blue-800 mb-2">CSV Import Instructions</h4>
            <ul className="text-sm text-blue-700 space-y-1">
              <li>• CSV file should contain columns: id, name, department, ticketNumber, role, shift</li>
              <li>• Each row represents one employee</li>
              <li>• Ticket numbers must be unique</li>
              <li>• Maximum file size: 5MB</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TicketValidation;