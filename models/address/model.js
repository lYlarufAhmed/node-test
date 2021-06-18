let mg = require("mongoose")

const AddressSchema = new mg.Schema({
    city: {
        type: String,
        required: true,
        index: true
    },
    labels: {
        type: [String],
    },
    user: {
        type: mg.SchemaTypes.ObjectId,
        ref: 'User',
        required: true
    },
    pinCode: {
        type: String,
        required: true,
    },
    state: {
        type: String,
        required: true,
    }, country: {
        type: String,
        required: true,
    }, addressLine1: {
        type: String,
        required: true,
    }, addressLine2: {
        type: String,
        required: true,
    },
}, {timestamps: true})


let Address = new mg.model('Address', AddressSchema)
module.exports = Address
