import * as React from "react"
import MessagesView from "../MessagesView/MessagesView";
import LoggedOutView from "../LoggedOutView/LoggedOutView";
import "./Home.css"

export default function Home({ isLoggedIn, handleLogout, handleLogin }) {
    // If the user is logged in and pressed the Log Out button, 
    // call the handleLogout function in the App.jsx component
    const onClick = event => {
        event.preventDefault();
        handleLogout()
    }
    console.log("here")
    console.log(isLoggedIn)
    return (
        <div id="Home">
            {isLoggedIn
                ? <MessagesView />
                : <LoggedOutView handleLogin={handleLogin} />
              }
        </div>
    )
}