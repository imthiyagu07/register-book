const mongoose = require('mongoose');

const entrySchema = new mongoose.Schema({
    date: {
        type: Date,
        required: true,
        unique: true
    },
    opening: {
        type: Number,
        required: true,
        default: 0
    },
    receipts: {
        type: Number,
        required: true,
        default: 0
    },
    total: {
        type: Number,
        required: true,
        default: 0
    },
    issue: {
        type: Number,
        required: true,
        default: 0
    },
    waste: {
        type: Number,
        required: true,
        default: 0
    },
    outside: {
        type: Number,
        required: true,
        default: 0
    },
    closing: {
        type: Number,
        required: true,
        default: 0
    }
}, { timestamps: true });

module.exports = mongoose.model('Entry', entrySchema);
