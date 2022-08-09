


import * as React from "react"
import Map from "../Map/Map"
import LoggedOutView from "../LoggedOutView/LoggedOutView";
import * as Bootstrap from "react-bootstrap"
import 'bootstrap/dist/css/bootstrap.min.css';
import { useState } from "react";
import Spinner from 'react-bootstrap/Spinner';
import "./Load.css"

export default function Load({ currentUser, friendFavorites, queryCityFromDB, setCities, cities, getCities, getFollowing, setFollowing, following }) {
  React.useEffect(() => {
    async function onLoad() {
      const citiesRes = await getCities();
      if (typeof citiesRes.data?.cities != 'undefined') {
        setCities(citiesRes.data.cities);
      }
      else {
        setCities(citiesRes.data);
      }

      const followingRes = await getFollowing();
      if (typeof followingRes.data?.following != 'undefined') {
        setFollowing(followingRes.data.following);
      }
      else {
        setFollowing(followingRes.data);
      }
    }

    onLoad()
  }, [])

  // Iterate over the array of users that the current user is following
  // Iterate over each city that each user has saved
  // If the city is already in the map, append the friend to the end of the array of friends that have that city saved
  // If the city is not in the map, add {City: [friend]} to the map
  following?.map((friend) => {
      if (friend.username != currentUser.username) {
        friend?.cities?.map((cityArr) => {
          let city = cityArr.join(',')
          if (typeof friendFavorites != 'undefined' && friendFavorites.has(city)) {
            let currentFriends = friendFavorites.get(city);
            currentFriends.push(friend);
            friendFavorites.set(city, currentFriends);
          }
          else {
            friendFavorites.set(city, [friend]);
          }
        })
      }
    })

  if (cities == null || following == null) {
    return (
      <Spinner animation="border" role="status" className="loading">
        <span className="visually-hidden">Loading...</span>
      </Spinner>
    )
  }

  return (
    <Map cities={cities} friendFavorites={friendFavorites} following={following} queryCityFromDB={queryCityFromDB} currentUser={currentUser} />
  )
}
