const express = require("express");
const router  = express.Router();
const Parse = require('parse/node')

// Register route creates a user in the database, displays an error message
// if the user cannot be created.
router.post('/register', async (req, res) => {
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
  router.post('/login', async (req, res) => {
    try {
      const user = await Parse.User.logIn(req.body.username, req.body.password)
      res.send({"user" : user})
    } catch (error) {
      res.status(400)
      res.send({"error" : "Login failed: " + error })
    }
  })
  
  
  // gets messages from DB, this route will be replaced with info from RealtyMole
  router.get('/messages', async (req, res) => {
    try {
      const query = new Parse.Query("Messages")
  
      query.descending("createdAt")
      query.include("user")
  
      const messages = await query.find()
  
      res.send({"messages" : messages})
    } catch (error) {
      res.status(400)
      res.send({"error" : "Message query failed: " + error })
    }
  })
  
  // posts messages to webpage, this route will be replaced with info from RealtyMole
  router.post('/messages', async (req, res) => {
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
  })


  // renders the profile page with the current user's info
  router.get('/profile', async (req, res) => {
    const user = req.user;
    res.render('profile', {title: 'profile', user: user});
  })


  module.exports = router;