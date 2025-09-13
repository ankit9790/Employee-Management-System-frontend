import React, { useState } from "react";
import API from "../../api";

function DeleteDepartment() {
  const [id, setId] = useState("");

  const handleDelete = () => {
    API.delete(`/departments/${id}`)
      .then(() => alert("Department deleted"))
      .catch((err) => console.error(err));
  };

  return (
    <div>
      <h2>Delete Department</h2>
      <input placeholder="Department ID" value={id} onChange={(e) => setId(e.target.value)} />
      <button onClick={handleDelete}>Delete</button>
    </div>
  );
}

export default DeleteDepartment;
