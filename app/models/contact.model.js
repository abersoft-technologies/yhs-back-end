const mongoose = require('mongoose');
const { Schema } = mongoose;

const ContactSchema = new Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  email: String,
  phoneNumber: String,
  company: String,
  role: String,
  town: String,
  otherInfo: String,
  date: { type: Date, default: Date.now },
});

const Contact = mongoose.model('contact', ContactSchema);

module.exports = Contact;
