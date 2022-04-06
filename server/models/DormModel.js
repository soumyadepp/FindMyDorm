const mongoose = require('mongoose');
const schema = mongoose.Schema;

const dormSchema = new schema({
    address: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    location: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    capacity: {
        type: Number,
        required: true
    },
    features: {
        type: {
            bedrooms: {
                type: Number,
                required: true
            },
            bathrooms: {
                type: Number,
                required: true
            },
            mess: {
                type: Boolean,
                required: true
            },
        }
    },
    rating: {
        type: Number,
        default: 0
    },
    reviews: {
        type: Number,
        default: 0
    },
    owner: {
        type: String,
        required: true
    },
    colleges: {
        type: [{
            type: String,
        }]
    },
    preferredGender: {
        type: String,
        default: 'Any'
    }
});

module.exports = mongoose.model('Dorm', dormSchema);