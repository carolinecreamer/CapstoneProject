import * as React from "react"
import "./LoginForm.css"
import axios from "axios"
import * as config from "../../config"

export default function LoginForm({handleLogin}) {
  // Creates the login form and creates an onSubmit function to send the inputted
  // username and password to the database
  // Sends the login infor to the handleLogin function in the App.jsx component
    const username = React.createRef();
    const password = React.createRef();

    const handleSubmit = event => {
        event.preventDefault();

        const login = async () => {
            try {
                const res = await axios.post(`${config.API_BASE_URL}/login`, {
                    "username" : username.current.value,
                    "password" : password.current.value
                    })                
                handleLogin(res.data.user)    
            } catch (err) {
                alert(err)
                console.log(err)
            }
        }
        login()
    }
  
    return (
      <form onSubmit={handleSubmit}>
        <div className="title">Login</div>
        <label>
          <span>Username</span>
          <input ref={username}></input>
        </label>
        <label>
          <span>Password</span>
          <input type="password" ref={password}></input>
        </label>
        <button type="submit">Login</button>
      </form>
    )
}