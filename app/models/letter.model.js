const mongoose = require('mongoose');
const { Schema } = mongoose;
const LetterSchema = new Schema({
    edu: [String],
    employment: String,
    internship: String,
    readEdu: Boolean,
    contributeEdu: Boolean,
    lecture: Boolean,
    studyVisit: Boolean,
    eduBoard: Boolean,
    contact_id: String
})

const Letter = mongoose.model("letter", LetterSchema);

module.exports = Letter;