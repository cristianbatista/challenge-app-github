const TokenGenerator = require('uuid-token-generator');
const user = require('../models').user;

module.exports = {
    create(req, res) {

        let _password = null;
       
        if (req.body.password !== null && typeof req.body.password !== 'undefined')
            _password = (Buffer.from(req.body.password).toString('base64'));

        return user
            .create({
                username: req.body.username,
                name: req.body.name,
                password: _password
            })
            .then(_user => {
                res.status(201).send({
                    message: "User createad"
                })
            })
            .catch(error => {
                res.status(400).send({
                    message: "Failed to process request",
                    exception: error
                })
            });
    },

    authenticate(req, res) {
        const tokgen = new TokenGenerator();
        const _token = tokgen.generate();

        return user
            .findAll({
                where: {
                    username: req.body.username
                }
            })
            .then(_user => {
                if (_user.length === 0) {
                    return res.status(404).send({ message: 'User not found' });
                }
                else {
                    if (req.body.password !== _user[0].password)
                        return res.status(400).send({ message: 'Invalid password', });
                    else {

                        const _lastLoginAt = Date.now("YYYY-MM-DD");

                        _user[0].update({
                            lastLoginAt: _lastLoginAt,
                            token: _token
                        })

                        return res.status(200).send({message: "Login successful", token: _token});
                    }
                }
            })
            .catch(error => {
                res.status(500).send({
                    message: "Internal Server Error",
                    exception: error
                })
            });
    },
};