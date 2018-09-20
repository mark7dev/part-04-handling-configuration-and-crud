const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const User = require('../models/User');

const Controller = {

    //GET***
    index: (request, response) => {
        User
            .find({})
            .exec()
            .then(users => {
                response
                    .status(200)
                    .json({
                        users,
                        total: users.length
                    });
            })
            .catch(error => {
                response
                    .status(500)
                    .json({
                        error
                    });
            });
    },

    //POST***
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