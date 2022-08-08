import * as React from "react"
import * as Bootstrap from "react-bootstrap"
import 'bootstrap/dist/css/bootstrap.min.css';
import { BsPinFill } from "react-icons/bs"
import Friends from "../Friends/Friends";
import FilteredFeed from "../FilteredFeed/FilteredFeed";
import UnfilteredFeed from "../UnfilteredFeed/UnfilteredFeed";
import "./Feed.css"
import { useState } from "react";

export default function Feed({ setUsers, setFollowing, currentUser, getUsers, users, getFollowing, following }) {
    const [filtered, setFiltered] = useState(false);
    React.useEffect(() => {
        async function onLoad() {
            const usersRes = await getUsers();
            setUsers(usersRes.data.users);

            const followingRes = await getFollowing();
            setFollowing(followingRes.data.following)
        }

        onLoad()
    }, [])


    // Display other users that use the web page
    // Iterate over users, if the user is not the current user, display the user in the feed, if the user is in the array of "followed" users, change the user's icon
    // Iterate over each saved city for the user being displayed and display the city next to the user's name
    return (
        <div>
            <Bootstrap.Button onClick={()=>setFiltered(true)}>Filter by Cities!</Bootstrap.Button>
            { filtered ? <FilteredFeed currentUser={currentUser} users={users} following={following}/> :
            <UnfilteredFeed currentUser={currentUser} users={users} following={following}/>}
       </div>
    )
}
