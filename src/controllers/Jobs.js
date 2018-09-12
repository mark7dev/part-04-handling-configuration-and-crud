const mongoose = require('mongoose');
const Job = require('../models/Job');

const Controller = {
    index: (request, response) => {
        Job
            .find()
            .exec()
            .then(data => {
                response
                    .json({
                        jobs: data
                    })
                    .status(200);
            })
            .catch(error => {
                response
                .json({
                    message: error
                })
                .status(500)
            });
    },

    findBy: (request, response) => {
        Job
           .findById(request.params.jobId)
           .then(data => {
                response
                    .json({
                        type: 'Job Found',
                        data: data
                    })
                    .status(200);
            })
            .catch(error => {
                response
                .json({
                    message: error
                })
                .status(500)
            });
    },

    create: (request, response) => {
        const newJob = new Job({
            _id: new mongoose.Types.ObjectId(),
            description: request.body.description,
            hiringDate: request.body.hiringDate,
            salary: request.body.salary,
            location: request.body.location,
            contactEmail: request.body.contactEmail,
            isStillAvailable: request.body.isStillAvailable
        });

        newJob
            .save()
            .then(data => {
                response
                    .json({
                        data: newJob
                    })
                    status(201);
            })
            .catch(error => {
                response
                .json({
                    message: error
                })
                .status(500)
            });

            console.log('raw record: ' , newJob)
    },

    update: (request, response) => {
        Job
            .findByIdAndUpdate(request.params.jobId, request.body, {new: true})
            .then(data => {
              response
                .json({
                    type: 'Job updated',
                    data: data
                })
                .status(200);
            })
            .catch(error => {
                response
                .json({
                    message: error
                })
                .status(500)
            });
    },

    delete: (request, response) => {
        Job
            .findByIdAndRemove(request.params.jobId)
            .then(data => {
              response
                .json({
                    type: 'Job Deleted',
                    data: data
                })
                .status(200);
            })
            .catch(error => {
                response
                .json({
                    message: error
                })
                .status(500)
            });
    }

}

module.exports = Controller;

