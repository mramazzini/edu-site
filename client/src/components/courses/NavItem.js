import React, { useState } from "react";
import { Link } from "react-router-dom";
const NavItem = ({ item, index, courseName, setActiveTab, activeTab }) => {
  const isActiveTab = activeTab === index;
  return (
    <div
      key={index}
      className='course-navigation-item'
      onClick={() => {
        if (isActiveTab) {
          setActiveTab(-1);
          return;
        }
        setActiveTab(index);
      }}
    >
      <div className='course-navigation-item-head'>
        <div className='course-navigation-item-title'>
          {index + 1}. {item.name}
        </div>
        {isActiveTab ? (
          <div className='arrow up' />
        ) : (
          <div className='arrow down' />
        )}
      </div>

      <ul
        className={`course-navigation-item-body ${isActiveTab ? "" : "hidden"}`}
      >
        {item.sections.map((section, i) => (
          <li className='course-navigation-item-section'>
            <Link
              key={index}
              to={`/${courseName}/${section.name.replace(/\s+/g, "-")}`}
            >
              {section.name}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};
export default NavItem;
