const axios = require('axios');
const githubUserService = require('../services').githubUser

module.exports = {

    async getUsers(req, res) {

      if (req.query.token === null || typeof req.query.token === 'undefined')
        return res.status(400).send({message: "Invalid token"});

      let response = await githubUserService.getUsers(req.query.offset, 
                                                      req.query.limit, 
                                                      req.query.followers, 
                                                      req.query.language, 
                                                      req.query.location,
                                                      req.query.token);

      if (response.status === 200)
      return res.status(200).send(response.data);
      if (response.status === 400)
        return res.status(400).send({message: "Github users bad request", error: response.data});
      else if (response.status === 404)
        return res.status(404).send({message: "Github users not found"});
      else
        return res.status(500).send({message: "Internal server error", error: response.data});
      
    },
  };
  