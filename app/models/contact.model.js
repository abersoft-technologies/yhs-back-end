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
  status: {
    type: String,
    required: true,
  },
  otherInfo: String,
  letterOfIntent: {
    edu: [String],
    employment: String,
    internship: String,
    readEdu: Boolean,
    contributeEdu: Boolean,
    lecture: Boolean,
    studyVisit: Boolean,
    eduBoard: Boolean,
  },

  date: { type: Date, default: Date.now },
});

const Contact = mongoose.model('contact', ContactSchema);

module.exports = Contact;
