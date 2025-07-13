// Server/zkp/verifier.js
import DocumentAuthenticityCircuit from './circuits/documentAuthenticity';
import PIIAccessCircuit from './circuits/piiAccess';

class ZKPVerifier {
  // Verify document authenticity
  async verifyDocument(documentHash) {
    // Simulate tamper detection flag
    const tamperFlag = 1; // 1 means not tampered

    return DocumentAuthenticityCircuit.verifyDocument(
      documentHash, 
      tamperFlag
    );
  }

  // Generate PII access proof
  async generatePIIAccessProof(requiredFields, accessToken) {
    return PIIAccessCircuit.generateAccessProof(
      requiredFields, 
      accessToken
    );
  }
}

export default new ZKPVerifier();