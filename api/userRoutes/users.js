const express = require("express");
const router  = express.Router();
const User  = require("../models/models")
const Parse = require('parse/node')

// Get list of favorited cities
router.get("/", async (req, res, next) => {
    try {
        const query = new Parse.Query(Parse.User);
        const users = await query.find();
        res.status(200).json({ users })
    } catch (err) {
        next(err);
    }
})

module.exports = router;
