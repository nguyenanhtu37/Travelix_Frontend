import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import "./AdminStyle.scss";
import NavBar from "../../components/NavBarAdmin/NavBar";
import SideBar from "../../components/SideBar/SideBar";
import Widget from "../../components/Widget/Widget";
import Featured from "../../components/Featured/Featured";
import Chart from "../../components/Chart/Chart";
import TableComponent from "../../components/Table/Table";
// import '../CSS/AdminDashboard.css';

const AdminDashboard = () => {
  const [userCount, setUserCount] = useState(0);
  const [destinationCount, setDestinationCount] = useState(0);
  const [hotelCount, setHotelCount] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserCount = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5000/api/users/count"
        );
        setUserCount(response.data.count);
      } catch (error) {
        console.error("Lỗi khi lấy tổng số người dùng:", error);
      }
    };

    fetchUserCount();
  }, []); // Chạy 1 lần

  useEffect(() => {
    const fetchDestinationCount = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5000/api/destinations/count"
        );
        setDestinationCount(response.data.count);
      } catch (error) {
        console.error("Lỗi khi lấy tổng số điểm đến:", error);
      }
    };

    fetchDestinationCount();
  }, []);

  const handleCreateDestination = () => {
    navigate("/admin/destinations/create");
  };

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
