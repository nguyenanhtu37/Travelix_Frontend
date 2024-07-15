// OrderFlightTable.jsx
import React, { useEffect, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import axios from "axios";
import "./OrderFlightTable.scss";
import { Link } from "react-router-dom";

const OrderFlightTable = () => {
  const [orderFlights, setOrderFlights] = useState([]);

  useEffect(() => {
    const fetchOrderFlights = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5000/api/orderflight"
        );
        setOrderFlights(response.data);
      } catch (error) {
        console.error("Error fetching order flights:", error);
      }
    };

    fetchOrderFlights();
  }, []);

  const getStatusClass = (status) => {
    switch (status) {
      case "create":
        return "status-create";
      case "pending":
        return "status-pending";
      case "Paid":
        return "status-paid";
      default:
        return "";
    }
  };

  const columns = [
    { field: "_id", headerName: "ID", width: 300 },
    {
      field: "status",
      headerName: "Status",
      width: 300,
      renderCell: (params) => {
        return (
          <span className={getStatusClass(params.value)}>
            {params.value.toUpperCase()}
          </span>
        );
      },
    },
    { field: "createdAt", headerName: "Created At", width: 400 },
    {
      field: "action",
      headerName: "Detail",
      width: 300,
      renderCell: (params) => (
        <Link
          to={`/orderflightdetailadmin/${params.row._id}`}
          className="btnViewDetail"
        >
          View Detail
        </Link>
      ),
    },
  ];

  return (
    <div className="orderFlightTable">
      <DataGrid
        rows={orderFlights}
        columns={columns}
        getRowId={(row) => row._id}
        pageSize={5}
        rowsPerPageOptions={[5]}
      />
    </div>
  );
};

export default OrderFlightTable;
