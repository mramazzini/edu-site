import React, { useState } from 'react';

const NavItem = ({ item, index }) => {
  const [open, setOpen] = useState(false);

  return (
    <div
      className='course-navigation-item'
      onClick={() => setOpen(!open)}
      key={index}
    >
      <div className='course-navigation-item-head'>
        <div className='course-navigation-item-title'>
          {index + 1}. {item}
        </div>
        {open ? <div className='arrow up' /> : <div className='arrow down' />}
      </div>
      {open ? (
        <div className='course-navigation-item-body'></div>
      ) : (
        <div className='course-navigation-item-body hidden'></div>
      )}
    </div>
  );
};
export default NavItem;
