import React, { useEffect, useState } from "react";
import "./FlightTable.scss";
import { DataGrid } from "@mui/x-data-grid";
import axios from "axios";

const columns = [
  { field: "_id", headerName: "ID", width: 70 },
  { field: "from", headerName: "From", width: 150 },
  { field: "to", headerName: "To", width: 150 },
  { field: "departureDate", headerName: "Departure Date", width: 150 },
  { field: "returnDate", headerName: "Return Date", width: 150 },
  {
    field: "numEconomyPassengers",
    headerName: "The Number of Economy Passengers",
    width: 150,
  },
  {
    field: "numBusinessPassengers",
    headerName: "The Number of Business Passengers",
    width: 150,
  },
  { field: "price", headerName: "Price", width: 150 },
  {
    field: "action",
    headerName: "Action",
    width: 200,
    renderCell: () => {
      return (
        <div className="cellAction">
          <div className="viewButton">View</div>
          <div className="deleteButton">Delete</div>
        </div>
      );
    },
  },
];

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
