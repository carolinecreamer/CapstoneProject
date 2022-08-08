import * as React from "react"
import * as Bootstrap from "react-bootstrap"
import 'bootstrap/dist/css/bootstrap.min.css';
import { BsPinFill } from "react-icons/bs"
import Friends from "../Friends/Friends";
import "./UnfilteredFeed.css"

export default function UnfilteredFeed({ setUsers, setFollowing, currentUser, getUsers, users, getFollowing, following }) {

    return (
        <Bootstrap.Container className="homepage">
            <Bootstrap.ListGroup >

                {users.map((user) => {
                    if (user?.username != currentUser?.username) {
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
                })}
            </Bootstrap.ListGroup>
        </Bootstrap.Container>
    )
}
