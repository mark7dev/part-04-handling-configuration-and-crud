const mongoose = require('mongoose');
const User = require('../models/User');

const Controller = {
    create: (request, response) => {
        const newUser = new User({
            _id: new mongoose.Types.ObjectId(),
            email: request.body.email,
            password: request.body.password
        });

        console.log('new user created: ', newUser);
    }
};

module.exports = Controller;