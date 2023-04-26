import "../../styles/Dashboard.css";
import React, { useEffect, useState } from "react";

import Card from "./Card";
const DashboardContainer = () => {
  const [cardsVisible, setCardsVisible] = useState(false);
  const [hoveredName, setHoveredName] = useState("");
  const [progress, setProgress] = useState(10);
  useEffect(() => {
    setCardsVisible(true);
  }, []);
  const handleCardHover = (name) => {
    setHoveredName(name);
  };

  const getInfoBody = (hoveredName) => {
    const progressBar = () => {
      return hoveredName === "" ? (
        ""
      ) : (
        <div className='dashboard-progress-bar'>
          <div className={`dashboard-progress-bar-header `}>
            Completion - {progress}%
          </div>

          <div className='dashboard-progress-bar-cover'>
            <div
              className={`dashboard-progress-bar-inner ${hoveredName}`}
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
      );
    };
    switch (hoveredName) {
      case "HTML":
        return (
          <div className='dashboard-info-body'>
            <div className='dashboard-info-body-header'>
              HTML is the standard markup language for creating Web pages.
            </div>
            {progressBar()}
          </div>
        );

      case "CSS":
        return (
          <div className='dashboard-info-body'>
            <div className='dashboard-info-body-header'>
              CSS is the language we use to style an HTML document.
            </div>
            {progressBar()}
          </div>
        );
      case "javascript":
        return (
          <div className='dashboard-info-body'>
            <div className='dashboard-info-body-header'>
              JavaScript is the programming language of HTML and the Web.
            </div>
            {progressBar()}
          </div>
        );
      case "nodeJS":
        return (
          <div className='dashboard-info-body'>
            <div className='dashboard-info-body-header'>
              Node.js is a back-end environment that executes JavaScript code
              outside a web browser.
            </div>
            {progressBar()}
          </div>
        );
      case "mongoDB":
        return (
          <div className='dashboard-info-body'>
            <div className='dashboard-info-body-header'>
              MongoDB is a database program intended to store data in JSON-like
              documents.
            </div>
            {progressBar()}
          </div>
        );

      case "react":
        return (
          <div className='dashboard-info-body'>
            <div className='dashboard-info-body-header'>
              React is a JavaScript library for building user interfaces.
            </div>
            {progressBar()}
          </div>
        );
      default:
        return (
          <div className='dashboard-info-body'>
            <div className='dashboard-info-body-header'>
              Hover over an Icon!
            </div>
            {progressBar()}
          </div>
        );
    }
  };

  return (
    <div className='dashboard-body'>
      <div className='dashboard-info'>
        <header className='dashboard-info-header'>
          {hoveredName ? hoveredName : "Get Started!"}
          <div className={`dashboard-info-header-line ${hoveredName}`}></div>
        </header>
        {getInfoBody(hoveredName)}
      </div>

      <div className='card-container'>
        {["HTML", "CSS", "javascript", "nodeJS", "mongoDB", "react"].map(
          (type, index) => {
            return (
              <Card
                key={index}
                index={index}
                type={type}
                visible={cardsVisible}
                onMouseEnter={() => handleCardHover(type)}
                onMouseLeave={() => handleCardHover("")}
              />
            );
          }
        )}
      </div>
    </div>
  );
};

export default DashboardContainer;
