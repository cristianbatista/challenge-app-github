// This will be our application entry. We'll setup our server here.
const http = require('http');
const app = require('./app'); // The express app we just created

const morgan = require('morgan');
const logger = require('./logger');
const port = process.env.PORT || 3000;

app.set('port', port);
app.use(morgan('short', { stream: logger.stream }));

const server = http.createServer(app);
server.listen(port);
logger.log('info', `api running on port ${port}`);

module.exports = server