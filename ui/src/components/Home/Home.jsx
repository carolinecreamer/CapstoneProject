import * as React from "react"
import Map from "../Map/Map"
import LoggedOutView from "../LoggedOutView/LoggedOutView";
import * as Bootstrap from "react-bootstrap"
import 'bootstrap/dist/css/bootstrap.min.css';
import "./Home.css"

export default function Home({ isLoggedIn, handleLogout, handleLogin }) {
    return (
        <Bootstrap.Container className="homepage">
            {isLoggedIn
                ? <Map />
                : <LoggedOutView handleLogin={handleLogin} />
              }
        </Bootstrap.Container>
    )
}
