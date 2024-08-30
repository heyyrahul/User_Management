import React, { useState, useEffect } from "react";
import axios from "axios";
import { Container, Button, Typography, Dialog } from "@mui/material";
import UserTable from "./UserTable";
import UserForm from "./UserForm";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { apiURL } from "../services/api";

const UserManagement = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedUser, setSelectedUser] = useState(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [page, setPage] = useState(0);
  const [rowsPerPage] = useState(10); 

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${apiURL}/users`);
      setUsers(response.data);
      setLoading(false);
    } catch (err) {
      setError("Failed to fetch users");
      toast.error("Failed to fetch users");
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleAddUser = async (user) => {
    try {
      await axios.post(`${apiURL}/users`, user);
      fetchUsers();
      toast.success("User added successfully");
      setIsDialogOpen(false);
    } catch (err) {
      setError("Failed to add user");
      toast.error("Failed to add user");
    }
  };

  const handleEditUser = async (user) => {
    try {
        console.log(user)
      await axios.patch(`${apiURL}/users/${user.id}`, user);
      fetchUsers(); 
      setIsDialogOpen(false);
      toast.success("User updated successfully");
    } catch (err) {
      setError("Failed to edit user");
      toast.error("Failed to edit user");
    }
  };

  const handleDeleteUser = async (id) => {
    try {
      await axios.delete(`${apiURL}/users/${id}`);
      fetchUsers(); 
      toast.success("User deleted successfully");
    } catch (err) {
      setError("Failed to delete user");
      toast.error("Failed to delete user");
    }
  };

  const handleSelectUser = (user) => {
    setSelectedUser(user);
    setIsDialogOpen(true);
  };

  const handleOpenDialog = () => {
    setSelectedUser(null);
    setIsDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setSelectedUser(null);
    setIsDialogOpen(false);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  return (
    <Container>
      <Button variant="contained"  onClick={handleOpenDialog} sx={{ marginTop: 2,marginBottom: 2,backgroundColor: "#0F67B1", }}>
        + Add User
        
      </Button>
      
      <UserTable
        users={users.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)}
        onEdit={handleSelectUser}
        onDelete={handleDeleteUser}
        loading={loading}
        page={page}
        rowsPerPage={rowsPerPage}
        totalUsers={users.length}
        onChangePage={handleChangePage}
      />
      

      <Dialog open={isDialogOpen} onClose={handleCloseDialog}>
        <UserForm
          onSave={selectedUser ? handleEditUser : handleAddUser}
          user={selectedUser}
          onCancel={handleCloseDialog}
        />
      </Dialog>

      <ToastContainer />
    </Container>
  );
};

export default UserManagement;
