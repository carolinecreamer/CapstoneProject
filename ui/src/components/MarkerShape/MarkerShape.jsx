import * as React from "react"
import { useState, useEffect } from 'react'
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import { BsStar, BsStarFill } from "react-icons/bs";
import Popover from 'react-bootstrap/Popover';
import "./MarkerShape.css"
import * as config from "../../config"
import axios from "axios"

export default function MarkerShape({ marker }) {
    if (marker === "saved") {
        return (
            <g
                fill="none"
                stroke="#FF5533"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                transform="translate(-12, -24)"
            >
                <circle cx="12" cy="10" r="3" />
                <path d="M12 21.7C17.3 17 20 13 20 10a8 8 0 1 0-16 0c0 3 2.7 6.9 8 11.7z" />
            </g>
        )
    }

    return (
        <circle r={3.5} fill="#1266F1" stroke="#fff" strokeWidth={1} />
    )

}
