import * as React from "react"
import * as Icons from "react-icons/bs"
import { Link } from "react-router-dom";
import "./NavBarIcon.css"

export default function NavBarIcon({ route, icon, toggleViewProfile }) {
    const Icon = Icons[icon];

    // Dynamically creates a component depending on the name of the React icon
    return (
       <Link to={`${route}`} className="icon"onClick={() => toggleViewProfile()}>{React.createElement(Icon)}</Link>     
    )
}