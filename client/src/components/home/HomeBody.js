import React from "react";

const HomeBody = () => {
  return (
    <div className="home-body">
      <div className="home-body-container">
        <div className="home-body-left">
          <header className="home-body-left-header">
            <span className="header-head">Learn to Code?</span>

            <span className="header-body">Let me teach you</span>
            <div className="get-started-nav">
              <a href="/">
                <button className="home-button">Contact</button>
              </a>
              <a href="/">
                <button className="home-button">Learn more</button>
              </a>
            </div>
          </header>
        </div>
        <div className="home-body-seperator-right"></div>
        <div className="home-body-seperator-line"></div>
        <div className="home-body-seperator-left"></div>
        <div className="home-body-right">
          <header className="home-body-right-header">
            <h1>Home Body Right</h1>
          </header>
        </div>
      </div>
    </div>
  );
};

export default HomeBody;
