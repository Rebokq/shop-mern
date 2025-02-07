const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const morgan = require('morgan')
const cors = require('cors')
const { readdirSync } =  require('fs')
require('dotenv').config()

//app
const app = express()

//db
mongoose
  .connect(process.env.DATABASE, {})
  .then(() => console.log("DB connected"))
  .catch((err) => console.log("DB Error => ", err))

//middleware
app.use(morgan('dev'))

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json({limit: '2mb'}));
app.use(cors())

//routes middleware
readdirSync('./routes').map((r) => app.use('/api', require('./routes/' + (r))))

//port
const port = process.env.PORT || 8000

app.listen(port, () => console.log(`Server is runnig on port ${port}`))