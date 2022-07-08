import { useState, useEffect } from 'react'
import * as React from "react"
import './App.css'
import NavBar from '../NavBar/NavBar'
import LoggedOutView from '../LoggedOutView/LoggedOutView'
import MessagesView from '../MessagesView/MessagesView'
import axios from "axios"
import {BrowserRouter,Routes,Route} from "react-router-dom"

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(localStorage.getItem("current_user_id") !== null)

  // For every network request, add a custom header for the logged in user
  // The backend API can check the header for the user id
  //
  // Note: This isn't a secure practice, but is convenient for prototyping.
  // In production, you would add an access token instead of (or in addition to)
  // the user id, in order to authenticate the request
  const addAuthenticationHeader = () => {
    const currentUserId = localStorage.getItem("current_user_id")
    if (currentUserId !== null) {
      axios.defaults.headers.common = {
        "current_user_id": currentUserId
      };
    }
  }
  addAuthenticationHeader()

  // Handles logic for logging out a user -> sets the header back to default
  // and sets the isLoggedIn state to false
  const handleLogout = () => {
    localStorage.removeItem("current_user_id")
    axios.defaults.headers.common = {};
    setIsLoggedIn(false)
  }

  // Handles logic for logging in a user -> sets the current user to the user
  // object in the DB that has a username and password that matches  
  // and sets the isLoggedIn state to false
  const handleLogin = (user) => {
    console.log(user)
    localStorage.setItem("current_user_id", user["objectId"])
    addAuthenticationHeader()

    setIsLoggedIn(true)
  }

  // Make GET request to RealtyMole
  React.useEffect(() =>{
    const options = {
      method: 'GET',
      url: 'https://realty-mole-property-api.p.rapidapi.com/zipCodes/29611',
      headers: {
        'X-RapidAPI-Key': '771f280f06mshacc707bbbbb16efp164b1cjsncaa3eb73700b',
        'X-RapidAPI-Host': 'realty-mole-property-api.p.rapidapi.com'
      }
    };
    
    axios.request(options).then(function (response) {
      console.log(response.data);
    }).catch(function (error) {
      console.error(error);
    });
  })

  // Toggles if NavBar shows that a user is signed in or not
  return (
    <div className="app">
      
        <NavBar isLoggedIn={isLoggedIn} handleLogout={handleLogout} />
          {isLoggedIn
            ? <MessagesView />
            : <LoggedOutView handleLogin={handleLogin} />
          }
        
      
    </div>
  )
}
