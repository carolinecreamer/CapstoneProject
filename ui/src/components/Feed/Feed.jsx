import * as React from "react"
import * as Bootstrap from "react-bootstrap"
import 'bootstrap/dist/css/bootstrap.min.css';
import "./Feed.css"

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
                            <Bootstrap.ListGroupItem>

                            {user?.username}
                            {
                                user?.cities?.map((city) => {
                                    return(
                                        <p>{city}</p>
                                    )
                                })
                            }
                            </Bootstrap.ListGroupItem>
                        )
                    }
                })}
            </Bootstrap.ListGroup>
        </Bootstrap.Container>
    )
}
