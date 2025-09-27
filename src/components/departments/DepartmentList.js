import React, { useEffect, useState } from "react";
import API from "../../api";

function DepartmentList() {
  const [departments, setDepartments] = useState([]);

  useEffect(() => {
    API.get("/departments")
      .then((res) => setDepartments(res.data))
      .catch((err) => console.error("Error fetching departments:", err));
  }, []);

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>Departments</h2>

      {departments.length === 0 ? (
        <p>No departments found.</p>
      ) : (
        <table style={styles.table}>
          <thead>
            <tr>
              <th style={styles.th}>ID</th>
              <th style={styles.th}>Department Name</th>
            </tr>
          </thead>
          <tbody>
            {departments.map((dept) => (
              <tr key={dept.id}>
                <td style={styles.td}>{dept.id}</td>
                <td style={styles.td}>{dept.department_name}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

const styles = {
  container: {
    marginTop: "30px",
    padding: "20px",
    backgroundColor: "#ffffff",
    borderRadius: "8px",
    boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
    maxWidth: "700px",
    width: "100%",
  },
  title: {
    marginBottom: "20px",
    color: "#2b6cb0",
  },
  table: {
    width: "100%",
    borderCollapse: "collapse",
  },
  th: {
    backgroundColor: "#edf2f7",
    padding: "12px",
    textAlign: "left",
    borderBottom: "2px solid #cbd5e0",
  },
  td: {
    padding: "10px",
    borderBottom: "1px solid #e2e8f0",
  },
};

export default DepartmentList;
