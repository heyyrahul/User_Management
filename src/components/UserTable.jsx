import React, { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  TablePagination,
  Skeleton,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Button,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

const UserTable = ({
  users,
  onEdit,
  onDelete,
  loading,
  page,
  rowsPerPage,
  totalUsers,
  onChangePage,
}) => {
  const [openDialog, setOpenDialog] = useState(false);
  const [userToDelete, setUserToDelete] = useState(null);

  const handleOpenDialog = (user) => {
    setUserToDelete(user);
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setUserToDelete(null);
  };

  const handleConfirmDelete = () => {
    if (userToDelete) {
      onDelete(userToDelete.id);
      handleCloseDialog();
    }
  };

  const calculateSerialNumber = (index) => page * rowsPerPage + index + 1;

  if (loading) {
    return (
      <TableContainer component={Paper} sx={{ boxShadow: 3, borderRadius: 2 ,
        backgroundColor: "rgba(255, 255, 255, 0.1)",
          backdropFilter: "blur(6px)"
      }}>
        <Table>
          <TableHead sx={{ backgroundColor: "#134B70", color: "#fff" }}>
            <TableRow>
              <TableCell sx={{ color: "#fff" }}>Serial No.</TableCell>
              <TableCell sx={{ color: "#fff" }}>First Name</TableCell>
              <TableCell sx={{ color: "#fff" }}>Last Name</TableCell>
              <TableCell sx={{ color: "#fff" }}>Email</TableCell>
              <TableCell sx={{ color: "#fff" }}>Department</TableCell>
              <TableCell sx={{ color: "#fff" }}>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {[...Array(rowsPerPage)].map((_, index) => (
              <TableRow key={index}>
                <TableCell>
                  <Skeleton width="60px" />
                </TableCell>
                <TableCell>
                  <Skeleton width="120px" />
                </TableCell>
                <TableCell>
                  <Skeleton width="120px" />
                </TableCell>
                <TableCell>
                  <Skeleton width="200px" />
                </TableCell>
                <TableCell>
                  <Skeleton width="150px" />
                </TableCell>
                <TableCell>
                  <Skeleton variant="rectangular" width={50} height={30} />
                  <Skeleton
                    variant="rectangular"
                    width={50}
                    height={30}
                    sx={{ marginLeft: 1 }}
                  />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    );
  }

  return (
    <>
      <TableContainer
        component={Paper}
        sx={{
          boxShadow: 3,
          borderRadius: 2,
          backgroundColor: "rgba(255, 255, 255, 0.1)",
          backdropFilter: "blur(6px)"
        }}
      >
        <Table>
          <TableHead sx={{ backgroundColor: "#134B70", color: "#fff" }}>
            <TableRow>
              <TableCell sx={{ color: "#fff" }}>Serial No.</TableCell>
              <TableCell sx={{ color: "#fff" }}>First Name</TableCell>
              <TableCell sx={{ color: "#fff" }}>Last Name</TableCell>
              <TableCell sx={{ color: "#fff" }}>Email</TableCell>
              <TableCell sx={{ color: "#fff" }}>Department</TableCell>
              <TableCell sx={{ color: "#fff" }}>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users.map((user, index) => (
              <TableRow key={user.id}>
                <TableCell>{calculateSerialNumber(index)}</TableCell>
                <TableCell>{user.firstName}</TableCell>
                <TableCell>{user.lastName}</TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>{user.department}</TableCell>
                <TableCell>
                  <IconButton onClick={() => onEdit(user)} color="primary">
                    <EditIcon />
                  </IconButton>
                  <IconButton
                    onClick={() => handleOpenDialog(user)}
                    color="secondary"
                  >
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <TablePagination
          rowsPerPageOptions={[10]}
          component="div"
          count={totalUsers}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={onChangePage}
        />
      </TableContainer>

      <Dialog
        open={openDialog}
        onClose={handleCloseDialog}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        
      >
        <DialogTitle
          id="alert-dialog-title"
          sx={{ fontSize: "25px", fontWeight: "bold" }}
        >
          {"Confirm Delete"}
        </DialogTitle>
        <DialogContent>
          
            <p>Are you sure you want to delete this user?</p>
        
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} sx={{ color: "primary",border: "1px solid #7091F5" }}>
            Cancel
          </Button>
          <Button onClick={handleConfirmDelete} color="secondary" sx={{ border: "1px solid purple" }} autoFocus>
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default UserTable;
