export const enrollmentStatusTemplate = (courseName, status, reason, whatsappGroupLink = "") => `
<!DOCTYPE html>
<html>
<head>
    <style>
        .container { font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; max-width: 600px; margin: 0 auto; border: 1px solid #e0e0e0; border-radius: 10px; overflow: hidden; }
        .header { background: #10b981; color: white; padding: 20px; text-align: center; }
        .header.rejected { background: #ef4444; }
        .body { padding: 30px; text-align: center; line-height: 1.6; color: #333; }
        .status-badge { font-size: 20px; font-weight: bold; background: #f4f4f4; padding: 10px 20px; display: inline-block; border-radius: 8px; margin: 20px 0; border: 1px solid #10b981; color: #10b981; }
        .status-badge.rejected { border-color: #ef4444; color: #ef4444; }
        .reason-box { background: #fee2e2; border: 1px solid #fecaca; color: #b91c1c; padding: 15px; border-radius: 8px; margin: 20px 0; text-align: left; }
        .whatsapp-btn { background: #25d366; color: white; padding: 12px 25px; text-decoration: none; border-radius: 5px; font-weight: bold; display: inline-block; margin-top: 15px; }
        .footer { background: #f1f1f1; padding: 20px; text-align: center; font-size: 0.8em; color: #777; }
    </style>
</head>
<body>
    <div class="container">
        <div class="header ${status === 'Rejected' ? 'rejected' : ''}">
            <h2>Enrollment Update</h2>
        </div>
        <div class="body">
            <p>Hello,</p>
            <p>Your enrollment in the course <strong>${courseName}</strong> has been updated.</p>
            <div class="status-badge ${status === 'Rejected' ? 'rejected' : ''}">${status === 'Approved' ? '✅ Confirmed' : '❌ Rejected'}</div>
            
            ${status === 'Approved' 
                ? `<div>
                    <p>Welcome to the course! You can now access your lessons from the portal.</p>
                    <p>Please join our official WhatsApp group for updates and communication:</p>
                    <a href="${whatsappGroupLink}" class="whatsapp-btn">Join WhatsApp Group</a>
                    <p style="font-size: 0.9em; color: #666; margin-top: 10px;">If the button above doesn't work, copy this link: ${whatsappGroupLink}</p>
                   </div>`
                : `<div class="reason-box"><strong>Reason for Rejection:</strong><br/>${reason}</div><p>If you have any questions, please contact our support team.</p>`}
        </div>
        <div class="footer">
            <p>&copy; 2026 Digital Kohat. All rights reserved.</p>
        </div>
    </div>
</body>
</html>
`;
