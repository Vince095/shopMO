const mongoose = require('mongoose')
const validator = require('validator')

const projectSchema = new mongoose.Schema({

    email: {
        type: String,
        required: [true, 'Please enter your email'],
        unique: false,
        validate: [validator.isEmail, 'Please enter valid email address']
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
})

module.exports = mongoose.model('Newsletter', newsletterSchema);
