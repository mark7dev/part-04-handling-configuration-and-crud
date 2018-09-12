const { Router } = require('express');
const app = Router();
const Companies = require('../controllers/Companies.js');
const Jobs = require('../controllers/Jobs.js')

//Declaras las peticiones configuradas
app.get('/companies', Companies.index);
// app.get('/companies/:id', Companies.id);
app.post('/companies', Companies.create);
app.put('/companies/:id', Companies.update);
app.delete('/companies/:id', Companies.delete);

app.get('/companies/:companyId', Companies.getById);

//Job routes
app.get('/Jobs', Jobs.index);
app.get('/Jobs/:jobId', Jobs.findBy);
app.post('/Jobs', Jobs.create);
app.put('/Jobs/:jobId', Jobs.update);
app.delete('/Jobs/:jobId', Jobs.delete);


module.exports = app;