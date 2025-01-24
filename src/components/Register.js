// src/components/Register.js
import React, { useState } from "react";
import { Form, FormGroup, Label, Input, Button } from "reactstrap";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleRegister = (e) => {
    e.preventDefault();
    // Here you would typically make an API call to your backend for registration
    // For now, we'll just simulate a successful registration
    // You might want to store the new user data in localStorage or similar
    console.log("New user registered:", { username, password });
    navigate("/login"); // Redirect to login page after registration
  };

  return (
    <div className="container">
      <h2>Register</h2>
      <Form onSubmit={handleRegister}>
        {/* ... (similar to Login form) ... */}
      </Form>
    </div>
  );
};

export default Register;
