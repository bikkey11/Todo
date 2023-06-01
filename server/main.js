const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
require("dotenv").config();
const bodyParser = require("body-parser");
const userRouter = require("./Routes/userRouter.js");
const taskRouter = require("./Routes/todoRouter.js");

URI = process.env.MONGOURI;
PORT = process.env.PORT || 5000;


const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(cors());
// console.log(URI)

mongoose.connect(URI, {
    // useNewUrlParser: true,
    // useUnifiedTopology: true
}).then(() => {
    console.log("Db connected")
});

// Routes
app.use("/", userRouter);
app.use("/", taskRouter);



app.listen(PORT, () => {
    console.log(`App is listening to port ${PORT}`);
});