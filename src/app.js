

const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const todoRoutes = require('./routes/todoRoutes');
const errorHandler = require('./middleware/errorHandleer');

require('dotenv').config();
const dbHost = process.env.DB_HOST;


const app = express()
const port = 3030

app.use(cors());
app.use(bodyParser.json())

const mongoose = require('mongoose')
mongoose.connect(dbHost)


app.use('/api', todoRoutes);

app.use((err, req, res, next) => {
  errorHandler(res, err);
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`)
})
