import React, { useEffect, useState } from "react";
import "./SearchFlight.scss";
import { DataGrid } from "@mui/x-data-grid";
import axios from "axios";
import { Link, useHistory } from "react-router-dom";

const SearchFlight = () => {
  const [flights, setFlights] = useState([]);
  const [filteredFlights, setFilteredFlights] = useState([]);
  const [fromFilter, setFromFilter] = useState("");
  const [toFilter, setToFilter] = useState("");
  const [dateFilter, setDateFilter] = useState("");
  const [filterTriggered, setFilterTriggered] = useState(false);

  const filterOptions = [
    "Đà Nẵng",
    "Huế",
    "Nha Trang",
    "Hà Nội",
    "Hồ Chí Minh",
  ];

  useEffect(() => {
    const fetchFlights = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/flights");
        const formattedFlights = response.data.map((flight) => ({
          ...flight,
          formattedPrice: flight.price
            ? new Intl.NumberFormat("vi-VN", {
                style: "currency",
                currency: "VND",
              }).format(flight.price)
            : "N/A",
        }));
        setFlights(formattedFlights);
        setFilteredFlights(formattedFlights);
      } catch (error) {
        console.error("Error fetching flights:", error);
      }
    };

    fetchFlights();
  }, []);

  useEffect(() => {
    if (filterTriggered) {
      const filterFlights = () => {
        let updatedFlights = flights;
        if (fromFilter) {
          updatedFlights = updatedFlights.filter((flight) =>
            flight.from.includes(fromFilter)
          );
        }
        if (toFilter) {
          updatedFlights = updatedFlights.filter((flight) =>
            flight.to.includes(toFilter)
          );
        }
        if (dateFilter) {
          updatedFlights = updatedFlights.filter((flight) =>
            flight.departureDate.includes(dateFilter)
          );
        }
        setFilteredFlights(updatedFlights);
        setFilterTriggered(false);
      };

      filterFlights();
    }
  }, [filterTriggered, fromFilter, toFilter, dateFilter, flights]);

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this flight?")) {
      try {
        const response = await axios.delete(
          `http://localhost:5000/api/flights/${id}`
        );
        if (response.status === 200) {
          setFlights(flights.filter((flight) => flight._id !== id));
        }
      } catch (error) {
        console.error(
          "Error deleting flight:",
          error.response ? error.response.data : error.message
        );
      }
    }
  };

  const handleFilterClick = () => {
    setFilterTriggered(true);
  };

  const columns = [
    { field: "_id", headerName: "ID", width: 250 },
    { field: "from", headerName: "From", width: 300 },
    { field: "to", headerName: "To", width: 300 },
    { field: "branch", headerName: "Branch", width: 200 },
    { field: "departureDate", headerName: "Departure Date", width: 300 },
    {
      field: "action",
      headerName: "Action",
      width: 100,
      renderCell: (params) => {
        return (
          <div className="cellAction">
            <Link className="viewButton" to={`/choose/${params.row._id}`}>
              Choose
            </Link>
          </div>
        );
      },
    },
  ];

  return (
    <div className="searchFlight">
      <header className="header">
        <div className="navbar">
          <Link to="/" className="navbar-brand">
            <h1>Travelix</h1>
          </Link>
          <nav className="navbar-nav">
            <ul className="nav">
              {/* <li className="nav-item">
                <Link to="/" className="nav-link">Home</Link>
              </li> */}
              <li className="nav-item">
                <Link to="/destinationsandtripuser" className="nav-link">
                  Destinations & Trips
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/cars" className="nav-link">
                  Car Rentals
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/searchflight" className="nav-link">
                  Flights
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/hotels" className="nav-link">
                  Hotels
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/activities" className="nav-link">
                  Activities
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/about" className="nav-link">
                  About
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/contact" className="nav-link">
                  Contact
                </Link>
              </li>
            </ul>
          </nav>
          <div className="auth-buttons">
            <Link to="/login" className="btn btn-login">
              Login
            </Link>
            <Link to="/signup" className="btn btn-secondary">
              Sign up
            </Link>
          </div>
        </div>
      </header>
      <div className="filterContainer">
        <select
          value={fromFilter}
          onChange={(e) => setFromFilter(e.target.value)}
          className="filterSelect"
        >
          <option value="">All From</option>
          {filterOptions.map((from) => (
            <option key={from} value={from}>
              {from}
            </option>
          ))}
        </select>
        <select
          value={toFilter}
          onChange={(e) => setToFilter(e.target.value)}
          className="filterSelect"
        >
          <option value="">All To</option>
          {filterOptions.map((to) => (
            <option key={to} value={to}>
              {to}
            </option>
          ))}
        </select>
        <input
          type="date"
          value={dateFilter}
          onChange={(e) => setDateFilter(e.target.value)}
          className="filterDate"
        />
        <button onClick={handleFilterClick} className="filterButton">
          Apply Filter
        </button>
      </div>
      <DataGrid
        rows={filteredFlights}
        columns={columns}
        getRowId={(row) => row._id}
        pageSize={9}
        rowsPerPageOptions={[9]}
      />
      <footer className="footer">
        <div className="footer-content">
          <div className="footer-section about">
            <h3>About Travelix</h3>
            <p>
              Explore the world with Travelix, your trusted partner in
              discovering the best destinations and experiences.
            </p>
          </div>
          <div className="footer-section links">
            <h3>Quick Links</h3>
            <ul>
              <li>
                <a href="/">Home</a>
              </li>
              <li>
                <a href="/destinations">Destinations</a>
              </li>
              <li>
                <a href="/about">About Us</a>
              </li>
              <li>
                <a href="/contact">Contact</a>
              </li>
            </ul>
          </div>
          <div className="footer-section contact">
            <h3>Contact Us</h3>
            <p>Email: nguyenanhtu3703@gmail.com</p>
            <p>Phone: +84 839 706 916</p>
            <p>Address: Hòa Hải, Ngũ Hành Sơn, Đà Nẵng</p>
          </div>
          <div className="footer-section social">
            <h3>Follow Us</h3>
            <a href="#">
              <img src="/images/amz.png" alt="Facebook"></img>
            </a>
            <a href="#">
              <img src="/images/twitter.png" alt="Twitter"></img>
            </a>
            <a href="#">
              <img src="/images/ig.png" alt="Instagram"></img>
            </a>
          </div>
        </div>
        <div className="footer-bottom">
          <p>&copy; 2024 Travelix. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default SearchFlight;
