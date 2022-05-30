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
    contact :{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'contact'
    },
    orgId: {
        type: String,
        required: true
    },
    date: { type: Date, default: Date.now },

})

const Letter = mongoose.model("letter", LetterSchema);

module.exports = Letter;