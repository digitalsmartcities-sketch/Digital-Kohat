import nodemailer from 'nodemailer';

// Reusable transporter (improves reliability and connection overhead)
const createTransporter = () => {
    return nodemailer.createTransport({
        host: process.env.SMTP_HOST || 'smtp.gmail.com',
        port: parseInt(process.env.SMTP_PORT) || 465,
        secure: (process.env.SMTP_PORT == 465 || !process.env.SMTP_PORT), 
        auth: {
            user: process.env.SMTP_USER,
            pass: process.env.SMTP_PASS
        },
        connectionTimeout: 20000, // 20 seconds
        greetingTimeout: 10000,   // 10 seconds
        socketTimeout: 30000,     // 30 seconds
        tls: {
            // Do not fail on invalid certs (common issue in cloud environments)
            rejectUnauthorized: false
        }
    });
};

export const sendEmailSmtp = async ({ to, subject, html }) => {
    let transporter = createTransporter();
    
    try {
        console.log(`Attempting to send email to ${to} via port ${process.env.SMTP_PORT || 465}...`);
        
        const mailOptions = {
            from: `"Digital Kohat" <${process.env.SMTP_USER}>`,
            to,
            subject,
            html
        };

        const info = await transporter.sendMail(mailOptions);
        console.log(`Email sent successfully: ${info.messageId}`);
        return true;
    } catch (error) {
        console.error('❌ SMTP Error DETAILS:', {
            message: error.message,
            code: error.code,
            command: error.command,
            response: error.response
        });
        return false;
    }
};
