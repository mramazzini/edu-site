import React from "react";
import Banner from "../info/Banner";

const InfoBody = () => {
  return (
    <div className="info-body">
      <div className="info-banner-container">
        <div className="main-banner">
          <div className="main-banner-header">What is (Title Here)?</div>
          <div className="main-banner-body"></div>
        </div>
        <Banner index={0} />
        <Banner index={1} />
        <Banner index={2} />
      </div>
    </div>
  );
};
export default InfoBody;
