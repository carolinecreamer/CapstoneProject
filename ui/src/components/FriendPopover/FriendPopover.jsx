import * as React from "react"
import { useState } from 'react'
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import { BsStar, BsStarFill } from "react-icons/bs";
import {ImMan} from "react-icons/im";
import Popover from 'react-bootstrap/Popover';
import { Marker } from "react-simple-maps";
import axios from "axios";
import "./FriendPopover.css";


export default function FriendPopover({ friendFavorites, following, cities }) {
    const favoritesIterator = friendFavorites[Symbol.iterator]();

    async function getFriendsCities(friend) {
        return request({
            method: 'get',
            user: friend,
            url: `http://localhost:3001/users/get-friends-cities`
        }).then((res) => {
            //setUsers(res.users);
            //setLoading(false)
            return res
        })
            .catch(err => console.error(err));

    }

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

    React.useEffect(() => {
         addToFavMap();
    })


    for (const [city, friendArray] of favoritesIterator) {
        return (
        <Marker key={city}>
            <OverlayTrigger key={city} rootClose trigger="click" placement="right" overlay={
             <Popover className="popover" id="popover-basic" key={city}>
             <Popover.Header >
                 <h4 className="popover-title">{city}</h4>
             </Popover.Header>

             <Popover.Body>
                 {
                     friendArray.map((friend) => {
                         return (
                            <p>{friend.username}</p>
                         )
                     })
                 }
             </Popover.Body>
         </Popover>}>
             <ImMan/>
            </OverlayTrigger>
        </Marker>

        )
    }

    return (null)

}
