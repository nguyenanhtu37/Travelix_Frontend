import React from "react";
import "./ListOrderFlight.scss";
import SideBar from "../../components/SideBar/SideBar";
import NavBar from "../../components/NavBarAdmin/NavBar";
import OrderFlightTable from "../../components/OrderFlightTable/OrderFlightTable";

const ListOrderFlight = () => {
  return (
    <div className="listOrderFlight">
      <SideBar />
      <div className="listOrderFlightContainer">
        <NavBar />
        <OrderFlightTable />
      </div>
    </div>
  );
};

export default ListOrderFlight;
