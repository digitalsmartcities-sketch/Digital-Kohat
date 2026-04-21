export const appointmentTemplate = (patientName, doctorName, date, time, appointmentNumber, consultationType, meetingLink) => {
    const isOnline = consultationType === "ONLINE";
    
    return `
<!DOCTYPE html>
<html>
<head>
    <style>
        .container { font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; max-width: 600px; margin: 0 auto; border: 1px solid #e0e0e0; border-radius: 10px; overflow: hidden; }
        .header { background: linear-gradient(135deg, #1f8e5c 0%, #145c3b 100%); color: white; padding: 30px; text-align: center; }
        .body { padding: 30px; line-height: 1.6; color: #333; }
        .appt-box { background: #f8f9fa; border-left: 5px solid #1f8e5c; padding: 20px; margin: 20px 0; }
        .number-badge { display: inline-block; background: #1f8e5c; color: white; padding: 5px 15px; border-radius: 20px; font-weight: bold; font-size: 1.2em; }
        .btn-join { display: inline-block; background: #1f8e5c; color: white; padding: 12px 25px; text-decoration: none; border-radius: 5px; font-weight: bold; margin-top: 15px; }
        .footer { background: #f1f1f1; padding: 20px; text-align: center; font-size: 0.8em; color: #777; }
        .logo { font-size: 24px; font-weight: bold; margin-bottom: 10px; }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <div class="logo">Digital Kohat Health</div>
            <h1>Appointment Confirmed</h1>
        </div>
        <div class="body">
            <p>Dear <strong>${patientName}</strong>,</p>
            <p>Your appointment with <strong>Dr. ${doctorName}</strong> has been successfully confirmed. Please find your appointment details below:</p>
            
            <div class="appt-box">
                <p><strong>Type:</strong> ${consultationType || "IN-CLINIC"}</p>
                <p><strong>Date:</strong> ${date}</p>
                <p><strong>Time:</strong> ${time}</p>
                <p><strong>Your Appointment Number:</strong> <span class="number-badge">${appointmentNumber}</span></p>
                
                ${isOnline && meetingLink ? `
                    <div style="margin-top: 20px; padding-top: 15px; border-top: 1px solid #ddd;">
                        <p><strong>Meeting Link:</strong> <a href="${meetingLink}">${meetingLink}</a></p>
                        <a href="${meetingLink}" class="btn-join">Join Online Consultation</a>
                    </div>
                ` : ""}
            </div>
            
            <p>${isOnline ? "Please ensure you have a stable internet connection for your consultation." : "Please arrive at least 15 minutes before your scheduled time."} If you need to cancel or reschedule, please contact the clinic directly.</p>
            
            <p>Best Regards,<br>The Digital Kohat Team</p>
        </div>
        <div class="footer">
            <p>&copy; 2026 Digital Kohat Health Services. All rights reserved.</p>
            <p>This is an automated message, please do not reply to this email.</p>
        </div>
    </div>
</body>
</html>
`;
};
