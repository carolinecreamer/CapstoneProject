import * as React from "react"
import { BsPersonCircle, BsFillHouseFill } from "react-icons/bs"
import { Link } from "react-router-dom";
import NavBarIcon from "../NavBarIcon/NavBarIcon";
import "./NavBar.css"

export default function NavBar({ isLoggedIn, handleLogout, viewProfile, toggleViewProfile }) {
    // If the user is logged in and pressed the Log Out button, 
    // call the handleLogout function in the App.jsx component
    const onClick = event => {
        handleLogout()
    }

    // Creates the NavBar and calls the NavBarIcon component for each icon that is 
    // created in the navigation bar
    return (
        <div id="NavBar">
            <span>Parse Demo</span>
            <div className="icons">
                {isLoggedIn &&
                    <Link to={`/`}><a href="#" onClick={onClick}>Logout</a></Link>
                }
            
                {isLoggedIn ? <NavBarIcon viewProfile={viewProfile} toggleViewProfile={toggleViewProfile}/> : null}
            </div>
        </div>
    )
}