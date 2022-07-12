import * as React from "react"
import * as Icons from "react-icons/bs"
import { Link } from "react-router-dom";
import "./Icon.css"

export default function Icon({ route, icon, toggleViewProfile }) {
    const ReactIcon = Icons[icon];
    // Dynamically creates a component depending on the name of the React icon
    return (
       <Link className= "link" to={`${route}`} onClick={() => toggleViewProfile()}>{React.createElement(ReactIcon)}</Link>     
    )
}