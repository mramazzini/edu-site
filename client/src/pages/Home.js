import React, { useEffect, useState, useRef } from "react";
import Navbar from "../components/Navbar";
import HomeBody from "../components/home/HomeBody";
import "../styles/Home.css";
function Home() {
  return (
    <div className="home-page">
      <Navbar />
      <HomeBody />
    </div>
  );
}

export default Home;
