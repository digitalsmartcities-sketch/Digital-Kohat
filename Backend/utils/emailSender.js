import nodemailer from 'nodemailer';

export const sendEmailSmtp = async ({ to, subject, html }) => {
    try {
        const transporter = nodemailer.createTransport({
            host: process.env.SMTP_HOST || 'smtp.gmail.com',
            port: parseInt(process.env.SMTP_PORT) || 465,
            secure: (process.env.SMTP_PORT == 465 || !process.env.SMTP_PORT), // true for 465, false for other ports
            auth: {
                user: process.env.SMTP_USER,
                pass: process.env.SMTP_PASS
            },
            connectionTimeout: 10000, // 10 seconds timeout
        });

        const mailOptions = {
            from: `"Digital Kohat" <${process.env.SMTP_USER}>`,
            to,
            subject,
            html
        };

        const info = await transporter.sendMail(mailOptions);
        return true;
    } catch (error) {
        console.error('Error sending email through SMTP:', error);
        return false;
    }
};
