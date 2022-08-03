import * as React from "react"
import Map from "../Map/Map"
import LoggedOutView from "../LoggedOutView/LoggedOutView";
import * as Bootstrap from "react-bootstrap"
import 'bootstrap/dist/css/bootstrap.min.css';
import "./Home.css"
import Load from "../Load/Load";

export default function Home({ following, setCities, isLoggedIn, handleLogin, cities, getCities, currentUser, getFollowing, setFollowing}) {
    return (
        <Bootstrap.Container className="homepage">
            {(isLoggedIn && currentUser!==null)
                ? <Map setCities={setCities} cities={cities} getCities={getCities} getFollowing={getFollowing}
                setFollowing={setFollowing} following={following}/>
                : <LoggedOutView handleLogin={handleLogin}/>
              }
        </Bootstrap.Container>
    )
}
