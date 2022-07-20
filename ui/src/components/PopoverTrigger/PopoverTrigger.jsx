import * as React from "react"
import { useState, useEffect } from 'react'
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import { BsStar, BsStarFill } from "react-icons/bs";
import Popover from 'react-bootstrap/Popover';
import "./PopoverTrigger.css"
import * as config from "../../config"
import axios from "axios"

export default function PopoverTrigger({ name, setLoading }) {
    const [starred, setStarred] = useState(false);
    const [loading, setLoading] = useState(true);

    function handleStar() {
        setLoading(false);
        setStarred(!starred);

    }

    React.useEffect(() => {
        setLoading(true)
        if (starred) {
            const addCity = async () => {
                try {
                    const res = await axios.post(`${config.API_BASE_URL}/cities/add`, {
                        city: name
                    })
                } catch (err) {
                    alert(err)
                    console.error(err)
                    return Promise.reject(err.response)
                }
            }

            addCity()
        }
        if (!starred && !loading) {
            const removeCity = async () => {
                try {
                    const res = await axios.post(`${config.API_BASE_URL}/cities/remove`, {
                        city: name
                    })
                } catch (err) {
                    alert(err)
                    console.log(err)
                    return Promise.reject(err.response)
                }
            }

            removeCity()
        }
        setLoading(false)
    }, [starred])

    return (
        <OverlayTrigger key={name} rootClose trigger="click" placement="right" overlay={
            <Popover className="popover" id="popover-basic" key="state">
                <Popover.Header >
                    <h4 className="popover-title">{name}</h4>
                    {starred ?
                        <BsStarFill className="popover-star" onClick={() => handleStar()} /> :
                        <BsStar className="popover-star" onClick={() => handleStar()} />}
                </Popover.Header>

                <Popover.Body>Api call using name as search param here</Popover.Body>
            </Popover>}>
            <circle r={3.5} fill="#1266F1" stroke="#fff" strokeWidth={1} />
        </OverlayTrigger>
    )
}
