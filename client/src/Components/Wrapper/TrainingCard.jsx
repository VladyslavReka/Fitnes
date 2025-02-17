import React, { useState } from "react";
import { Card, CardContent, Typography, Box, IconButton } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import VisibilityIcon from "@mui/icons-material/Visibility";
import CheckIcon from "@mui/icons-material/Check";
import Modal from "../Common/Modal";
import EditTrainingForm from "../Forms/Training/EditTrainingForm";

const TrainingCard = ({ training, trainers, clients, onComplete, onShowResults, onEditSubmit, onDelete }) => {
  const { trainingType, date, time, trainer, client, isCompleted } = training;
  const [isEditModalOpen, setEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setDeleteModalOpen] = useState(false);

  const handleEditClick = () => {
    setEditModalOpen(true);
  };

  const handleEditSubmit = (updatedTraining) => {
    onEditSubmit({ ...training, ...updatedTraining }); // Передаємо ID та нові дані
    setEditModalOpen(false);
  };

  const handleDeleteClick = () => {
    setDeleteModalOpen(true);
  };

  const handleDeleteConfirm = () => {
    onDelete(training._id);
    setDeleteModalOpen(false);
  };

  return (
    <>
      <Card sx={{ backgroundColor: "#f5f5f5", color: "#333", border: "1px solid #ccc", borderRadius: 2, marginBottom: 2, maxWidth: 370, boxShadow: 3 }}>
        <CardContent>
          <Typography variant="h6" gutterBottom>
            Тип тренування: {trainingType}
          </Typography>
          <Typography>Дата: {new Date(date).toLocaleDateString()}</Typography>
          <Typography>Час: {time}</Typography>
          <Typography>Тренер: {trainer?.fullName}</Typography>
          <Typography>Клієнт: {client?.fullName}</Typography>
          <Typography>Статус: {isCompleted ? "Завершено" : "Заплановано"}</Typography>
          <Box mt={2}>
            {isCompleted ? (
              <IconButton color="primary" onClick={onShowResults}>
                <VisibilityIcon /> Показати результати
              </IconButton>
            ) : (
              <IconButton color="success" onClick={onComplete}>
                <CheckIcon /> Внести результати
              </IconButton>
            )}
          </Box>
          <Box mt={2} display="flex" justifyContent="space-between">
            <IconButton color="warning" onClick={handleEditClick}>
              <EditIcon /> Редагувати
            </IconButton>
            <IconButton color="error" onClick={handleDeleteClick}>
              <DeleteIcon /> Видалити
            </IconButton>
          </Box>
        </CardContent>
      </Card>
      <Modal
        isOpen={isEditModalOpen}
        title="Редагувати тренування"
        onClose={() => setEditModalOpen(false)}
        showActions={false}
      >
        <EditTrainingForm
          initialData={training}
          trainers={trainers}
          clients={clients}
          onSubmit={handleEditSubmit}
          isLoading={false}
        />
      </Modal>
      <Modal
        isOpen={isDeleteModalOpen}
        title="Підтвердження видалення"
        onClose={() => setDeleteModalOpen(false)}
        onConfirm={handleDeleteConfirm}
        confirmText="Видалити"
        cancelText="Скасувати"
      >
        <Typography>Ви впевнені, що хочете видалити це тренування?</Typography>
      </Modal>
    </>
  );
};

export default TrainingCard;


