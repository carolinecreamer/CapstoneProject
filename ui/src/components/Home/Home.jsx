import * as React from "react"
import Map from "../Map/Map"
import LoggedOutView from "../LoggedOutView/LoggedOutView";
import * as Bootstrap from "react-bootstrap"
import 'bootstrap/dist/css/bootstrap.min.css';
import "./Home.css"
import Load from "../Load/Load";

<<<<<<< HEAD
export default function Home({ isLoggedIn, handleLogout, handleLogin, setLoading, cities, getCities, currentUser, getFollowing }) {
=======
export default function Home({ queryCityFromDB, following, setCities, isLoggedIn, handleLogin, cities, getCities, currentUser, getFollowing, setLoading, setFollowing, friendFavorites }) {
>>>>>>> 14e0cb5 (Listings show in popover)

    return (
        <Bootstrap.Container className="homepage">
            {(isLoggedIn && currentUser!==null)
<<<<<<< HEAD
                ? <Map setLoading={setLoading} cities={cities} getCities={getCities} getFollowing={getFollowing}/>
                : <LoggedOutView handleLogin={handleLogin} setLoading={setLoading}/>
=======
                ? <Load setCities={setCities} cities={cities} getCities={getCities} getFollowing={getFollowing} setLoading={setLoading}
                setFollowing={setFollowing} friendFavorites={friendFavorites} following={following} queryCityFromDB={queryCityFromDB}/>
                : <LoggedOutView handleLogin={handleLogin}/>
>>>>>>> 14e0cb5 (Listings show in popover)
              }
        </Bootstrap.Container>
    )
}
