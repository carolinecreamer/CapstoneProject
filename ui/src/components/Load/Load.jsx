


import * as React from "react"
import Map from "../Map/Map"
import LoggedOutView from "../LoggedOutView/LoggedOutView";
import * as Bootstrap from "react-bootstrap"
import 'bootstrap/dist/css/bootstrap.min.css';
import { useState } from "react";
import Spinner from 'react-bootstrap/Spinner';
import "./Load.css"
import { set } from "lodash";

export default function Load({ setCities, cities, getCities, getFollowing, setFollowing, following }) {
  // Get user and city info by calling API wrapper functions in App.jsx, used to load the users saved cities and who the user is following
  React.useEffect(() => {
    async function onLoad() {
      const citiesRes = await getCities();
      setCities(citiesRes.data.cities);

      const followingRes = await getFollowing();
      setFollowing(followingRes.data.following)
    }

    onLoad()
  }, [])

      function addToFavMap()  {

        following?.map((friend) => {
          friend?.cities?.map((city) => {
            if (friendFavorites.has(city)) {
              let currentFriends = friendFavorites.get(city);
              currentFriends.push(friend);
              friendFavorites.set(city, currentFriends);
            }
            else {
              friendFavorites.set(city, [friend]);
            }
          })
        })
    }

    if (cities == null || following == null) {
        return (
            <Spinner animation="border" role="status" className="loading">
            <span className="visually-hidden">Loading...</span>
            </Spinner>
          )
    }

  // if cities or following haven't loaded yet, show spinner
  if (cities == null || following == null) {
    return (
<<<<<<< HEAD
        <Map cities={cities} friendFavorites={friendFavorites} following={following} queryCityFromDB={queryCityFromDB}/>
=======
      <Spinner animation="border" role="status" className="loading">
        <span className="visually-hidden">Loading...</span>
      </Spinner>
>>>>>>> 37a1f54 (Loading spinner)
    )
  }

  return (
    <Map cities={cities} following={following} />
  )
}
