const mongoose = require('mongoose')

const sellerSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please enter seller name'],
        trim: true,
        maxLength: [100, 'seller name cannot exceed 100 characters']
    },
    description: {
        type: String,
        required: [true, 'Please enter seller description'],
    },
    phone:{
        type: Number,
        required: [true, 'Please insert store phone number']
    },
    address: {
        type: String,
        required: [true, 'Please enter store location']
    },
    
    category: {
        type: String,
        required: [true, 'Please select  seller category'],
        enum: {
            values: [
                'Electronics',
                'Cameras',
                'Laptops',
                'Accessories',
                'Headphones',
                'Food',
                "Books",
                'Clothes/Shoes',
                'Beauty/Health',
                'Sports',
                'Outdoor',
                'Home'
            ],
            message: 'Please select correct store category '
        }
    },

    user: {
        type: mongoose.Schema.ObjectId,
        ref: 'User',
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
})

module.exports = mongoose.model('Seller', sellerSchema);
