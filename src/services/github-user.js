const axios = require('axios');
const env = process.env.NODE_ENV || 'development';
const config = require(__dirname + '/../config/config.js')[env];
const userModel = require('../models').user;

module.exports = {

    async getUsers(offset, limit, followers, language, location, token) {

        try {

            const validateToken = await this.validateToken(token);

            if (!validateToken.success)
                return { status: 400, data: validateToken };

            let path = "/search/users"
            let filters = "q=type:user"

            offset = offset || 1;
            limit = limit || 10;

            if (followers !== null && typeof followers !== 'undefined')
                filters = filters.concat(" followers:>=" + followers);

            if (language !== null && typeof language !== 'undefined')
                filters = filters.concat(" language:" + language);

            if (location !== null && typeof location !== 'undefined')
                filters = filters.concat(" location:" + location);

            const response = await axios.get(config.apiGithub + path + "?" + filters + "&page=" + offset + "&per_page=" + limit);

            return response;
        } catch (err) {
            return { status: 500, data: err }
        }

    },
    async validateToken(token) {
        return new Promise((resolve) => {
            userModel.findAll({
                where: {
                    token: token
                }
            })
            .then((_user) => {

                if (_user.length === 0) {
                    resolve({ success: false, message: 'Token not found' });
                } else {

                    const diffMs = Date.now("YYYY-MM-DD") - _user[0].lastLoginAt;
                    const diffMins = Math.round(((diffMs % 86400000) % 3600000) / 60000); // minutes

                    if (diffMins > 20)
                        resolve({ success: false, message: 'Token expired' });
                    else
                        resolve({ success: true });
                }
            });
        });
    }
};
