


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


    return (
        <Map cities={cities} following={following}/>
    )
}
