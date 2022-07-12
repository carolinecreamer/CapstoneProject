import { useState, useEffect } from 'react'
import * as Utils from "../../Utils"
import * as React from "react"
import './App.css'
import NavBar from '../NavBar/NavBar'
import Home from '../Home/Home'
import axios from "axios"
import {BrowserRouter,Routes,Route} from "react-router-dom"
import * as config from '../../config'
import UserProfile from '../UserProfile/UserProfile'
import Parse from 'parse/react-native'
import { BsEmojiNeutralFill } from 'react-icons/bs'


export default function App() { 
  // Boolean for if the user is logged in or not
  const [isLoggedIn, setIsLoggedIn]         = useState(localStorage.getItem("current_user_id") !== null)
  // City that the user has selected
  const [city, setCity]                     = useState("");
  // State that the user has selected
  const [state, setState]                   = useState("");
  // All listings in the given city
  const [listings, setListings]              = useState([]);
  // Array of properties within the user's price range
  const [properties, setProperties]         = useState([]);
  // Average rent in a city
  const [average, setAverage]               = useState(0);
  // Minimum rent price that the user is willing to pay
  const [minPrice, setMinPrice]             = useState(0);
  // Maximum rent price that the user is willing to pay
  const [maxPrice, setMaxPrice]             = useState(0);
  // Number of properties within the user's price rance
  const [numProperties, setNumProperties]   = useState(0);
  // If the user has selected to view their profile
  const [viewProfile, setViewProfile]       = useState(false);
  const [currentUser, setCurrentUser]       = useState(null);

  React.useEffect(() => {
    // Call functions in Utils.jsx to parse data
    setAverage(Utils.calculateAverage(listings));
    setProperties(Utils.getProperties(listings, minPrice, maxPrice));
    // will this work because setting state is asynchronous?
    setNumProperties(properties.length);
  }, [listings, minPrice, maxPrice]);


  // This is intentionally commented out but will be used later. The API only allows
  // 50 calls per month, so I created test data to test parsing functionality and will
  // only call the API when necessary for testing

 /* const getListingsByCity = () => {
    const options = {
      method: 'GET',
      url: 'https://realty-mole-property-api.p.rapidapi.com/rentalListings',
      params: {city: city, state: state},
      headers: {
        'X-RapidAPI-Key': config.RAPID_API_KEY,
        'X-RapidAPI-Host': config.RAPID_API_HOST
      }
    };
    
    axios.request(options).then(function (response) {
      setListings(response.data);
      parseResults();
    }).catch(function (error) {
      console.error(error);
    });
  }*/

  // For every network request, add a custom header for the logged in user
  // The backend API can check the header for the user id
  //
  // Note: This isn't a secure practice, but is convenient for prototyping.
  // In production, you would add an access token instead of (or in addition to)
  // the user id, in order to authenticate the request
  const addAuthenticationHeader = () => {
    const currentUserId = localStorage.getItem("current_user_id")
   // setCurrentUser(localStorage.getItem("user"))
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
    setCurrentUser(null)
    axios.defaults.headers.common = {};
    setIsLoggedIn(false)
  }

  // Handles logic for logging in a user -> sets the current user to the user
  // object in the DB that has a username and password that matches  
  // and sets the isLoggedIn state to false
  const handleLogin = (user) => {
    localStorage.setItem("current_user_id", user["objectId"])
    localStorage.setItem("user", user)
    setCurrentUser(user)
    addAuthenticationHeader()
   // getCurrentUser()
    setIsLoggedIn(true)
  }

  // Make GET request to RealtyMole when city is change (city will be changed on click)
  // Commented out intentionally (see comment above)
  /*
  React.useEffect(() =>{
    getListingsByCity();
  }, [city])
  */


  // Gets info from test json file (JSON file containing real data that I copy
  // & pasted from the API)
  React.useEffect(() => {
    axios
      .get("./testData.json")
      .then((res) => {
        setListings(res.data);
        setMinPrice(1000);
        setMaxPrice(2500);
      })
      .catch(err => console.error(err));
    
  }, []);

 /* useEffect(() => {
    // Since the async method Parse.User.currentAsync is needed to
    // retrieve the current user data, you need to declare an async
    // function here and call it afterwards
    async function getCurrentUser() {
      // This condition ensures that username is updated only if needed
      if (currentUser === null) {
        
        const user = await Parse.User.currentAsync();
       
        if (user !== null) {
          setCurrentUser(user);
          console.log("currentUser: ", user)
        }
      }
    }
    getCurrentUser();
  }, [isLoggedIn]);
*/


  // Toggles if NavBar shows that a user is signed in or not
  return (
    <div className="app">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={
            <div>
              <NavBar isLoggedIn={isLoggedIn} handleLogout={handleLogout} 
              viewProfile={viewProfile} setViewProfile={setViewProfile}/>
              <Home isLoggedIn={isLoggedIn} handleLogout={handleLogout} handleLogin={handleLogin}/>
            </div>
          }/>
          <Route path="/profile" element={
            <div>
              <NavBar isLoggedIn={isLoggedIn} handleLogout={handleLogout}
              viewProfile={viewProfile} setViewProfile={setViewProfile}/>
              <UserProfile user={currentUser} />
            </div>
          }/>
        </Routes>
      </BrowserRouter>
    </div>
  )
}
