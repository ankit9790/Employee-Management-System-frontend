import React, { useState } from "react";
import Sidebar from "./components/sidebar/Sidebar";

import EmployeeList from "./components/employees/EmployeeList";
import AddEmployee from "./components/employees/AddEmployee";
import DeleteEmployee from "./components/employees/DeleteEmployee";

import DepartmentList from "./components/departments/DepartmentList";
import AddDepartment from "./components/departments/AddDepartment";
import DeleteDepartment from "./components/departments/DeleteDepartment";

// Course components (you can create similarly)
import CourseList from "./components/courses/CourseList";
import AddCourse from "./components/courses/AddCourse";
import DeleteCourse from "./components/courses/DeleteCourse";

import "./App.css";

function App() {
  const [activeMenu, setActiveMenu] = useState("employee");

  return (
    <div className="app">
      <Sidebar setActiveMenu={setActiveMenu} />

      <div className="content">
        <h1 className="main-heading">Employee Management System</h1>

        {activeMenu === "employee" && (
          <>
            <EmployeeList />
            
          </>
        )}

        {activeMenu === "department" && (
          <>
           <AddDepartment />
            <DeleteDepartment />
            <DepartmentList />
          </>
        )}

        {activeMenu === "course" && (
          <>
            <CourseList />
            <AddCourse />
            <DeleteCourse />
          </>
        )}
      </div>
    </div>
  );
}

export default App;
