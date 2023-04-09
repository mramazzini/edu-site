import React from "react";
import "../styles/Info.css";
import InfoBody from "../components/info/InfoBody";
import Navbar from "../components/Navbar";
const Info = () => {
  return (
    <div className="info-page">
      <Navbar />
      <InfoBody />
    </div>
  );
};
export default Info;
