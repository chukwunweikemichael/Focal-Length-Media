const mongoose = require('mongoose');

const contactSchema = new mongoose.Schema({
  name:    { type: String, required: true, trim: true },
  contact: { type: String, required: true, trim: true },
  service: { type: String, default: '' },
  message: { type: String, default: '' },
  status:  { type: String, enum: ['new','replied','closed'], default: 'new' }
}, { timestamps: true });

module.exports = mongoose.model('Contact', contactSchema);