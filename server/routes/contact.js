const router   = require('express').Router();
const Contact  = require('../models/Contact');
const { sendEmail } = require('../mailer');

router.post('/', async (req, res) => {
  try {
    const { name, contact, service, message } = req.body;

    if (!name || !contact)
      return res.status(400).json({ error: 'Name and contact are required' });

    const entry = await Contact.create({ name, contact, service, message });

    await sendEmail({
      subject: `New enquiry from ${name}`,
      html: `
        <h2 style="color:#c0392b">New FLM Enquiry</h2>
        <p><b>Name:</b> ${name}</p>
        <p><b>Contact:</b> ${contact}</p>
        <p><b>Service:</b> ${service || 'Not specified'}</p>
        <p><b>Message:</b> ${message || 'None'}</p>
        <hr/>
        <small>Submitted via focallengthmedia.com</small>
      `
    });

    res.json({ success: true, id: entry._id });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;