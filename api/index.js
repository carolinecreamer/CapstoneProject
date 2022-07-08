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

/*
// Register route creates a user in the database, displays an error message
// if the user cannot be created.
app.post('/register', async (req, res) => {
  let user = new Parse.User(req.body)

  try {
      await user.signUp()
      res.status(201)    
      res.send({"user" : user})
  } catch (error) {
      res.status(400)
      res.send({"error" : "Failed to create user: " + error })
  }
})


// Logs in user by accessing database, displays error message if log in fails
app.post('/login', async (req, res) => {
  try {
    const user = await Parse.User.logIn(req.body.username, req.body.password)
    res.send({"user" : user})
  } catch (error) {
    res.status(400)
    res.send({"error" : "Login failed: " + error })
  }
})


// gets messages from DB, this route will be replaced with info from RealtyMole
app.get('/messages', async (req, res) => {
  try {
    const query = new Parse.Query("Messages")

    query.descending("createdAt")
    query.include("user")

    messages = await query.find()

    res.send({"messages" : messages})
  } catch (error) {
    res.status(400)
    res.send({"error" : "Message query failed: " + error })
  }
})

// posts messages to webpage, this route will be replaced with info from RealtyMole
app.post('/messages', async (req, res) => {
  try {
    const message = new Parse.Object("Messages", req.body)
    
    currentUserId = req.headers["current_user_id"]
    const user = new Parse.User()
    user.id = currentUserId
    
    message.set("user", user)

    await message.save()
    res.status(201)
    res.send({"message" : message})
  } catch (error) {
    res.status(400)
    res.send({"error" : "Create message failed: " + error })
  }
})*/

// Gets the landing page for the website
app.get('/', (req, res) => {
  res.send('Hello World!')
})

// Shows which port the webpage is connected to
app.listen(port, () => {
  console.log(`Capstone project listening on port ${port}`)
})

module.exports = app;