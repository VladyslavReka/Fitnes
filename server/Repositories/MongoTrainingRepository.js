import Training from '../Models/training.js';
import Client from '../Models/client.js';
import Staff from '../Models/staff.js';
import ITrainingRepo from './Interfaces/ITrainingRepo.js';

export default class MongoTrainingRepository extends ITrainingRepo {
  async createTraining(training) {
    return await Training.create(training);
  }

  async getTrainingById(id) {
    return await Training.findById(id)
    .populate('trainer client')
  }

  async updateTraining(id, training) {
    return await Training.findByIdAndUpdate(id, training, { new: true });
  }

  async deleteTraining(id) {
    return await Training.findByIdAndDelete(id);
  }



  async searchTrainings(query, page = 1, limit = 10) {
    const clients = await Client.find({ fullName: { $regex: query, $options: 'i' } });
    const trainers = await Staff.find({ fullName: { $regex: query, $options: 'i' } });

    const searchQuery = {
      $or: [
        { 'trainer': { $in: trainers.map(t => t._id) } },
        { 'client': { $in: clients.map(c => c._id) } },
        { trainingType: { $regex: query, $options: 'i' } }
      ]
    };

    console.log('Search query being used:', JSON.stringify(searchQuery, null, 2)); // Логування пошукового запиту

    try {
      const trainings = await Training.find(searchQuery)
        .populate('trainer client')
        .skip((page - 1) * limit)
        .limit(limit);
      
      console.log('Trainings found:', trainings); // Логування знайдених тренувань
      const total = await Training.countDocuments(searchQuery);
      
      return { trainings, total };
    } catch (error) {
      console.error('Error executing search query:', error);
      throw error;
    }
  }

  async getAllTrainings() {
    return await Training.find().populate('trainer client');
  }

  async getTrainingsByTrainer(trainerId) {
    return await Training.find({ trainer: trainerId }).populate('trainer client');
  }

  async getTrainingsByClient(clientId) {
    return await Training.find({ client: clientId }).populate('trainer client');
  }

  // Звітність: тренування за датою
  async getTrainingsByDate(date) {
    const startOfDay = new Date(date).setHours(0, 0, 0, 0);
    const endOfDay = new Date(date).setHours(23, 59, 59, 999);

    return await Training.find({
      date: { $gte: startOfDay, $lte: endOfDay },
    }).populate('trainer client');
  }

  // Звітність: тренування за періодом
  async getTrainingsByPeriod(startDate, endDate) {
    return await Training.find({
      date: { $gte: new Date(startDate), $lte: new Date(endDate) },
    }).populate('trainer client');
  }

  // Звітність: тренування за тренером за період
  async getTrainingsByTrainerAndPeriod(trainerId, startDate, endDate) {
    return await Training.find({
      trainer: trainerId,
      date: { $gte: new Date(startDate), $lte: new Date(endDate) },
    }).populate('trainer client');
  }

  // Звітність: тренування за клієнтом за період
  async getTrainingsByClientAndPeriod(clientId, startDate, endDate) {
    return await Training.find({
      client: clientId,
      date: { $gte: new Date(startDate), $lte: new Date(endDate) },
    }).populate('trainer client');
  }

  async getCompletedTrainingsByPeriod(startDate, endDate) {
    return await Training.find({
      date: { $gte: new Date(startDate), $lte: new Date(endDate) },
      isCompleted: true,
    }).populate('trainer client');
  }

  // Отримати тренування за клієнтом
async getTrainingsByClient(clientId) {
  return await Training.find({ client: clientId }).populate('trainer client');
}

// Отримати тренування за тренером
async getTrainingsByTrainer(trainerId) {
  return await Training.find({ trainer: trainerId }).populate('trainer client');
}
}