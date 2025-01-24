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
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

const Register = ({ isLoading }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleRegister = async (e) => {
    // Make handleRegister async
    e.preventDefault();
    dispatch({ type: "REGISTER_REQUEST" });
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000)); // Simulate API call delay
      // In a real app, send registration data to your backend API
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
          {/* ... (similar to Login form) ... */}
          {error && <Alert color="danger">{error}</Alert>}{" "}
          {/* Display error message */}
          <Button type="submit">Register</Button>
        </Form>
      )}
    </div>
  );
};

const mapStateToProps = (state) => ({
  isLoading: state.auth.isLoading, // Get isLoading from authReducer
  error: state.auth.error, // Get error from authReducer
});

export default connect(mapStateToProps, null)(Register);
