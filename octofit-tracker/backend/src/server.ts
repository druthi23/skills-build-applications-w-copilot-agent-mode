import express from 'express'
import mongoose from 'mongoose'
import dotenv from 'dotenv'

dotenv.config()

const PORT = process.env.PORT || 8000
const MONGO_URL = process.env.MONGO_URL || 'mongodb://localhost:27017/octofit'

const app = express()
app.use(express.json())

app.get('/health', (req, res) => res.json({ status: 'ok' }))

mongoose
  .connect(MONGO_URL)
  .then(() => {
    app.listen(Number(PORT), () => {
      console.log(`Server listening on port ${PORT}`)
      console.log(`Connected to MongoDB at ${MONGO_URL}`)
    })
  })
  .catch((err) => {
    console.error('Failed to connect to MongoDB', err)
    process.exit(1)
  })
