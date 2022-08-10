import * as React from "react"
import "./UserProfile.css"
import * as Bootstrap from "react-bootstrap"
import 'bootstrap/dist/css/bootstrap.min.css';
import { Spinner } from "react-bootstrap";
import CitiesProfile from "../CitiesProfile/CitiesProfile";
import FollowingProfile from "../FollowingProfile/FollowingProfile";

export default function UserProfile({ user, setCities, setFollowing, getCities , cities, getFollowing, following}) {

    // Contains the users information in a Bootstrap Card component
    React.useEffect(() => {
        async function onLoad() {
            const citiesRes = await getCities();
        if (typeof citiesRes.data.cities != 'undefined') {
            setCities(citiesRes.data.cities);
        }
        else {
            setCities(citiesRes.data);
        }

        const followingRes = await getFollowing();
        if (typeof followingRes.data.following != 'undefined') {
            setFollowing(followingRes.data.following);
        }
        else {
            setFollowing(followingRes.data);
      }
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
                    <CitiesProfile cities={cities}/>
                    <Bootstrap.Card.Text className="following">Following</Bootstrap.Card.Text>
                    <FollowingProfile user={user} following={following}/>
               </Bootstrap.Card.Body>
            </Bootstrap.Card>
        </Bootstrap.Container>
    )


}
