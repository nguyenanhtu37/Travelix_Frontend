import React from "react";
import "./SideBar.scss";
import { Link } from "react-router-dom";
import DashboardIcon from "@mui/icons-material/Dashboard";
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";
import FlightOutlinedIcon from "@mui/icons-material/FlightOutlined";
import DriveEtaOutlinedIcon from "@mui/icons-material/DriveEtaOutlined";
import ApartmentOutlinedIcon from "@mui/icons-material/ApartmentOutlined";
import TourOutlinedIcon from "@mui/icons-material/TourOutlined";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import AddToPhotosIcon from "@mui/icons-material/AddToPhotos";

const SideBar = () => {
  return (
    <div className="side-bar">
      <div className="top">
        <span className="logo">Travlix</span>
      </div>
      <hr />
      <div className="center">
        <ul>
          <p className="title">Main</p>
          <li>
            <Link to="/admin" className="link">
              <DashboardIcon className="icon" />
              <span>DashBoard</span>
            </Link>
          </li>
          <p className="title">Lists</p>
          <li>
            <Link to="/listusers" className="link">
              <PersonOutlineOutlinedIcon className="icon" />
              <span>Users</span>
            </Link>
          </li>
          <li>
            <Link to="/manageflight" className="link">
              <FlightOutlinedIcon className="icon" />
              <span>Flights</span>
            </Link>
          </li>
          <li>
            <Link to="/addflight" className="link">
              <DriveEtaOutlinedIcon className="icon" />
              <span>Cars</span>
            </Link>
          </li>
          <li>
            <Link to="/addflight" className="link">
              <ApartmentOutlinedIcon className="icon" />
              <span>Hotels</span>
            </Link>
          </li>
          <li>
            <Link to="/addflight" className="link">
              <TourOutlinedIcon className="icon" />
              <span>Destinations</span>
            </Link>
          </li>
          <p className="title">Add Items</p>
          <li>
            <Link to="/addflight" className="link">
              <AddCircleOutlineIcon className="icon" />
              <span>Add Flights</span>
            </Link>
          </li>
          <li>
            <Link to="/addflight" className="link">
              <AddToPhotosIcon className="icon" />
              <span>Add Cars</span>
            </Link>
          </li>
        </ul>
      </div>
      <div className="bottom">
        <div className="colorOption"></div>
        <div className="colorOption"></div>
      </div>
    </div>
  );
};

export default SideBar;
