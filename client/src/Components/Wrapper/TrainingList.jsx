import React, { useState } from "react";
import { Button, Box, Typography, Grid, Stack } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import TrainingCard from "./TrainingCard";
import Modal from "../Common/Modal";
import FormInput from "../Common/FormInput";
import { addVisit } from "../../Redux/thunks/VisitThunks";
import { completeTraining } from "../../Redux/thunks/TrainingThunks";
import { deleteTraining } from "../../Redux/thunks/TrainingThunks";
import { getVisitByTrainingId } from "../../Redux/thunks/VisitThunks";
import { updateTraining } from "../../Redux/thunks/TrainingThunks";
import { deleteVisit } from "../../Redux/thunks/VisitThunks";

const TrainingList = ({ trainings }) => {
  const [filter, setFilter] = useState("planned");
  const [isModalOpen, setModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState(null);
  const [selectedTraining, setSelectedTraining] = useState(null);
  const [formData, setFormData] = useState({
    performance: "",
    feedback: "",
    issues: "",
  });
  const dispatch = useDispatch();
  const trainers = useSelector((state) => state.staff.staffList || []);
  const clients = useSelector((state) => state.clients.clients || []);

  const handleInputChange = (name, value) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleEditSubmit = (selectedTraining) => {
    console.log("Training object in handleEditSubmit:", selectedTraining); // Має показувати об'єкт тренування
    if (!selectedTraining._id) {
      console.error("Training ID is missing!");
      return;
    }

    const updatedData = {
      ...selectedTraining,
      ...formData,
    };

    console.log("Updated data перед dispatch:", updatedData); // Логування перед dispatch

    const payload = { id: updatedData._id, trainingData: updatedData };
    console.log("Payload для dispatch:", payload); // Логування payload перед dispatch

    dispatch(updateTraining(payload));
  };

  const handleComplete = (training) => {
    setSelectedTraining(training);
    setModalContent("complete");
    setModalOpen(true);
  };

  const handleShowResults = async (training) => {
    try {
      const response = await dispatch(getVisitByTrainingId(training._id)).unwrap();
      if (Array.isArray(response)) {
        const visitsData = response.map(visit => visit.result);
        setSelectedTraining({ ...training, visitsData });
        setModalContent("results");
        setModalOpen(true);
      } else {
        console.error("Очікувався масив, але отримано:", response);
      }
    } catch (error) {
      console.error("Помилка при отриманні візиту:", error);
    }
  };

  const handleDelete = async (trainingId) => {
    try {
      await dispatch(deleteTraining(trainingId)).unwrap();
      const visits = await dispatch(getVisitByTrainingId(trainingId)).unwrap();
      console.log(visits); // Перевірте тут, чи це масив візитів

      if (Array.isArray(visits) && visits.length > 0) {
        const visitId = visits[0]._id; // Отримання ID першого візиту
        console.log("Visit ID для видалення:", visitId);
        await dispatch(deleteVisit(visitId)).unwrap();
      } else {
        console.error("Visits not found or is empty!");
      }
    } catch (error) {
      console.error("Error during delete operation:", error);
    }
    return trainingId;
  };

  const closeModal = () => {
    setModalOpen(false);
    setModalContent(null);
    setSelectedTraining(null);
    setFormData({
      performance: "",
      feedback: "",
      issues: "",
    });
  };

  const submitForm = async () => {
    if (selectedTraining) {
      const visitData = {
        training: selectedTraining._id,
        client: selectedTraining.client._id,
        trainer: selectedTraining.trainer._id,
        result:{
          performance: formData.performance,
          feedback: formData.feedback,
          issues: formData.issues,
        }
      };

      try {
        const response = await dispatch(addVisit(visitData)).unwrap();
        console.log("Відповідь сервера:", response);
        await dispatch(completeTraining(visitData.training)).unwrap();
        closeModal();
      } catch (error) {
        console.error("Помилка при додаванні візиту:", error);
      }
    }
  };

  const filteredTrainings = trainings.filter((training) =>
    filter === "planned" ? !training.isCompleted : training.isCompleted
  );

  return (
    <div>
      <Box display="flex" justifyContent="center" mb={2}>
        <Button
          variant={filter === "planned" ? "contained" : "outlined"}
          color="primary"
          onClick={() => setFilter("planned")}
        >
          Заплановані тренування
        </Button>
        <Button
          variant={filter === "completed" ? "contained" : "outlined"}
          color="primary"
          onClick={() => setFilter("completed")}
        >
          Завершені тренування
        </Button>
      </Box>

      {filteredTrainings.length > 0 ? (
        <Grid container spacing={2}>
          {filteredTrainings.map((training, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <TrainingCard
                training={training}
                onComplete={() => handleComplete(training)}
                onShowResults={() => handleShowResults(training)}
                onDelete={handleDelete}
                onEditSubmit={(updatedTraining) => {
                  console.log("Тренування передано до handleEditSubmit:", updatedTraining); // Логування об'єкта тренування
                  handleEditSubmit(updatedTraining);
                }}
                trainers={trainers}
                clients={clients}
              />
            </Grid>
          ))}
        </Grid>
      ) : (
        <Typography variant="h6" color="textSecondary" align="center">
          Немає {filter === "planned" ? "запланованих" : "завершених"} тренувань
        </Typography>
      )}

      <Modal
        isOpen={isModalOpen}
        title={
          modalContent === "complete"
            ? "Внести результати візиту"
            : "Результати візиту"
        }
        onClose={closeModal}
        onConfirm={modalContent === "complete" ? submitForm : null}
        confirmText={modalContent === "complete" ? "Зберегти" : ""}
        showActions={modalContent === "complete"}
      >
        {modalContent === "complete" && (
          <form>
            <FormInput
              label="Виконання"
              name="performance"
              placeholder="Наприклад, виконав вправи без помилок"
              value={formData.performance}
              onChange={(e) => handleInputChange("performance", e.target.value)}
            />
            <FormInput
              label="Зворотній зв'язок"
              name="feedback"
              placeholder="Наприклад, потрібно покращити витривалість"
              value={formData.feedback}
              onChange={(e) => handleInputChange("feedback", e.target.value)}
            />
            <FormInput
              label="Проблеми"
              name="issues"
              placeholder="Наприклад, скарги на біль у плечі"
              value={formData.issues}
              onChange={(e) => handleInputChange("issues", e.target.value)}
            />
          </form>
        )}
        {modalContent === "results" && selectedTraining && (
          <Stack spacing={2}>
            <Typography variant="h6">Тип тренування:</Typography>
            <Typography variant="body1">{selectedTraining.trainingType}</Typography>
    
            <Typography variant="h6">Дата:</Typography>
            <Typography variant="body1">{new Date(selectedTraining.date).toLocaleDateString()}</Typography>
    
            <Typography variant="h6">Результати:</Typography>
            <Typography variant="body1">
              {selectedTraining.visitsData?.length > 0 ? selectedTraining.visitsData[0]?.performance || "Немає даних" : "Немає даних"}
            </Typography>
    
            <Typography variant="h6">Зворотній зв'язок:</Typography>
            <Typography variant="body1">
              {selectedTraining.visitsData?.length > 0 ? selectedTraining.visitsData[0]?.feedback || "Немає даних" : "Немає даних"}
            </Typography>
    
            <Typography variant="h6">Проблеми:</Typography>
            <Typography variant="body1">
              {selectedTraining.visitsData?.length > 0 ? selectedTraining.visitsData[0]?.issues || "Немає даних" : "Немає даних"}
            </Typography>
          </Stack>
        )}
      </Modal>
    </div>
  );
};

export default TrainingList;
