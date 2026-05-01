const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_APP_PASSWORD
    }
});

/**
 * Sends a notification email to the admin.
 * @param {string} subject - The subject of the email
 * @param {string} body - The plaintext body of the email
 */
async function sendNotification(subject, body) {
    if (!process.env.GMAIL_USER || !process.env.GMAIL_APP_PASSWORD || !process.env.OWNER_EMAIL) {
        console.warn('Email credentials not configured in .env. Skipping email notification.');
        return;
    }

    try {
        const info = await transporter.sendMail({
            from: `"JanVote AI System" <${process.env.GMAIL_USER}>`,
            to: process.env.OWNER_EMAIL,
            subject: subject,
            text: body,
        });
        console.log('Notification email sent: %s', info.messageId);
    } catch (error) {
        console.error('Error sending email notification:', error);
    }
}

module.exports = { sendNotification };
