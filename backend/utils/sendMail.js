const nodemail = require('nodemailer');

const sendMail = async (options) => {
    const transporter = nodemail.createTransport({
        host: process.env.SMPT_HOST,
        port: process.env.SMPT_PORT,
        service: process.env.SMPT_SERVICE, 
        auth: {
            user: process.env.SMPT_MAIL, // generated ethereal user
            pass: process.env.SMPT_PASSWORD // generated ethereal password
        }
    });

    const mailOptions = {
        from: process.env.SMPT_MAIL,
        to: options.email,
        subject: options.subject,
        text: options.message,
    };
    
    await transporter.sendMail(mailOptions);
}

module.exports = sendMail;