import React from 'react';
import NavItem from './NavItem';
const CourseNavigation = ({ type }) => {
  const data = [
    'Introduction to HTML',
    'Text Formatting',
    'Lists',
    'Links',
    'Images',
    'Tables',
    'Forms',
    'Frames',
    'Colors',
    'Fonts',
    'CSS',
    'JavaScript',
    'Browser Support',
    'Summary',
    'Exercises',
    'Quiz',
  ];

  return (
    <div className='course-navigation-container'>
      <h1 className='course-navigation-title'>HTML Tutorial</h1>
      <div className='course-navigation'>
        {data.map((item, index) => (
          <NavItem item={item} index={index} />
        ))}
      </div>
    </div>
  );
};

export default CourseNavigation;
