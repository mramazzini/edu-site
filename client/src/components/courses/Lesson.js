import React from "react";

import { useLocation } from "react-router-dom";

const Lesson = () => {
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const course = params.get("course");
  const courseArray = course.split("-");
  const courseIndex = courseArray[0];
  const lessonIndex = courseArray[1];

  return (
    <div>
      <h1>Lesson</h1>
      <h2>Course: {courseIndex}</h2>
      <h2>Lesson: {lessonIndex}</h2>
    </div>
  );
};

export default Lesson;
