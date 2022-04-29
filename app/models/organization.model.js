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
})

const Organization = mongoose.model("organization", OrganizationSchema);

module.exports = Organization;