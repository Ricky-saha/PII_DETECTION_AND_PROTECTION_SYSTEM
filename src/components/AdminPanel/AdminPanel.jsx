import React, { useState } from 'react';
import { Shield, Files, ArrowRight, User, Settings, Bell, LogOut } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const AdminPanel = () => {
    const navigateTo = useNavigate();
//   // Simple navigation function that simulates page navigation
//   const navigateTo = (path) => {
//     console.log(`Navigating to: ${path}`);
//     // In a real application, you would use React Router or similar
//     alert(`Navigating to: ${path}`);
//   };

  // Animation hover states
  const [requestHover, setRequestHover] = useState(false);
  const [checkHover, setCheckHover] = useState(false);

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-200 via-pink-100 to-indigo-200">
      {/* Header/Navbar */}
      <header className="bg-white shadow-md py-4 px-8">
        <div className="flex justify-between items-center">
          <div className="flex items-center space-x-3">
            <Shield className="h-8 w-8 text-purple-600" />
            <span className="text-2xl font-bold text-gray-800">PII Admin Portal</span>
          </div>
          
          <div className="flex items-center space-x-6">
            <Bell className="h-6 w-6 text-gray-600 hover:text-purple-600 cursor-pointer" />
            <Settings className="h-6 w-6 text-gray-600 hover:text-purple-600 cursor-pointer" />
            <div className="flex items-center space-x-2 cursor-pointer">
              <div className="w-10 h-10 rounded-full bg-purple-600 flex items-center justify-center">
                <User className="h-6 w-6 text-white" />
              </div>
              <span className="font-medium text-gray-700">Admin User</span>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto py-12 px-8">
        <div className="mb-12 text-center">
          <h1 className="text-4xl font-bold text-gray-800 mb-3">Welcome to Admin Dashboard</h1>
          <div className="w-24 h-1 bg-purple-600 mx-auto mb-4 rounded-full"></div>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Manage and secure your PII documents with our advanced protection system
          </p>
        </div>

        {/* Admin Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 max-w-4xl mx-auto">
          {/* Request Documents Box */}
          <div 
            className={`bg-white rounded-xl shadow-lg overflow-hidden transition-all duration-500 transform ${requestHover ? 'scale-105 rotate-1' : ''}`}
            onMouseEnter={() => setRequestHover(true)}
            onMouseLeave={() => setRequestHover(false)}
            onClick={() => navigateTo('/request-panel')}
          >
            <div className="bg-gradient-to-r from-blue-500 to-indigo-600 h-3"></div>
            <div className="p-8">
              <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <Files className="h-10 w-10 text-blue-600" />
              </div>
              <h2 className="text-2xl font-bold text-center text-gray-800 mb-4">Request Documents</h2>
              <p className="text-gray-600 text-center mb-6">
                Submit new document requests for PII detection and secure masking
              </p>
              <div className="flex justify-center">
                <button 
                  className={`flex items-center text-blue-600 font-medium group transition-all duration-300 ${requestHover ? 'translate-x-2' : ''}`}
                >
                  Access Request Portal
                  <ArrowRight className={`ml-2 h-5 w-5 transition-all duration-300 ${requestHover ? 'translate-x-1' : ''}`} />
                </button>
              </div>
            </div>
          </div>
          
          {/* Check Documents Box */}
          <div 
            className={`bg-white rounded-xl shadow-lg overflow-hidden transition-all duration-500 transform ${checkHover ? 'scale-105 rotate-1' : ''}`}
            onMouseEnter={() => setCheckHover(true)}
            onMouseLeave={() => setCheckHover(false)}
            onClick={() => navigateTo('/admin-dashboard')}
          >
            <div className="bg-gradient-to-r from-green-500 to-emerald-600 h-3"></div>
            <div className="p-8">
              <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <Shield className="h-10 w-10 text-green-600" />
              </div>
              <h2 className="text-2xl font-bold text-center text-gray-800 mb-4">Check Documents</h2>
              <p className="text-gray-600 text-center mb-6">
                Review and verify submitted documents with secure PII masking options
              </p>
              <div className="flex justify-center">
                <button 
                  className={`flex items-center text-green-600 font-medium group transition-all duration-300 ${checkHover ? 'translate-x-2' : ''}`}
                >
                  View Secure Documents
                  <ArrowRight className={`ml-2 h-5 w-5 transition-all duration-300 ${checkHover ? 'translate-x-1' : ''}`} />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="mt-16 max-w-5xl mx-auto">
          <h2 className="text-2xl font-semibold text-gray-800 mb-6 text-center">System Statistics</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { title: "Documents Processed", value: "1,284", color: "bg-blue-100 text-blue-700" },
              { title: "PII Instances Detected", value: "8,392", color: "bg-purple-100 text-purple-700" },
              { title: "Security Score", value: "98%", color: "bg-green-100 text-green-700" }
            ].map((stat, index) => (
              <div key={index} className="bg-white rounded-lg shadow-md p-6 text-center">
                <div className={`w-16 h-16 rounded-full ${stat.color} flex items-center justify-center mx-auto mb-4`}>
                  <span className="text-xl font-bold">{index + 1}</span>
                </div>
                <h3 className="text-xl font-semibold text-gray-800 mb-2">{stat.title}</h3>
                <p className={`text-2xl font-bold ${stat.color.split(' ')[1]}`}>{stat.value}</p>
              </div>
            ))}
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-white py-8 px-8 shadow-inner mt-12">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center">
          <div className="flex items-center space-x-2 mb-4 md:mb-0">
            <Shield className="h-6 w-6 text-purple-600" />
            <span className="text-xl font-bold text-gray-800">PII Protection System</span>
          </div>
          <p className="text-gray-600">© {new Date().getFullYear()} Invincibles. All rights reserved.</p>
          <button 
            className="flex items-center text-red-500 hover:text-red-700 transition duration-300 mt-4 md:mt-0"
            onClick={() => alert('Logging out...')}
          >
            <LogOut className="h-5 w-5 mr-2" />
            <span>Sign Out</span>
          </button>
        </div>
      </footer>
    </div>
  );
};

export default AdminPanel;