import * as React from "react"
import "./NavBar.css"

export default function NavBar({ isLoggedIn, handleLogout }) {
    // If the user is logged in and pressed the Log Out button, 
    // call the handleLogout function in the App.jsx component
    const onClick = event => {
        event.preventDefault();
        handleLogout()
    }

    return (
        <div id="NavBar">
            <span>Parse Demo</span>
            {isLoggedIn &&
                <a href="#" onClick={onClick}>Logout</a>
            }
        </div>
    )
}