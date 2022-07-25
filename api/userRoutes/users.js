const express = require("express");
const router  = express.Router();
const User  = require("../models/models")
const Parse = require('parse/node')

// Get list of favorited users
router.get("/get-users", async (req, res, next) => {
    try {
        const query = new Parse.Query(Parse.User);
        const users = await query.find();
        res.status(200).json({ users })
    } catch (err) {
        next(err);
    }
})

router.get("/get-following", async (req, res, next) => {
    try {
        const user = await User.getUser();
        const query = new Parse.Query("Follow");
        query.equalTo("from", user);
        const users = await query.find();
        res.status(200).json({ users })
    } catch (err) {
        next(err);
    }
})

// Add route adds a city to the end of the "cities" array in the User object
router.post('/add-friend', async (req, res, next) => {
    try {
        // create new Parse User object from the user passed in through the POST request
        const friend = new Parse.User(req.body.user);
        friend["className"] = "_User";

        const user = await User.getUser();

        // if the current user is null or the friend user is null, throw an error
        if (user == null || friend == null) {
            res.sendStatus(400);
            return
        }

        // add the pointer of the friend user to the "friends" array in the current User object
        user.addUnique("friends", friend.toPointer())
        await user.save()
        res.sendStatus(200)
        return

       // res.sendStatus(400)
    } catch(err) {
        next(err)
    }
});

// Remove route removes a city from the end of the "cities" array in
// the User object
router.post('/remove-friend', async (req, res, next) => {
    try {
        const user = await User.getUser();

        if (user !== null) {
            user.remove("cities", req.body.city)
            await user.save()
            res.sendStatus(200)
        }
        res.sendStatus(400)

    } catch(err) {
        next(err)
    }
});


module.exports = router;
