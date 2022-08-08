import * as React from "react"
import * as Bootstrap from "react-bootstrap"
import 'bootstrap/dist/css/bootstrap.min.css';
import { BsPinFill } from "react-icons/bs"
import Friends from "../Friends/Friends";
import "./FilteredUser.css"

export default function FilteredUser({ user, currentUser, following }) {
    let cityMatch = false;

    // Map over user's cities, if the city matches any city in the current user's saved cities, set boolean to true
    user?.cities?.map((city)=> {
        currentUser?.cities?.map((match) => {
            if ((city[0] == match[0]) && (city[1] == match[1])) {
                cityMatch = true;
            }
        })
    })

    // if the users have a city in common, display the user
    if (cityMatch == true) {
        return (
            <Bootstrap.ListGroupItem key={user.objectId} className="list-group-item">
                <h6 key={user.objectId}>{user?.username}</h6>
                <Friends className="friend" user={user} key={user?.username} following={following}/>
                <div className="userCities" key={user.password}>
                    {

                        user?.cities?.map((city) => {
                            return (
                                <p key={city.join(',')} className="feedCity"> <BsPinFill key={city.join(',')} className="pin"/> {city[0]}, {city[1]}</p>
                            )
                        })

                    }
                </div>
            </Bootstrap.ListGroupItem>
        )
    }
    return (
        null
    )
}
