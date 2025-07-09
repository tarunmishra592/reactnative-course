
const express = require('express')
const cors = require('cors')
const connectDB = require('./config/db')
const logger = require('./middleware/logger')
const recipesRouter = require('./routes/recipes')
const authRouter = require('./routes/auth')
require('dotenv').config()
const bcrypt = require('bcryptjs')


const app = express()

// Database Connection
connectDB()


// Middlewares 
app.use(cors()) 
app.use(express.json())
app.use(logger)



// Routes
app.use('/api/recipes', recipesRouter);
app.use('/api/auth', authRouter);


const PORT = process.env.PORT || 5001
app.listen(PORT, () => console.log(`Server running on ${PORT}`))