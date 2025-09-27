import React, { useState } from "react";
import API from "../../api";

function DeleteDepartment() {
  const [id, setId] = useState("");

  const handleDelete = () => {
    if (!id.trim()) {
      alert("Please enter a Department ID.");
      return;
    }

    if (!window.confirm(`Are you sure you want to delete department ID ${id}?`)) {
      return;
    }

    API.delete(`/departments/${id}`)
      .then(() => {
        alert("✅ Department deleted successfully");
        setId("");
      })
      .catch((err) => {
        console.error("Delete error:", err);
        alert("❌ Failed to delete department");
      });
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>Delete Department</h2>
      <div style={styles.formGroup}>
        <label htmlFor="deptId" style={styles.label}>Department ID:</label>
        <input
          id="deptId"
          type="number"
          placeholder="Enter Department ID"
          value={id}
          onChange={(e) => setId(e.target.value)}
          style={styles.input}
        />
      </div>
      <button onClick={handleDelete} style={styles.button}>
        Delete
      </button>
    </div>
  );
}

const styles = {
  container: {
    marginTop: "30px",
    padding: "20px",
    backgroundColor: "#fefefe",
    borderRadius: "8px",
    boxShadow: "0 1px 6px rgba(0,0,0,0.1)",
    maxWidth: "500px",
  },
  title: {
    marginBottom: "15px",
    color: "#c53030",
  },
  formGroup: {
    marginBottom: "15px",
    display: "flex",
    flexDirection: "column",
  },
  label: {
    marginBottom: "5px",
    fontWeight: "bold",
  },
  input: {
    padding: "8px",
    fontSize: "16px",
    borderRadius: "4px",
    border: "1px solid #ccc",
  },
  button: {
    padding: "10px 15px",
    backgroundColor: "#e53e3e",
    color: "white",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
    fontWeight: "bold",
  },
};

export default DeleteDepartment;
