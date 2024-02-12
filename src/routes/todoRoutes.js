const express = require('express');
const router = express.Router();
const todoController = require('../controllers/todoController');

router.get('/todos', todoController.getAllTodos);
router.post('/todos', todoController.createTodo);
router.put('/todos/:id', todoController.toggleTodo);
router.delete('todo/:id', todoController.deleteTodo);

module.exports = router;