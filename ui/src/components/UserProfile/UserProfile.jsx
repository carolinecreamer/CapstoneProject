import * as React from "react"
import "./UserProfile.css"
import axios from "axios"
import * as config from '../../config'
import * as Bootstrap from "react-bootstrap"
import 'bootstrap/dist/css/bootstrap.min.css';


export default function UserProfile({ user }) {
    // Contains the users information in a Bootstrap Card component
    return (
        <Bootstrap.Container>
            <Bootstrap.Card className="Card">
               <Bootstrap.Card.Body>
                    <Bootstrap.Card.Title>{user?.username}</Bootstrap.Card.Title>
                    <Bootstrap.Card.Text>Favorites go here</Bootstrap.Card.Text>
                    <Bootstrap.Card.Text>Friends go here</Bootstrap.Card.Text>
               </Bootstrap.Card.Body>
            </Bootstrap.Card>
        </Bootstrap.Container>
    )

    
}