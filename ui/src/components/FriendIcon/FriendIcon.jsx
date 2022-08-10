import * as React from "react"
import 'bootstrap/dist/css/bootstrap.min.css';
import { BsFillPersonPlusFill, BsFillPersonCheckFill } from "react-icons/bs"
import "./FriendIcon.css"
import { useState } from "react";
import axios from "axios"
import * as config from "../../config"

export default function FriendIcon({ user, friended, handleFriend, handleUnfriend}) {
    const [followed, setFollowed] = useState(friended);

    function onClick() {
        if (followed) {
            handleUnfriend();
        }
        else {
            handleFriend();
        }
        setFollowed(!followed);
    }
    // if the user is followed by the current user, display  the icon that shows a check mark; otherwise, display the icon that shows an addition sign
    if (followed) {
        return (
            <BsFillPersonCheckFill key={user} className="friend-icon" onClick={() => onClick()}/>
        )
    }
    else {
        return (
            <BsFillPersonPlusFill key={user} className="friend-icon" onClick={() => onClick()}/>
        )
    }
}
