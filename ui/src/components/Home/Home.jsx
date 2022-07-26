import * as React from "react"
import Map from "../Map/Map"
import LoggedOutView from "../LoggedOutView/LoggedOutView";
import * as Bootstrap from "react-bootstrap"
import 'bootstrap/dist/css/bootstrap.min.css';
import "./Home.css"

export default function Home({ isLoggedIn, handleLogout, handleLogin, setLoading, cities, getCities, currentUser, getFollowing }) {

    return (
        <Bootstrap.Container className="homepage">
            {(isLoggedIn && currentUser!==null)
                ? <Map setLoading={setLoading} cities={cities} getCities={getCities} getFollowing={getFollowing}/>
                : <LoggedOutView handleLogin={handleLogin} setLoading={setLoading}/>
              }
        </Bootstrap.Container>
    )
}
