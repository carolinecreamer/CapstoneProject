import * as React from "react"
import Map from "../Map/Map"
import LoggedOutView from "../LoggedOutView/LoggedOutView";
import * as Bootstrap from "react-bootstrap"
import 'bootstrap/dist/css/bootstrap.min.css';
import "./Feed.css"

export default function Feed({currentUser}) {

    return (
        <Bootstrap.Container className="homepage">
            hi {currentUser}
        </Bootstrap.Container>
    )
}
