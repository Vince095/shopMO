const mongoose = require('mongoose')
const validator = require('validator')

const projectSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please enter your name'],
        trim: true,
        maxLength: [100, 'name cannot exceed 100 characters']
    },
    email: {
        type: String,
        required: [true, 'Please enter your email'],
        unique: false,
        validate: [validator.isEmail, 'Please enter valid email address']
    },
    info: {
        type: String,
        required: [true, 'Please select  subject'],
        enum: {
            values: [
               'web+search',
                'social+media',
                'email',
                'others'
            ],
            message: 'Please select correct subject'
        }
        
    },
    description: {
        type: String,
        required: [true, 'Please enter your description']

    },

    createdAt: {
        type: Date,
        default: Date.now
    }
})

module.exports = mongoose.model('Project', projectSchema);
