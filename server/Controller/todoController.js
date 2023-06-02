const { default: mongoose } = require("mongoose");
const taskModel = require("../Models/taskSchema");
const { query } = require("express");

// Add todo task in todoList
const addTask = async (req, res) => {
    var { task, isImportant } = req.body;
    isImportant = isImportant ? isImportant : false;
    const { author } = req.query;



    try {
        const todo = new taskModel({ task, isImportant, author });
        todo.save().then(result => {
            res.status(201).send(result)
        }).catch(err => {
            res.status(500).send(err)
        })

    } catch (error) {
        res.status(500).send(error)

    }

};

// get all the todo task from the todolist
const getAllTask = async (req, res) => {
    const { author } = req.query;
    await taskModel.find({ author: author }).then(tasks => {
        if (tasks.length == 0) {
            throw new Error("Todo List Empty")
        }
        res.status(200).send(tasks)
    }).catch(err => {
        res.status(404).send(err.message)
    })

};

// update the task isComplete and isImportant task only
const updateTask = async (req, res) => {
    taskId = req.query.taskId
    task = req.body.rest


    try {
        await taskModel.updateOne({ _id: taskId }, task)
        res.status(200).send("Completed")
    } catch (error) {
        res.status(500).send(error)

    }
}

// delete the todo
const deleteTodo = async (req, res) => {
    taskId = req.query.taskId;
    try {
        await taskModel.findByIdAndDelete({ _id: taskId })
        res.status(200).send("Sucessfully deleted");

    } catch (error) {
        res.status(500).send(error);

    }
}


// search for the task in the taskList
const searchTodo = async (req, res) => {
    let query = req.query.todo;
    
    try {
        await taskModel.find({ task: { $regex: query } }).then(data => {
            if (data.length == 0) {
            return
            }
            res.status(200).send(data)

        }).catch(err => {
            res.status(404).send(err.message)
        })
    } catch (error) {
        res.status(500).send(error)

    }
}

module.exports = { addTask, getAllTask, updateTask, deleteTodo, searchTodo };