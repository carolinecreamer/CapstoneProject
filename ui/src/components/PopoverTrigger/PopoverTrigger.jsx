import * as React from "react"
import { useState } from 'react'
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import { BsStar, BsStarFill } from "react-icons/bs";
import Popover from 'react-bootstrap/Popover';
import "./PopoverTrigger.css"
import * as config from "../../config";
import { Spinner } from "react-bootstrap";
import axios from "axios"


export default function PopoverTrigger({ city, state, setLoading, saved}) {
    const [starred, setStarred] = useState(saved);
    const [cityData, setCityData] = useState(null);
    const MARKER_SVG_OUTLINE = "M12 21.7C17.3 17 20 13 20 10a8 8 0 1 0-16 0c0 3 2.7 6.9 8 11.7z" // Coordinate path drawing out marker shape in SVG format

    function handleStar() {
        // Makes POST request to add city to DB and changes "starred" state variable to be true, causes page to re-render
        const addCity = async () => {
            try {
                const res = await axios.post(`${config.API_BASE_URL}/users/add-city`, {
                    city: city
                })
            } catch (err) {
                alert(err)
                return Promise.reject(err.response)
            }
            setStarred(true);
        }
        addCity();
    }

    function handleUnstar() {
        // Makes POST request to remove city from DB and changes "starred" state variable to be false, causes page to re-render
        const removeCity = async () => {
            try {
                const res = await axios.post(`${config.API_BASE_URL}/users/remove-city`, {
                    city: city
                })
            } catch (err) {
                alert(err)
                return Promise.reject(err.response)
            }
            setStarred(false);
        }

        removeCity();
    }

    return (

        <OverlayTrigger  rootClose trigger="click" placement="right" overlay={
            <Popover className="popover" id="popover-basic" >
                <Popover.Header >
                    <h4 className="popover-title">{city}</h4>
                    {starred ? <BsStarFill className="popover-star" onClick={() => handleUnstar()} /> :
                    <BsStar className="popover-star" onClick={() => handleStar()} />}

                </Popover.Header>
            </Popover>}>
            <g
                fill="#1266F1"
                stroke="#fff"
                strokeWidth="1"
                strokeLinecap="round"
                strokeLinejoin="round"
                transform={starred ? "translate(-12, -24)" : undefined}
<<<<<<< HEAD
=======

>>>>>>> 7065ba0 (Fix popover bug and loading error)
            >
                {starred ? <path d={MARKER_SVG_OUTLINE} />
                    : <circle r={3.5} fill="#1266F1" stroke="#fff" strokeWidth={1} />
                }
            </g>
        </OverlayTrigger>
    )
}
