const express = require('express')
const router = express.Router();
const bcrypt = require('bcryptjs')
const userServices = require('../services/UserServices')

router.post('/signup', (req, res, next) => {
    const { password } = req.body
    const salt = bcrypt.genSaltSync(10);
    // req.body.password = bcrypt.hashSync(password, salt);
    const user = {
        name: req.body.name,
        username: req.body.username,
        email: req.body.email,
        password: req.body.password,
        date: Date.now()
    }

    userServices.signup(user).then(
        () => res.status(200).send(user)
    ).catch(
        err => next(err)
    )
})

router.post('/login', (req, res, next) => {
    const username = req.body.username;
    const password = req.body.password;
    userServices.login({ username, password})
        .then(user => {
            res.status(200).json(user);
        }
    ).catch(err => console.log(err))
})

router.get('/:id', (req, res, next) => {
    userServices.getById(req.params.id).then(
        (user) => res.json(user)
    ).catch(err => next(err))
})

module.exports = router;