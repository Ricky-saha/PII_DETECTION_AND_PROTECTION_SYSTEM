const otpTemplate = (otp) => {
	return `<!DOCTYPE html>
  <html lang="en">
	<head>
	  <meta charset="UTF-8">
	  <meta name="viewport" content="width=device-width, initial-scale=1.0">
	  <title>Your 2FA Verification Code</title>
	  <style>
		:root {
		  --primary-color: #1890ff;
		  --secondary-color: #0066cc;
		  --accent-color: #e6f7ff;
		  --text-color: #333333;
		  --light-text: #666666;
		  --success-color: #52c41a;
		  --background-color: #ffffff;
		  --border-color: #e8e8e8;
		}
		
		body {
		  background-color: #f5f7fa;
		  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
		  font-size: 16px;
		  line-height: 1.6;
		  color: var(--text-color);
		  margin: 0;
		  padding: 0;
		}
		
		.email-container {
		  max-width: 600px;
		  margin: 20px auto;
		  background-color: var(--background-color);
		  border-radius: 8px;
		  overflow: hidden;
		  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
		}
		
		.email-header {
		  background-color: var(--primary-color);
		  padding: 25px 30px;
		  text-align: center;
		}
		
		.logo {
		  max-width: 200px;
		  height: auto;
		}
		
		.email-body {
		  padding: 30px;
		  background-color: var(--background-color);
		}
		
		.email-greeting {
		  font-size: 18px;
		  margin-bottom: 15px;
		  color: var(--text-color);
		}
		
		.email-message {
		  margin-bottom: 25px;
		  color: var(--text-color);
		}
		
		.otp-container {
		  background-color: var(--accent-color);
		  border-radius: 8px;
		  padding: 20px;
		  margin: 25px 0;
		  text-align: center;
		  border-left: 4px solid var(--primary-color);
		}
		
		.otp-code {
		  font-family: 'Courier New', Courier, monospace;
		  font-size: 32px;
		  font-weight: bold;
		  letter-spacing: 5px;
		  color: var(--secondary-color);
		  margin: 10px 0;
		}
		
		.otp-expiry {
		  font-size: 14px;
		  color: var(--light-text);
		  margin-top: 10px;
		}
		
		.security-notice {
		  background-color: #fff8e6;
		  border-left: 4px solid #ffbb00;
		  padding: 15px;
		  margin: 25px 0;
		  font-size: 14px;
		  color: #8b6d00;
		  border-radius: 4px;
		}
		
		.email-footer {
		  padding: 20px 30px;
		  background-color: #f9f9f9;
		  text-align: center;
		  border-top: 1px solid var(--border-color);
		}
		
		.social-links {
		  margin-bottom: 15px;
		}
		
		.social-icon {
		  display: inline-block;
		  margin: 0 8px;
		}
		
		.team-signature {
		  font-weight: 600;
		  color: var(--secondary-color);
		  margin-bottom: 5px;
		}
		
		.copyright {
		  font-size: 12px;
		  color: var(--light-text);
		}
		
		.support-link {
		  color: var(--primary-color);
		  text-decoration: none;
		  font-weight: 500;
		}
		
		.support-link:hover {
		  text-decoration: underline;
		}
		
		.shield-icon {
		  width: 24px;
		  height: 24px;
		  vertical-align: middle;
		  margin-right: 6px;
		}
	  </style>
	</head>
	
	<body>
	  <div class="email-container">
		<div class="email-header">
		  <h1 style="color: white; margin: 0;">PII Detection & Protection System</h1>
		</div>
		
		<div class="email-body">
		  <div class="email-greeting">Hello Admin,</div>
		  
		  <div class="email-message">
			<p>Thank you for using our secure two-factor authentication system. To complete your verification process, please use the following one-time password:</p>
		  </div>
		  
		  <div class="otp-container">
			<div class="otp-code">${otp}</div>
			<div class="otp-expiry">This code will expire in 5 minutes</div>
		  </div>
		  
		  <div class="email-message">
			<p>Please enter this code on the verification page to continue securely accessing your account. If you did not request this code, please ignore this email.</p>
		  </div>
		  
		  <div class="security-notice">
			<svg class="shield-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
			  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
			</svg>
			<strong>Security Notice:</strong> Our team will never ask you to share this code with anyone. For your security, do not share this code with others.
		  </div>
		</div>
		
		<div class="email-footer">
		  <div class="team-signature">Team Invincibles</div>
		  <p>PII Detection and Protection System</p>
		  <p class="copyright">© 2025 Team Invincibles. All rights reserved.</p>
		  <p>If you need assistance, please contact us at <a href="mailto:support@piiprotection.com" class="support-link">support@piiprotection.com</a></p>
		</div>
	  </div>
	</body>
  </html>`;
  };
  
  export default otpTemplate;