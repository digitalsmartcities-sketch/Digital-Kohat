import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export const sendEmail = async ({ to, subject, html }) => {
    try {
        console.log(`Attempting to send email to ${to} via Resend...`);
        
        const { data, error } = await resend.emails.send({
            from: process.env.SMTP_FROM || 'Digital Kohat <onboarding@resend.dev>',
            to,
            subject,
            html
        });

        if (error) {
            console.error('❌ Resend Error:', error);
            return false;
        }

        console.log(`Email sent successfully: ${data.id}`);
        return true;
    } catch (error) {
        console.error('❌ Resend Exception:', error.message);
        return false;
    }
};
