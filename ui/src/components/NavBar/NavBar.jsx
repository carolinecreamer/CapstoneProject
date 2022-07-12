import * as React from "react"
import { BsPersonCircle, BsFillHouseFill } from "react-icons/bs"
import { Link } from "react-router-dom";
import "./NavBar.css"

export default function NavBar({ isLoggedIn, handleLogout, viewProfile, setViewProfile }) {
    // If the user is logged in and pressed the Log Out button, 
    // call the handleLogout function in the App.jsx component
    const onClick = event => {
        event.preventDefault();
        handleLogout()
    }

    // Toggles between displaying an icon that links to the home page (displays if you 
    // are in the user profile) and an icon that links to the user profile (displays if
    // you are on the homepage)
    return (
        <div id="NavBar">
            <span>Parse Demo</span>
            
            {isLoggedIn &&
                <a href="#" onClick={onClick}>Logout</a>
            }
            {
                isLoggedIn && !viewProfile ?
                <Link to={`/profile`} className="icon"><BsPersonCircle onClick={() => setViewProfile(true)}/></Link> : null
            }

            {
                isLoggedIn && viewProfile ?
                <Link to={`/`} className="icon" ><BsFillHouseFill onClick={() => setViewProfile(false)}/></Link> : null
            }
        </div>
    )
}