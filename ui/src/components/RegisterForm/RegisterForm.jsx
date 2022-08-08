import * as React from "react"
import "./RegisterForm.css"
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Card from 'react-bootstrap/Card';
import axios from "axios"
import * as config from '../../config'

export default function RegisterForm({ handleLogin, setLoading }) {
    // Defines a handleSubmit function that creates a POST request containing
    // the inputted username and password for a new user to add the user to the
    // database
    // Calls the handleLogin function in the App.jsx component with the new
    // user's information
    const username = React.createRef();
    const password = React.createRef();

    const handleSubmit = event => {
        event.preventDefault();

        const register = async () => {

            try {
                const res = await axios.post(`${config.API_BASE_URL}/auth/register`, {
                    "username" : username.current.value,
                    "password" : password.current.value
                    })
                handleLogin(res.data.user)
            } catch (err) {
                alert(err)
            }

        }
        register()
    }

    return (
        <Card className="register-card">
        <Card.Body>
          <Card.Title className="form-title">Register</Card.Title>
          <Form onSubmit={handleSubmit}>
            <Form.Group>
              <Form.Label>Username</Form.Label>
              <Form.Control ref={username}></Form.Control>
            </Form.Group>
            <Form.Group>
              <Form.Label>Password</Form.Label>
              <Form.Control type="password" ref={password}></Form.Control>
            </Form.Group>
            <Button type="submit" className="register-button">Register</Button>
          </Form>
        </Card.Body>
      </Card>
    )
}
