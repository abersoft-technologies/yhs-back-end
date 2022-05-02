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
        required: false
    },
    type: {
        type: String,
        required: true
    },
    branch: {
        type: String,
        required: true,
    },
    goal: {
        letters: Number,
        internships: Number,
        employements: Number,
    },
    person: {
        type: String,
        required: true,
    },
    orgId: {
        type: String,
        required: true
    },
})

const Education = mongoose.model("education", EducationSchema);

module.exports = Education;