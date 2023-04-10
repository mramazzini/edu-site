import React, { useEffect, useState, useCallback } from "react";

import HomeParticles from "./HomeParticles";
const HomeBody = () => {
  const [slideIndex, setSlideIndex] = useState([
    "icon-0",
    "icon-1",
    "icon-2",
    "icon-3",
    "icon-4",
  ]);

  const images = [
    {
      url: "https://img.icons8.com/color/240/null/html-5--v1.png",
      title: "html",
    },
    {
      url: "https://img.icons8.com/ultraviolet/240/null/react--v1.png",
      title: "react",
    },
    { url: "https://img.icons8.com/color/240/null/css3.png", title: "css" },
    {
      url: "https://img.icons8.com/color/240/null/javascript--v1.png",
      title: "javascript",
    },
    {
      url: "https://img.icons8.com/fluency/240/null/node-js.png",
      title: "Node JS",
    },
    {
      url: "https://img.icons8.com/color/240/null/mongodb.png",
      title: "Mongo DB",
    },
  ];

  return (
    <div className="home-body">
      <div className="home-body-container">
        <HomeParticles />
        <header className="home-body-header">
          <span className="header-head">Learn to Code!</span>
          <span className="header-body">
            Begin your web development journey right here.
          </span>
        </header>
        <nav className="home-body-nav">
          <a className="learn-more-button-holder " href="/courses">
            <button className="learn-more-button">View Courses</button>
          </a>
          <a className="learn-more-button-holder " href="/info">
            <button className="learn-more-button">Learn More</button>
          </a>
        </nav>

        <div className="icon-spinner">
          {images.map(({ url, title }, index) => (
            <div className={`icon-holder ${slideIndex[index]}`}>
              <span className="icon-header">{title}</span>
              <img
                key={index}
                className={`slide `}
                src={url}
                alt={`Slide ${index}`}
              />
            </div>
          ))}
          {images.map(({ url, title }, index) => (
            <div className={`icon-holder ${slideIndex[index]}`}>
              <span className="icon-header">{title}</span>
              <img
                key={index}
                className={`slide `}
                src={url}
                alt={`Slide ${index}`}
              />
            </div>
          ))}
          {images.map(({ url, title }, index) => (
            <div className={`icon-holder ${slideIndex[index]}`}>
              <span className="icon-header">{title}</span>
              <img
                key={index}
                className={`slide `}
                src={url}
                alt={`Slide ${index}`}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HomeBody;
