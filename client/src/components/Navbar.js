import React from "react";
import "../styles/Navbar.css";
const Navbar = () => {
  return (
    <div className="navbar">
      <div className="nav-container">
        <ul className="nav-items right-nav">
          <li className="nav-item sign-up-btn">
            <a href="/register">Sign Up</a>
          </li>
          <li className="nav-item">
            <a href="/login">Sign In</a>
          </li>
        </ul>
        <ul className="nav-items left-nav">
          <li className="nav-item">
            <a href="/">Home</a>
          </li>
          <li className="nav-item">
            <a href="/">Dashboard</a>
          </li>
        </ul>
      </div>
    </div>
  );
};
export default Navbar;
