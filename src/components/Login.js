import React, { useState, useEffect } from "react";
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
    return () => {
      dispatch({ type: "CLEAR_AUTH_ERROR" });
    };
  }, [dispatch]);

  const handleLogin = async (e) => {
    e.preventDefault();

    const isUsernameValid = username.trim() !== "";
    const isPasswordValid = password.trim() !== "";
    setUsernameValid(isUsernameValid);
    setPasswordValid(isPasswordValid);

    if (!isUsernameValid || !isPasswordValid) {
      return;
    }
    dispatch({ type: "LOGIN_REQUEST" });
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      if (username === "user" && password === "password") {
        dispatch({
          type: "LOGIN_SUCCESS",
          payload: { user: { name: "John Doe" } },
        });
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
      {isLoading ? (
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
              valid={usernameValid}
              invalid={!usernameValid}
            />
            {!usernameValid && (
              <FormFeedback>Please enter a username</FormFeedback>
            )}
          </FormGroup>
          <FormGroup>
            <Label for="password">Password</Label>
            <Input
              type="password"
              name="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              valid={passwordValid}
              invalid={!passwordValid}
            />
            {!passwordValid && (
              <FormFeedback>Please enter a password</FormFeedback>
            )}
          </FormGroup>
          {error && <Alert color="danger">{error}</Alert>}
          <Button type="submit" color="primary" className="me-2">
            Login
          </Button>
          <Link to="/register">
            <Button color="secondary">Register</Button>
          </Link>
        </Form>
      )}
    </div>
  );
};

const mapStateToProps = (state) => ({
  isLoading: state.auth.isLoading,
  error: state.auth.error,
});

const mapDispatchToProps = (dispatch) => ({
  login: () => dispatch({ type: "LOGIN" }),
});

export default connect(mapStateToProps, mapDispatchToProps)(Login);
