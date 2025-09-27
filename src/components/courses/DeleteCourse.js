import React, { useEffect, useState } from "react";
import API from "../../api";

function DeleteCourse({ refreshCourses }) {
  const [courses, setCourses] = useState([]);
  const [selectedId, setSelectedId] = useState("");

  useEffect(() => {
    loadCourses();
  }, []);

  const loadCourses = () => {
    API.get("/courses")
      .then((res) => setCourses(res.data))
      .catch((err) => console.error(err));
  };

  const handleDelete = () => {
    if (!selectedId) return alert("Select a course to delete");

    if (window.confirm("Are you sure you want to delete this course?")) {
      API.delete(`/courses/${selectedId}`)
        .then(() => {
          alert("Course deleted successfully");
          setSelectedId("");
          refreshCourses();
          loadCourses();
        })
        .catch((err) => {
          console.error(err);
          alert("Error deleting course");
        });
    }
  };

  return (
    <div className="delete-course-form">
      <h3>Delete Course</h3>
      <select
        value={selectedId}
        onChange={(e) => setSelectedId(e.target.value)}
        required
      >
        <option value="">Select Course to Delete</option>
        {courses.map((c) => (
          <option key={c.id} value={c.id}>
            {c.course_name}
          </option>
        ))}
      </select>
      <button onClick={handleDelete} disabled={!selectedId}>
        Delete Course
      </button>
    </div>
  );
}

export default DeleteCourse;
