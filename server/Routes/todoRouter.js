const express = require("express");
const router = express.Router();
const taskController = require("../Controller/todoController.js");
const UserController = require("../Controller/userController.js")
const authMiddleware = require("../Middleware/auth.js")

// post routes for todo controller
router.post('/addTodo', authMiddleware.Auth, taskController.addTask);

// get routes
router.get('/getAllTask', authMiddleware.Auth, taskController.getAllTask);
router.get('/searchTodo', taskController.searchTodo)

// Put routes
router.put('/updateTask', taskController.updateTask)
// delete routes
router.delete('/deleteTask', taskController.deleteTodo)



module.exports = router;