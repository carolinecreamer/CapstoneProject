import * as React from "react"
import * as Bootstrap from "react-bootstrap"
import 'bootstrap/dist/css/bootstrap.min.css';
import { BsPinFill } from "react-icons/bs"
import Friends from "../Friends/Friends";
import "./Feed.css"

export default function Feed({ setUsers, setFollowing, currentUser, getUsers, users, getFollowing, following }) {

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
    return (
        <Bootstrap.Container className="homepage">
            <Bootstrap.ListGroup>

                {users.map((user) => {
                    if (user?.username != currentUser?.username) {
                        return (
                            <Bootstrap.ListGroupItem key={user.objectId} className="list-group-item">
                                <h6 key={user.objectId}>{user?.username}</h6>
                                <Friends className="friend" user={user} key={user?.username} friends={following?.includes(user?.username)}/>
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
