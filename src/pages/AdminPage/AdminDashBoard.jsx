import React from "react";
import "./AdminStyle.scss";
import NavBar from "../../components/NavBarAdmin/NavBar";
import SideBar from "../../components/SideBar/SideBar";
import Widget from "../../components/Widget/Widget";
import Featured from "../../components/Featured/Featured";
import Chart from "../../components/Chart/Chart";
import TableComponent from "../../components/Table/Table";

const AdminDashboard = () => {
  return (
    <div className="admin">
      <SideBar />
      <div className="adminContainer">
        <NavBar />
        <div className="Widgets">
          <Widget type={"user"} />
          <Widget type={"order"} />
          <Widget type={"earning"} />
          <Widget type={"balance"} />
        </div>
        <div className="charts">
          <Featured />
          <Chart />
        </div>
        <div className="listContainer">
          <div className="listTitle">Latest Transactions</div>
          <TableComponent />
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
