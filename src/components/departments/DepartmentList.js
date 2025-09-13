import React, { useEffect, useState } from "react";
import API from "../../api";

function DepartmentList() {
  const [departments, setDepartments] = useState([]);

  useEffect(() => {
    API.get("/departments")
      .then((res) => setDepartments(res.data))
      .catch((err) => console.error(err));
  }, []);

  return (
    <div className="employee-container">
      <h2>Departments</h2>

      <div className="employee-grid-container">
        <div className="employee-grid">
          {/* Headers */}
          <div className="employee-header">ID</div>
          <div className="employee-header">Department Name</div>

          {/* Data */}
          {departments.map((d) => (
            <React.Fragment key={d.id}>
              <div>{d.id}</div>
              <div>{d.department_name}</div>
            </React.Fragment>
          ))}
        </div>
      </div>
    </div>
  );
}

export default DepartmentList;
