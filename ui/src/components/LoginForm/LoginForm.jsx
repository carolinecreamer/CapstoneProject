import * as React from "react"
import "./LoginForm.css"
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Card from 'react-bootstrap/Card';
import axios from "axios"
import * as config from "../../config"

export default function LoginForm({ handleLogin, setLoading }) {
  // Creates the login form and creates an onSubmit function to send the inputted
  // username and password to the database
  // Sends the login infor to the handleLogin function in the App.jsx component
  const username = React.createRef();
  const password = React.createRef();

  const handleSubmit = event => {
    setLoading(true);
    event.preventDefault();

    const login = async () => {
      try {
        const res = await axios.post(`${config.API_BASE_URL}/auth/login`, {
          "username": username.current.value,
          "password": password.current.value
        })
        handleLogin(res.data.user)
      } catch (err) {
        alert(err)
      }
    }
    login()
    setLoading(false);
  }

  return (
    <Card className="login-card">
      <Card.Body>
        <Card.Title className="form-title">Login</Card.Title>
        <Form onSubmit={handleSubmit}>
          <Form.Group>
            <Form.Label>Username</Form.Label>
            <Form.Control ref={username}></Form.Control>
          </Form.Group>
          <Form.Group>
            <Form.Label>Password</Form.Label>
            <Form.Control type="password" ref={password}></Form.Control>
          </Form.Group>
          <Button type="submit" className="login-button">Login</Button>
        </Form>
      </Card.Body>
    </Card>
  )
}
