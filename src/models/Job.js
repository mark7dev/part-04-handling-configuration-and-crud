const mongoose = require('mongoose');

const Schema = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    description: { type: String, required: true },
    hiringDate: { type: Date, required: true },
    salary: Number,
    location: { type: String, required: true },
    contactEmail: { type: String, required: true },
    isStillvailable: { type: Boolean, default: true },
    company: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Company'
    }
});

module.exports = mongoose.model('Job', Schema);