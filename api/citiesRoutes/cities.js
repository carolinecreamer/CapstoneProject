const express = require("express");
const router  = express.Router();
const Cities  = require("../citiesModels/cities")
const Parse = require('parse/node')

// Get list of favorited cities
router.get("/", async (req, res, next) => {
    try {
        const user = await Cities.getUser();
        let cities = user.get("cities");
        res.status(200).json({ cities })
    } catch (err) {
        next(err);
    }
})

// Add route adds a city to the end of the "cities" array in the User object
router.post('/add', async (req, res, next) => {
    try {
        Parse.User.enableUnsafeCurrentUser()
        const currentUser = await Parse.User.current();

        if (currentUser !== null) {
            currentUser.addUnique("cities", req.body.city)
            return currentUser.save()
          }

    } catch(err) {
        next(err)
    }
});

// Remove route removes a city from the end of the "cities" array in
// the User object
router.post('/remove', async (req, res, next) => {
    try {
        Parse.User.enableUnsafeCurrentUser()
        const currentUser = await Parse.User.current();

        if (currentUser !== null) {
            currentUser.remove("cities", req.body.city)
            return currentUser.save()
          }

    } catch(err) {
        next(err)
    }
});


  module.exports = router;