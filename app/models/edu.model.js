const mongoose = require('mongoose');
const { Schema } = mongoose;

const EducationSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    shortName: {
        type: String,
        required: true
    },
    place: {
        type: String,
        required: true
    },
    managementList: {
        type: Array,
        required: true
    },
    type: {
        type: String,
        required: true
    },
    goal: {
        letters: Number,
        internships: Number,
        employements: Number,
    }
})

const Education = mongoose.model("education", EducationSchema);

module.exports = Education;