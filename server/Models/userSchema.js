const mongoose = require("mongoose");

userSchema = mongoose.Schema({
    userName: {
        type: String,
        reuired: [true, "Please Provide Username"],
        unique: [true, "Username Already exist"]
    },
    email: {
        type: String,
        reuired: [true, "Please Provide Email"],
        unique: [true, "Email Already Used"]
    },
    password: {
        type: String,
        required: true,
        unique: false
    },
    firstName: { type: String },
    middleName: { type: String },
    lastName: { type: String },
    profile: { type: String },
    phone: { type: Number },
    address: { type: String }

}, {
    timestamps: true,
    get: time => time.toDateString()
})

module.exports = mongoose.model("User", userSchema);