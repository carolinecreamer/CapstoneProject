const express = require("express");
const router  = express.Router();
const User  = require("../models/models")
const Parse = require('parse/node')

// Get list of favorited users
router.get("/get-users", async (req, res, next) => {
    try {
        let query = new Parse.Query(Parse.User);
        let users = await query.find();
        res.status(200).json({ users })
    } catch (err) {
        next(err);
    }
})

router.get("/get-following", async (req, res, next) => {
    try {
        let currentUser = await User.getUser();
        let followingPointers = currentUser.get("friends");

        let following = await User.dereferencePointers(followingPointers)
        res.status(200).json({  following })
    } catch (err) {
        next(err);
    }
})

// Add route adds a user to the end of the "friends" array in the User object
router.post('/add-friend', async (req, res, next) => {
    try {
        // create new Parse User object from the user passed in through the POST request
        let friend = new Parse.User(req.body.user);
        friend["className"] = "_User";

        let user = await User.getUser();

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
    } catch(err) {
        next(err)
    }
});

// Remove route removes a user from the end of the "friends" array in
// the User object
router.post('/remove-friend', async (req, res, next) => {
    try {

        let user = await User.getUser();
        // create new Parse User object from the user passed in through the POST request
        let friend = new Parse.User(req.body.user);
        friend["className"] = "_User";

        // if the current user is null or the friend user is null, throw an error
        if (user === null || friend == null) {
            res.sendStatus(400);
            return
        }

        // remove the pointer of the friend user to the "friends" array in the current User object
        user.remove("friends", friend.toPointer())
            await user.save()
            res.sendStatus(200)

    } catch(err) {
        next(err)
    }
});


module.exports = router;
