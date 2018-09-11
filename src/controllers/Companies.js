const companies = require('../../companies.json');
const mongoose = require('mongoose');
const Company = require('../models/Company');

const Controller = {
    index: (request, response) => {
        Company
            .find()
            .exec()
            .then(data => {
                response
                    .json({
                        companies: data
                    })
                    .status(200);
            });
        // response
        // .status(200)
        // .json({
        //     companies
        // });
    },


    //Petición GET
    // id: (request, response) => {
    //     const theCompany = companies.data.filter(item => {
    //         return item.id === parseInt(request.params.id);
    //     });
    //     if(theCompany.length){
    //         response
    //           .status(200)
    //           .json({
    //             data: theCompany[0]
    //           })
    //     } else {
    //     response
    //         .json({
    //             message: 'Not Company Found'
    //         })
    //     } 
    // },

//Petición GET para obtener las compañías por ID
    getById: (request, response) => {
        const { companyId } = request.params;
        Company
            .find({
                _id: companyId
            })
            .then(data => {
                response
                .json({
                    company: data
                })
                .status(200);
            })
    },


    //POST
    create: (request, response) => {
        const newCompany = new Company({
            _id: new mongoose.Types.ObjectId(),
            name: request.body.name
        });

        newCompany
            .save()
            .then(data => {
                response
                    .json({
                        data: newCompany
                    })
                    .status(201);
            })
            .catch(error => {
                response
                .json({
                    message: error
                })
                .status(500)
            });

            console.log('raw record: ' , newCompany)
        // response
        // .json({
        //     type: 'POST /companies',
        //     data: request.body
        // })
    },

    update: (request, response) => {
    	const isCompanyUpdated = false;
    	const type = 'Company Not Updated';
    	const company = companies.data.map(
		   (company) => {
		     if (company.id === parseInt(request.params.id)){
		     	company = request.body;
		     	isCompanyUpdated = true;
		     }
		     return company;
		   }
		);
        if (isCompanyUpdated) {
        	type = 'Company Updated'
        }
    	response
    	    .json({
    	    	type: type,
    	  	    data: company
    	    })
    	    .status(200);
    },

    delete: (request, response) => {
   	    const isCompanyDeleted = false;
    	const type = 'Company Not Deleted';
    	const company = companies.data.filter(
		   (company) => {
		     if (company.id !== parseInt(request.params.id)){
		     	return company;
		     } else {
		     	type = 'Company Deleted';
		     }
		   }
		);
    	response
    	    .json({
    	    	type: type,
    	  	    data: company
    	    })
    	    .status(200);
    }

}



module.exports = Controller;