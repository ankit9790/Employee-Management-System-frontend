import React, { useState, useEffect } from "react";
import API from "../../api";

function AddDepartment() {
  const [name, setName] = useState("");
  const [courses, setCourses] = useState([]);
  const [selectedCourseId, setSelectedCourseId] = useState("");

  useEffect(() => {
    API.get("/courses")
      .then((res) => setCourses(res.data))
      .catch((err) => console.error("Failed to load courses:", err));
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!selectedCourseId || !name.trim()) {
      alert("Please select a course and enter a department name.");
      return;
    }

    API.post("/departments", {
      department_name: name.trim(),
      courseId: parseInt(selectedCourseId),
    })
      .then(() => {
        alert("✅ Department added successfully!");
        setName("");
        setSelectedCourseId("");
      })
      .catch((err) => {
        console.error("Add error:", err.response?.data || err.message);
        alert("❌ Failed to add department");
      });
  };

  return (
    <div style={styles.container}>
      <h2>Add Department</h2>
      <form onSubmit={handleSubmit} style={styles.form}>
        <div style={styles.formGroup}>
          <label style={styles.label}>Select Course:</label>
          <select
            value={selectedCourseId}
            onChange={(e) => setSelectedCourseId(e.target.value)}
            style={styles.select}
          >
            <option value="">-- Select a course --</option>
            {courses.map((course) => (
              <option key={course.id} value={course.id}>
                {course.course_name}
              </option>
            ))}
          </select>
        </div>

        <div style={styles.formGroup}>
          <label style={styles.label}>Department Name:</label>
          <input
            type="text"
            placeholder="Department Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            style={styles.input}
          />
        </div>

        <button type="submit" style={styles.button}>Add</button>
      </form>
    </div>
  );
}

const styles = {
  container: {
    background: "#f9f9f9",
    padding: "20px",
    borderRadius: "8px",
    marginBottom: "30px",
    width: "100%",
    maxWidth: "500px",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    gap: "15px",
  },
  formGroup: {
    display: "flex",
    flexDirection: "column",
  },
  label: {
    marginBottom: "5px",
    fontWeight: "bold",
  },
  select: {
    padding: "8px",
    fontSize: "16px",
  },
  input: {
    padding: "8px",
    fontSize: "16px",
  },
  button: {
    padding: "10px",
    backgroundColor: "#2b6cb0",
    color: "white",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
    fontWeight: "bold",
  },
};

export default AddDepartment;
