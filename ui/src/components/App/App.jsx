import { useState } from 'react'
import * as Utils from "../../Utils"
import * as React from "react"
import './App.css'
import NavBar from '../NavBar/NavBar'
import Home from '../Home/Home'
import axios from "axios"
import { BrowserRouter, Routes, Route, useNavigate } from "react-router-dom"
import UserProfile from '../UserProfile/UserProfile'
import Feed from '../Feed/Feed'
import Spinner from 'react-bootstrap/Spinner';
<<<<<<< HEAD

=======
import * as config from "../../config"
import states from "../../../public/states.json";
>>>>>>> 14e0cb5 (Listings show in popover)


export default function App() {
  // Boolean for if the user is logged in or not
  const [isLoggedIn, setIsLoggedIn] = useState(localStorage.getItem("current_user_id") !== null)
  // City that the user has selected
  const [city, setCity] = useState("");
  // All users in the DB
  const [users, setUsers] = useState([]);
  // State that the user has selected
  const [state, setState] = useState("");
  // All listings in the given city
  const [listings, setListings] = useState(null);
  // Array of properties within the user's price range
  //const [properties, setProperties] = useState([]);
  // Average rent in a city
  //const [average, setAverage] = useState(0);
  // Minimum rent price that the user is willing to pay
  //const [minPrice, setMinPrice] = useState(1000);
  // Maximum rent price that the user is willing to pay
  //const [maxPrice, setMaxPrice] = useState(2500);
  // Number of properties within the user's price rance
  //const [numProperties, setNumProperties] = useState(0);
  // If the user has selected to view their profile
  const [viewProfile, setViewProfile] = useState(false);
  // Updates who the current user is based on if a user is logged in
  const [currentUser, setCurrentUser] = useState(null);
  const [cities, setCities] = useState(null);
  const [following, setFollowing] = useState(null);
  const [loading, setLoading] = useState(false);
  const friendFavorites = new Map();

  //console.log(num)

  //console.log('-87.62772560119629,41.90569466294521'.split(','))

 /* React.useEffect(() => {
    if (listings != null) {
      // Call functions in Utils.jsx to parse data
      const average = Utils.calculateAverage(listings);
      const properties = Utils.getProperties(listings, minPrice, maxPrice);
      // will this work because setting state is asynchronous?
      const numProperties = properties.length;

      addNewCity(city, state, states[state]?.cities[city]['coordinates'], listings, average)
    }
   // addNewCity(city, state, states[state]?.cities[city]['coordinates'], listings, average, minPrice, maxPrice, numProperties, properties)
  }, [listings, minPrice, maxPrice]);*/


  function handleNewListings(state, city, listings) {
    const average = Utils.calculateAverage(listings);
   // const properties = Utils.getProperties(listings, minPrice, maxPrice);
      // will this work because setting state is asynchronous?
    //const numProperties = properties.length;
    listings.map((listing) => {
      delete listing["rawAddress"];
      delete listing["county"];
      delete listing["county"];
      delete listing["addressLine1"];
      delete listing["addressLine2"];
      delete listing["city"];
      delete listing["state"];
      delete listing["zipCode"];
      delete listing["lastSeen"];
      delete listing["listedDate"];
      delete listing["status"];
      delete listing["removedDate"];
      delete listing["daysOnMarket"];
      delete listing["createdDate"];
      delete listing["id"];
      delete listing["latitude"];
      delete listing["longitude"];
    })
    console.log(JSON.stringify(listings))
    addNewCity(city, state, states[state]?.cities[city]['coordinates'], JSON.stringify(listings), average)
  }


  // This is intentionally commented out but will be used later. The API only allows
  // 50 calls per month, so I created test data to test parsing functionality and will
  // only call the API when necessary for testing

   const getListingsByCity = (city, state) => {
      const options = {
        method: 'GET',
        url: 'https://realty-mole-property-api.p.rapidapi.com/rentalListings',
        params: {city: city, state: state.abbreviation, limit: '9'},
        headers: {
          'X-RapidAPI-Key': config.RAPID_API_KEY,
          'X-RapidAPI-Host': config.RAPID_API_HOST
        }
      };

      axios.request(options).then(function (response) {
        console.log(response)
        handleNewListings(state.abbreviation, city, response.data);
        return response.data
      }).catch(function (error) {
        alert(error);
      });
   }

  const client = axios.create({
    baseURL: config.RAPID_API_HOST
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
    setCurrentUser(user);
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
  /*function clickState() {
    return request({
      method: 'get',
      url: "./testData.json"
    }).then((res) => {
      setListings(res.data);
      setMinPrice(1000);
      setMaxPrice(2500);
    })
      .catch(err => console.error(err));

  }*/


  // Toggles between displaying an icon that links to the home page (displays if you
  // are in the user profile) and an icon that links to the user profile (displays if
  // you are on the homepage). This function is sent in as a prop to the NavBar component
  function toggleViewProfile() {
    setViewProfile(viewProfile => !viewProfile)
  }


  async function addNewCity(city, state, coordinates, listings, avgprice) {
    return request({
      method: 'post',
      url: `http://localhost:3001/cities/add-city?city=${city}&state=${state}&coordinates=${coordinates}&average_rent=${avgprice}&listings=${listings}`
    }).then((res) => {
      return res
    })
      .catch(err => console.error(err));
  }

  async function queryCityFromDB(city, state) {
    return request({
      method: 'get',
      url: `http://localhost:3001/cities/get-city?city=${city}&state=${state.abbreviation}`,
    }).then((res) => {
      if ((res.city).length > 0) {
        return res
      }
      else {
        console.log(getListingsByCity(city, state))
        return getListingsByCity(city, state);
      }
    }).catch((err) => {

      alert(err);
      });
  }



  async function getCities() {
<<<<<<< HEAD
    const response = await axios.get(`http://localhost:3001/cities/get-cities`).catch((err)=>{
      alert(err)
    })
    setCities(response.data.cities);
  }

  async function getUsers() {
    const response = await axios.get(`http://localhost:3001/users/get-users`).catch((err)=>{
      alert(err)
    })
    setUsers(response.data.users);
  }

  async function getFollowing() {
    const response = await axios.get(`http://localhost:3001/users/get-following`).catch((err)=>{
      alert(err)
    })

    setFollowing(response.data.following);
  }



  if (loading) {
    return (
      <Spinner animation="border" role="status" className="loading">
        <span className="visually-hidden">Loading...</span>
      </Spinner>
    )
=======
    return request({
      method: 'get',
      url: `http://localhost:3001/users/get-cities`
    }).then((res) => {
      setCities(res.cities);
      setLoading(false)
      return res
    })
      .catch(err => console.error(err));
  }

  async function getUsers() {
    return request({
      method: 'get',
      url: `http://localhost:3001/users/get-users`
    }).then((res) => {
      setUsers(res.users);
      setLoading(false)
      return res
    })
      .catch(err => console.error(err));
>>>>>>> 14e0cb5 (Listings show in popover)
  }

  async function getFollowing() {
    return request({
      method: 'get',
      url: `http://localhost:3001/users/get-following`
    }).then((res) => {
      setFollowing(res.following);
      setLoading(false)
      return res
    })
      .catch(err => console.error(err));
  }

  if (loading) {
    return (
      <Spinner animation="border" role="status" className="loading">
      <span className="visually-hidden">Loading...</span>
      </Spinner>
    )
  }

  return (
    <div className="app">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={
            <div>
              <NavBar isLoggedIn={isLoggedIn} handleLogout={handleLogout}
                viewProfile={viewProfile} toggleViewProfile={toggleViewProfile} className="NavBar" currentUser={currentUser}/>
<<<<<<< HEAD
              <Home isLoggedIn={isLoggedIn} handleLogout={handleLogout} handleLogin={handleLogin} setLoading={setLoading}
              cities={cities} getCities={getCities} currentUser={currentUser} getFollowing={getFollowing}/>
=======
              <Home isLoggedIn={isLoggedIn} handleLogout={handleLogout} handleLogin={handleLogin} cities={cities} getCities={getCities}
              currentUser={currentUser} getFollowing={getFollowing} setLoading={setLoading} setCities={setCities} setFollowing={setFollowing}
              friendFavorites={friendFavorites} following={following} queryCityFromDB={queryCityFromDB}/>
>>>>>>> 14e0cb5 (Listings show in popover)
            </div>
          } />
          <Route path="/profile" element={
            <div>
              <NavBar isLoggedIn={isLoggedIn} handleLogout={handleLogout}
                viewProfile={viewProfile} toggleViewProfile={toggleViewProfile} className="NavBar" currentUser={currentUser}/>
              <UserProfile user={currentUser} setCities={setCities} setFollowing={setFollowing} getCities={getCities} cities={cities} following={following} getFollowing={getFollowing}/>
            </div>
          } />

          <Route path="/feed" element={
            <div>

              <NavBar isLoggedIn={isLoggedIn} handleLogout={handleLogout}
                viewProfile={viewProfile} toggleViewProfile={toggleViewProfile} className="NavBar" currentUser={currentUser}/>
<<<<<<< HEAD
              <Feed currentUser={currentUser} getUsers={getUsers} users={users} setLoading={setLoading} following={following}
              getFollowing={getFollowing}/>
=======
              <Feed setUsers={setUsers} setFollowing={setFollowing} currentUser={currentUser} getUsers={getUsers} users={users} following={following} getFollowing={getFollowing}/>
>>>>>>> 14e0cb5 (Listings show in popover)
            </div>
          } />
        </Routes>
      </BrowserRouter>
    </div>
  )
}
