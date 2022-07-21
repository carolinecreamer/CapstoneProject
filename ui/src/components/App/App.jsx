import { useState, useEffect } from 'react'
import * as Utils from "../../Utils"
import * as React from "react"
import './App.css'
import NavBar from '../NavBar/NavBar'
import Home from '../Home/Home'
import axios from "axios"
import { BrowserRouter, Routes, Route, useNavigate } from "react-router-dom"
import * as config from '../../config'
import UserProfile from '../UserProfile/UserProfile'
import Parse from 'parse/react-native'
import { BsEmojiNeutralFill } from 'react-icons/bs'


export default function App() {
  // Boolean for if the user is logged in or not
  const [isLoggedIn, setIsLoggedIn] = useState(localStorage.getItem("current_user_id") !== null)
  // City that the user has selected
  const [city, setCity] = useState("");
  // State that the user has selected
  const [state, setState] = useState("");
  // All listings in the given city
  const [listings, setListings] = useState([]);
  // Array of properties within the user's price range
  const [properties, setProperties] = useState([]);
  // Average rent in a city
  const [average, setAverage] = useState(0);
  // Minimum rent price that the user is willing to pay
  const [minPrice, setMinPrice] = useState(0);
  // Maximum rent price that the user is willing to pay
  const [maxPrice, setMaxPrice] = useState(0);
  // Number of properties within the user's price rance
  const [numProperties, setNumProperties] = useState(0);
  // If the user has selected to view their profile
  const [viewProfile, setViewProfile] = useState(false);
  // Updates who the current user is based on if a user is logged in
  const [currentUser, setCurrentUser] = useState(null);
  const [cities, setCities] = useState([]);
  const [loading, setLoading] = useState(false);

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

  const client = axios.create({
    //baseURL: constants.api.url -> going to uncomment when making real API requests!
    baseURL: null
  });


  const request = async function (options) {
    const onSuccess = function (response) {
      console.debug('Request Successful!', response);
      return response.data;
    }

    const onError = function (error) {
      console.error('Request Failed:', error.config);

      if (error.response) {
        // Request was made but server responded with something
        // other than 2xx
        console.error('Status:', error.response.status);
        console.error('Data:', error.response.data);
        console.error('Headers:', error.response.headers);

      } else {
        // Something else happened while setting up the request
        // triggered the error
        console.error('Error Message:', error.message);
      }

      return Promise.reject(error.response || error.message);
    }

    return client(options)
      .then(onSuccess)
      .catch(onError);
  }


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
    setCurrentUser(null)
    axios.defaults.headers.common = {};
    setIsLoggedIn(false)
    setViewProfile(false)
  }

  // Handles logic for logging in a user -> sets the current user to the user
  // object in the DB that has a username and password that matches
  // and sets the isLoggedIn state to false
  const handleLogin = (user) => {
    localStorage.setItem("current_user_id", user["objectId"])
    localStorage.setItem("user", user)
    setCurrentUser(user)
    addAuthenticationHeader()
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
  function clickState() {
    return request({
      method: 'get',
      url: "./testData.json"
    }).then((res) => {
      setListings(res.data);
      setMinPrice(1000);
      setMaxPrice(2500);
    })
      .catch(err => console.error(err));

  }


  // Toggles between displaying an icon that links to the home page (displays if you
  // are in the user profile) and an icon that links to the user profile (displays if
  // you are on the homepage). This function is sent in as a prop to the NavBar component
  function toggleViewProfile() {
    setViewProfile(viewProfile => !viewProfile)
  }


  async function getCities() {
    setLoading(true)
    const response = await axios.get(`http://localhost:3001/cities/`).catch((err)=>{
      alert(err)
    })
    setCities(response.data.cities);
    setLoading(false)
  }

  return (
    <div className="app">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={
            <div>
              <NavBar isLoggedIn={isLoggedIn} handleLogout={handleLogout}
                viewProfile={viewProfile} toggleViewProfile={toggleViewProfile} className="NavBar" />
              <Home isLoggedIn={isLoggedIn} handleLogout={handleLogout} handleLogin={handleLogin} setLoading={setLoading}
              cities={cities} getCities={getCities} currentUser={currentUser}/>
            </div>
          } />
          <Route path="/profile" element={
            <div>
              <NavBar isLoggedIn={isLoggedIn} handleLogout={handleLogout}
                viewProfile={viewProfile} toggleViewProfile={toggleViewProfile} className="NavBar" />
              <UserProfile user={currentUser} getCities={getCities} cities={cities} setLoading={setLoading}/>
            </div>
          } />
        </Routes>
      </BrowserRouter>
    </div>
  )
}
