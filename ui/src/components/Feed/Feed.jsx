import * as React from "react"
import * as Bootstrap from "react-bootstrap"
import 'bootstrap/dist/css/bootstrap.min.css';
import { BsPinFill } from "react-icons/bs"
import Friends from "../Friends/Friends";
import "./Feed.css"

export default function Feed({ currentUser, getUsers, users, setLoading, following, getFollowing }) {
    React.useEffect(() => {
        setLoading(true);
        getUsers();
        getFollowing();
        setLoading(false);
    }, [])

    // Display other users that use the web page
    // Iterate over users, if the user is not the current user, display the user in the feed, if the user is in the array of "followed" users, change the user's icon
    // Iterate over each saved city for the user being displayed and display the city next to the user's name
    return (
        <Bootstrap.Container className="homepage">
            <Bootstrap.ListGroup >

                {users.map((user) => {
                    if (user?.username != currentUser?.username) {
                        return (
                            <Bootstrap.ListGroupItem className="list-group-item">

                                <h6>{user?.username}</h6>
                                <Friends className="friend" user={user} friends={following?.includes(user?.username)} setLoading={setLoading}/>
                                <div className="userCities">
                                    {

                                        user?.cities?.map((city) => {
                                            return (
                                                <p key={city} className="feedCity"> <BsPinFill className="pin"/> {city}</p>
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
