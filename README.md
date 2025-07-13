
# PII Detection and Protection System

## Hackathon Project

This project is our submission for the Hackathon, addressing the critical need for protecting Personally Identifiable Information (PII) in digital documents and data.

## Problem Statement

The challenge is to create an application that can identify the presence of government-issued personally identifiable information (PII) embedded in documents and data, whether included intentionally or inadvertently. This solution aims to protect user privacy, prevent data leaks, and ensure compliance with data protection regulations.

## Our Solution

We have developed a comprehensive PII Detection and Protection System using Python and the MERN (MongoDB, Express.js, React.js, Node.js) stack. Our solution offers the following key functionalities:

1. **Automatic PII Detection**: The system scans uploaded documents to identify PII such as Aadhaar numbers, PAN cards, driving licenses, and other sensitive information.
2. **User-Controlled PII Masking**: After detection, users are prompted to confirm masking of the identified PII.
3. **Secure Cloud Storage**: Masked documents are securely uploaded to Cloudinary.
4. **Encrypted Data Storage**: User details and document links are encrypted using AES encryption before being stored in MongoDB.
5. **Secure Admin Access**: Implementation of Two-Factor Authentication (2FA) using Google Authenticator for the admin panel.

### Features in Development

We are actively working on enhancing our system with the following features:

6. **Blockchain Integration**: To ensure tamper-evident records, we are developing a feature to hash detected PII and record it in Ethereum transactions.



---



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

---

## Technology Stack

- **Frontend**: React.js
- **Backend**: Node.js, Express.js
- **Database**: MongoDB
- **PII Processing**: Python
- **Cloud Storage**: Cloudinary
- **Encryption**: AES
- **Authentication**: JWT
- **2FA**: node mailer

### Technologies for Features in Development
- 
- **Blockchain**: Ethereum (planned integration)

---

## Getting Started

Setting up the project is straightforward:

1. Clone the repository:
   ```bash
   git clone https://github.com/Ricky-saha/PII_DETECTION_AND_PROTECTION_SYSTEM.git
   cd PII_DETECTION_AND_PROTECTION_SYSTEM
   ```

2. Install dependencies:
   ```bash
   npm install
   pip install -r requirements.txt
   ```

3. Start the MERN application (client and server):
   ```bash
   npm run dev
   ```

4. In a new terminal, start the Python script:
   ```bash
   python pii_web.py
   ```

---

## Screenshots and Demo

![Screenshot 1](https://github.com/user-attachments/assets/898d9703-b3ca-4cd1-85b0-2dc36c511c21)
![Screenshot 2](https://github.com/user-attachments/assets/e707a202-be7d-49f2-9448-0791bbed87cd)
![Screenshot 3](https://github.com/user-attachments/assets/f75c53fc-dcbe-4cff-9b4d-7c89a52ceac2)
![Screenshot 4](https://github.com/user-attachments/assets/44609631-3b9f-4887-ba66-7e74362840da)
![Screenshot 5](https://github.com/user-attachments/assets/042fc99b-6462-4664-b18e-f43b037ee958)
![Screenshot 6](https://github.com/user-attachments/assets/437ba8c3-6fe1-4289-9743-3571484fd7fc)
![Screenshot 7](https://github.com/user-attachments/assets/2190d515-ca3f-444b-b9fb-c6f5cc438deb)
![Screenshot 8](https://github.com/user-attachments/assets/15d1931d-34b5-4b7a-8683-2af035905bce)
![Screenshot 9](https://github.com/user-attachments/assets/b2083073-e880-495b-a6d4-2be70e5eacb8)
![Screenshot 10](https://github.com/user-attachments/assets/46619e23-ce7c-46c1-a0e6-d2978513be8d)
![Screenshot 11](https://github.com/user-attachments/assets/37d96ad6-ce9c-4e91-bf1b-00bb68e56794)

<img width="1918" height="865" alt="2fa1" src="https://github.com/user-attachments/assets/21ea10c8-d90f-4951-879b-b06dda0d2621" />

---<img width="1592" height="741" alt="2fa2" src="https://github.com/user-attachments/assets/c5771a0e-49f7-4486-ad1e-85d096d1223d" />

<img width="1918" height="866" alt="admin panel" src="https://github.com/user-attachments/assets/8cb93381-018a-4cf6-87eb-9cca518c341c" />
<img width="1898" height="866" alt="request panel 1" src="https://github.com/user-attachments/assets/dbe91c5b-9eaf-4e0d-8e9e-e12107a83773" />
<img width="1441" height="867" alt="requestpanel2" src="https://github.com/user-attachments/assets/8377b407-e58a-4d0a-b588-1a331796af62" />
<img width="1893" height="657" alt="req3" src="https://github.com/user-attachments/assets/fbdc66ff-30f7-4b99-b470-8003aa57989a" />



## Future Developments

- Full implementation of blockchain integration for tamper-evident audit trails.
- Expansion of PII detection capabilities to cover more document types and data formats.
- Enhanced reporting and analytics features for better insights into PII management.

---

## Contact

- **Team Name**: Invincibles  
- **Email**: saharicky20@gmail.com

---

This project addresses the critical need for PII protection in the digital age, offering a robust solution for individuals and organizations to safeguard sensitive information. While core functionalities are fully implemented, we are excited about the ongoing development of additional security features to further enhance the system's capabilities.
