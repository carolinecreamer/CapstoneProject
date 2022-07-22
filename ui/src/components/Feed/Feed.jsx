import * as React from "react"
import Map from "../Map/Map"
import LoggedOutView from "../LoggedOutView/LoggedOutView";
import * as Bootstrap from "react-bootstrap"
import 'bootstrap/dist/css/bootstrap.min.css';
import "./Feed.css"
import { BsConeStriped } from "react-icons/bs";

export default function Feed({currentUser, getUsers, users}) {
    React.useEffect(() => {
        getUsers();
    }, [])

    // Display other users that use the web page
    return (
        <Bootstrap.Container className="homepage">
            <Bootstrap.ListGroup>

                {users.map((user) => {
                    if (user?.username != currentUser?.username) {
                        return (
                            <Bootstrap.ListGroupItem>{user?.username}</Bootstrap.ListGroupItem>
                        )
                    }
                })}
            </Bootstrap.ListGroup>
        </Bootstrap.Container>
    )
}
