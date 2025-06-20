const express = require('express')
const app = express()

const connectDB = require('./config/db')

const dotenv = require('dotenv')
dotenv.config()

const cors = require('cors')
const path = require('path')

const PORT = process.env.PORT

app.use(cors())
app.use(express.json())
app.use('/uploads', express.static('uploads'))

connectDB()

app.use('/api/courses', require('./routes/courses'))
app.use('/api/admin', require('./routes/admin'))

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
