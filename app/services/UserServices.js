const User = require('../models/usermodal')
const bcrypt = require('bcryptjs');
const auth = require('../helpers/jwt')


async function login({ username, password }) {
    const user = await User.findOne({ username });
    console.log(user)
    if(password !== user.password) {
        return console.log("Password does not match")
    }

    if(!user) {
        return console.log("Something is wrong", user)
    }

    // synchronously compare user entered password with hashed password
    // if(bcrypt.compareSync(password, user.password)){
    //     const token = auth.generateAccessToken(username);

    //     // call toJSON method applied during model instantiation
    return {
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        password: user.password,
        date: user.date
    };
    // }
}

async function signup(params){
    // const existingUser = await User.findOne({ username });
    // if(existingUser) return res.status(400).json({ email: "Email already exists" });

    // instantiate a user modal and save to mongoDB
    const user = new User(params)
    await user.save();
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