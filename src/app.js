

const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')

require('dotenv').config();
const dbHost = process.env.DB_HOST;


const app = express()
const port = 3030

app.use(cors());
app.use(bodyParser.json())

mongoose.connect(dbHost||'mongodb://localhost:27017/todoapp')


// 獲取所有任務
app.get('/todos', )

// 創建新任務
app.post('/todos', )

//變更任務完成狀態
app.put('/todos/:id', )

// 刪除任務
app.delete('/todos/:id', )

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`)
})
