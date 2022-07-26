import * as React from "react"
import * as Bootstrap from "react-bootstrap"
import 'bootstrap/dist/css/bootstrap.min.css';
import { BsPinFill } from "react-icons/bs"
import Friends from "../Friends/Friends";
import "./Feed.css"

export default function Feed({ currentUser, getUsers, users, setLoading }) {
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
                            <Bootstrap.ListGroupItem>

                                <h6>{user?.username}</h6>
                                <Friends user={user} friends={false} setLoading={setLoading}/>
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
