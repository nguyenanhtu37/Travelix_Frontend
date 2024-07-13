import React, { useEffect, useState } from "react";
import "./UserTable.scss";
import { DataGrid } from "@mui/x-data-grid";
import axios from "axios";

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
    renderCell: () => {
      return (
        <div className="cellAction">
          <div className="viewButton">View</div>
        </div>
      );
    },
  },
];

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
