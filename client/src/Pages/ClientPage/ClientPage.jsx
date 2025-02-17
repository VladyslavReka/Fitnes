import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import { Box, Grid, Typography, Button } from "@mui/material";
import ClientInfoCard from "../../Components/Wrapper/ClientInfoCard";
import TrainingList from "../../Components/Wrapper/TrainingList";
import Loader from "../../Components/Common/Loader";
import ChangeMembershipModal from "../../Components/Forms/Membership/ChangeMembershipModal";
import EditClientModal from "../../Components/Forms/EditClient/EditClient";
import {
  getClientById,
  deleteClient,
  extendMembership,
  changeMembership,
  updateClient,
} from "../../Redux/thunks/ClientThunks";
import { getTrainingsByClient } from "../../Redux/thunks/TrainingThunks";
import { getAllMemberships } from "../../Redux/thunks/MembershipThunks";

const ClientPage = () => {
  const { clientId } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const client = useSelector((state) => state.clients.currentClient);
  const trainings = useSelector((state) => state.trainings.trainingList || []);
  const loading = useSelector((state) => state.clients.loading);
  const memberships = useSelector((state) => state.memberships.memberships || []); // Використання правильного поля для абонементів

  const [isEditModalOpen, setEditModalOpen] = useState(false);
  const [isChangeMembershipModalOpen, setChangeMembershipModalOpen] = useState(false);

  useEffect(() => {
    if (clientId) {
      dispatch(getClientById(clientId));
      dispatch(getTrainingsByClient(clientId));
    }
    dispatch(getAllMemberships());
  }, [clientId, dispatch]);

  const handleDeleteClient = async () => {
    try {
      await dispatch(deleteClient(clientId)).unwrap();
      navigate('/client');
    } catch (error) {
      console.error("Помилка видалення client:", error);
    }

  };

  const handleExtendMembership = () => {
    dispatch(extendMembership(clientId));
  };

  const handleOpenChangeMembershipModal = () => {
    setChangeMembershipModalOpen(true);
  };

  const handleChangeMembership = async (newMembershipId) => {
    try {
      await dispatch(changeMembership({ clientId, newMembershipId })).unwrap();
      handleCloseChangeMembershipModal();
    } catch (error) {
      console.error(error);
    }
  };

  const handleCloseChangeMembershipModal = () => {
    setChangeMembershipModalOpen(false);
  };

  const handleOpenEditModal = () => {
    setEditModalOpen(true);
  };

  const handleCloseEditModal = () => {
    setEditModalOpen(false);
  };

  const handleSaveClient = (updatedClientData) => {
    dispatch(updateClient({ clientId, clientData: updatedClientData }));
    handleCloseEditModal();
  };

  if (loading) {
    return <Loader />;
  }

  return (
    <Box sx={{ padding: 4 }}>
      <Grid container spacing={4}>
        <Grid item xs={12} md={2.5}>
          {client && <ClientInfoCard client={client} />}
          <Box sx={{ marginTop: 2, display: "flex", flexDirection: "column", gap: 2 }}>
            <Button variant="contained" sx={{ backgroundColor: '#4caf50', color: 'white' }} onClick={handleExtendMembership}>
              Продовжити абонемент
            </Button>
            <Button variant="contained" color="info" onClick={handleOpenChangeMembershipModal}>
              Замінити абонемент
            </Button>
            <Button variant="contained" sx={{ backgroundColor: '#9575cd', color: 'white' }} onClick={handleOpenEditModal}>
              Редагувати клієнта
            </Button>
            <Button variant="contained" color="error" onClick={handleDeleteClient}>
              Видалити клієнта
            </Button>
          </Box>
        </Grid>

        <Grid item xs={12} md={8}>
          <Typography variant="h5" gutterBottom align={'center'}>
            Тренування клієнта
          </Typography>
          {trainings ? (
            <TrainingList trainings={trainings} />
          ) : (
            <Typography>Немає даних про тренування.</Typography>
          )}
        </Grid>
      </Grid>

      <EditClientModal
        open={isEditModalOpen}
        onClose={handleCloseEditModal}
        client={client}
        onSave={handleSaveClient}
      />

      <ChangeMembershipModal
        open={isChangeMembershipModalOpen}
        onClose={handleCloseChangeMembershipModal}
        memberships={memberships}
        onChange={handleChangeMembership}
      />
    </Box>
  );
};

export default ClientPage;
