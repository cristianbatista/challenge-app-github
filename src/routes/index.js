const userController = require('../controllers').user;
const healthController = require('../controllers').health;

module.exports = (app) => {

  app.get('/api/health', healthController.status);

  app.post('/api/user', userController.create);
  app.post('/api/user/authenticate', userController.authenticate);
};