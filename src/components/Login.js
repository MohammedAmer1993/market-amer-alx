import React, { useState, useEffect } from "react"; // Import useEffect
import {
  Form,
  FormGroup,
  Label,
  Input,
  Button,
  Spinner,
  Alert,
  FormFeedback,
} from "reactstrap";
import { connect, useDispatch } from "react-redux";
import { useNavigate, Link } from "react-router-dom";

const Login = ({ login, isLoading, error }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [usernameValid, setUsernameValid] = useState(true);
  const [passwordValid, setPasswordValid] = useState(true);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    // Clear the error message when the component unmounts
    return () => {
      dispatch({ type: "CLEAR_AUTH_ERROR" });
    };
  }, [dispatch]);

  const handleLogin = async (e) => {
    // Make handleLogin async
    e.preventDefault();

    // Basic validation (you can add more complex validation as needed)
    const isUsernameValid = username.trim() !== "";
    const isPasswordValid = password.trim() !== "";
    setUsernameValid(isUsernameValid);
    setPasswordValid(isPasswordValid);

    if (!isUsernameValid || !isPasswordValid) {
      return; // Don't proceed with login if validation fails
    }
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
              valid={usernameValid} // Add valid prop
              invalid={!usernameValid} // Add invalid prop
            />
            {!usernameValid && (
              <FormFeedback>Please enter a username</FormFeedback>
            )}{" "}
            {/* Show feedback */}
          </FormGroup>
          <FormGroup>
            <Label for="password">Password</Label>
            <Input
              type="password"
              name="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              valid={passwordValid} // Add valid prop
              invalid={!passwordValid} // Add invalid prop
            />
            {!passwordValid && (
              <FormFeedback>Please enter a password</FormFeedback>
            )}{" "}
            {/* Show feedback */}
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
