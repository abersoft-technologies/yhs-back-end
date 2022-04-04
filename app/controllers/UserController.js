const express = require('express')
const router = express.Router();
const bcrypt = require('bcryptjs')
const userServices = require('../services/UserServices')
const User = require('../models/usermodal')


router.post('/signup', async (req, res, next) => {
    const { password } = req.body
    const salt = bcrypt.genSaltSync(10);
    // req.body.password = bcrypt.hashSync(password, salt);
    const user = {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        password: req.body.password,
        date: Date.now()
    }

    await userServices.signup(user).then(user => {
        if(!user) {
            return res.status(400).json({message: 'User already exists!'})
        }
        res.status(200).send(user)
    }).catch(err => console.log(err))

})

router.post('/login', (req, res, next) => {
    const email = req.body.email;
    const password = req.body.password;
    userServices.login({ email, password})
        .then(user => {
            if(!user) {
                res.status(404).send({message: "Error"})
            }
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