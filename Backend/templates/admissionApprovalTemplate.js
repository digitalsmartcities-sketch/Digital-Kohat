export const admissionApprovalTemplate = (studentName, instituteName, targetClass) => `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <style>
        body { margin: 0; padding: 0; background-color: #f0fdf4; }
        .wrapper { width: 100%; table-layout: fixed; background-color: #f0fdf4; padding-bottom: 40px; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; }
        .main-container { max-width: 600px; background-color: #ffffff; margin: 40px auto; border-radius: 16px; overflow: hidden; box-shadow: 0 10px 25px rgba(0,0,0,0.05); border: 1px solid #d1fae5; }
        .header { background: linear-gradient(135deg, #059669 0%, #064e3b 100%); padding: 40px 20px; text-align: center; }
        .header h1 { color: #ffffff; margin: 0; font-size: 24px; letter-spacing: -0.5px; font-weight: 700; }
        .content { padding: 40px; color: #1a1f36; line-height: 1.6; }
        .greeting { font-size: 18px; margin-bottom: 16px; color: #1a1f36; }
        .announcement { font-size: 16px; color: #374151; margin-bottom: 32px; }
        .admission-card { background-color: #f0fdf4; border: 1px solid #d1fae5; border-radius: 12px; padding: 24px; margin-bottom: 32px; text-align: left; }
        .card-title { font-weight: 700; color: #059669; text-transform: uppercase; font-size: 12px; letter-spacing: 1px; margin-bottom: 16px; display: block; }
        .info-row { margin-bottom: 10px; font-size: 15px; display: flex; align-items: center; }
        .info-label { color: #6b7280; width: 110px; font-weight: 500; }
        .info-value { font-weight: 600; color: #111827; }
        .badge { background-color: #d1fae5; color: #065f46; padding: 6px 12px; border-radius: 9999px; font-size: 12px; font-weight: 700; display: inline-block; margin-bottom: 20px; }
        .next-steps { border-left: 4px solid #059669; padding: 20px; margin: 32px 0; border-radius: 0 8px 8px 0; background-color: #f9fffb; }
        .next-steps h3 { margin: 0 0 12px 0; font-size: 16px; font-weight: 700; color: #111827; }
        .next-steps p { margin: 0; font-size: 14px; color: #4b5563; }
        .cta-container { text-align: center; margin-top: 40px; }
        .btn { background-color: #064e3b; color: white !important; padding: 14px 32px; text-decoration: none; border-radius: 8px; font-weight: 600; font-size: 15px; display: inline-block; }
        .footer { padding: 30px; text-align: center; background-color: #f9fafb; border-top: 1px solid #f3f4f6; }
        .footer p { margin: 0; font-size: 13px; color: #6b7280; line-height: 1.8; }
        .tagline { color: #059669; font-weight: 600; margin-top: 32px; font-size: 16px; }
    </style>
</head>
<body>
    <div class="wrapper">
        <div class="main-container">
            <div class="header">
                <h1>Admission Confirmed</h1>
            </div>
            <div class="content">
                <p class="greeting">Hello <strong>${studentName}</strong>,</p>
                <div class="badge">✅ Admission Approved</div>
                <p class="announcement">We are delighted to inform you that your admission request has been <strong>successfully approved</strong> by the institute!</p>
                
                <div class="admission-card">
                    <span class="card-title">Enrollment Details</span>
                    <div class="info-row">
                        <span class="info-label">Institute:</span>
                        <span class="info-value">${instituteName}</span>
                    </div>
                    <div class="info-row">
                        <span class="info-label">Current Class:</span>
                        <span class="info-value">${targetClass}</span>
                    </div>
                    <div class="info-row">
                        <span class="info-label">Status:</span>
                        <span class="info-value" style="color: #059669;">Confirmed ✅</span>
                    </div>
                </div>

                <div class="next-steps">
                    <h3>What happens next?</h3>
                    <p>Please contact the institute's administration directly to finalize the documentation and proceed with the fee payment process.</p>
                </div>

                <p class="tagline">Wishing you an incredible academic journey!</p>
            </div>
            <div class="footer">
                <p>&copy; 2026 Digital Kohat. All rights reserved.<br/>Advancing Education through Innovation.</p>
                <p>Kohat, Pakistan</p>
            </div>
        </div>
    </div>
</body>
</html>
`;
