import React from "react";
import { Link } from "react-router-dom";
function Navbar() {
  return (
    <ul className="nav nav-tabs">
      <li className="nav-item">
        <Link to="/" className={window.location.pathname === "/" ? "nav-link active" : "nav-link"}>
          Class Attendance
        </Link>
      </li>
      <li className="nav-item">
        <Link
          to="/manage/attendance"
          className={window.location.pathname === "/manage/attendance" ? "nav-link active" : "nav-link"}
        >
          Class Attendance
        </Link>
      </li>
      <li className="nav-item">
        <Link
          to="/manage/members"
          className={window.location.pathname === "/manage/members" ? "nav-link active" : "nav-link"}
        >
          Members
        </Link>
      </li>
      <li className="nav-item">
        <Link
          to="/trainers"
          className={window.location.pathname === "/trainers" ? "nav-link active" : "nav-link"}
        >
          Trainers
        </Link>
      </li>
      <li className="nav-item">
        <Link
          to="/scheduler"
          className={window.location.pathname === "/manage/classes" ? "nav-link active" : "nav-link"}
        >
          Scheduler
        </Link>
      </li>
    </ul>
  );
}
export default Navbar;