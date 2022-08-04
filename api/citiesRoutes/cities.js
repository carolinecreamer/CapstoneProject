<<<<<<< HEAD
=======
const express = require("express");
const router  = express.Router();
const User  = require("../models/models")
const Parse = require('parse/node');
const { URLSearchParams } = require("url");

router.get("/get-city", async (req, res, next) => {
    try {
        const splitArray = req.url.split('?')
        const paramsString = splitArray[1]
        const params = new URLSearchParams(paramsString)

        const City = Parse.Object.extend("City");

        const cityQuery = new Parse.Query(City);
        cityQuery.equalTo("city", params?.get("city"));

        const stateQuery = new Parse.Query(City);
        stateQuery.equalTo("state", params?.get("state"));

        const query = Parse.Query.and(cityQuery, stateQuery);
        const city = await query.find();

        res.status(200).json({ city })
    } catch (err) {
        next(err);
    }
})

router.post("/add-city", async (req, res, next) => {
    const City = Parse.Object.extend("City");
    const city = new City();

    const splitArray = req.url.split('?')
    const paramsString = splitArray[1]
    const params = new URLSearchParams(paramsString)

    city.set("city", params?.get("city"));
    city.set("state", params?.get("state"));
    city.set("average_rent", parseFloat(params?.get("average_rent")));
    city.set("coordinates", params?.get("coordinates").split(','));
    city.set("listings", params?.get("listings"));

    city.save();
    res.status(200);
})

  module.exports = router;
>>>>>>> 14e0cb5 (Listings show in popover)
