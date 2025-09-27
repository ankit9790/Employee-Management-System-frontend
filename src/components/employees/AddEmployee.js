import React, { useState, useEffect } from "react";
import API from "../../api";

function AddEmployee() {
  const [form, setForm] = useState({
    name: "",
    age: "",
    course_id: "",
    department_id: "",
  });
  const [courses, setCourses] = useState([]);
  const [departments, setDepartments] = useState([]);

  // Fetch courses on mount
  useEffect(() => {
    API.get("/courses")
      .then((res) => setCourses(res.data))
      .catch((err) => console.error(err));
  }, []);

  // Fetch departments whenever course_id changes
  useEffect(() => {
    if (form.course_id) {
      API.get(`/departments/course/${form.course_id}`)
        .then((res) => {
          setDepartments(res.data);
          // Reset department if selected department doesn't belong to new course
          if (!res.data.some((d) => d.id === Number(form.department_id))) {
            setForm((prev) => ({ ...prev, department_id: "" }));
          }
        })
        .catch((err) => console.error(err));
    } else {
      setDepartments([]);
      setForm((prev) => ({ ...prev, department_id: "" }));
    }
  }, [form.course_id]);

  const handleSubmit = (e) => {
    e.preventDefault();

    const payload = {
      name: form.name,
      age: Number(form.age),
      courseId: Number(form.course_id),
      departmentId: Number(form.department_id),
    };

    API.post("/employees", payload)
      .then(() => {
        alert("Employee added successfully");
        setForm({ name: "", age: "", course_id: "", department_id: "" });
      })
      .catch((err) => {
        console.error(err);
        alert(err.response?.data?.error || "Error adding employee");
      });
  };

  return (
    <form className="add-employee-form" onSubmit={handleSubmit}>
      <h2>Add Employee</h2>

      <div className="form-grid">
        <input
          placeholder="Name"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          required
        />
        <input
          placeholder="Age"
          type="number"
          value={form.age}
          onChange={(e) => setForm({ ...form, age: e.target.value })}
          required
        />

        {/* Course dropdown */}
        <select
          value={form.course_id}
          onChange={(e) => setForm({ ...form, course_id: e.target.value })}
          required
        >
          <option value="">Select Course</option>
          {courses.map((c) => (
            <option key={c.id} value={c.id}>
              {c.course_name}
            </option>
          ))}
        </select>

        {/* Department dropdown filtered by course */}
        <select
          value={form.department_id}
          onChange={(e) => setForm({ ...form, department_id: e.target.value })}
          required
          disabled={!form.course_id}
        >
          <option value="">
            {form.course_id ? "Select Department" : "Select course first"}
          </option>
          {departments.map((d) => (
            <option key={d.id} value={d.id}>
              {d.department_name}
            </option>
          ))}
        </select>
      </div>

      <button type="submit" className="submit-btn">
        Add Employee
      </button>
    </form>
  );
}

export default AddEmployee;
