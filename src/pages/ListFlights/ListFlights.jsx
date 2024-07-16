import React from "react";
import "./ListFlights.scss";
import SideBar from "../../components/SideBar/SideBar";
import NavBar from "../../components/NavBarAdmin/NavBar";
import FlightTable from "../../components/FlightTable/FlightTable";

const ListFlights = () => {
  return (
    <div className="list">
      <SideBar />
      <div className="listContainer">
        <NavBar />
        <FlightTable />
      </div>
    </div>
  );
};

export default ListFlights;
