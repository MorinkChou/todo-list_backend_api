require('dotenv').config()

const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const dbHost = process.env.DB_HOST

const app = express()
const port = 3030

app.use(cors())
app.use(bodyParser.json())

mongoose.connect(dbHost)

const todoSchema = new mongoose.Schema({
  task: String,
  isFinish: { type: Boolean, default: false },
  date: {
    type: Date,
    default: () => {
      const currentDate = new Date()
      return new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate())
    }
  }
})

const Todo = mongoose.model('Todo', todoSchema)

// 獲取所有任務
app.get('/todos', async (req, res) => {
  try {
    const todos = await Todo.find()
    res.json(todos)
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' })
  }
})

// 創建新任務
app.post('/todos', async (req, res) => {
  const { task } = req.body

  if (!task) {
    return res.status(400).json({ error: 'Task is required' })
  }

  try {
    const newTask = await Todo.create({ task })
    res.status(201).json(newTask)
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' })
  }
})

// 變更任務完成狀態
app.put('/todos/:id', async (req, res) => {
  const taskId = req.params.id

  try {
    // 先取得當前的任務
    const currentTask = await Todo.findById(taskId)

    if (!currentTask) {
      return res.status(404).json({ error: 'Task not found' })
    }

    // 切換 isFinsh值
    const updateTask = await Todo.findByIdAndUpdate(
      taskId,
      { $set: { isFinish: !currentTask.isFinish } },
      { new: true }
    )

    res.json(updateTask)
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' })
  }
})

// 刪除任務
app.delete('/todos/:id', async (req, res) => {
  const taskId = req.params.id

  try {
    const deleteTask = await Todo.findByIdAndDelete(taskId)
    if (!deleteTask) {
      return res.status(404).json({ error: 'Task not found' })
    }
    res.json({ message: 'Task deleted successfully' })
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' })
  }
})

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`)
})
