const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const User = require('../models/User');

const Controller = {
    create: (request, response) => {

        //Encrypting password
        bcrypt.hash(request.body.password, 10, (error, hash) => {
            if (error) {
                return response
                    .status(500)
                    .json({
                        message: error
                    })
            }

            //Creating data
            const newUser = new User({
                _id: new mongoose.Types.ObjectId(),
                email: request.body.email,
                password: hash
            });

            //Saving data
            newUser
                .save()
                .then(saved => {
                    response
                        .status(201)
                        .json({
                            message: 'User created succesfully.'
                        })
                })
        }); 
    }
};

module.exports = Controller;