//---------------------------- Uploading to Cloudinary -------------------------------------------
// import { uploadImageToCloudinary } from '../utils/imageUploader.js'; 
// import User from '../models/User.js'; 
// import Document from '../models/Document.js'
// import { encrypt } from '../utils/Hashing.js';

// //create Document
// export const createDocument = async (req, res) => {
//     try {
//         console.log('User from request:', req.user);
//         console.log('Files:', req.files);

//         if (!req.user || !req.user.id) {
//             console.log('Auth error. Headers:', req.headers);
//             console.log('Auth error. User:', req.user);
//             return res.status(401).json({
//                 success: false,
//                 message: "Authentication required",
//             });
//         }

//         const userId = req.user.id;
//         const documentImage = req.files?.documentImage;

//         if (!documentImage) {
//             return res.status(400).json({
//                 success: false,
//                 message: "Document image is mandatory",
//             });
//         }

//         // Upload image to Cloudinary
//         const uploadedDocument = await uploadImageToCloudinary(
//             documentImage,
//             process.env.FOLDER_NAME
//         );
//         console.log("Uploaded document:", uploadedDocument);

        
//         // Encrypt the document URL
//         const secretkey = process.env.ENCRYPTION_SECRET;
//         const encryptedDocumentUrl = encrypt(uploadedDocument.secure_url,secretkey);

//         // Create a new Document with encrypted URL
//         const newDocument = await Document.create({
//             documentUrl: encryptedDocumentUrl,
//         });

//         // Add the document reference to the User
//         const updatedUser = await User.findByIdAndUpdate(
//             userId,
//             {
//                 $push: {
//                     documents: newDocument._id
//                 }
//             },
//             { new: true }
//         ).populate('documents');

//         if (!updatedUser) {
//             return res.status(404).json({
//                 success: false,
//                 message: "User not found or document couldn't be added",
//             });
//         }

//         res.status(200).json({
//             success: true,
//             data: newDocument,
//             message: "Document Uploaded Successfully",
//         });
//     } catch (error) {
//         console.error("Error in createDocument:", error);
//         res.status(500).json({
//             success: false,
//             message: "Failed to upload Document",
//             error: error.message,
//         });
//     }
// };


//--------------------------------------------------------------------- upload to IPFS------------------------------------------------
import User from "../models/User.js";
import Document from "../models/Document.js";
import { encrypt } from "../utils/Hashing.js";
import { uploadToIPFS } from "../utils/ipfsUploader.js"; 

// Create Document
export const createDocument = async (req, res) => {
    try {
        console.log("User from request:", req.user);
        console.log("Files:", req.files);

        if (!req.user || !req.user.id) {
            console.log("Auth error. Headers:", req.headers);
            console.log("Auth error. User:", req.user);
            return res.status(401).json({
                success: false,
                message: "Authentication required",
            });
        }

        const userId = req.user.id;
        const documentImage = req.files?.documentImage;

        if (!documentImage) {
            return res.status(400).json({
                success: false,
                message: "Document image is mandatory",
            });
        }

        // Upload the document to IPFS
        const ipfsHash = await uploadToIPFS(documentImage);
        if (!ipfsHash) {
            return res.status(500).json({
                success: false,
                message: "Failed to upload document to IPFS",
            });
        }

        console.log("Uploaded to IPFS. CID:", ipfsHash);

        // Encrypt the IPFS CID
        const secretKey = process.env.ENCRYPTION_SECRET;
        const encryptedCID = encrypt(ipfsHash, secretKey);

        // Create a new Document entry with encrypted IPFS hash
        const newDocument = await Document.create({
            documentUrl: encryptedCID,
        });

        // Add the document reference to the User
        const updatedUser = await User.findByIdAndUpdate(
            userId,
            { $push: { documents: newDocument._id } },
            { new: true }
        ).populate("documents");

        if (!updatedUser) {
            return res.status(404).json({
                success: false,
                message: "User not found or document couldn't be added",
            });
        }

        res.status(200).json({
            success: true,
            data: newDocument,
            message: "Document uploaded successfully to IPFS",
        });
    } catch (error) {
        console.error("Error in createDocument:", error);
        res.status(500).json({
            success: false,
            message: "Failed to upload Document",
            error: error.message,
        });
    }
};