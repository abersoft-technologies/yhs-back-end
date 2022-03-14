const User = require('../models/usermodal')
const bcrypt = require('bcryptjs');
const auth = require('../helpers/jwt')


async function login({ username, password }) {
    const user = await User.findOne({username});
    console.log(user)

    if(!user) {
        return res.send({message: "Something went wrong..."})
    }

    // synchronously compare user entered password with hashed password
    if(bcrypt.compareSync(password, user.password)){
        const token = auth.generateAccessToken(username);
        const refreshToken = auth.refreshToken(username);

        // call toJSON method applied during model instantiation
        return {...user.toJSON(), token}
    }
}

async function signup(params){
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