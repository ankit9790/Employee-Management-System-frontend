import React, { useState } from "react";
import API from "../../api";

function UpdateCourse({ course, refreshCourses, onClose }) {
  const [courseName, setCourseName] = useState(course.course_name);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!courseName.trim()) return alert("Course name is required");

    API.put(`/courses/${course.id}`, { course_name: courseName })
      .then(() => {
        alert("Course updated successfully");
        refreshCourses();
        onClose();
      })
      .catch((err) => {
        console.error(err);
        alert("Error updating course");
      });
  };

  return (
    <form onSubmit={handleSubmit} className="update-course-form">
      <h3>Update Course</h3>
      <input
        type="text"
        value={courseName}
        onChange={(e) => setCourseName(e.target.value)}
        required
      />
      <button type="submit">Update</button>
      <button type="button" onClick={onClose} style={{ marginLeft: 10 }}>
        Cancel
      </button>
    </form>
  );
}

export default UpdateCourse;
