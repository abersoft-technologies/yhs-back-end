const express = require('express')
const router = express.Router();
const bcrypt = require('bcryptjs')
const userServices = require('../services/UserServices')
const User = require('../models/usermodal')


router.post('/signup', (req, res, next) => {
    const { password } = req.body
    const salt = bcrypt.genSaltSync(10);
    // const userExist = await User.findOne(req.body.email);
    // if(userExist) {
    //     return res.status(404).send({message: "Email is already in use"})
    // }
    // req.body.password = bcrypt.hashSync(password, salt);
    const user = {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        password: req.body.password,
        date: Date.now()
    }

    userServices.signup(user).then(
        () => {
            delete user.password
            res.status(200).send(user)
        }
    ).catch(
        err => next(err)
    )
})

router.post('/login', (req, res, next) => {
    const email = req.body.email;
    const password = req.body.password;
    userServices.login({ email, password})
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