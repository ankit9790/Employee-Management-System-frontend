import React, { useState } from "react";
import API from "../../api";

function AddCourse({ refreshCourses }) {
  const [courseName, setCourseName] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!courseName.trim()) return alert("Course name is required");

    API.post("/courses", { course_name: courseName })
      .then(() => {
        alert("Course added successfully");
        setCourseName("");
        refreshCourses();
      })
      .catch((err) => {
        console.error(err);
        alert("Error adding course");
      });
  };

  return (
    <form className="add-course-form" onSubmit={handleSubmit}>
      <h3>Add New Course</h3>
      <input
        type="text"
        placeholder="Course Name"
        value={courseName}
        onChange={(e) => setCourseName(e.target.value)}
        required
        className="input-field"
      />
      <button type="submit" className="btn submit-btn">
        Add Course
      </button>
    </form>
  );
}

export default AddCourse;
