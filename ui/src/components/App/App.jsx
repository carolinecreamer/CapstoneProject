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
import * as config from "../../config"
import states from "../../../public/states.json";
import Roadtrip from '../Roadtrip/Roadtrip';
import Recommend from '../../collaborative-filter';

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
  // If the user has selected to view their profile
  const [viewProfile, setViewProfile] = useState(false);
  // Updates who the current user is based on if a user is logged in
  const [currentUser, setCurrentUser] = useState(null);
  // Array of cities that the user has saved
  const [cities, setCities] = useState(null);
  // Array of users that the current user follows
  const [following, setFollowing] = useState(null);
  // Map of friends that have saved each city
  const friendFavorites = new Map();

  // Delete information from the listings that isn't needed and call function to add the city to the DB
  function handleNewListings(state, city, listings) {
    const average = Utils.calculateAverage(listings);
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
    addNewCity(city, state, states[state]?.cities[city]['coordinates'], JSON.stringify(listings), average)
  }


  // Make a GET request to RealtyMole to get city information
  const getListingsByCity = (city, state) => {
    const options = {
      method: 'GET',
      url: 'https://realty-mole-property-api.p.rapidapi.com/rentalListings',
      params: { city: city, state: state.abbreviation, limit: '7' },
      headers: {
        'X-RapidAPI-Key': config.RAPID_API_KEY,
        'X-RapidAPI-Host': config.RAPID_API_HOST
      }
    };

    const res = axios.request(options).then(function (response) {
      handleNewListings(state.abbreviation, city, response.data);
      return response.data
    }).catch(function (error) {
      alert(error);
    });
    return res
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

  // Toggles between displaying an icon that links to the home page (displays if you
  // are in the user profile) and an icon that links to the user profile (displays if
  // you are on the homepage). This function is sent in as a prop to the NavBar component
  function toggleViewProfile() {
    setViewProfile(viewProfile => !viewProfile)
  }

  // make a POST request to add the city info to the DB
  async function addNewCity(city, state, coordinates, listings, avgprice) {
    return request({
      method: 'post',
      url: `http://localhost:3001/cities/add-city?city=${city}&state=${state}&coordinates=${coordinates}&average_rent=${avgprice}&listings=${listings}`
    }).then((res) => {
      return res
    })
      .catch(err => console.error(err));
  }

  // GET request to database to get city information, if the request returns a city, return the city info; otherwise, call the
  // getListingsByCity function to add the city to the DB
  async function queryCityFromDB(city, state) {
    return request({
      method: 'get',
      url: `http://localhost:3001/cities/get-city?city=${city}&state=${state}`,
    }).then((res) => {
      if ((res.city).length > 0) {
        return JSON.parse(res.city[0].listings)
      }
      else {
        return getListingsByCity(city, state);
      }
    }).catch((err) => {

      alert(err);
    });
  }

  // Call get-cities route in users.js and return the result
  const getCities = async() => {
    const options = {
      method: 'GET',
      url: `http://localhost:3001/users/get-cities`,
    };

    const res = await axios.request(options).then(function (res) {
      if (typeof res != 'undefined') {
        setCities(res.data.cities);
      }
      return res
    }).catch(function (error) {
      alert(error);
    });

    return res;
  }

  // Call get-users route in users.js and return the result
  const getUsers = async() => {
    const options = {
      method: 'GET',
      url: `http://localhost:3001/users/get-users`,
    };

    const res = await axios.request(options).then(function (res) {
      if (typeof res != 'undefined') {
        setUsers(res.data.users);
      }
      return res
    }).catch(function (error) {
      alert(error);
    });
    return res;
  }

  // Call get-following route in users.js and return the result
  const getFollowing = async() => {
    const options = {
      method: 'GET',
      url: `http://localhost:3001/users/get-following`,
    };

    const res = await axios.request(options).then(function (res) {
      if (typeof res != 'undefined') {
        setFollowing(res.data.following);
      }

      return res
    }).catch(function (error) {
      alert(error);
    });
    return res;
  }

  return (
    <div className="app">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={
            <div>
              <NavBar isLoggedIn={isLoggedIn} handleLogout={handleLogout}
                viewProfile={viewProfile} toggleViewProfile={toggleViewProfile} className="NavBar" currentUser={currentUser} />
              <Home isLoggedIn={isLoggedIn} handleLogout={handleLogout} handleLogin={handleLogin} cities={cities} getCities={getCities}
                currentUser={currentUser} getFollowing={getFollowing} setCities={setCities} setFollowing={setFollowing}
                following={following} queryCityFromDB={queryCityFromDB} friendFavorites={friendFavorites} />
            </div>
          } />
          <Route path="/profile" element={
            <div>
              <NavBar isLoggedIn={isLoggedIn} handleLogout={handleLogout}
                viewProfile={viewProfile} toggleViewProfile={toggleViewProfile} className="NavBar" currentUser={currentUser} />
              <UserProfile user={currentUser} setCities={setCities} setFollowing={setFollowing} getCities={getCities} cities={cities} following={following} getFollowing={getFollowing} />
            </div>
          } />

          <Route path="/feed" element={
            <div>

              <NavBar isLoggedIn={isLoggedIn} handleLogout={handleLogout}
                viewProfile={viewProfile} toggleViewProfile={toggleViewProfile} className="NavBar" currentUser={currentUser}/>
              <Feed setUsers={setUsers} setFollowing={setFollowing} currentUser={currentUser} getUsers={getUsers} users={users} following={following} getFollowing={getFollowing}/>

            </div>
          } />
          <Route path="/roadtrip" element={
            <div>
              <NavBar isLoggedIn={isLoggedIn} handleLogout={handleLogout}
                viewProfile={viewProfile} toggleViewProfile={toggleViewProfile} className="NavBar" currentUser={currentUser}/>
              <Roadtrip following={following} cities={cities} friendFavorites={friendFavorites} following={following} queryCityFromDB={queryCityFromDB} currentUser={currentUser} />
            </div>
          }/>
        </Routes>
      </BrowserRouter>
    </div>
  )
}
