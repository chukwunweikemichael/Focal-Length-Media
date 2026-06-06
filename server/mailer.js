const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});

exports.sendEmail = async ({ subject, html }) => {
  try {
    await transporter.sendMail({
      from: `"Focal Length Media" <${process.env.EMAIL_USER}>`,
      to:   process.env.EMAIL_TO,
      subject,
      html
    });
    console.log('Email sent:', subject);
  } catch (err) {
    console.error('Email error:', err.message);
  }
};