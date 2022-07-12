import * as React from "react"
import Map from "../Map/Map"
import LoggedOutView from "../LoggedOutView/LoggedOutView";
import * as Bootstrap from "react-bootstrap"
import 'bootstrap/dist/css/bootstrap.min.css';
import "./Home.css"

export default function Home({ isLoggedIn, handleLogout, handleLogin }) {
<<<<<<< HEAD
    // If the user is logged in, go to the home page, otherwise show the login screen
=======
>>>>>>> ce97652 (Map Layout)
    return (
        <Bootstrap.Container className="homepage">
            {isLoggedIn
                ? <Map />
                : <LoggedOutView handleLogin={handleLogin} />
              }
        </Bootstrap.Container>
    )
}