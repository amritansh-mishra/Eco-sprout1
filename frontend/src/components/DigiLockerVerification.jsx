import { useState } from 'react';
import PropTypes from 'prop-types';
import { Shield, FileText, CheckCircle, AlertCircle, ArrowLeft, X } from 'lucide-react';

const DigiLockerVerification = ({ onVerificationComplete, onClose }) => {
  const [step, setStep] = useState('select'); // select, document_number, otp, pending, completed, error
  const [selectedDocument, setSelectedDocument] = useState('');
  const [documentNumber, setDocumentNumber] = useState('');
  const [otp, setOtp] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [verificationData, setVerificationData] = useState(null);

  const documentTypes = [
    { value: 'aadhaar', label: 'Aadhaar Card', description: 'Government ID with address proof' },
    { value: 'pan', label: 'PAN Card', description: 'Income tax identification' },
    { value: 'driving_license', label: 'Driving License', description: 'Valid driving license' },
    { value: 'passport', label: 'Passport', description: 'International travel document' }
  ];

  const handleDocumentSelect = (documentType) => {
    setSelectedDocument(documentType);
    setError('');
  };

  const proceedToDocumentNumber = () => {
    if (!selectedDocument) {
      setError('Please select a document type');
      return;
    }
    setStep('document_number');
    setError('');
  };

  const proceedToOTP = () => {
    if (!documentNumber.trim()) {
      setError('Please enter your document number');
      return;
    }
    setStep('otp');
    setError('');
  };

  const verifyOTP = () => {
    if (!otp.trim()) {
      setError('Please enter the OTP');
      return;
    }
    if (otp !== '123456') {
      setError('Invalid OTP. Please try again.');
      // Set verification as failed
      const failedVerificationData = {
        verified: false,
        verifiedDocument: documentTypes.find(doc => doc.value === selectedDocument)?.label,
        documentNumber: documentNumber.replace(/(.{4})/g, '$1 ').trim(),
        verifiedAt: new Date().toISOString(),
        status: 'unverified'
      };
      setVerificationData(failedVerificationData);
      if (onVerificationComplete) {
        onVerificationComplete(failedVerificationData);
      }
      return;
    }
    completeVerification();
  };

  const completeVerification = () => {
    setIsLoading(true);
    // Simulate verification completion
    setTimeout(() => {
      const mockVerificationData = {
        verified: true,
        verifiedDocument: documentTypes.find(doc => doc.value === selectedDocument)?.label,
        documentNumber: documentNumber.replace(/(.{4})/g, '$1 ').trim(),
        verifiedAt: new Date().toISOString(),
        status: 'verified'
      };
      setVerificationData(mockVerificationData);
      setStep('completed');
      setIsLoading(false);
      if (onVerificationComplete) {
        onVerificationComplete(mockVerificationData);
      }
    }, 1500);
  };


  const renderSelectStep = () => (
    <div className="space-y-6">
      <div className="text-center">
        <Shield className="mx-auto h-12 w-12 text-green-600" />
        <h3 className="mt-4 text-lg font-medium text-gray-900">Verify Your Identity</h3>
        <p className="mt-2 text-sm text-gray-600">
          Choose a government document to verify your identity through DigiLocker
        </p>
      </div>

      <div className="space-y-3">
        {documentTypes.map((doc) => (
          <div
            key={doc.value}
            onClick={() => handleDocumentSelect(doc.value)}
            className={`p-4 border-2 rounded-lg cursor-pointer transition-all ${
              selectedDocument === doc.value
                ? 'border-green-500 bg-green-50'
                : 'border-gray-200 hover:border-gray-300'
            }`}
          >
            <div className="flex items-center">
              <FileText className="h-5 w-5 text-gray-400 mr-3" />
              <div className="flex-1">
                <div className="font-medium text-gray-900">{doc.label}</div>
                <div className="text-sm text-gray-500">{doc.description}</div>
              </div>
              {selectedDocument === doc.value && (
                <CheckCircle className="h-5 w-5 text-green-600" />
              )}
            </div>
          </div>
        ))}
      </div>

      {error && (
        <div className="flex items-center p-3 bg-red-50 border border-red-200 rounded-lg">
          <AlertCircle className="h-5 w-5 text-red-600 mr-2" />
          <span className="text-sm text-red-700">{error}</span>
        </div>
      )}

      <button
        onClick={proceedToDocumentNumber}
        disabled={!selectedDocument || isLoading}
        className="w-full flex items-center justify-center px-4 py-3 border border-transparent text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        Verify Now
      </button>
    </div>
  );

  const renderDocumentNumberStep = () => (
    <div className="space-y-6">
      <div className="text-center">
        <FileText className="mx-auto h-12 w-12 text-green-600" />
        <h3 className="mt-4 text-lg font-medium text-gray-900">Enter Document Number</h3>
        <p className="mt-2 text-sm text-gray-600">
          Please enter your {documentTypes.find(doc => doc.value === selectedDocument)?.label} number
        </p>
      </div>

      <div className="space-y-4">
        <div>
          <label htmlFor="documentNumber" className="block text-sm font-medium text-gray-700 mb-2">
            {documentTypes.find(doc => doc.value === selectedDocument)?.label} Number
          </label>
          <input
            type="text"
            id="documentNumber"
            value={documentNumber}
            onChange={(e) => setDocumentNumber(e.target.value)}
            placeholder={`Enter your ${documentTypes.find(doc => doc.value === selectedDocument)?.label.toLowerCase()} number`}
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500"
          />
        </div>

        {error && (
          <div className="flex items-center p-3 bg-red-50 border border-red-200 rounded-lg">
            <AlertCircle className="h-5 w-5 text-red-600 mr-2" />
            <span className="text-sm text-red-700">{error}</span>
          </div>
        )}

        <div className="flex space-x-3">
          <button
            onClick={() => setStep('select')}
            className="flex-1 px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
          >
            Back
          </button>
          <button
            onClick={proceedToOTP}
            disabled={!documentNumber.trim()}
            className="flex-1 px-4 py-2 text-sm font-medium text-white bg-green-600 border border-transparent rounded-md hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Continue
          </button>
        </div>
      </div>
    </div>
  );

  const renderOTPStep = () => (
    <div className="space-y-6">
      <div className="text-center">
        <Shield className="mx-auto h-12 w-12 text-green-600" />
        <h3 className="mt-4 text-lg font-medium text-gray-900">Enter OTP</h3>
        <p className="mt-2 text-sm text-gray-600">
          An OTP has been sent for verification
        </p>
      </div>

      <div className="space-y-4">
        <div>
          <label htmlFor="otp" className="block text-sm font-medium text-gray-700 mb-2">
            Enter 6-digit OTP
          </label>
          <input
            type="text"
            id="otp"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            placeholder="Enter OTP"
            maxLength="6"
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500 text-center text-lg tracking-widest"
          />
          <p className="mt-1 text-xs text-gray-500">
            💡 Hint: For demo purposes, use OTP: <span className="font-mono font-bold">123456</span>
          </p>
        </div>

        {error && (
          <div className="flex items-center p-3 bg-red-50 border border-red-200 rounded-lg">
            <AlertCircle className="h-5 w-5 text-red-600 mr-2" />
            <span className="text-sm text-red-700">{error}</span>
          </div>
        )}

        <div className="flex space-x-3">
          <button
            onClick={() => setStep('document_number')}
            className="flex-1 px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
          >
            Back
          </button>
          <button
            onClick={verifyOTP}
            disabled={!otp.trim() || isLoading}
            className="flex-1 px-4 py-2 text-sm font-medium text-white bg-green-600 border border-transparent rounded-md hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? (
              <div className="flex items-center justify-center">
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                Verifying...
              </div>
            ) : (
              'Verify OTP'
            )}
          </button>
        </div>
      </div>
    </div>
  );

  const renderPendingStep = () => (
    <div className="text-center space-y-4">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mx-auto"></div>
      <h3 className="text-lg font-medium text-gray-900">Verification in Progress</h3>
      <p className="text-sm text-gray-600">
        Please complete the verification process on DigiLocker. This window will update automatically.
      </p>
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <p className="text-sm text-blue-700">
          <strong>Note:</strong> This is a demo. In production, you would be redirected to the actual DigiLocker website.
        </p>
      </div>
    </div>
  );

  const renderCompletedStep = () => (
    <div className="text-center space-y-4">
      {verificationData?.verified ? (
        <>
          <CheckCircle className="mx-auto h-12 w-12 text-green-600" />
          <h3 className="text-lg font-medium text-gray-900">Verification Successful!</h3>
          <p className="text-sm text-gray-600">
            Your identity has been verified successfully.
          </p>
          <div className="bg-green-50 border border-green-200 rounded-lg p-4 text-left">
            <h4 className="font-medium text-green-900 mb-2">Verification Details:</h4>
            <ul className="text-sm text-green-700 space-y-1">
              <li>• Document: {verificationData.verifiedDocument}</li>
              <li>• Status: <span className="font-semibold text-green-800">Verified ✓</span></li>
              <li>• Trust Score: +15 points</li>
              <li>• Badge Earned: DigiLocker Verified</li>
            </ul>
          </div>
          <div className="flex space-x-3 pt-4">
            <button
              onClick={() => {
                setStep('select');
                setError('');
                setSelectedDocument('');
                setDocumentNumber('');
                setOtp('');
                setVerificationData(null);
              }}
              className="flex-1 flex items-center justify-center px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Verify Another
            </button>
            <button
              onClick={onClose}
              className="flex-1 flex items-center justify-center px-4 py-2 text-sm font-medium text-white bg-green-600 border border-transparent rounded-md hover:bg-green-700"
            >
              <X className="h-4 w-4 mr-2" />
              Close
            </button>
          </div>
        </>
      ) : (
        <>
          <AlertCircle className="mx-auto h-12 w-12 text-red-600" />
          <h3 className="text-lg font-medium text-gray-900">Verification Failed</h3>
          <p className="text-sm text-gray-600">
            Unable to verify your identity. Please try again.
          </p>
          <div className="bg-red-50 border border-red-200 rounded-lg p-4 text-left">
            <h4 className="font-medium text-red-900 mb-2">Verification Details:</h4>
            <ul className="text-sm text-red-700 space-y-1">
              <li>• Document: {verificationData?.verifiedDocument}</li>
              <li>• Status: <span className="font-semibold text-red-800">Unverified ✗</span></li>
              <li>• Reason: Invalid OTP provided</li>
            </ul>
          </div>
          <div className="flex space-x-3 pt-4">
            <button
              onClick={() => {
                setStep('select');
                setError('');
                setSelectedDocument('');
                setDocumentNumber('');
                setOtp('');
                setVerificationData(null);
              }}
              className="flex-1 flex items-center justify-center px-4 py-2 text-sm font-medium text-white bg-red-600 border border-transparent rounded-md hover:bg-red-700"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Try Again
            </button>
            <button
              onClick={onClose}
              className="flex-1 flex items-center justify-center px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
            >
              <X className="h-4 w-4 mr-2" />
              Close
            </button>
          </div>
        </>
      )}
    </div>
  );

  const renderErrorStep = () => (
    <div className="text-center space-y-4">
      <AlertCircle className="mx-auto h-12 w-12 text-red-600" />
      <h3 className="text-lg font-medium text-gray-900">Verification Failed</h3>
      <p className="text-sm text-gray-600">{error}</p>
      <button
        onClick={() => {
          setStep('select');
          setError('');
          setSelectedDocument('');
        }}
        className="px-4 py-2 text-sm font-medium text-green-600 bg-white border border-green-600 rounded-md hover:bg-green-50"
      >
        Try Again
      </button>
    </div>
  );

  return (
    <div className="max-w-md mx-auto bg-white rounded-lg shadow-lg p-6">
      {step === 'select' && renderSelectStep()}
      {step === 'document_number' && renderDocumentNumberStep()}
      {step === 'otp' && renderOTPStep()}
      {step === 'pending' && renderPendingStep()}
      {step === 'completed' && renderCompletedStep()}
      {step === 'error' && renderErrorStep()}
    </div>
  );
};

DigiLockerVerification.propTypes = {
  onVerificationComplete: PropTypes.func,
  onClose: PropTypes.func
};

export default DigiLockerVerification;
