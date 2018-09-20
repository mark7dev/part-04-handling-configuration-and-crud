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
    },

    //LOGIN mail validation
    login: (request, response) => {
        User
            .find({
                email: request.body.email
            })
            .exec()
            .then(user => {
                //email matched
                if (user.length > 0) {
                    //now check the password too
                    bcrypt.compare(request.body.password, user[0].password, (error, result) => {
                        //no match between password text plane and password in the data base
                        if (error) {
                            return response
                                .status(401)
                                .json({
                                    message: 'Authentication failed.'
                                })
                        }

                        //there is match
                        if (result) {
                            return response
                                .status(200)
                                .json({
                                    message: 'Authentication successfull.'
                                })
                        }

                        //no match for any way
                        response
                            .status(401)
                            .json({
                                message: 'Authentication failed.'
                            })
                    });
                //email didn't match
                } else {
                    response
                        .status(422)
                        .json({
                            message: 'Authentication failed.'
                        })
                }
            });
    }
    
};

module.exports = Controller;