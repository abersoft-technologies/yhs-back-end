const mongoose = require('mongoose');
const { Schema } = mongoose;

const OrganizationSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    orgId: {
        type: String,
        required: true
    },
    users: {
        type: Array,
        required: true,
    },
    date: { type: Date, default: Date.now },

})

const Organization = mongoose.model("organization", OrganizationSchema);

module.exports = Organization;