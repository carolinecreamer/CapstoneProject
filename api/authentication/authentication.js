const express = require("express");
const router  = express.Router();
const Parse = require('parse/node')

// Register route creates a user in the database, displays an error message
// if the user cannot be created.
router.post('/register', async (req, res) => {
  Parse.User.enableUnsafeCurrentUser()
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
      Parse.User.enableUnsafeCurrentUser()
      const user = await Parse.User.logIn(req.body.username, req.body.password)
      res.send({"user" : user})
    } catch (error) {
      res.status(400)
      res.send({"error" : "Login failed: " + error })
    }
  })

  // renders the profile page with the current user's info
  router.get('/profile', async (req, res) => {
    const user = req.user;
    res.render('profile', {title: 'profile', user: user});
  })


  module.exports = router;
