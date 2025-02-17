import axios from '../axios';

class TrainingService {
    getAllTrainings() {
        return axios.get('/training/trainings');
    }

    addTraining(trainingData) {
        return axios.post('/training/trainings', trainingData);
    }

    getTrainingById(id) {
        return axios.get(`/training/trainings/${id}`);
    }

    updateTraining(trainingId, trainingData) {
        console.log("Training being edited:", trainingId);
        return axios.put(`/training/trainings/${trainingId}`, trainingData);
    }

    deleteTraining(id) {
        return axios.delete(`/training/trainings/${id}`);
    }

    completeTraining(trainingId){
        return axios.put(`/training/${trainingId}/complete`);
    }

    searchTrainings(queryParams) {
        return axios.get('/training/search', { params: queryParams });
    }

    getTrainingsByDate(date) {
        return axios.get('/training/trainings/date', { params: { date } });
    }

    getTrainingsByPeriod(startDate, endDate) {
        return axios.get('/training/trainings/period', { params: { startDate, endDate } });
    }

    getTrainingsByTrainerAndPeriod(trainerId, startDate, endDate) {
        return axios.get('/training/trainings/trainer-period', { params: { trainerId, startDate, endDate } });
    }

    getTrainingsByClientAndPeriod(clientId, startDate, endDate) {
        return axios.get('/training/trainings/client-period', { params: { clientId, startDate, endDate } });
    }

    getCompletedTrainings(startDate, endDate) {
        return axios.get('/training/trainings/completed', { params: { startDate, endDate } });
    }

    // Отримати тренування за клієнтом
getTrainingsByClient(clientId) {
    return axios.get(`/training/client/${clientId}`, { params: { clientId } });
}
  
  // Отримати тренування за тренером
  getTrainingsByTrainer(trainerId) {
    return axios.get(`/training/trainer/${trainerId}`, { params: { trainerId } });
  }
}

export default new TrainingService();