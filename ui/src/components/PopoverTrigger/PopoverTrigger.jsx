import * as React from "react"
import { useState, useEffect } from 'react'
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import { BsStar, BsStarFill } from "react-icons/bs";
import Popover from 'react-bootstrap/Popover';
import "./PopoverTrigger.css"
import * as config from "../../config"
import axios from "axios"
import MarkerShape from "../MarkerShape/MarkerShape";


export default function PopoverTrigger({ name, setLoading, saved }) {
    const [starred, setStarred] = useState(saved);

    async function handleStar() {
        // Makes POST request to add city to DB and changes "starred" state variable to be true, causes page to re-render
        setLoading(true);

        const addCity = async () => {
            try {
                const res = await axios.post(`${config.API_BASE_URL}/cities/add`, {
                    city: name
                })
            } catch (err) {
                alert(err)
                return Promise.reject(err.response)
            }
            setLoading(false);
            setStarred(true);
        }
        addCity();
    }

    function handleUnstar() {
        // Makes POST request to remove city from DB and changes "starred" state variable to be false, causes page to re-render
        setLoading(true);
        const removeCity = async () => {
            try {
                const res = await axios.post(`${config.API_BASE_URL}/cities/remove`, {
                    city: name
                })
            } catch (err) {
                alert(err)
                return Promise.reject(err.response)
            }

            setLoading(false);
            setStarred(false);
        }

        removeCity();
    }

    if (starred) {
        return (

            <OverlayTrigger key={name} rootClose trigger="click" placement="right" overlay={
                <Popover className="popover" id="popover-basic" key="state">
                    <Popover.Header >
                        <h4 className="popover-title">{name}</h4>
                        <BsStarFill className="popover-star" onClick={() => handleUnstar()} />
                    </Popover.Header>

                    <Popover.Body>Api call using name as search param here</Popover.Body>
                </Popover>}>
            <g
                fill="#1266F1"
                stroke="#fff"
                strokeWidth="1"
                strokeLinecap="round"
                strokeLinejoin="round"
                transform="translate(-12, -24)"
            >
                <circle cx="12" cy="10" r="3" />
                <path d="M12 21.7C17.3 17 20 13 20 10a8 8 0 1 0-16 0c0 3 2.7 6.9 8 11.7z" />
            </g>
            </OverlayTrigger>
        )
    }
    else {
        return (
            <OverlayTrigger key={name} rootClose trigger="click" placement="right" overlay={
                <Popover className="popover" id="popover-basic" key="state">
                    <Popover.Header >
                        <h4 className="popover-title">{name}</h4>
                        <BsStar className="popover-star" onClick={() => handleStar()} />
                    </Popover.Header>

                    <Popover.Body>Api call using name as search param here</Popover.Body>
                </Popover>}>
                <circle r={3.5} fill="#1266F1" stroke="#fff" strokeWidth={1} />
            </OverlayTrigger>
        )
    }



}
