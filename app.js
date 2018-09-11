/* Import the modules. */
const chalk = require('chalk');
const express = require('express');
const logger = require('morgan');
const api =require('./src/routes/api');

/**
 * [1] Create and instantiate the Node server.
 * [2] The callback function will act like a Listener, it will execute each time
 *     a request is done.
 */
const app = express();

// Change PORT to "xxxx" (jason) if this port is occuped then run on 3000
const PORT = process.env.PORT || 3000;

/**
 * [1] Views Configuration
 *
 * [1] Set the `views` variable and pass it the relative path
 * [2] Configure the templage engine using `pug`
 */
app.set('views', './src/views')
app.set('view engine', 'pug');


// Middleware
app.use(logger('dev'));
// Define public like static
app.use('/static', express.static('public'));


//Setting type of data request like parse body request
app.use(express.urlencoded({
  extended: true
}))

// Parse body request
app.use(express.json());

// Route
// * `app.use` it’s called every time a request is sent to the
// * server.
app.get('/api', (request, response) => {
  response.send('LinkedIn REST API')
  .status(200);
});

app.get('/', (request, response) => {
  response.render('main', 
  // OBJETO
  {
    title: 'LinkedIn REST API',
    subtitle: 'API Reference'
  });
});

//Setting CORS
app.use((request, response, next) => {
  response.header('Accsess-Control-Allow-Origin', '*');
  response.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept, Authorization'
  );

  //If someone ask for the Methods to the end-point
  if (request.method === 'OPTIONS') {
    response.header(
      'Access-Control-Allow-Methods',
      'GET, POST, PUT, DELETE'
    );
    response.send(200);
  }

  next();
});

//Other way with Express
// app.use((request, response, next) => {
//   response.header('Accsess-Control-Allow-Origin', '*');
//   response.header(
//     'Access-Control-Allow-Headers',
//     'Origin, X-Requested-With, Content-Type, Accept, Authorization'
//   );

//   next();
// });

// app.options('*', (request, response, next) => {
//   response.header(
//     'Access-Control-Allow-Headers',
//     'GET, POST, PUT, DELETE'
//   );
//   response.send(200);

//   next();
// });

app.use('/api/v1', api);



//Error 404
/**
 * [4] 404 Not Found
 * Catch the error.
 *
 * `app.use` it’s called every time a request is sent to the
 * server.
 */
app.use((request, response) => {
  const ERROR = {
    message: '404. Not Found.'
  };

  response.json(ERROR)
  .status(404);
});
// OTHER WAY
// app.use((request, response, next) => {
//   const ERROR_404 = {
//     error: {
//       message: 'The requested resource is not defined.',
//       status: 404
//     }
//   };

//   next(ERROR_404);
// });



/**
 * [5] 500 Internal Error Server
 * Catch the error.
 *
 * `app.use` it’s called every time a request is sent to the
 * server.
 */
app.use((error, request, response, next) => {
  const body = error.error;
  const STATUS_CODE = body.status || 500;
  const ERROR_505 = body.message || '500. Internal Server Error :(';

  const formatedMessage = JSON.stringify(error, null, 2);

  response
    .status(STATUS_CODE)
    .json({
      error: {
        message: ERROR_505,
        status: STATUS_CODE
      }
    });

  console.log(chalk.red(formatedMessage));
});


// OTHER WAY
// app.use((request, response) => {
//   const ERROR = {
//     message: '500. Internal problem.'
//   };

//   response.json(ERROR)
//   .status(500);
// });


/**
 * Run and listen the server on an specific port.
 */

app.listen(PORT, () => {
  const formatedMessage = chalk.green(`Express server running on PORT: ${ PORT }`);

  console.log(formatedMessage);
});
