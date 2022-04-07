const mongoose = require('mongoose');
const { Schema } = mongoose;

const EducationSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    place: {
        type: Array,
        required: true
    }
})

const Education = mongoose.model("education", EducationSchema);

module.exports = Education;