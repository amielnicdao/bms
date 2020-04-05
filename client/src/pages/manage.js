import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Attendance from "../components/Manage/attendance";
import Members from "../components/Manage/members";
import Classes from "../components/Manage/classes";
import Trainers from "../components/Manage/trainers";
import SideNav from '../components/Navbar/index';
import Welcome from '../components/Manage/welcome';
import '../components/Manage/manage.css';

function Manage() {
  return (
    <div>
      <Router>
        <div className="management">
          <SideNav></SideNav>
          <Route exact path="/manage" component={Welcome} />
          <Route exact path="/manage/attendance" component={Attendance} />
          <Route exact path="/manage/members" component={Members} />
          <Route exact path="/manage/classes" component={Classes} />
          <Route exact path="/manage/trainers" component={Trainers} />

        </div>
      </Router>
    </div>
  );
}
export default Manage;