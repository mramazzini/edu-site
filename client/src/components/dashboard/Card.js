import React, { useState, useEffect } from "react";

const Card = ({ type, index, visible }) => {
  const [width, setWidth] = useState();
  const [height, setHeight] = useState();
  const [show, setShow] = useState([false, false, false, false, false, false]);
  useEffect(() => {
    const elements = document.getElementsByClassName("mountain-svg")[0];

    setWidth(elements.clientWidth);
    setHeight(elements.clientHeight * 0.6);
    function handleResize() {
      setWidth(elements.clientWidth);
      setHeight(elements.clientHeight * 0.6);
    }

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);
  const WIDTH_SHIFT = 0.03 * width;
  const HEIGHT_SHIFT = 0.3333333 * height;
  const HEIGHT_MULTIPLIER = 0.156666 * height;
  const WIDTH_MULTIPLIER = 0.1753 * width;
  const images = [
    {
      url: "https://img.icons8.com/color/240/null/html-5--v1.png",
      title: "html",
      coordinates: {
        bottom: HEIGHT_MULTIPLIER * 0 + HEIGHT_SHIFT,
        left: WIDTH_MULTIPLIER * 0 + WIDTH_SHIFT,
      },
    },
    {
      url: "https://img.icons8.com/color/240/null/css3.png",
      title: "css",
      coordinates: {
        bottom: HEIGHT_MULTIPLIER * 1 + HEIGHT_SHIFT * 1.25,
        left: WIDTH_MULTIPLIER * 1 + WIDTH_SHIFT,
      },
    },
    {
      url: " https://img.icons8.com/color/240/null/javascript--v1.png",
      title: "javascript",
      coordinates: {
        bottom: HEIGHT_MULTIPLIER * 2 + HEIGHT_SHIFT * 1.3,
        left: WIDTH_MULTIPLIER * 2 + WIDTH_SHIFT,
      },
    },
    {
      url: " https://img.icons8.com/fluency/240/null/node-js.png",
      title: "node",
      coordinates: {
        bottom: HEIGHT_MULTIPLIER * 3 + HEIGHT_SHIFT * 1.25,
        left: WIDTH_MULTIPLIER * 3 + WIDTH_SHIFT,
      },
    },
    {
      url: "https://img.icons8.com/color/240/null/mongodb.png ",
      title: "mongodb",
      coordinates: {
        bottom: HEIGHT_MULTIPLIER * 4 + HEIGHT_SHIFT * 1.15,
        left: WIDTH_MULTIPLIER * 4 + WIDTH_SHIFT,
      },
    },
    {
      url: "https://img.icons8.com/ultraviolet/240/null/react--v1.png",
      title: "react",
      coordinates: {
        bottom: HEIGHT_MULTIPLIER * 5 + HEIGHT_SHIFT,
        left: WIDTH_MULTIPLIER * 5 + WIDTH_SHIFT,
      },
    },
  ];
  const [shouldRender, setShouldRender] = useState(false);

  useEffect(() => {
    if (visible) {
      const timeoutId = setTimeout(() => {
        setShouldRender(true);
      }, index * 400);
      return () => {
        clearTimeout(timeoutId);
      };
    }
  }, [visible, index]);

  const cardClass = shouldRender ? "card card-fade-in" : "card";
  return (
    <div
      className={cardClass}
      style={{
        bottom: images[index].coordinates.bottom,
        left: images[index].coordinates.left,
        animationDelay: `${index * 1000}ms`,
      }}
    >
      <div className="dashboard-card-image-container">
        <img
          className="dashboard-card-image"
          src={images[index].url}
          alt={type}
        />
      </div>
    </div>
  );
};
export default Card;
