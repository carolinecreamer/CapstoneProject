import * as React from "react"
import { useState } from 'react'
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import { BsStar, BsStarFill } from "react-icons/bs";
import Popover from 'react-bootstrap/Popover';
import "./PopoverTrigger.css"

export default function PopoverTrigger({ name }) {
    const [starred, setStarred] = useState(false);
    return (
        <OverlayTrigger key={name} rootClose trigger="click" placement="right" overlay={
            <Popover className="popover" id="popover-basic" key="state">
                <Popover.Header >
                    <h4 className="popover-title">{name}</h4>
                    {starred ?
                        <BsStarFill className="popover-star" onClick={() => setStarred(!starred)} /> :
                        <BsStar className="popover-star" onClick={() => setStarred(!starred)} />}
                </Popover.Header>

                <Popover.Body>Api call using name as search param here</Popover.Body>
            </Popover>}>
            <circle r={3.5} fill="#1266F1" stroke="#fff" strokeWidth={1} />
        </OverlayTrigger>
    )
}
