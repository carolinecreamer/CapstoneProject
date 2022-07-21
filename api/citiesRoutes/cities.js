const express = require("express");
const router  = express.Router();
const User  = require("../models/models")
const Parse = require('parse/node')

// Get list of favorited cities
router.get("/", async (req, res, next) => {
    try {
        const user = await User.getUser();
        let cities = user.get("cities");
        res.status(200).json({ cities })
    } catch (err) {
        next(err);
    }
})

// Add route adds a city to the end of the "cities" array in the User object
router.post('/add', async (req, res, next) => {
    try {
        const user = await User.getUser();
        if (user != null) {
            user.addUnique("cities", req.body.city)
            await user.save()
            res.send(true)
        }
        res.send(false)
    } catch(err) {
        next(err)
    }
});

// Remove route removes a city from the end of the "cities" array in
// the User object
router.post('/remove', async (req, res, next) => {
    try {
        const user = await User.getUser();

        if (user !== null) {
            user.remove("cities", req.body.city)
            await user.save()
            res.send(true)
        }
        res.send(false)

    } catch(err) {
        next(err)
    }
});


  module.exports = router;
