const express = require("express");
const router = express.Router();
const UserController = require("../Controller/userController.js")
// conast login = require("../Controller/userController.js")
const middleWare = require("../Middleware/auth.js");

router.get("/", (req, res,) => {
    res.send("Bikkey")
})
// post routes methods
router.post("/register", UserController.register);
router.post("/login", UserController.login);

// get routes method
router.get('/getUser/:userName', UserController.getUser);
router.get('/generateOTP', UserController.verifyUser, middleWare.localVariables, UserController.generateOTP)
router.get('/verifyOTP', UserController.verifyOTP);

// put routes method
router.put('/updateUser', middleWare.Auth, UserController.updateUser);
router.put('/resetPassword', UserController.resestPassword);


module.exports = router