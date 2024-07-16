import React, { useEffect, useState } from "react";
import "./Table.scss";
import axios from "axios";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

const TableComponent = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5000/api/orderflight/"
        );
        setUsers(response.data);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    fetchUsers();
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

  return (
    <TableContainer component={Paper} className="table">
      <Table
        sx={{ minWidth: 650 }}
        aria-label="simple table"
        className="tableContainer"
      >
        <TableHead className="tableHead">
          <TableRow className="tableRow">
            <TableCell className="tableCell">ID Order Flight</TableCell>
            <TableCell align="right" className="tableCell">
              Total Price
            </TableCell>
            <TableCell align="right" className="tableCell">
              Status
            </TableCell>
            <TableCell align="right" className="tableCell">
              Create At
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody className="tableBody">
          {users.map((row) => (
            <TableRow key={row._id} className="tableRow">
              <TableCell className="tableCell">{row._id}</TableCell>
              <TableCell className="tableCell">{row.totalPrice}</TableCell>
              <TableCell className="tableCell">
                {row.status.toUpperCase()}
              </TableCell>
              <TableCell className="tableCell">{row.createdAt}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default TableComponent;
