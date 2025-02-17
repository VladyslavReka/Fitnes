import React, { useEffect, useState } from "react";
import { Box, Typography, Button, Grid } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import TrainingList from "../../Components/Wrapper/TrainingList";
import EditStaffModal from "../../Components/Forms/UpdateStaff/EditStaffModal";
import { getTrainingsByTrainer } from "../../Redux/thunks/TrainingThunks";
import { getStaffById, updateStaff, deleteStaff } from "../../Redux/thunks/StaffThunks";

const TrainerPage = () => {
  const { trainerId } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isEditModalOpen, setEditModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const trainer = useSelector((state) =>
    state.staff.staffList.find((staff) => staff._id === trainerId)
  );
  const trainings = useSelector((state) => state.trainings.trainingList || []);
  const currentUser = useSelector((state) => state.auth.user);

  useEffect(() => {
    if (trainerId) {
      dispatch(getStaffById(trainerId)); // Завантаження даних про тренера
      dispatch(getTrainingsByTrainer(trainerId)); // Завантаження тренувань тренера
    }
  }, [dispatch, trainerId]);

  const handleEditTrainer = async (updatedData) => {
    setIsLoading(true);
    try {
      await dispatch(updateStaff({ id: trainerId, staffData: updatedData })).unwrap();
      setEditModalOpen(false);
    } catch (error) {
      console.error("Помилка оновлення тренера:", error);
    } finally {
      setIsLoading(false);
      setEditModalOpen(false);
    }
  };

  const handleDeleteTrainer = async () => {
    setIsLoading(true);
    try {
      await dispatch(deleteStaff(trainerId)).unwrap();
      navigate('/staff'); // Повертаємося до списку тренерів після видалення
    } catch (error) {
      console.error("Помилка видалення тренера:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Box sx={{ padding: 4 }}>
      <Grid container spacing={4}>
        {/* Left: Trainer info */}
        <Grid item xs={12} md={4}>
          {trainer ? (
            <Box mb={4}>
              <Typography variant="h4" gutterBottom>
                Тренер: {trainer.fullName}
              </Typography>
              <Typography variant="body1">Спеціалізація: {trainer.specialization}</Typography>
              <Typography variant="body1">Контакт: {trainer.contactInfo}</Typography>
              <Typography variant="body1">Email: {trainer.email}</Typography>

              <Button
                variant="contained"
                sx={{ backgroundColor: '#9575cd', color: 'white', mt: 2 }} 
                onClick={() => setEditModalOpen(true)}
              >
                Редагувати інформацію
              </Button>
              {currentUser?.role === 'manager' && (
              <Button
                variant="contained"
                color="error"
                onClick={handleDeleteTrainer}
                sx={{ mt: 2, ml: 2 }}
                disabled={isLoading}
              >
                Видалити тренера
              </Button>
              )}
            </Box>
          ) : (
            <Typography variant="body1">Інформація про тренера не знайдена.</Typography>
          )}
        </Grid>

        {/* Right: Trainings */}
        <Grid item xs={12} md={8}>
          <Typography variant="h5" gutterBottom align="center">
            Тренування тренера
          </Typography>
          {trainings ? (
            <TrainingList trainings={trainings} />
          ) : (
            <Typography>Немає даних про тренування.</Typography>
          )}
        </Grid>
      </Grid>

      {/* Модальне вікно для редагування інформації про тренера */}
      {trainer && (
        <EditStaffModal
          isOpen={isEditModalOpen}
          onClose={() => setEditModalOpen(false)}
          staffData={trainer}
          onSave={handleEditTrainer}
          isLoading={isLoading}
        />
      )}
    </Box>
  );
};

export default TrainerPage;


