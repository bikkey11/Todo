const jwt = require("jsonwebtoken");
require("dotenv").config();

const Auth = async (req, res, next) => {
    try {

        // acess authorize header to validate the request
        const token = req.headers.authorization.split(" ")[1];
        // retrive the user details for the logged in user
        const decodeToken = await jwt.verify(token, process.env.JWT_SECRET);
        req.user = decodeToken;
        // res.json(decodeToken)
        next();


    } catch (error) {
        res.status(401).json({ error: "Authentication Failed!" })

    }

}
const localVariables = (req, res, next) => {
    req.app.locals = {
        OTP: null,
        resetSession: false
    }
    next();
}
module.exports = { Auth, localVariables };

