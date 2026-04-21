export const passwordResetTemplate = (resetLink) => `
<!DOCTYPE html>
<html>
<head>
    <style>
        .container { font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; max-width: 600px; margin: 0 auto; border: 1px solid #e0e0e0; border-radius: 10px; overflow: hidden; }
        .header { background: #dc3545; color: white; padding: 20px; text-align: center; }
        .body { padding: 30px; line-height: 1.6; color: #333; }
        .btn-reset { display: block; width: 200px; margin: 25px auto; padding: 15px; background: #dc3545; color: white; text-decoration: none; text-align: center; border-radius: 5px; font-weight: bold; }
        .footer { background: #f1f1f1; padding: 20px; text-align: center; font-size: 0.8em; color: #777; }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h2>Password Reset Request</h2>
        </div>
        <div class="body">
            <p>We received a request to reset your password. Click the button below to set a new password:</p>
            <a href="${resetLink}" class="btn-reset">Reset Password</a>
            <p>If you didn't request this, you can safely ignore this email. The link will expire in 1 hour.</p>
        </div>
        <div class="footer">
            <p>&copy; 2026 Digital Kohat. All rights reserved.</p>
        </div>
    </div>
</body>
</html>
`;
