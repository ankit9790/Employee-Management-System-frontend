import React, { useEffect, useState } from "react";
import API from "../../api";
import AddCourse from "./AddCourse";
import UpdateCourse from "./UpdateCourse";
import DeleteCourse from "./DeleteCourse";

function CourseList() {
  const [courses, setCourses] = useState([]);
  const [showAdd, setShowAdd] = useState(false);
  const [showUpdate, setShowUpdate] = useState(false);
  const [showDelete, setShowDelete] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState(null);

  const fetchCourses = () => {
    API.get("/courses")
      .then((res) => setCourses(res.data))
      .catch((err) => console.error(err));
  };

  useEffect(() => {
    fetchCourses();
  }, []);

  const handleSelectCourse = (course) => {
    setSelectedCourse(course);
    setShowUpdate(true);
    setShowAdd(false);
    setShowDelete(false);
  };

  return (
    <div className="course-container">
      <div className="course-header-bar">
        <h2>Courses</h2>

        <div className="action-buttons">
          <button
            className="btn"
            onClick={() => {
              setShowAdd(!showAdd);
              setShowUpdate(false);
              setShowDelete(false);
              setSelectedCourse(null);
            }}
          >
            {showAdd ? "Close Add" : "Add Course"}
          </button>
          <button
            className="btn"
            onClick={() => {
              setShowDelete(!showDelete);
              setShowAdd(false);
              setShowUpdate(false);
              setSelectedCourse(null);
            }}
          >
            {showDelete ? "Close Delete" : "Delete Course"}
          </button>
          <button className="btn" onClick={fetchCourses}>
            Refresh
          </button>
        </div>
      </div>

      {showAdd && <AddCourse refreshCourses={fetchCourses} />}
      {showUpdate && selectedCourse && (
        <UpdateCourse
          course={selectedCourse}
          refreshCourses={fetchCourses}
          onClose={() => setShowUpdate(false)}
        />
      )}
      {showDelete && <DeleteCourse refreshCourses={fetchCourses} />}

      <div className="course-grid-container">
        <div className="course-grid-header">
          <div>ID</div>
          <div>Course Name</div>
        </div>
        {courses.map((course) => (
          <div
            key={course.id}
            className="course-grid-row"
            onClick={() => handleSelectCourse(course)}
          >
            <div>{course.id}</div>
            <div>{course.course_name}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default CourseList;
