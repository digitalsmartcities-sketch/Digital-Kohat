export const verificationTemplate = (otp) => `
<!DOCTYPE html>
<html>
<head>
    <style>
        .container { font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; max-width: 600px; margin: 0 auto; border: 1px solid #e0e0e0; border-radius: 10px; overflow: hidden; }
        .header { background: #0d6efd; color: white; padding: 20px; text-align: center; }
        .body { padding: 30px; text-align: center; line-height: 1.6; color: #333; }
        .otp-box { font-size: 32px; font-weight: bold; letter-spacing: 10px; background: #f4f4f4; padding: 20px; display: inline-block; border-radius: 8px; margin: 20px 0; border: 1px dashed #0d6efd; }
        .footer { background: #f1f1f1; padding: 20px; text-align: center; font-size: 0.8em; color: #777; }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h2>Verify Your Email</h2>
        </div>
        <div class="body">
            <p>Thank you for joining Digital Kohat! Use the code below to verify your account:</p>
            <div class="otp-box">${otp}</div>
            <p>This code is valid for 10 minutes. Please do not share this code with anyone.</p>
        </div>
        <div class="footer">
            <p>&copy; 2026 Digital Kohat. All rights reserved.</p>
        </div>
    </div>
</body>
</html>
`;
