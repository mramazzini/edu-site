import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useMutation } from "@apollo/client";
import Auth from "../utils/auth";
import { ADD_USER } from "../utils/mutations";
import { useNavigate } from "react-router-dom";
import "../../styles/Register.css";
import Navbar from "../Navbar";
const RegisterComponent = () => {
  const [formState, setFormState] = useState({ email: "", password: "" });
  const [addUser] = useMutation(ADD_USER);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const mutationResponse = await addUser({
        variables: {
          email: formState.email,
          password: formState.password,
        },
      });
      const token = mutationResponse.data.addUser.token;
      //Clear the local storage before setting the new token (needed to prevent a bug)
      await localStorage.clear();
      Auth.login(token);

      // Reload the page to update the state of the user
      navigate("/");
      await window.location.reload();
    } catch (e) {
      Auth.handleError(e);
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormState({
      ...formState,
      [name]: value,
    });
  };

  return (
    <div className="login-container">
      <Navbar />
      <h2>Register</h2>
      <form className="login-form" onSubmit={handleSubmit}>
        <label htmlFor="email">Email</label>
        <input
          onChange={handleChange}
          type="email"
          placeholder="example@email.com"
          id="email"
          name="email"
        />
        <label htmlFor="password">Password</label>
        <input
          onChange={handleChange}
          type="password"
          placeholder="********"
          id="password"
          name="password"
        />
        <button type="submit">Sign Up</button>
      </form>
      <Link className="link-btn" to="/login">
        Already have an account? Login here
      </Link>
    </div>
  );
};
export default RegisterComponent;
