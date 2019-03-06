const axios = require('axios');
const githubUserService = require('../services').githubUser

module.exports = {

    async getUsers(req, res) {

      let response = await githubUserService.getUsers(req.query.offset, req.query.limit, req.query.followers, req.query.language, req.query.location);

      if (response.status === 200)
      return res.status(200).send(response.data);
      if (response.status === 400)
        return res.status(400).send({message: "Github users bad request"});
      else if (response.status === 404)
        return res.status(404).send({message: "Github users not found"});
      else
        return res.status(500).send({message: "Internal server error", error: response.data});
      
    },
  };
  