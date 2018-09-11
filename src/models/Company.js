const mongoose = require('mongoose');
const Schema = new mongoose.Schema ({
    _id: mongoose.Schema.Types.ObjectId,
    name: String 
});

module.exports = mongoose.model('Company', Schema);