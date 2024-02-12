const mongoose = require('mongoose')

const todoSchema = new mongoose.Schema({
    task: String,
    isFinish: { type: Boolean, default: false },
    date: { 
      type: Date,
      default: () => {
        const currentDate = new Date();
        return new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate());
      }
    }
  });
  
  const Todo = mongoose.model('Todo', todoSchema);

  module.exports = Todo;
  