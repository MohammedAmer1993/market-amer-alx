// src/components/Login.js
import React, { useState } from "react";
import {
  Form,
  FormGroup,
  Label,
  Input,
  Button,
  Spinner,
  Alert,
} from "reactstrap"; // Import Alert
import { connect, useDispatch } from "react-redux";
import { useNavigate, Link } from "react-router-dom";

const Login = ({ login, isLoading }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleLogin = async (e) => {
    // Make handleLogin async
    e.preventDefault();
    dispatch({ type: "LOGIN_REQUEST" });
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000)); // Simulate API call delay
      // In a real app, send login credentials to your backend API
      if (username === "user" && password === "password") {
        dispatch({
          type: "LOGIN_SUCCESS",
          payload: { user: { name: "John Doe" } },
        }); // Simulate user data
        navigate("/");
      } else {
        dispatch({
          type: "LOGIN_FAILURE",
          payload: "Invalid username or password",
        });
        alert("Invalid username or password");
      }
    } catch (error) {
      dispatch({ type: "LOGIN_FAILURE", payload: error.message });
    }
  };

  return (
    <div className="container">
      <h2>Login</h2>
      {isLoading ? ( // Show spinner while logging in
        <div className="text-center">
          <Spinner color="primary" />
        </div>
      ) : (
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
          {error && <Alert color="danger">{error}</Alert>}{" "}
          {/* Display error message */}
          <Button type="submit">Login</Button>
          <Link to="/register">
            <Button>Register</Button>
          </Link>
        </Form>
      )}
    </div>
  );
};

const mapStateToProps = (state) => ({
  isLoading: state.auth.isLoading, // Get isLoading from authReducer
  error: state.auth.error, // Get error from authReducer
});

const mapDispatchToProps = (dispatch) => ({
  login: () => dispatch({ type: "LOGIN" }), // We'll define this action in authReducer
});

export default connect(mapStateToProps, mapDispatchToProps)(Login);
