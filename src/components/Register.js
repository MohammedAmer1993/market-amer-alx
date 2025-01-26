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
import { useNavigate } from "react-router-dom";

const Register = ({ isLoading, error }) => {
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

  const handleRegister = async (e) => {
    e.preventDefault();

    const isUsernameValid = username.trim() !== "";
    const isPasswordValid = password.trim() !== "";
    setUsernameValid(isUsernameValid);
    setPasswordValid(isPasswordValid);

    if (!isUsernameValid || !isPasswordValid) {
      return; // Don't proceed with registration if validation fails
    }
    dispatch({ type: "REGISTER_REQUEST" });
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000)); // Simulate API call delay
      console.log("New user registered:", { username, password });
      dispatch({ type: "REGISTER_SUCCESS" });
      navigate("/login");
    } catch (error) {
      dispatch({ type: "REGISTER_FAILURE", payload: error.message });
    }
  };

  return (
    <div className="container">
      <h2>Register</h2>
      {isLoading ? ( // Show spinner while registering
        <div className="text-center">
          <Spinner color="primary" />
        </div>
      ) : (
        <Form onSubmit={handleRegister}>
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
            )}{" "}
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
            )}{" "}
          </FormGroup>{" "}
          {error && <Alert color="danger">{error}</Alert>}{" "}
          <Button type="submit">Register</Button>
        </Form>
      )}
    </div>
  );
};

const mapStateToProps = (state) => ({
  isLoading: state.auth.isLoading,
  error: state.auth.error,
});

export default connect(mapStateToProps, null)(Register);
