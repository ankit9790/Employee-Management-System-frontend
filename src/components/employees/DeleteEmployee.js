import React, { useState, useEffect } from "react";
import API from "../../api";


function DeleteEmployee() {
  const [employees, setEmployees] = useState([]);
  const [selectedId, setSelectedId] = useState("");
  const [search, setSearch] = useState("");

  // Fetch all employees
  useEffect(() => {
    API.get("/employees")
      .then((res) => setEmployees(res.data))
      .catch((err) => console.error(err));
  }, []);

  const handleDelete = () => {
    if (!selectedId) return alert("Please select an employee to delete");

    API.delete(`/employees/${selectedId}`)
      .then(() => {
        alert("Employee deleted successfully");
        setSelectedId("");
        // Remove deleted employee from local state
        setEmployees(employees.filter((e) => e.id !== Number(selectedId)));
      })
      .catch((err) => {
        console.error(err);
        alert(err.response?.data?.error || "Error deleting employee");
      });
  };

  // Filter employees based on search
  const filteredEmployees = employees.filter((e) =>
    e.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="delete-employee-container">
      <h2>Delete Employee</h2>

      <input
        type="text"
        placeholder="Search employee..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="search-input"
      />

      <select
        value={selectedId}
        onChange={(e) => setSelectedId(e.target.value)}
        className="employee-select"
      >
        <option value="">Select Employee</option>
        {filteredEmployees.map((e) => (
          <option key={e.id} value={e.id}>
            {e.name} (Age: {e.age})
          </option>
        ))}
      </select>

      <button className="delete-btn" onClick={handleDelete}>
        Delete
      </button>
    </div>
  );
}

export default DeleteEmployee;
