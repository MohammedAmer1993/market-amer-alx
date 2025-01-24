// src/components/Login.js
import React, { useState } from "react";
import { Form, FormGroup, Label, Input, Button } from "reactstrap";
import { connect } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

const Login = ({ login }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    // Here you would typically make an API call to your backend for authentication
    // For now, we'll just simulate a successful login
    if (username === "user" && password === "password") {
      login(); // Dispatch the login action (we'll define this in the authReducer)
      navigate("/"); // Redirect to home page after login
    } else {
      // Handle invalid credentials (e.g., show an error message)
      alert("Invalid username or password");
    }
  };

  return (
    <div className="container">
      <h2>Login</h2>
      <Form onSubmit={handleLogin}>
        <FormGroup>
          <Label for="username">Username</Label>
          <Input
            type="text"
            name="username"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </FormGroup>
        <FormGroup>
          <Label for="password">Password</Label>
          <Input
            type="password"
            name="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </FormGroup>
        <Button type="submit">Login</Button>
        <Link to="/register">
          <Button>Register</Button>
        </Link>
      </Form>
    </div>
  );
};

const mapDispatchToProps = (dispatch) => ({
  login: () => dispatch({ type: "LOGIN" }), // We'll define this action in authReducer
});

export default connect(null, mapDispatchToProps)(Login);
