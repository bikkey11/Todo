const mongoose = require("mongoose")

taskSchema = mongoose.Schema({
    task: { type: String, required: true },
    isImportant: { type: Boolean, required: false, default: false },
    isCompleted: { type: Boolean, required: false, default: false },
    author: { type: String, required: true }
});

module.exports = mongoose.model("todo", taskSchema);