import * as React from "react"
import LoginForm from "../LoginForm/LoginForm"
import RegisterForm from "../RegisterForm/RegisterForm"
import "./LoggedOutView"

export default function LoggedOutView({handleLogin}) {
    // What a user sees if they're not logged in yet, shows register form
    // and login form
    return (
        <div>
            <LoginForm handleLogin={handleLogin} />
            <RegisterForm handleLogin={handleLogin} />
        </div>
    )
}
