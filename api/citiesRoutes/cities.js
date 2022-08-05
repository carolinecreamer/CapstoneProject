const express = require("express");
const router  = express.Router();
const User  = require("../citiesModels/cities")
const Parse = require('parse/node');
const { URLSearchParams } = require("url");

router.get("/get-city", async (req, res, next) => {
    try {
        // get city from query parameters, comes in the form of a string, so needs to be parsed into an object so that
        // City name and State abbreviation can be retrieved
        const splitArray = req.url.split('?')
        const paramsString = splitArray[1]
        const params = new URLSearchParams(paramsString)

        const City = Parse.Object.extend("City");

        // search DB for City objects that have the same city name as the city name parameter
        const cityQuery = new Parse.Query(City);
        cityQuery.equalTo("city", params?.get("city"));

        // search DB for City objects that have the same state name as the state name parameter
        const stateQuery = new Parse.Query(City);
        stateQuery.equalTo("state", params?.get("state"));

        // queries for a city object that fills both query requirements (city name and state name matches search params)
        const query = Parse.Query.and(cityQuery, stateQuery);
        const city = await query.find();
        res.status(200).json({ city })
    } catch (err) {
        next(err);
    }
})

router.post("/add-city", async (req, res, next) => {
    // get city from query parameters, comes in the form of a string, so needs to be parsed into an object so that
    // City name, State abbreviation, average rent, coordinates, and listings can be retrieved
    const City = Parse.Object.extend("City");
    const city = new City();

    const splitArray = req.url.split('?')
    const paramsString = splitArray[1]
    const params = new URLSearchParams(paramsString)

    // set the values of the new city object equal to the search params
    city.set("city", params?.get("city"));
    city.set("state", params?.get("state"));
    city.set("average_rent", parseFloat(params?.get("average_rent")));
    city.set("coordinates", params?.get("coordinates").split(','));
    city.set("listings", params?.get("listings"));
    // save the city object to the DB
    city.save();

    res.sendStatus(200);
})

module.exports = router;
