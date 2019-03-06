
const user = require('../models').user;

module.exports = {
    create(req, res) {

        const _password = (Buffer.from(req.body.password).toString('base64'));

        return user
            .create({
                username: req.body.username,
                name: req.body.name,
                password: _password
            })
            .then(_user => {
                res.status(201).send({
                    message: "Usuário criado com sucesso"
                })
            })
            .catch(error => {
                res.status(400).send({
                    message: "Falha ao processar a solicitação.",
                    exception: error
                })
            });
    },

    authenticate(req, res) {
        return user
            .findAll({
                where: {
                    username: req.body.username
                }
            })
            .then(_user => {
                if (_user.length === 0) {
                    return res.status(404).send({ message: 'Usuário não encontrado' });
                }
                else {
                    if (req.body.password !== _user[0].password)
                        return res.status(404).send({ message: 'Senha inválida', });
                    else {

                        const _lastLoginAt = Date.now("YYYY-MM-DD");

                        _user[0].update({
                            lastLoginAt: _lastLoginAt
                        })

                        return res.status(200).send({message: "Autenticação efeutada com sucesso"});
                    }
                }
            })
            .catch(error => res.status(400).send(error));
    },
};