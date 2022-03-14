require("dotenv").config();
const jwt = require("jsonwebtoken");

function authenticateToken(req, res, next) {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if(token === null) return res.sendStatus(401);

    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
        if(err) return res.sendStatus(403);
        req.user = user;
        next();
    })
}

function generateAccessToken(username) {
    return jwt.sign({data: username}, process.env.ACCESS_TOKEN_SECRET, {expiresIn: "15m"})
}

function generateRefreshAccessToken(username) {
    return jwt.sign({data: username}, process.env.REFRESH_TOKEN)

}

module.exports = {
    authenticateToken,
    generateAccessToken,
    generateRefreshAccessToken
}