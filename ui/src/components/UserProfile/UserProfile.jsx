import * as React from "react"
import "./UserProfile.css"
import * as Bootstrap from "react-bootstrap"
import 'bootstrap/dist/css/bootstrap.min.css';

export default function UserProfile({ user, getCities , cities, getFollowing, following}) {

    // Contains the users information in a Bootstrap Card component
    React.useEffect(() => {
          getCities();
          getFollowing();
    }, [])

    return (
        <Bootstrap.Container>
            <Bootstrap.Card className="Card">
               <Bootstrap.Card.Body>
                    <Bootstrap.Card.Title >{user?.username}</Bootstrap.Card.Title>
                    <Bootstrap.Card.Text className="favorites">Favorites</Bootstrap.Card.Text>
                    {
                    cities?.map((city)=>{
                        return(<Bootstrap.Card.Text>{city}</Bootstrap.Card.Text>)

                    })}
                    <Bootstrap.Card.Text className="following">Following</Bootstrap.Card.Text>
                    {
                        following?.map((user)=>{
                            return(<Bootstrap.Card.Text>{user}</Bootstrap.Card.Text>)

                        })
                    }
               </Bootstrap.Card.Body>
            </Bootstrap.Card>
        </Bootstrap.Container>
    )


}
