export default class TrainingService {
  constructor(trainingRepo) {
    this.trainingRepo = trainingRepo;
  }

  // Отримати всі заняття
  async getAllTrainings() {
    return await this.trainingRepo.getAllTrainings();
  }

  // Додати нове заняття
  async addTraining(trainingData) {
    const { date, time, trainer, client, trainingType } = trainingData;

    if (!date || !time || !trainer || !client || !trainingType) {
      throw new Error('Missing required fields for creating a training.');
    }

    return await this.trainingRepo.createTraining(trainingData);
  }

  // Отримати заняття за ID
  async getTrainingById(trainingId) {
    const training = await this.trainingRepo.getTrainingById(trainingId);

    if (!training) {
      throw new Error(`Training with ID ${trainingId} not found.`);
    }

    return training;
  }

  // Оновити інформацію про заняття
  async updateTraining(trainingId, trainingData) {
    const existingTraining = await this.trainingRepo.getTrainingById(trainingId);

    if (!existingTraining) {
      throw new Error(`Training with ID ${trainingId} not found.`);
    }

    return await this.trainingRepo.updateTraining(trainingId, trainingData);
  }

  // Видалити заняття за ID
  async deleteTraining(trainingId) {
    const existingTraining = await this.trainingRepo.getTrainingById(trainingId);

    if (!existingTraining) {
      throw new Error(`Training with ID ${trainingId} not found.`);
    }

    return await this.trainingRepo.deleteTraining(trainingId);
  }

  async completeTraining(trainingId){
    const training = await this.trainingRepo.getTrainingById(trainingId);
    if (!training) {
      throw new Error(`Training with ID ${trainingId} not found.`);
    }
    training.isCompleted = true;
    return await this.trainingRepo.updateTraining(trainingId, training);
  }

  // Пошук занять за параметрами
  async searchTrainings(query, page, limit) {
    return await this.trainingRepo.searchTrainings(query, page, limit);
  }

  async getCompletedTrainingsByPeriod(startDate, endDate) {
    if (!startDate || !endDate) {
      throw new Error('Both startDate and endDate are required.');
  }
    return await this.trainingRepo.getCompletedTrainingsByPeriod(startDate, endDate);
  }

  async getTrainingsByDate(date) {
    return await this.trainingRepo.getTrainingsByDate(date);
  }
  
  async getTrainingsByPeriod(startDate, endDate) {
    if (!startDate || !endDate) {
      throw new Error('Both startDate and endDate are required.');
  }
    return await this.trainingRepo.getTrainingsByPeriod(startDate, endDate);
  }
  
  async getTrainingsByTrainerAndPeriod(trainerId, startDate, endDate) {
    return await this.trainingRepo.getTrainingsByTrainerAndPeriod(trainerId, startDate, endDate);
  }
  
  async getTrainingsByClientAndPeriod(clientId, startDate, endDate) {
    return await this.trainingRepo.getTrainingsByClientAndPeriod(clientId, startDate, endDate);
  }

  // Отримати тренування за клієнтом
async getTrainingsByClient(clientId) {
  if (!clientId) {
    throw new Error('Client ID is required.');
  }
  return await this.trainingRepo.getTrainingsByClient(clientId);
}

// Отримати тренування за тренером
async getTrainingsByTrainer(trainerId) {
  if (!trainerId) {
    throw new Error('Trainer ID is required.');
  }
  return await this.trainingRepo.getTrainingsByTrainer(trainerId);
}
}