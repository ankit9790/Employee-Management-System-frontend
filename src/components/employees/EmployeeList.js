import React, { useEffect, useState } from "react";
import API from "../../api";
import AddEmployee from "./AddEmployee";
import DeleteEmployee from "./DeleteEmployee";

function EmployeeList() {
  const [employees, setEmployees] = useState([]);
  const [departments, setDepartments] = useState([]);
  const [courses, setCourses] = useState([]);
  const [showAdd, setShowAdd] = useState(false);
  const [showDelete, setShowDelete] = useState(false);
  const [search, setSearch] = useState("");

  // Unified fetch function to refresh all data
  const fetchAllData = () => {
    fetchEmployees();
    fetchDepartments();
    fetchCourses();
  };

  useEffect(() => {
    fetchAllData();
  }, []);

  const fetchEmployees = () => {
    API.get("/employees")
      .then((res) => setEmployees(res.data))
      .catch((err) => console.error(err));
  };

  const fetchDepartments = () => {
    API.get("/departments")
      .then((res) => setDepartments(res.data))
      .catch((err) => console.error(err));
  };

  const fetchCourses = () => {
    API.get("/courses")
      .then((res) => setCourses(res.data))
      .catch((err) => console.error(err));
  };

  const getDepartmentName = (id) => {
    if (!id) return "N/A";
    const dept = departments.find((d) => d.id === id);
    return dept ? dept.department_name : "N/A";
  };

  const getCourseName = (id) => {
    if (!id) return "N/A";
    const course = courses.find((c) => c.id === id);
    return course ? course.course_name : "N/A";
  };

  // Filter employees by search text
  const filteredEmployees = employees.filter((e) => {
    const deptName = getDepartmentName(e.departmentid).toLowerCase();
    const courseName = getCourseName(e.courseid).toLowerCase();
    return (
      e.name.toLowerCase().includes(search.toLowerCase()) ||
      deptName.includes(search.toLowerCase()) ||
      courseName.includes(search.toLowerCase())
    );
  });

  return (
    <div className="employee-container">
      <div className="employee-header-bar">
        <h2>Employees</h2>

        {/* Search Box */}
        <input
          type="text"
          placeholder="Search by name, dept, or course..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="search-box"
        />

        <div className="action-buttons">
          <button
            onClick={() => {
              setShowAdd(!showAdd);
              setShowDelete(false);
            }}
          >
            {showAdd ? "Close Add" : "Add Employee"}
          </button>
          <button
            onClick={() => {
              setShowDelete(!showDelete);
              setShowAdd(false);
            }}
          >
            {showDelete ? "Close Delete" : "Delete Employee"}
          </button>
          {/* Refresh Button */}
          <button onClick={fetchAllData}>Refresh</button>
        </div>
      </div>

      {showAdd && <AddEmployee refreshData={fetchAllData} />}
      {showDelete && <DeleteEmployee refreshData={fetchAllData} />}

      <div className="employee-grid-container">
        <div className="employee-grid">
          <div className="employee-header">ID</div>
          <div className="employee-header">Name</div>
          <div className="employee-header">Age</div>
          <div className="employee-header">Department</div>
          <div className="employee-header">Course</div>

          {filteredEmployees.map((e) => (
            <React.Fragment key={e.id}>
              <div>{e.id}</div>
              <div>{e.name}</div>
              <div>{e.age}</div>
              <div>{getDepartmentName(e.departmentid)}</div>
              <div>{getCourseName(e.courseid)}</div>
            </React.Fragment>
          ))}
        </div>
      </div>
    </div>
  );
}

export default EmployeeList;
