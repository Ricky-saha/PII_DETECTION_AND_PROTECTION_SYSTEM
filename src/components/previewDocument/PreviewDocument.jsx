

// import React, { useEffect, useState } from 'react';
// import { useLocation, useNavigate } from 'react-router-dom';
// import { useDispatch, useSelector } from 'react-redux';
// import { uploadDocument } from '../../services/operations/authAPI';
// import './PreviewDocument.css';

// const PreviewDocument = () => {
//   const location = useLocation();
//   const navigate = useNavigate();
//   const dispatch = useDispatch();
//   const { token } = useSelector((state) => state.auth);

//   const { image } = location.state || {};

//   const [blurOptions, setBlurOptions] = useState({});
//   const [checkedOptions, setCheckedOptions] = useState({});
//   const [blurredImage, setBlurredImage] = useState(null); // state to hold the blurred image recived from the oython code in the backend
//   const [loading, setLoading] = useState(false);

//   useEffect(() => {
//     const fetchBlurOptions = async () => {
//       if (image) {
//         setLoading(true);
//         try {
//           const formData = new FormData();
//           formData.append('file', image);

//           const response = await fetch('http://localhost:8081/upload', {
//             method: 'POST',
//             body: formData,
//           });

//           if (response.ok) {
//             const data = await response.json();
//             setBlurOptions(data);
//           } else {
//             console.error('Failed to fetch blur options:', response.statusText);
//           }
//         } catch (error) {
//           console.error('Error fetching blur options:', error);
//         } finally {
//           setLoading(false);
//         }
//       }
//     };

//     fetchBlurOptions();
//   }, [image]);

//   const handleCheckboxChange = (option) => {
//     setCheckedOptions((prev) => ({
//       ...prev,
//       [option]: !prev[option],
//     }));
//   };

//   const handleUpload = async () => {
//     if (image) {
//       try {
//         const reader = new FileReader();
//         reader.onloadend = async () => {
//           const base64Image = reader.result.split(',')[1];

//           const selectedBlurOptions = Object.keys(checkedOptions).reduce((acc, key) => {
//             if (checkedOptions[key]) {
//               acc[key] = blurOptions[key];
//             }
//             return acc;
//           }, {});

//           const response = await fetch('http://localhost:8081/blur', {
//             method: 'POST',
//             headers: {
//               'Content-Type': 'application/json',
//             },
//             body: JSON.stringify({
//               image: base64Image,
//               blurOptions: selectedBlurOptions,
//             }),
//           });

//           if (response.ok) {
//             const data = await response.json();
//             setBlurredImage(data.blurredImage); // set the blurred image from response
//           } else {
//             console.error('Blur request failed:', response.statusText);
//           }
//         };

//         reader.readAsDataURL(image);
//       } catch (error) {
//         console.error('Upload failed:', error);
//       }
//     }
//   };

//   // function to upload the blurred image after 2 seconds, ye isliye rkha h taki preview mein blurred image dikhe
//   const uploadBlurredImage = async () => {
//     if (blurredImage) {
//       const blurredImageBlob = await fetch(`data:image/png;base64,${blurredImage}`).then(res => res.blob());
//       await dispatch(uploadDocument(blurredImageBlob, token));
//       navigate('/');
//     }
//   };

//   useEffect(() => {
//     if (blurredImage) {
//       const timer = setTimeout(() => {
//         uploadBlurredImage();
//       }, 2000);

//       return () => clearTimeout(timer);
//     }
//   }, [blurredImage]);

//   return (
//     <div>
//       <div className="container">
//         <div className="image-blur-selector">
//           <div className="preview-section">
//             <h2>Preview Image</h2>
//             <div className="image-placeholder">
//               {blurredImage ? (
//                 <img src={`data:image/png;base64,${blurredImage}`} alt="Blurred Preview" />
//               ) : image ? (
//                 <img src={URL.createObjectURL(image)} alt="Original Preview" />
//               ) : (
//                 <p>No image selected</p>
//               )}
//             </div>
//           </div>
//           <div className="options-section">
//             <h2>Select Blur Options</h2>
//             {loading ? (
//               <p>Loading your PII details... Please wait...</p>
//             ) : (
//               <div className="checkbox-group">
//                 {Object.entries(blurOptions).map(([key]) => (
//                   <label key={key}>
//                     <input
//                       type="checkbox"
//                       checked={!!checkedOptions[key]}
//                       onChange={() => handleCheckboxChange(key)}
//                     />
//                     <span>{key}</span>
//                   </label>
//                 ))}
//               </div>
//             )}
//             <button onClick={handleUpload} className="upload-button">
//               Apply Blur
//             </button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default PreviewDocument;

import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { uploadDocument } from '../../services/operations/authAPI';
import { motion } from 'framer-motion';
import { FiCheck, FiImage, FiUpload } from 'react-icons/fi';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const PreviewDocument = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { token } = useSelector((state) => state.auth);

  const { image } = location.state || {};

  const [blurOptions, setBlurOptions] = useState({});
  const [checkedOptions, setCheckedOptions] = useState({});
  const [blurredImage, setBlurredImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [maskingComplete, setMaskingComplete] = useState(false);
  const [detectingPII, setDetectingPII] = useState(false);

  useEffect(() => {
    const fetchBlurOptions = async () => {
      if (image) {
        setDetectingPII(true);
        const toastId = toast.loading("Detecting PII... Please wait", {
          position: "bottom-right",
          autoClose: false,
        });
        try {
          const formData = new FormData();
          formData.append('file', image);

          const response = await fetch('http://localhost:8081/upload', {
            method: 'POST',
            body: formData,
          });

          if (response.ok) {
            const data = await response.json();
            setBlurOptions(data);
            toast.update(toastId, {
              render: "PII detection complete",
              type: "success",
              isLoading: false,
              autoClose: 3000,
            });
          } else {
            console.error('Failed to fetch blur options:', response.statusText);
            toast.update(toastId, {
              render: "Failed to detect PII",
              type: "error",
              isLoading: false,
              autoClose: 3000,
            });
          }
        } catch (error) {
          console.error('Error fetching blur options:', error);
          toast.update(toastId, {
            render: "Error detecting PII",
            type: "error",
            isLoading: false,
            autoClose: 3000,
          });
        } finally {
          setDetectingPII(false);
        }
      }
    };

    fetchBlurOptions();
  }, [image]);

  const handleCheckboxChange = (option) => {
    setCheckedOptions((prev) => ({
      ...prev,
      [option]: !prev[option],
    }));
  };

  const handleMaskPII = async () => {
    if (image) {
      setLoading(true);
      const toastId = toast.loading("Masking PII... Please wait", {
        position: "bottom-right",
        autoClose: false,
      });
      try {
        const reader = new FileReader();
        reader.onloadend = async () => {
          const base64Image = reader.result.split(',')[1];

          const selectedBlurOptions = Object.keys(checkedOptions).reduce((acc, key) => {
            if (checkedOptions[key]) {
              acc[key] = blurOptions[key];
            }
            return acc;
          }, {});

          const response = await fetch('http://localhost:8081/blur', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              image: base64Image,
              blurOptions: selectedBlurOptions,
            }),
          });

          if (response.ok) {
            const data = await response.json();
            setBlurredImage(data.blurredImage);
            setMaskingComplete(true);
            toast.update(toastId, {
              render: "PII masking complete",
              type: "success",
              isLoading: false,
              autoClose: 3000,
            });
          } else {
            console.error('Blur request failed:', response.statusText);
            toast.update(toastId, {
              render: "Failed to mask PII",
              type: "error",
              isLoading: false,
              autoClose: 3000,
            });
          }
        };

        reader.readAsDataURL(image);
      } catch (error) {
        console.error('Masking failed:', error);
        toast.update(toastId, {
          render: "Error masking PII",
          type: "error",
          isLoading: false,
          autoClose: 3000,
        });
      } finally {
        setLoading(false);
      }
    }
  };

  const handleUpload = async () => {
    if (blurredImage) {
      setLoading(true);
      const toastId = toast.loading("Uploading document... Please wait", {
        position: "bottom-right",
        autoClose: false,
      });
      try {
        const blurredImageBlob = await fetch(`data:image/png;base64,${blurredImage}`).then(res => res.blob());
        await dispatch(uploadDocument(blurredImageBlob, token));
        toast.update(toastId, {
          render: "Document uploaded successfully",
          type: "success",
          isLoading: false,
          autoClose: 3000,
        });
        navigate('/');
      } catch (error) {
        console.error('Upload failed:', error);
        toast.update(toastId, {
          render: "Failed to upload document",
          type: "error",
          isLoading: false,
          autoClose: 3000,
        });
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-purple-200 via-pink-100 to-indigo-200">
      <ToastContainer />
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row gap-8">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="w-full md:w-1/2 bg-white rounded-lg shadow-xl p-6"
          >
            <h2 className="text-2xl font-bold mb-4 text-gray-800">Preview Image</h2>
            <div className="relative h-64 bg-gray-100 rounded-lg overflow-hidden">
              {blurredImage ? (
                <img src={`data:image/png;base64,${blurredImage}`} alt="Blurred Preview" className="w-full h-full object-cover" />
              ) : image ? (
                <img src={URL.createObjectURL(image)} alt="Original Preview" className="w-full h-full object-cover" />
              ) : (
                <div className="flex items-center justify-center h-full">
                  <FiImage className="text-gray-400 w-16 h-16" />
                </div>
              )}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="w-full md:w-1/2 bg-white rounded-lg shadow-xl p-6"
          >
            <h2 className="text-2xl font-bold mb-4 text-gray-800">Select Blur Options</h2>
            {detectingPII ? (
              <p className="text-gray-600">Detecting PII... Please wait</p>
            ) : loading ? (
              <p className="text-gray-600">Processing... Please wait</p>
            ) : (
              <div className="space-y-2">
                {Object.entries(blurOptions).map(([key]) => (
                  <label key={key} className="flex items-center space-x-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={!!checkedOptions[key]}
                      onChange={() => handleCheckboxChange(key)}
                      className="form-checkbox h-5 w-5 text-indigo-600 transition duration-150 ease-in-out"
                      disabled={detectingPII || loading}
                    />
                    <span className="text-gray-700">{key}</span>
                  </label>
                ))}
              </div>
            )}
            {!maskingComplete ? (
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleMaskPII}
                disabled={detectingPII || loading}
                className={`mt-6 w-full bg-gradient-to-r from-purple-500 to-indigo-600 text-white font-bold py-3 px-4 rounded-lg transition duration-300 ease-in-out transform hover:-translate-y-1 hover:shadow-lg flex items-center justify-center ${
                  (detectingPII || loading) ? 'opacity-50 cursor-not-allowed' : 'hover:from-purple-600 hover:to-indigo-700'
                }`}
              >
                <FiUpload className="mr-2" />
                Mask your PII
              </motion.button>
            ) : (
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleUpload}
                disabled={loading}
                className={`mt-6 w-full bg-gradient-to-r from-green-500 to-blue-600 text-white font-bold py-3 px-4 rounded-lg transition duration-300 ease-in-out transform hover:-translate-y-1 hover:shadow-lg flex items-center justify-center ${
                  loading ? 'opacity-50 cursor-not-allowed' : 'hover:from-green-600 hover:to-blue-700'
                }`}
              >
                <FiCheck className="mr-2" />
                Upload
              </motion.button>
            )}
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default PreviewDocument;