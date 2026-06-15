const { Resend } = require('resend');
const resend = new Resend(process.env.RESEND_API_KEY);

exports.sendEmail = async ({ subject, html }) => {
  try {
    await resend.emails.send({
      from: 'FLM <onboarding@resend.dev>',
      to: process.env.EMAIL_TO,
      subject,
      html
    });
    console.log('Email sent:', subject);
  } catch (err) {
    console.error('Email error:', err.message);
  }
};
RESEND_API_KEY = re_LAsWRJQM_JKjxcWbuFFjWJiXXiXonVejC