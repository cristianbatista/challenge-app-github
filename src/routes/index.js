const userController = require('../controllers').user;
const healthController = require('../controllers').health;
const githubUserController = require('../controllers').githubUser;

module.exports = (app) => {

  app.get('/api/health', healthController.status);

  app.post('/api/user', userController.create);
  app.post('/api/user/authenticate', userController.authenticate);

  app.get('/api/github-user', githubUserController.getUsers)
};