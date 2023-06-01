const UserModel = require("../Models/userSchema")
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken")
require("dotenv").config();
const Generator = require("otp-generator")

// Register Func
const register = (req, res) => {
    var { userName, password, phone, email, firstName, lastName, address, middleName, profile } = req.body;

    //checking for the existing User
    const existUser = new Promise(async (resolve, reject) => {
        await UserModel.findOne({ userName: userName }).then(user => {
            if (user) {
                reject({ error: "Username not available" })
            }
            resolve();
        }).catch(err => res.status(500).send(err));

    })


    // checking for the existing email
    const existEmail = new Promise(async (resolve, reject) => {
        await UserModel.findOne({ email: email }).then(user => {
            if (user) {
                reject({ error: "Email already used" })
            }
            resolve();
        }).catch(err => res.status(500).send(err));

    })

    // Handle all the above promises
    Promise.all([existUser, existEmail]).then(async result => {
        // Hash password
        const salt = await bcrypt.genSalt(10);
        await bcrypt.hash(password, salt).then(hashPass => {
            password = hashPass
        }).catch(err => { console.log(err) });

        // creating new user and saving
        try {
            user = new UserModel({ userName, password, phone, email, firstName, lastName, address, middleName, profile });

            // saving user into the database
            user.save().then((result) => {
                res.status(200).send("User created Sucessfully")
            }).catch(err => {
                res.status(500).send(err)
            });

        } catch (error) {
            res.status(500).send(error)
        };

    }).catch(error => {
        res.status(500).json(error)
    });

}

// login function 
const login = async (req, res) => {
    const { userName, password } = req.body;
    try {
        await UserModel.findOne({ userName }).then(user => {
            if (!user) {
                throw new Error("UserName Not found")
            }
            bcrypt.compare(password, user.password)
                .then(passwordCheck => {

                    if (!passwordCheck) return res.status(400).send("Password doesnot matched");

                    // create jwt token
                    const token = jwt.sign({
                        userId: user._id,
                        userName: user.userName
                    }, process.env.JWT_SECRET, { expiresIn: "24h" });
                   
                    res.status(201).send({
                        msg: "Login Successful...!",
                        userName: user.userName,
                        token: token
                    });

                })
                .catch(error => {
                    return res.status(400).send(error)
                })

        }).catch(err => {
            // console.log(err)
            res.status(400).json(err.message)
        })


    } catch (error) {
        console.log(error)
        res.status(500).json(error)
    }

};
// getUser function 
const getUser = async (req, res) => {
    const { userName } = req.params;
    try {
        await UserModel.findOne({ userName }).then((user) => {
            if (!user) {
                throw new Error("UserName Not found")
            }
            // remove the password from user
            // mongoose returns unnecessay data with object so to convert into json 
            const { password, ...rest } = Object.assign({}, user.toJSON());
            res.status(200).send(rest)
        }).catch(err => {
            return res.status(404).send(err.message)
        })

    } catch (error) {
        res.statu(500).send(error)

    }

}
// updateUser Function
const updateUser = async (req, res) => {
    try {
        // const id = req.query.id
        const { userId } = req.user
        if (userId) {
            const body = req.body
            UserModel.updateOne({ _id: userId }, body).then((data) => {
                console.log("he")
                if (!data) {
                    throw new Error("UserName not found")
                }
                return res.status(201).send("User Updated");
            }).catch(err => {
                return res.status(404).send(err.message);
            });

        } else {
            throw new Error("Invalid user Id")
        }


    } catch (error) {
        res.status(401).send(error)

    }


}
// Otp generator function 
const generateOTP = async (req, res) => {
    req.app.locals.OTP = await Generator.generate(6, { upperCaseAlphabets: false, lowerCaseAlphabets: false, specialChars: false });
    res.status(201).send({ code: req.app.locals.OTP })
}

// verify OTP function 
const verifyOTP = async (req, res) => {
    const { code } = req.query;
    if (parseInt(req.app.locals.OTP) === parseInt(code)) {
        req.app.locals.OTP = null;
        req.app.locals.resetSession = true;
        return res.status(201).send({ msg: "OTP verified sucessfully" })
    }
    return res.status(400).send({ error: "Invalid OTP" })
}

// create session 
const createResetSession = (req, res) => {
    if (req.app.locals.status) {
        return res.status(201).send({ flag: req.body.locals.resetSession });
    }
    return res.status(440).send({ error: "Session expired" })
}

// reset password
const resestPassword = (req, res) => {
    try {
        if (!req.app.locals.resetSession) return res.status(440).send({ error: "Session expired!" });
        const { userName, password } = req.body;
        try {
            UserModel.findOne({ userName }).then(user => {
                bcrypt.hash(password, 10).then(hassedPassword => {
                    UserModel.updateOne({ password: hassedPassword }).then(data => {
                        req.app.locals.resetSession = false//reset the session
                        return res.status(201).send({ msg: "Record Updated....!!" });
                    }).catch(err => {
                        throw err;
                    })
                }).catch(error => {
                    return res.status(500).send({ error: "Unable to hash Password" })
                })
            }).catch(err => {
                return res.status(404).send({ error: "Username not found" })
            })

        } catch (error) {
            return res.status(500).send(error.message);

        }

    } catch (error) {
        return res.status(401).send(error)

    }

}

/** middleware for verify user */
const verifyUser = async (req, res, next) => {
    try {

        const { userName } = req.query
        console.log(userName)

        // check the user existance
        let exist = await UserModel.findOne({ userName });
        if (!exist) return res.status(404).send({ error: "Can't find User!" });
        next();

    } catch (error) {
        return res.status(404).send({ error: "Authentication Error" });
    }
}






module.exports = { register, login, getUser, updateUser, generateOTP, verifyOTP, createResetSession, resestPassword, verifyUser };