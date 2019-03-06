const express = require('express');
const logger = require('morgan');
const bodyParser = require('body-parser');
const swaggerUi = require('swagger-ui-express');
const swaggerJsdoc = require('swagger-jsdoc');
const app = express();

const options = {
    swaggerDefinition: {
      // Like the one described here: https://swagger.io/specification/#infoObject
      info: {
        title: 'Github User Search API',
        version: '1.0.0',
        description: 'Find developers of github',
      },
    },
    // List of files to be processes. You can also set globs './routes/*.js'
    apis: ['./src/routes/*.js'],
  };
  
  const specs = swaggerJsdoc(options)



app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use('/swagger', swaggerUi.serve, swaggerUi.setup(specs));

// Require our routes into the application.
require('./src/routes')(app);

module.exports = app;