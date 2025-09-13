import React, { useState, useEffect } from "react";
import API from "../../api";
function AddEmployee() {
  const [form, setForm] = useState({ name: "", age: "", department_id: "", course_id: "" });
  const [departments, setDepartments] = useState([]);
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    API.get("/departments")
      .then((res) => setDepartments(res.data))
      .catch((err) => console.error(err));

    API.get("/courses")
      .then((res) => setCourses(res.data))
      .catch((err) => console.error(err));
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();

    const payload = {
      ...form,
      age: Number(form.age),
      department_id: Number(form.department_id),
      course_id: Number(form.course_id),
    };

    API.post("/employees", payload)
      .then(() => {
        alert("Employee added successfully");
        setForm({ name: "", age: "", department_id: "", course_id: "" });
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
        <select
          value={form.department_id}
          onChange={(e) => setForm({ ...form, department_id: e.target.value })}
          required
        >
          <option value="">Select Department</option>
          {departments.map((d) => (
            <option key={d.id} value={d.id}>
              {d.department_name}
            </option>
          ))}
        </select>
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
      </div>

      <button type="submit" className="submit-btn">Add Employee</button>
    </form>
  );
}

export default AddEmployee;
