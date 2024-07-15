import React, { useEffect, useState } from "react";
import "./FlightTable.scss";
import { DataGrid } from "@mui/x-data-grid";
import axios from "axios";
import { Link } from "react-router-dom";

const FlightTable = () => {
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
        setFilteredFlights(formattedFlights); // Initialize filtered flights
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
        setFilterTriggered(false); // Reset the trigger
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
    { field: "_id", headerName: "ID", width: 70 },
    { field: "from", headerName: "From", width: 125 },
    { field: "to", headerName: "To", width: 125 },
    { field: "branch", headerName: "Branch", width: 100 },
    { field: "departureDate", headerName: "Departure Date", width: 150 },
    {
      field: "numEconomyPassengers",
      headerName: "The Number of Economy Passengers",
      width: 100,
    },
    {
      field: "numBusinessPassengers",
      headerName: "The Number of Business Passengers",
      width: 100,
    },
    {
      field: "priceAdultEconomy",
      headerName: "Price Of Adult (Economy)",
      width: 100,
    },
    {
      field: "priceChildrenEconomy",
      headerName: "Price Of Children (Economy)",
      width: 100,
    },
    {
      field: "priceAdultBusiness",
      headerName: "Price Of Adult (Business)",
      width: 100,
    },
    {
      field: "priceChildrenBusiness",
      headerName: "Price Of Children (Business)",
      width: 100,
    },
    {
      field: "action",
      headerName: "Action",
      width: 150,
      renderCell: (params) => {
        return (
          <div className="cellAction">
            <Link className="viewButton" to={`/${params.row._id}`}>
              View
            </Link>
            <div
              className="deleteButton"
              onClick={() => handleDelete(params.row._id)}
            >
              Delete
            </div>
          </div>
        );
      },
    },
  ];

  return (
    <div className="flightTable">
      <div className="flightTableContainer">
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
          Filter
        </button>
      </div>
      <DataGrid
        rows={filteredFlights}
        columns={columns}
        getRowId={(row) => row._id}
        pageSize={9}
        rowsPerPageOptions={[9]}
      />
    </div>
  );
};

export default FlightTable;
