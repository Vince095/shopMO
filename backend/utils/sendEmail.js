const nodemailer = require('nodemailer');

const sendEmail = async options => {
    const transporter = nodemailer.createTransport({
        service: 'Godaddy',
        host: process.env.SMTP_HOST,
        port: process.env.SMTP_PORT,
        tls: {
            ciphers: 'SSLv3'
        },
        requireTLS: true,
        debug: true,
        secureConnection: false,
        auth: {
            user: process.env.SMTP_FROM_EMAIL,
            pass: process.env.SMTP_PASSWORD
        },
        
    });

    const message = {
        from: `${process.env.SMTP_FROM_NAME} <${process.env.SMTP_FROM_EMAIL}>`,
        to: options.email,
        subject: options.subject,
        text: options.message
    }

    await transporter.sendMail(message)
}

module.exports = sendEmail;