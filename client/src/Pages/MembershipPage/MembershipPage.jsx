import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  Grid,
} from "@mui/material";
import { Add, Edit, Delete } from "@mui/icons-material";
import { useDispatch, useSelector } from "react-redux";
import {
  getAllMemberships,
  addMembership,
  updateMembership,
  deleteMembership,
} from "../../Redux/thunks/MembershipThunks";
import Loader from "../../Components/Common/Loader";
import Modal from "../../Components/Common/Modal";
import MembershipForm from "../../Components/Forms/Membership/MembershipForm";
import Button from "../../Components/Common/Button";

const MembershipsPage = () => {
  const dispatch = useDispatch();
  const { memberships, loading } = useSelector((state) => state.memberships);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingMembership, setEditingMembership] = useState(null);

  // Завантаження списку абонементів
  useEffect(() => {
    dispatch(getAllMemberships());
  }, [dispatch]);

  const handleAddClick = () => {
    setEditingMembership(null);
    setIsModalOpen(true);
  };

  const handleEditClick = (membership) => {
    setEditingMembership(membership);
    setIsModalOpen(true);
  };

  const handleDeleteClick = (id) => {
    dispatch(deleteMembership(id));
  };

  const handleFormSubmit = (data) => {
    if (editingMembership) {
      dispatch(updateMembership({ id: editingMembership._id, membershipData: data }));
    } else {
      dispatch(addMembership(data));
    }
    setIsModalOpen(false);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <Box p={3}>
      <Typography variant="h4" mb={2}>
        Управління абонементами
      </Typography>
      {loading ? (
        <Loader />
      ) : (
        <>
          <Button
            variant="contained"
            color="primary"
            startIcon={<Add />}
            onClick={handleAddClick}
            style={{ marginBottom: 16 }}
          >
            Додати абонемент
          </Button>
          <Grid container justifyContent="center">
          <Grid item xs={12} md={8} lg={6}>
          <TableContainer component={Paper} sx={{ margin: '0 auto', width: 'auto', maxHeight: 'none' }}>
            <Table sx={{ tableLayout: 'fixed', wordWrap: 'break-word' }}>
              <TableHead>
                <TableRow>
                  <TableCell>Тип</TableCell>
                  <TableCell>Тривалість (місяців)</TableCell>
                  <TableCell>Ціна</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {memberships.map((membership) => (
                  <TableRow key={membership._id}>
                    <TableCell>{membership.type}</TableCell>
                    <TableCell>{membership.duration}</TableCell>
                    <TableCell>{membership.price}</TableCell>
                    <TableCell>
                      <IconButton
                        color="primary"
                        onClick={() => handleEditClick(membership)}
                      >
                        <Edit />
                      </IconButton>
                      <IconButton
                        color="error"
                        onClick={() => handleDeleteClick(membership._id)}
                      >
                        <Delete />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
          </Grid>
          </Grid>

          {/* Модальне вікно */}
          <Modal
            isOpen={isModalOpen}
            onClose={handleCloseModal}
            title={
              editingMembership
                ? "Редагування абонемента"
                : "Додавання нового абонемента"
            }
          >
            <MembershipForm
              initialValues={
                editingMembership || {
                  type: "",
                  duration: "",
                  price: "",
                }
              }
              onSubmit={handleFormSubmit}
              isEditing={!!editingMembership}
            />
          </Modal>
        </>
      )}
    </Box>
  );
};

export default MembershipsPage;