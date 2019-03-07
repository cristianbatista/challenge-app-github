const userController = require('../controllers').user;
const healthController = require('../controllers').health;
const githubUserController = require('../controllers').githubUser;

module.exports = (app) => {

  /**
   * @swagger
   * tags:
   *   - name: Users
   *     description: User management and login
   *   - name: Github
   *     description: Search users of github
   */


  /**
   * @swagger
   * /api/health:
   *    get:
   *     description: Check health api
   *     tags: [Users]
   *     produces:
   *       - application/json
   *     responses:
   *       200:
   *         description: Ok
   */
  app.get('/api/health', healthController.status);

  /**
   * @swagger
   * /api/user:
   *    post:
   *     description: Create user
   *     tags: [Users]
   *     produces:
   *       - application/json
   *     parameters:
   *       - name: username
   *         description: Username to use for login.
   *         in: formData
   *         required: true
   *         type: string
   *       - name: password
   *         description: User's password.
   *         in: formData
   *         required: true
   *         type: string
   *       - name: name
   *         description: Name full of user.
   *         in: formData
   *         required: true
   *         type: string
   *     responses:
   *       200:
   *          description: User createad
   */
  app.post('/api/user', userController.create);

  /**
   * @swagger
   * /api/user/authenticate:
   *    post:
   *     description: Login to the application
   *     tags: [Users]
   *     produces:
   *       - application/json
   *     parameters:
   *       - name: username
   *         description: Username to use for login.
   *         in: formData
   *         required: true
   *         type: string
   *       - name: password
   *         description: User's password. Send encrypted password in int64 format
   *         in: formData
   *         required: true
   *         type: string
   *     responses:
   *       200:
   *         description: Login successful
   */
  app.post('/api/user/authenticate', userController.authenticate);

  /**
   * @swagger
   * /api/github-user:
   *    get:
   *     description: Search users of github
   *     tags: [Github]
   *     produces:
   *       - application/json
   *     parameters:
   *       - name: offset
   *         description: page number for return data
   *         in: query
   *         required: false
   *         type: number
   *       - name: limit
   *         description: quantity rows per page
   *         in: query
   *         required: false
   *         type: number
   *       - name: followers
   *         description: filter users with followers greater than the value sent
   *         in: query
   *         required: false
   *         type: number
   *       - name: localtion
   *         description: filter by language of programming
   *         in: query
   *         required: false
   *         type: string
   *       - name: location
   *         description: filter by location (country, states, city e etc)
   *         in: query
   *         required: false
   *         type: string
   *       - name: token
   *         description: token authenticate
   *         in: query
   *         required: true
   *         type: string
   *     responses:
   *       200:
   *         description: return github users
   */ 
  app.get('/api/github-user', githubUserController.getUsers)
};