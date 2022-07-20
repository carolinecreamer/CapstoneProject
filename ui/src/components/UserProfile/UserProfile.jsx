import * as React from "react"
import "./UserProfile.css"
import axios from "axios"
import * as config from '../../config'
import * as Bootstrap from "react-bootstrap"
import 'bootstrap/dist/css/bootstrap.min.css';
import { useState, useEffect } from "react"


export default function UserProfile({ user }) {
    const [cities, setCities] = useState([])

    // Contains the users information in a Bootstrap Card component
    React.useEffect(() => {
        let setup = async()=>{
            const response = await axios.get(`http://localhost:3001/cities/`).catch((err)=>{
              console.error(err)
            })
            console.log(response)
            setCities(response.data.cities);
          }
          setup();
    }, [])
    return (
        <Bootstrap.Container>
            <Bootstrap.Card className="Card">
               <Bootstrap.Card.Body>
                    <Bootstrap.Card.Title >{user?.username}</Bootstrap.Card.Title>
                    <Bootstrap.Card.Text className="favorites">Favorites</Bootstrap.Card.Text>
                    {
                    cities.map((city)=>{
                        {console.log(city)}
                        return(<Bootstrap.Card.Text>{city}</Bootstrap.Card.Text>)

                    })}
                    <Bootstrap.Card.Text>Friends go here</Bootstrap.Card.Text>
               </Bootstrap.Card.Body>
            </Bootstrap.Card>
        </Bootstrap.Container>
    )


}
