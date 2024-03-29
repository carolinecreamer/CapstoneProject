import * as React from "react"
import {BsFillHouseFill, BsPersonCircle} from "react-icons/bs"
import { Link } from "react-router-dom";
import "./NavBarIcon.css"

export default function NavBarIcon({ viewProfile, toggleViewProfile }) {
    // Conditonally render navigation bar icon based on if the user has selected to view
    // their profile or not
    return (
        <div>
        { viewProfile ?
            <Link to={`/`}><BsFillHouseFill className="icon"  onClick={() => toggleViewProfile()}/> </Link>
            : <Link to={`/profile`}><BsPersonCircle className="icon" onClick={() => toggleViewProfile()}/></Link>
        }
        </div>
    )
}
