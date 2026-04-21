export const serviceProviderApprovalTemplate = (adminName, serviceName, sector, credentialsInstruction) => `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <style>
        body { margin: 0; padding: 0; background-color: #f6f9fc; }
        .wrapper { width: 100%; table-layout: fixed; background-color: #f6f9fc; padding-bottom: 40px; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; }
        .main-container { max-width: 600px; background-color: #ffffff; margin: 40px auto; border-radius: 16px; overflow: hidden; box-shadow: 0 10px 25px rgba(0,0,0,0.05); border: 1px solid #e1e8ef; }
        .header { background: linear-gradient(135deg, #0d6efd 0%, #0046af 100%); padding: 40px 20px; text-align: center; }
        .header h1 { color: #ffffff; margin: 0; font-size: 24px; letter-spacing: -0.5px; font-weight: 700; }
        .content { padding: 40px; color: #1a1f36; line-height: 1.6; }
        .greeting { font-size: 18px; margin-bottom: 16px; color: #1a1f36; }
        .announcement { font-size: 16px; color: #4f566b; margin-bottom: 32px; }
        .service-card { background-color: #f8fafc; border: 1px solid #edf2f7; border-radius: 12px; padding: 24px; margin-bottom: 32px; text-align: left; }
        .service-card-title { font-weight: 700; color: #0d6efd; text-transform: uppercase; font-size: 12px; letter-spacing: 1px; margin-bottom: 16px; display: block; }
        .info-row { margin-bottom: 10px; font-size: 15px; display: flex; align-items: center; }
        .info-label { color: #697386; width: 100px; font-weight: 500; }
        .info-value { font-weight: 600; color: #1a1f36; }
        .steps-box { background-color: #ffffff; border-left: 4px solid #0d6efd; padding: 20px; margin: 32px 0; border-radius: 0 8px 8px 0; background-color: #f9f9ff; }
        .steps-box h3 { margin: 0 0 16px 0; font-size: 16px; font-weight: 700; color: #1a1f36; }
        .steps-list { margin: 0; padding-left: 20px; color: #4f566b; font-size: 14px; }
        .steps-list li { margin-bottom: 10px; }
        .cta-container { text-align: center; margin-top: 40px; }
        .btn { background-color: #1a1f36; color: white !important; padding: 14px 32px; text-decoration: none; border-radius: 8px; font-weight: 600; font-size: 15px; display: inline-block; }
        .footer { padding: 30px; text-align: center; background-color: #f8fafc; border-top: 1px solid #edf2f7; }
        .footer p { margin: 0; font-size: 13px; color: #697386; line-height: 1.8; }
        .tagline { color: #0d6efd; font-weight: 600; margin-top: 32px; font-size: 16px; }
    </style>
</head>
<body>
    <div class="wrapper">
        <div class="main-container">
            <div class="header">
                <h1>Service Approved</h1>
            </div>
            <div class="content">
                <p class="greeting">Hello <strong>${adminName}</strong>,</p>
                <p class="announcement">We are delighted to inform you that your request to join <strong>Digital Kohat</strong> as a Service Provider has been <strong>successfully approved!</strong></p>
                
                <div class="service-card">
                    <span class="service-card-title">Approved Service Details</span>
                    <div class="info-row">
                        <span class="info-label">Service Name:</span>
                        <span class="info-value">${serviceName}</span>
                    </div>
                    <div class="info-row">
                        <span class="info-label">Sector:</span>
                        <span class="info-value">${sector}</span>
                    </div>
                    <div class="info-row">
                        <span class="info-label">Status:</span>
                        <span class="info-value" style="color: #059669;">Active ✅</span>
                    </div>
                </div>

                <div class="steps-box">
                    <h3>Getting Started: How to Login</h3>
                    <ul class="steps-list">
                        <li>Find and click the <strong>"Admin Login"</strong> button in that section.</li>
                        <li>${credentialsInstruction || "Enter your registered credentials to gain access."}</li>
                        <li>Upon successful login, you will be redirected to your personal <strong>Dashboard</strong>.</li>
                    </ul>
                </div>

                <p style="font-size: 15px; color: #4f566b;">You can now manage your service profile, track requests, and engage with the community directly through your dashboard.</p>
                
                <p class="tagline">Welcome to the Digital Kohat network!</p>

            </div>
            <div class="footer">
                <p>&copy; 2026 Digital Kohat. All rights reserved.<br/>Empowering Local Connectivity & Digital Growth.</p>
                <p>Kohat, Pakistan</p>
            </div>
        </div>
    </div>
</body>
</html>
`;
