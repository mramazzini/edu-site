import "../../styles/Dashboard.css";
import React, { useEffect, useState } from "react";

import Card from "./Card";
const DashboardContainer = () => {
  const [cardsVisible, setCardsVisible] = useState(false);
  const [hoveredName, setHoveredName] = useState("");
  useEffect(() => {
    setCardsVisible(true);
  }, []);
  const handleCardHover = (name) => {
    setHoveredName(name);
  };

  return (
    <div className="dashboard-body">
      <div className="dashboard-info">
        <header className="dashboard-info-header">{hoveredName}</header>

        {hoveredName === "html" && (
          <div className="dashboard-info-body">
            <p>HTML is the standard markup language for creating Web pages.</p>
          </div>
        )}
        {hoveredName === "css" && (
          <div className="dashboard-info-body">
            <p>CSS is the language we use to style an HTML document.</p>
          </div>
        )}
        {hoveredName === "javascript" && (
          <div className="dashboard-info-body">
            <p>JavaScript is the programming language of HTML and the Web.</p>
          </div>
        )}
        {hoveredName === "node" && (
          <div className="dashboard-info-body">
            <p>
              Node.js is an open-source, cross-platform, back-end JavaScript
              runtime environment that runs on the V8 engine and executes
              JavaScript code outside a web browser.
            </p>
          </div>
        )}
        {hoveredName === "mongo" && (
          <div className="dashboard-info-body">
            <p>
              MongoDB is a cross-platform document-oriented database program.
              Classified as a NoSQL database program, MongoDB uses JSON-like
              documents with optional schemas.
            </p>
          </div>
        )}
        {hoveredName === "react" && (
          <div className="dashboard-info-body">
            <p>React is a JavaScript library for building user interfaces.</p>
          </div>
        )}
      </div>

      <div className="card-container">
        {["html", "css", "javascript", "node", "mongo", "react"].map(
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
