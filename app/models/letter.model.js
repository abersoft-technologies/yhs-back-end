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
})

const Letter = mongoose.model("letter", LetterSchema);

module.exports = Letter;