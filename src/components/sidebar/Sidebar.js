import React from "react";

function Sidebar({ setActiveMenu }) {
  return (
    <div className="sidebar">
      <h2>EMS</h2>
      <ul>
        <li onClick={() => setActiveMenu("employee")}>Employee</li>
        <li onClick={() => setActiveMenu("department")}>Department</li>
        <li onClick={() => setActiveMenu("course")}>Course</li>
      </ul>
    </div>
  );
}

export default Sidebar;
