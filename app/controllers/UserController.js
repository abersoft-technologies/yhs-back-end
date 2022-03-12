const express = require('express')
const router = express.Router();
const bcrypt = require('bcryptjs')
const userServices = require('../services/UserServices')

router.post('/signup', (req, res, next) => {
    const { password } = req.body
    const salt = bcrypt.genSaltSync(10);
    // req.body.password = bcrypt.hashSync(password, salt);
    const user = {
        name: req.headers.name,
        username: req.headers.username,
        email: req.headers.email,
        password: req.headers.password,
        date: Date.now()
    }

    console.log("user", user)

    userServices.signup(user).then(
        () => res.send('success')
    ).catch(
        err => next(err)
    )
})

router.post('/login', (req, res, next) => {
    const { username, password} = req.headers;
    userServices.login({ username, password})
        .then(user => {
            res.send("success", user)
        }
    ).catch(err => next(err))
})

router.get('/:id', (req, res, next) => {
    userServices.getById(req.params.id).then(
        (user) => res.json(user)
    ).catch(err => next(err))
})

module.exports = router;