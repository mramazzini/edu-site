import React from "react";
import { Link } from "react-router-dom";
import "../styles/Navbar.css";
const Navbar = () => {
  return (
    <div className="navbar">
      <div className="nav-container">
        <ul className="nav-items right-nav"></ul>
        <ul className="nav-items left-nav">
          <li className="nav-item sign-up-btn">
            <Link to="/register">Sign Up</Link>
          </li>
          <li className="nav-item">
            <Link to="/login">Sign In</Link>
          </li>
          <li className="nav-item">
            <Link to="/">Home</Link>
          </li>
          <li className="nav-item">
            <Link to="/">Dashboard</Link>
          </li>
        </ul>
      </div>
    </div>
  );
};
export default Navbar;
