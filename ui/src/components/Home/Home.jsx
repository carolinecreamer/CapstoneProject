import * as React from "react"
import Map from "../Map/Map"
import LoggedOutView from "../LoggedOutView/LoggedOutView";
import * as Bootstrap from "react-bootstrap"
import 'bootstrap/dist/css/bootstrap.min.css';
import "./Home.css"

export default function Home({ isLoggedIn, handleLogout, handleLogin, setLoading }) {
    return (
        <Bootstrap.Container className="homepage">
            {isLoggedIn
                ? <Map setLoading={setLoading}/>
                : <LoggedOutView handleLogin={handleLogin} setLoading={setLoading}/>
              }
        </Bootstrap.Container>
    )
}
