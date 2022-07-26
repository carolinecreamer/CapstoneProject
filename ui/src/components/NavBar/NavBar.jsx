import * as React from "react"
import { Link } from "react-router-dom";
import NavBarIcon from "../NavBarIcon/NavBarIcon";
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import "bootstrap/dist/css/bootstrap.min.css";
import "./NavBar.css"

export default function NavBar({ isLoggedIn, handleLogout, viewProfile, toggleViewProfile, currentUser }) {
    // If the user is logged in and pressed the Log Out button,
    // call the handleLogout function in the App.jsx component
    const onLogoutClick = event => {
        handleLogout()
    }
    // If the user is not logged in, show a nav bar that only shows the title text. If the user clicks
    // on the title text, nothing will happen. If the user is logged in, show either the user profile or
    // the home icon. If the user clicks on the title or the home icon, the user will be rerouted back to
    // home. If the user clicks on the user profile icon, the user will be routed to the user profile.
    return (
        <Navbar bg="light" className="navbar">
            {
                (isLoggedIn && currentUser!== null) ?
                <section className="navBarSection">
                    <Link to={`/`}><Navbar.Brand className="title">Capstone Project</Navbar.Brand></Link>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="me-auto">
                            <NavBarIcon  viewProfile={viewProfile} toggleViewProfile={toggleViewProfile}/>
                            <Link className="feed" to={`/feed`}>Feed</Link>
                            <Link to={`/`} onClick={onLogoutClick}>Logout</Link>
                        </Nav>
                    </Navbar.Collapse>
                </section>
                : <section className="navBarSection"><Navbar.Brand className="title">Capstone Project</Navbar.Brand></section>
            }
        </Navbar>
    )
}
