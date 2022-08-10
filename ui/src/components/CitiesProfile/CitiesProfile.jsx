import * as React from "react"
import "./CitiesProfile.css"
import * as Bootstrap from "react-bootstrap"
import 'bootstrap/dist/css/bootstrap.min.css';
import { Spinner } from "react-bootstrap";

export default function CitiesProfile({ cities }) {
    if (cities.length > 0) {
        return (
            cities?.map((city)=>{
                return(<Bootstrap.Card.Text key={city.join(',')}>{city[0]}, {city[1]}</Bootstrap.Card.Text>)

            })
        )
    }
    else {
        return (<Bootstrap.Card.Text>No saved cities found. Save cities on the homepage!</Bootstrap.Card.Text>)
    }
}
