import React from "react";
import image1 from "../../assets/img-holder.png";
import image2 from "../../assets/img-holder.png";
import image3 from "../../assets/img-holder.png";

const imageArr = [image1, image2, image3];
const Banner = ({ index }) => {
  const headers = [
    "Self Paced and Low stakes",
    "Batteries included",
    "Support along the way",
  ];
  const bodies = [
    "Go at your own pace and learn at your own level.",
    "Built in tools to help you learn and practice.",
    "Community feedback and support to help you along the way.",
  ];

  return index % 2 === 0 ? (
    <div className="banner">
      <div className="banner-body">
        <div className="banner-header">{headers[index]}</div>
        <p className="banner-body-text">{bodies[index]}</p>
      </div>
      <img src={imageArr[index]} alt="banner-img" className="banner-img" />
    </div>
  ) : (
    <div className="banner">
      <img src={imageArr[index]} alt="banner-img" className="banner-img" />
      <div className="banner-body">
        <div className="banner-header">{headers[index]}</div>
        <p className="banner-body-text">{bodies[index]}</p>
      </div>
    </div>
  );
};

export default Banner;
