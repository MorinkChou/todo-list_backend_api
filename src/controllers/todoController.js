const Todo = require('../models/todoModel');
const errorHandler = require('../middleware/errorHandleer')

exports.getAllTodos = async (req, res) => {
    try {
      const todos = await Todo.find()
      res.json(todos)
    } catch (error) {
      errorHandler(res, error);
    }
};

exports.createTodo = async (req, res) => {
    const { task } = req.body
  
    if (!task) {
      return res.status(400).json({ error: 'Task is required' })
    }
  
    try {
      const newTask = await Todo.create({ task })
      res.status(201).json(newTask)
    } catch (error) {
      errorHandler(res, error);
    }
};

exports.toggleTodo =async (req, res) => {
    const taskId = req.params.id;
  
    try {
      // 先取得當前的任務
      const currentTask = await Todo.findById(taskId);
  
      if (!currentTask) {
        return res.status(404).json({ error: 'Task not found' });
      }
  
      //切換 isFinsh值
      const updateTask = await Todo.findByIdAndUpdate(
        taskId,
        { $set: { isFinish: !currentTask.isFinish } },
        { new: true}
      );
  
      res.json(updateTask);
    }catch (error){
      errorHandler(res, error);
    }
};

exports.deleteTodo = async (req, res) => {
    const taskId = req.params.id
  
    try {
      const deleteTask = await Todo.findByIdAndDelete(taskId);
      if (!deleteTask){
          return res.status(404).json({ error: 'Task not found' });
      }
      res.json({ message: 'Task deleted successfully' })
    } catch (error) {
      errorHandler(res, error);
    }
};

