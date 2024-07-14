import React, { useEffect, useState } from "react";
import "./UserTable.scss";
import { DataGrid } from "@mui/x-data-grid";
import axios from "axios";

const UserTable = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5000/api/users/getall"
        );
        setUsers(response.data);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    fetchUsers();
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this flight?")) {
      try {
        const response = await axios.delete(
          `http://localhost:5000/api/users/${id}`
        );
        if (response.status === 200) {
          setUsers(users.filter((user) => user._id !== id));
        }
      } catch (error) {
        console.error(
          "Error deleting user:",
          error.response ? error.response.data : error.message
        );
      }
    }
  };

  const columns = [
    { field: "_id", headerName: "ID", width: 150 },
    { field: "name", headerName: "Name", width: 200 },
    { field: "username", headerName: "User name", width: 200 },
    { field: "password", headerName: "Password", width: 200 },
    { field: "phone", headerName: "Phone", width: 200 },
    { field: "role", headerName: "Role", width: 200 },
    {
      field: "action",
      headerName: "Action",
      width: 200,
      renderCell: (params) => {
        return (
          <div className="cellAction">
            <div className="viewButton">View</div>
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
        rows={users}
        columns={columns}
        getRowId={(row) => row._id}
        pageSize={5}
        rowsPerPageOptions={[5]}
      />
    </div>
  );
};

export default UserTable;
