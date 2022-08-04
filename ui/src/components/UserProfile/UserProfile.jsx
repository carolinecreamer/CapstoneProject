import * as React from "react"
import "./UserProfile.css"
import * as Bootstrap from "react-bootstrap"
import 'bootstrap/dist/css/bootstrap.min.css';
import { Spinner } from "react-bootstrap";

export default function UserProfile({ user, setCities, setFollowing, getCities , cities, getFollowing, following}) {

    // Contains the users information in a Bootstrap Card component
    React.useEffect(() => {
        async function onLoad() {
            const citiesRes = await getCities();
            setCities(citiesRes.data.cities);

            const followingRes = await getFollowing();
            setFollowing(followingRes.data.following)
        }

        onLoad()
    }, [])

    if (cities == null || following == null) {
        return (
            <Spinner animation="border" role="status" className="loading">
            <span className="visually-hidden">Loading...</span>
            </Spinner>
          )
    }

    return (
        <Bootstrap.Container>
            <Bootstrap.Card className="Card">
               <Bootstrap.Card.Body>
                    <Bootstrap.Card.Title >{user?.username}</Bootstrap.Card.Title>
                    <Bootstrap.Card.Text className="favorites">Favorites</Bootstrap.Card.Text>
                    {
                    cities?.map((city)=>{
                        return(<Bootstrap.Card.Text key={city.join(',')}>{city[0]}, {city[1]}</Bootstrap.Card.Text>)

                    })}
                    <Bootstrap.Card.Text className="following">Following</Bootstrap.Card.Text>
                    {
                        following?.map((friend)=>{
                            if (friend.username != user?.username) {
                                return(<Bootstrap.Card.Text key={friend.username}>{friend.username}</Bootstrap.Card.Text>)
                            }
                        })
                    }
               </Bootstrap.Card.Body>
            </Bootstrap.Card>
        </Bootstrap.Container>
    )


}
