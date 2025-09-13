import React, { useState } from "react";
import API from "../../api";

function AddDepartment() {
  const [name, setName] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    API.post("/departments", { department_name: name })
      .then(() => alert("Department added"))
      .catch((err) => console.error(err));
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Add Department</h2>
      <input placeholder="Department Name" value={name} onChange={(e) => setName(e.target.value)} />
      <button type="submit">Add</button>
    </form>
  );
}

export default AddDepartment;
