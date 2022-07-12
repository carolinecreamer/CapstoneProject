const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const Parse = require('parse/node')
const route = require('./authentication/authentication')
//import Parse from 'parse/dist/parse.min.js';
const {PARSE_APP_ID, PARSE_JAVASCRIPT_KEY} = require('./config')
//const { default: App } = require('../ui/src/components/App/App')

const app = express()
const port = process.env.PORT || 3001

app.use(express.json())
app.use(morgan("tiny"))
app.use(cors())
app.use('/auth', route)
// initalize Parse 
Parse.initialize(PARSE_APP_ID, PARSE_JAVASCRIPT_KEY)
Parse.serverURL = "https://parseapi.back4app.com"

// Gets the landing page for the website
app.get('/', (req, res) => {
  res.send('Hello World!')
})

// Shows which port the webpage is connected to
app.listen(port, () => {
  console.log(`Capstone project listening on port ${port}`)
})

// Sets the current user
app.use(function(req, res, next){
  res.locals.user = req.user;
}) 

module.exports = app;