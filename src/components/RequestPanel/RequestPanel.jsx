import React, { useState, useEffect } from 'react';
import { Shield, Check, Plus, Info, ArrowRight, Eye, File, AlertTriangle } from 'lucide-react';

const DocumentRequestTemplate = () => {
  const [selectedTemplate, setSelectedTemplate] = useState(null);
  const [selectedFields, setSelectedFields] = useState([]);
  const [customPII, setCustomPII] = useState('');
  const [justification, setJustification] = useState('');
  const [showJustification, setShowJustification] = useState(false);
  
  // Template data
  const templates = [
    {
      id: 1,
      name: "Aadhar Card Verification",
      description: "Basic verification with minimal PII data",
      piiFields: ["Name", "Date of Birth", "Aadhar Number (Last 4 digits)"],
      icon: Shield
    },
    {
      id: 2,
      name: "Income Verification",
      description: "Standard verification for income assessment",
      piiFields: ["Full Name", "PAN Number", "Annual Income", "Employer Name"],
      icon: File
    },
    {
      id: 3,
      name: "Comprehensive KYC",
      description: "Complete identity verification for high security access",
      piiFields: ["Full Name", "Complete Address", "Phone Number", "Email", "Aadhar Number", "PAN Number", "Photograph"],
      icon: Eye
    },
  ];

  // When template is selected, set all fields as selected by default
  useEffect(() => {
    if (selectedTemplate) {
      setSelectedFields([...selectedTemplate.piiFields]);
    }
  }, [selectedTemplate]);

  const handleTemplateSelect = (template) => {
    setSelectedTemplate(template);
    // Reset custom fields when switching templates
    if (showJustification) {
      setShowJustification(false);
      setCustomPII('');
      setJustification('');
    }
  };

  const handleFieldToggle = (field) => {
    if (selectedFields.includes(field)) {
      setSelectedFields(selectedFields.filter(f => f !== field));
    } else {
      setSelectedFields([...selectedFields, field]);
    }
  };

  const handleAddCustomPII = () => {
    setShowJustification(true);
  };

  const handleSubmit = () => {
    alert(`Template selected: ${selectedTemplate.name}\nSelected Fields: ${selectedFields.join(', ')}\nCustom PII: ${customPII}\nJustification: ${justification}`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-200 via-pink-100 to-indigo-200 py-12 px-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-800 mb-3">Document Request Templates</h1>
          <div className="w-24 h-1 bg-purple-600 mx-auto mb-4 rounded-full"></div>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Select a template to define what PII data you need to request from the user
          </p>
        </div>
        
        {/* Template Selection */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          {templates.map((template) => (
            <div 
              key={template.id}
              className={`
                bg-white rounded-xl shadow-lg overflow-hidden transition-all duration-300 cursor-pointer
                ${selectedTemplate?.id === template.id ? 'ring-4 ring-purple-500 transform scale-105' : 'hover:shadow-xl'}
              `}
              onClick={() => handleTemplateSelect(template)}
            >
              <div className="bg-gradient-to-r from-purple-500 to-indigo-600 h-3"></div>
              <div className="p-6">
                <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <template.icon className="h-8 w-8 text-purple-600" />
                </div>
                <h3 className="text-xl font-bold text-center text-gray-800 mb-3">{template.name}</h3>
                <p className="text-gray-600 text-center text-sm mb-4">{template.description}</p>
                
                <div className="mt-4">
                  <h4 className="text-sm font-semibold text-gray-700 mb-2">PII Fields Included:</h4>
                  <ul className="space-y-1">
                    {template.piiFields.map((field, index) => (
                      <li key={index} className="flex items-center text-sm">
                        <Check className="h-4 w-4 text-green-500 mr-2" />
                        <span>{field}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        {/* Selected Template Detail */}
        {selectedTemplate && (
          <div className="bg-white rounded-xl shadow-lg p-8 mb-10">
            <h2 className="text-2xl font-bold text-purple-800 mb-4">Template: {selectedTemplate.name}</h2>
            
            <div className="mb-6">
              <h3 className="text-lg font-semibold text-gray-700 mb-3">Included PII Fields:</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {selectedTemplate.piiFields.map((field, index) => (
                  <div 
                    key={index} 
                    className={`flex items-center p-3 rounded-lg cursor-pointer transition-all duration-200 ${
                      selectedFields.includes(field) 
                        ? 'bg-purple-100 border border-purple-400' 
                        : 'bg-gray-100 border border-gray-300'
                    }`}
                    onClick={() => handleFieldToggle(field)}
                  >
                    <div className={`w-5 h-5 rounded mr-3 flex items-center justify-center ${
                      selectedFields.includes(field) ? 'bg-purple-500' : 'bg-white border border-gray-300'
                    }`}>
                      {selectedFields.includes(field) && <Check className="h-4 w-4 text-white" />}
                    </div>
                    <span className={selectedFields.includes(field) ? 'text-purple-800 font-medium' : 'text-gray-600'}>
                      {field}
                    </span>
                  </div>
                ))}
              </div>
              
              {selectedFields.length === 0 && (
                <div className="mt-3 text-red-500 text-sm flex items-center">
                  <AlertTriangle className="h-4 w-4 mr-1" />
                  Please select at least one PII field
                </div>
              )}
            </div>
            
            {/* Custom PII Section */}
            <div className="border-t border-gray-200 pt-6">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold text-gray-700">Request Additional PII Fields:</h3>
                {!showJustification && (
                  <button 
                    className="flex items-center text-purple-600 hover:text-purple-700"
                    onClick={handleAddCustomPII}
                  >
                    <Plus className="h-5 w-5 mr-1" />
                    Add Custom Fields
                  </button>
                )}
              </div>
              
              {showJustification && (
                <div className="bg-purple-50 p-6 rounded-lg">
                  <div className="flex items-start mb-1">
                    <AlertTriangle className="h-5 w-5 text-amber-500 mr-2 mt-1" />
                    <p className="text-sm text-gray-600">
                      Requesting additional PII data requires justification and may need approval
                    </p>
                  </div>
                  
                  <div className="mb-4 mt-4">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Specify PII Fields Needed:
                    </label>
                    <input
                      type="text"
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                      placeholder="e.g., Passport Number, Voter ID"
                      value={customPII}
                      onChange={(e) => setCustomPII(e.target.value)}
                    />
                  </div>
                  
                  <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Justification for Additional PII:
                    </label>
                    <textarea
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent h-32"
                      placeholder="Please explain why these additional PII fields are necessary..."
                      value={justification}
                      onChange={(e) => setJustification(e.target.value)}
                    />
                  </div>
                  
                  <div className="flex items-center">
                    <Info className="h-5 w-5 text-blue-500 mr-2" />
                    <p className="text-sm text-blue-600">
                      Your request will be reviewed by a data protection officer before approval
                    </p>
                  </div>
                </div>
              )}
            </div>
            
            {/* Submit Button */}
            <div className="mt-8 flex justify-end">
              <button 
                className={`flex items-center bg-gradient-to-r from-purple-600 to-indigo-600 text-white px-6 py-3 rounded-lg font-medium transition-all duration-300 shadow-md ${
                  selectedFields.length === 0 ? 'opacity-50 cursor-not-allowed' : 'hover:from-purple-700 hover:to-indigo-700'
                }`}
                onClick={handleSubmit}
                disabled={selectedFields.length === 0}
              >
                Submit Request
                <ArrowRight className="ml-2 h-5 w-5" />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default DocumentRequestTemplate;