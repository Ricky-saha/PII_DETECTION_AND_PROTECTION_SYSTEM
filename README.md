# PII Detection and Protection System

## Smart India Hackathon Project

This project is our submission for the Smart India Hackathon, addressing the critical need for protecting Personally Identifiable Information (PII) in digital documents and data.

## Problem Statement

The challenge is to create an application that can identify the presence of government-issued personally identifiable information (PII) embedded in documents and data, whether included intentionally or inadvertently. This solution aims to protect user privacy, prevent data leaks, and ensure compliance with data protection regulations.

## Our Solution

We have developed a comprehensive PII Detection and Protection System using Python and the MERN (MongoDB, Express.js, React.js, Node.js) stack. Our solution offers the following key functionalities:

1. **Automatic PII Detection**: The system scans uploaded documents to identify PII such as Aadhaar numbers, PAN cards, driving licenses, and other sensitive information.
2. **User-Controlled PII Masking**: After detection, users are prompted to confirm masking of the identified PII.
3. **Secure Cloud Storage**: Masked documents are securely uploaded to Cloudinary.
4. **Encrypted Data Storage**: User details and document links are encrypted using AES encryption before being stored in MongoDB.

### Features in Development

We are actively working on enhancing our system with the following features:

5. **Secure Admin Access**: Implementation of Two-Factor Authentication (2FA) using Google Authenticator for the admin panel.
6. **Blockchain Integration**: To ensure tamper-evident records, we are developing a feature to hash detected PII and record it in Ethereum transactions.

## Usage

Our PII Detection and Protection System helps prevent data leaks and enhance privacy in the following ways:

1. **Document Upload and PII Detection**:
   - Users upload documents through the web interface.
   - The system automatically scans and identifies any PII within the document.

2. **PII Masking**:
   - Users are alerted about detected PII and can choose which information to mask.
   - This prevents accidental sharing of sensitive information.

3. **Secure Storage**:
   - Masked documents are stored securely in the cloud (Cloudinary).
   - Document links and user details are encrypted before database storage.

4. **Data Leak Prevention**:
   - By identifying and masking PII, the system significantly reduces the risk of data leaks in document sharing and storage processes.

5. **Compliance Support**:
   - Helps organizations comply with data protection regulations by providing tools to identify and protect PII.

6. **User Awareness**:
   - Educates users about the presence of PII in their documents, promoting better data hygiene practices.

## Technology Stack

- **Frontend**: React.js
- **Backend**: Node.js, Express.js
- **Database**: MongoDB
- **PII Processing**: Python
- **Cloud Storage**: Cloudinary
- **Encryption**: AES
- **Authentication**: JWT

### Technologies for Features in Development
- **2FA**: Google Authenticator (in progress)
- **Blockchain**: Ethereum (planned integration)

## Getting Started

Setting up the project is straightforward:

1. Clone the repository:
   ```
   git clone https://github.com/Ricky-saha/PII_DETECTION_AND_PROTECTION_SYSTEM.git
   cd PII_DETECTION_AND_PROTECTION_SYSTEM
   ```

2. Install dependencies:
   ```
   npm i
   pip install -r requirements.txt
   ```

3. Start the MERN application (client and server):
   ```
   npm run dev
   ```

4. In a new terminal, start the Python script:
   ```
   python piii_web.py
   ```

## Screenshots and Demo

(Add your screenshots and demo video here)

## Future Developments

- Completion of Two-Factor Authentication (2FA) for enhanced admin panel security.
- Full implementation of blockchain integration for tamper-evident audit trails.
- Expansion of PII detection capabilities to cover more document types and data formats.
- Enhanced reporting and analytics features for better insights into PII management.


## Contact
- Team Name - Privacy Sentinels
- Team Leader Email - saharicky20@gmail.com

---

This project aims to address the critical need for PII protection in the digital age, offering a robust solution for individuals and organizations to safeguard sensitive information. While core functionalities are fully implemented, we are excited about the ongoing development of additional security features to further enhance the system's capabilities.
