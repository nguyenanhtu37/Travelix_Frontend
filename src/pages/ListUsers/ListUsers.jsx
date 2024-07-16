import React from "react";
import "./ListUsers.scss";
import SideBar from "../../components/SideBar/SideBar";
import NavBar from "../../components/NavBarAdmin/NavBar";
import UserTable from "../../components/UserTable/UserTable";

const ListUsers = () => {
  return (
    <div className="list">
      <SideBar />
      <div className="listContainer">
        <NavBar />
        <UserTable />
      </div>
    </div>
  );
};

export default ListUsers;
