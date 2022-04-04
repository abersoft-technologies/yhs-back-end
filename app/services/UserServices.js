const User = require('../models/usermodal')
const bcrypt = require('bcryptjs');
const auth = require('../helpers/jwt');
const res = require('express/lib/response');


async function login({ email, password }) {
    const user = await User.findOne({ email });
    if(!user) {
        return null;
    }
    if(password !== user.password) {
        return null;
    }


    // synchronously compare user entered password with hashed password
    // if(bcrypt.compareSync(password, user.password)){
    //     const token = auth.generateAccessToken(username);

    //     // call toJSON method applied during model instantiation
    return {
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        date: user.date
    };
    // }
}

async function signup(params){
    const existingUser = await User.findOne({email: params.email});
    const userWithPassowrd = await User.findOne({password: params.password});


    if(existingUser || userWithPassowrd) {
        return null;
    } else if(!existingUser && !userWithPassowrd) {
        // instantiate a user modal and save to mongoDB
        const user = new User(params)
        await user.save();
        return user;
    }
}

async function getById(id) {

    const user = await User.findById(id);
    // call toJSON method applied during model instantiation
    return user.toJSON()
}

module.exports = {
    login,
    signup,
    getById
};