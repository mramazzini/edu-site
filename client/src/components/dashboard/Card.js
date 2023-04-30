import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
const Card = ({
  type,
  index,
  visible,
  onMouseEnter,
  onMouseLeave,
  available,
}) => {
  const [show, setShow] = useState([false, false, false, false, false, false]);
  const [animationDelay, setAnimationDelay] = useState(index);
  const images = [
    {
      url: "https://img.icons8.com/color/240/null/html-5--v1.png",
      title: "html",
    },
    {
      url: "https://img.icons8.com/color/240/null/css3.png",
      title: "css",
    },
    {
      url: " https://img.icons8.com/color/240/null/javascript--v1.png",
      title: "javascript",
    },
    {
      url: " https://img.icons8.com/fluency/240/null/node-js.png",
      title: "node",
    },
    {
      url: "https://img.icons8.com/color/240/null/mongodb.png ",
      title: "mongodb",
    },
    {
      url: "https://img.icons8.com/ultraviolet/240/null/react--v1.png",
      title: "react",
    },
  ];
  const [shouldRender, setShouldRender] = useState(false);

  useEffect(() => {
    if (visible) {
      const timeoutId = setTimeout(() => {
        setShouldRender(true);
      }, index * 166);
      return () => {
        clearTimeout(timeoutId);
      };
    }
  }, [visible, index]);

  //after 1 second, set animation delay to 0 so that bobbing animation can play
  useEffect(() => {
    setTimeout(() => {
      setAnimationDelay(0);
    }, 1000);
  }, [animationDelay]);

  return (
    <Link
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      className={`${shouldRender ? "card card-fade-in" : "card"}`}
      style={{
        animationDelay: `${animationDelay * 1000}ms`,
      }}
      to={`/${type}`}
    >
      {available ? (
        ""
      ) : (
        <div className={`coming-soon-card-banner`}>Coming Soon!</div>
      )}
      <div className='dashboard-card-image-container'>
        <img
          className='dashboard-card-image'
          src={images[index].url}
          alt={type}
        />
      </div>
    </Link>
  );
};
export default Card;
