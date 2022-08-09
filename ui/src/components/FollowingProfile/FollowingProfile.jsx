import * as React from "react"
import "./FollowingProfile.css"
import * as Bootstrap from "react-bootstrap"
import 'bootstrap/dist/css/bootstrap.min.css';


export default function FollowingProfile({ user, following}) {
    if (following.length > 0) {
        return (
            following?.map((friend)=>{
                if (friend.username != user?.username) {
                    return(<Bootstrap.Card.Text key={friend.username}>{friend.username}</Bootstrap.Card.Text>)
                }
            })
        )
    }
    else {
        return (<Bootstrap.Card.Text>No friends found. Follow your friends!</Bootstrap.Card.Text>)
    }

}
