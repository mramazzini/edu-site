import React, { useState } from "react";
import NavItem from "./NavItem";
import { useQuery } from "@apollo/client";
import { GET_COURSE } from "../utils/queries";

const CourseNavigation = ({ type }) => {
  const [activeTab, setActiveTab] = useState(-1);
  const { loading, data, error } = useQuery(GET_COURSE, {
    variables: { courseName: type },
  });

  if (loading) {
    return <div>Loading...</div>;
  } else if (error) {
    return <div>error</div>;
  } else {
    return (
      <div className='navigation-page html'>
        <div className='course-navigation-container'>
          <div className='course-navigation-title'>Courses</div>
          <div className='course-navigation'>
            {data.getCourse.lessons.map((item, index) => (
              <NavItem
                setActiveTab={setActiveTab}
                key={index}
                item={item}
                index={index}
                courseName={type}
                activeTab={activeTab}
              />
            ))}
          </div>
        </div>
        <div className='course-information-container'></div>
      </div>
    );
  }
};

export default CourseNavigation;
