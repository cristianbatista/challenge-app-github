const axios = require('axios');
const env = process.env.NODE_ENV || 'development';
const config = require(__dirname + '/../config/config.js')[env];

module.exports = {

    async getUsers(offset, limit, followers, language, location) {
        try {

            let path = "/search/users"
            let filters = "q=type:user"

            offset = offset || 1;
            limit = limit || 10;

            if (followers !== null && typeof followers !== 'undefined')
                filters = filters.concat(" followers:>=" + followers);

            if (language !== null && typeof language !== 'undefined')
                filters =  filters.concat(" language:" + language);

            if (location !== null && typeof location !== 'undefined')
                filters = filters.concat(" location:" + location);

            const response = await axios.get(config.apiGithub + path + "?" + filters + "&page=" + offset + "&per_page=" + limit);

            return response;

        } catch (err) {
            return { status: 500, data: err }
        }

    },
};
