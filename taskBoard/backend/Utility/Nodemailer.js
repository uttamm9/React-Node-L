const nodemailer = require('nodemailer');
const path = require('path')
const envPath = path.resolve('C:/Users/uttam/OneDrive/Desktop/ENV/.env');

const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 587,
  secure: false, // TLS needs to be false for port 587
  auth: {
    user: process.env.EMAIL_USER, 
    pass: process.env.EMAIL_PASS 
  }
});

exports.SendMail = async (to, subject, text) => {
  try {
    const MailInfo = await transporter.sendMail({
      from: process.env.EMAIL_USER, 
      to: to,
      subject: subject,
      text: text
    });
    console.log('Email sent successfully:', MailInfo);
    return MailInfo;
  } catch (error) {
    console.error('Error sending email:', error);
    throw error;
  }
};
