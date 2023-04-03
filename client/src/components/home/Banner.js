import React from "react";
import image1 from "../../assets/img-holder.png";
import image2 from "../../assets/img-holder.png";
import image3 from "../../assets/img-holder.png";

const imageArr = [image1, image2, image3];
const Banner = ({ index }) => {
  const headers = ["Lorem ipsum", "Lorem Ipsum", "Lorem ipsum"];
  const bodies = [
    "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
    "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
    "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
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
