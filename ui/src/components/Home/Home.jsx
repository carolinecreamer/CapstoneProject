import * as React from "react"
import MessagesView from "../MessagesView/MessagesView";
import LoggedOutView from "../LoggedOutView/LoggedOutView";
import * as Bootstrap from "react-bootstrap"
import 'bootstrap/dist/css/bootstrap.min.css';
import "./Home.css"

export default function Home({ isLoggedIn, handleLogout, handleLogin }) {
    // If the user is logged in, go to the home page, otherwise show the login screen
    return (
        <Bootstrap.Container className="homepage">
            {isLoggedIn
                ? <MessagesView />
                : <LoggedOutView handleLogin={handleLogin} />
              }
        </Bootstrap.Container>
    )
}