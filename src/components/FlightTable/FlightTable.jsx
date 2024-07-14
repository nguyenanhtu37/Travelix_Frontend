import React, { useEffect, useState } from "react";
import "./FlightTable.scss";
import { DataGrid } from "@mui/x-data-grid";
import axios from "axios";
import { Link } from "react-router-dom";

const FlightTable = () => {
  const [flights, setFlights] = useState([]);

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
      } catch (error) {
        console.error("Error fetching flights:", error);
      }
    };

    fetchFlights();
  }, []);

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
        console.log("params.row:", params.row); // Kiểm tra params.row
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
    <div className="userTable">
      <DataGrid
        rows={flights}
        columns={columns}
        getRowId={(row) => row._id}
        pageSize={9}
        rowsPerPageOptions={[9]}
      />
    </div>
  );
};

export default FlightTable;
