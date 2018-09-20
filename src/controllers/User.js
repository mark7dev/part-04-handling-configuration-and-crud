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

        //Checking email don't repeat
        User
            .find({
                email: request.body.email
            })
            .exec()
            .then(users => {
                if (users.length < 1) {
  
                    //save new user
                    //Encrypting password
                    bcrypt.hash(request.body.password, 10, (error, hash) => {
                        if (error) {
                          return response
                            .status(500)
                            .json({
                              message: error
                            });
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
                              message: 'User created successfully.'
                            });
                        });
                    });           
                } else {
                    response
                        .status(422)
                        .json({
                            message: 'User already exists.'
                        });
                }
            })
    },

    //DELETE***
    remove: (request, response) => {
        User
          .findByIdAndRemove(request.params.userId)
          .exec()
          .then(() => {
            response
              .status(200)
              .json({
                message: 'User was deleted.'
              });
          });
    }
    
};

module.exports = Controller;