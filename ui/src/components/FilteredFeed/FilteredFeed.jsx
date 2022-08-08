import * as React from "react"
import * as Bootstrap from "react-bootstrap"
import 'bootstrap/dist/css/bootstrap.min.css';
import { BsPinFill } from "react-icons/bs"
import Friends from "../Friends/Friends";
import FilteredUser from "../FilteredUser/FilteredUser";
import "./FilteredFeed.css"

export default function FilteredFeed({ setUsers, setFollowing, currentUser, getUsers, users, getFollowing, following }) {

    return (
        <Bootstrap.Container className="homepage">
            <Bootstrap.ListGroup >

                {users.map((user) => {
                    if (user?.username != currentUser?.username) {

                        return (
                            <FilteredUser user={user} currentUser={currentUser} following={following}/>
                        )
                    }
                })}
            </Bootstrap.ListGroup>
        </Bootstrap.Container>
    )
}
