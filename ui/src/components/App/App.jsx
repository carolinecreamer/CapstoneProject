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


export default function App() {
  // Boolean for if the user is logged in or not
  const [isLoggedIn, setIsLoggedIn] = useState(localStorage.getItem("current_user_id") !== null)
  // All users in the DB
  const [users, setUsers] = useState([]);
  // All listings in the given city
  const [listings, setListings] = useState(null);
  // If the user has selected to view their profile
  const [viewProfile, setViewProfile] = useState(false);
  // Updates who the current user is based on if a user is logged in
  const [currentUser, setCurrentUser] = useState(null);
  const [cities, setCities] = useState(null);
  const [following, setFollowing] = useState(null);
  const [loading, setLoading] = useState(false);


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


  // Call get-cities route in users.js and return the result
  const getCities = () => {
    const options = {
      method: 'GET',
      url: `http://localhost:3001/users/get-cities`,
    };

    const res = axios.request(options).then(function (res) {
      setCities(res.data.cities);
      setLoading(false)
      return res
    }).catch(function (error) {
      alert(error);
    });

    return res;
  }

  // Call get-users route in users.js and return the result
  const getUsers = () => {
    const options = {
      method: 'GET',
      url: `http://localhost:3001/users/get-users`,
    };

    const res = axios.request(options).then(function (res) {
      setUsers(res.data.users);
      setLoading(false)
      return res
    }).catch(function (error) {
      alert(error);
    });

    return res;
  }

  // Call get-following route in users.js and return the result
  const getFollowing = () => {
    const options = {
      method: 'GET',
      url: `http://localhost:3001/users/get-following`,
    };

    const res = axios.request(options).then(function (res) {
      setFollowing(res.data.following);
      setLoading(false)
      return res
    }).catch(function (error) {
      alert(error);
    });

    return res;
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
                viewProfile={viewProfile} toggleViewProfile={toggleViewProfile} className="NavBar" currentUser={currentUser} />
              <Home isLoggedIn={isLoggedIn} handleLogout={handleLogout} handleLogin={handleLogin} cities={cities} getCities={getCities}
                currentUser={currentUser} getFollowing={getFollowing} setLoading={setLoading} setCities={setCities} setFollowing={setFollowing}
                following={following} />
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
                viewProfile={viewProfile} toggleViewProfile={toggleViewProfile} className="NavBar" currentUser={currentUser} />
              <Feed setUsers={setUsers} setFollowing={setFollowing} currentUser={currentUser} getUsers={getUsers} users={users} following={following} getFollowing={getFollowing} />
            </div>
          } />
        </Routes>
      </BrowserRouter>
    </div>
  )
}
