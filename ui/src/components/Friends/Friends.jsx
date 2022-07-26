import * as React from "react"
import 'bootstrap/dist/css/bootstrap.min.css';
import { BsFillPersonPlusFill, BsFillPersonCheckFill } from "react-icons/bs"
import "./Friends.css"
import { useState } from "react";
import axios from "axios"
import * as config from "../../config"

export default function Friends({ user, friends, setLoading }) {
    const [friended, setFriended] = useState(friends);

    async function handleFriend() {
        // Makes POST request to add friend to DB and changes "starred" state variable to be true, causes page to re-render
        setLoading(true);

        const addFriend = async () => {
            try {

                const res = await axios.post(`${config.API_BASE_URL}/users/add-friend`, {
                    user: user
                })

            } catch (err) {
                alert(err)
                return Promise.reject(err.response)
            }

            setLoading(false);
            setFriended(true);
        }
        addFriend();
    }

    async function handleUnfriend() {
        // Makes POST request to remove friend from DB and changes "starred" state variable to be false, causes page to re-render
        setLoading(true);

        const removeFriend= async () => {
            try {
                const res = await axios.post(`${config.API_BASE_URL}/users/remove-friend`, {
                    user: user
                })
            } catch (err) {
                alert(err)
                return Promise.reject(err.response)
            }
            setLoading(false);
            setFriended(false);
        }
        removeFriend();
    }

    // if the user is followed by the current user, display  the icon that shows a check mark; otherwise, display the icon that shows an addition sign
    if (friended) {
        return (
            <BsFillPersonCheckFill className="friend-icon" onClick={() => handleUnfriend()}/>
        )
    }
    else {
        return (
            <BsFillPersonPlusFill className="friend-icon" onClick={() => handleFriend()}/>
        )
    }
}