const mongoose = require('mongoose');
const { Schema } = mongoose;

const CorporateSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    tags: {
        type: Array,
        required: true
    },
    branch: {
        type: String,
        required: true,
    },
    info: {
        type: String,
        required: false
    },
    orgId: {
        type: String
    }
})

const Corporate = mongoose.model("corporate", CorporateSchema);

module.exports = Corporate;