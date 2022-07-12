import * as React from "react"
import * as Icons from "react-icons/bs"
import { Link } from "react-router-dom";
import Icon from "../Icon/Icon"
import "./NavBarIcon.css"

export default function NavBarIcon({ viewProfile, toggleViewProfile }) {
    // Conditonally render navigation bar icon based on if the user has selected to view
    // their profile or not
    return (
        <div>
        { viewProfile ? 
            <Icon className="icon" route={`/`} icon={"BsFillHouseFill"} toggleViewProfile={toggleViewProfile}/> 
            : <Icon className="icon" route={`/profile`} icon={"BsPersonCircle"} toggleViewProfile={toggleViewProfile}/>
        }
        </div>
    )
}