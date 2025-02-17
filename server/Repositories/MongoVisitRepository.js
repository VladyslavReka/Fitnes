import Visit from '../Models/visit.js';
import IVisitRepo from './Interfaces/IVisitRepo.js';

export default class MongoVisitRepository extends IVisitRepo {
  // Створення нового відвідування
  async createVisit(visitData) {
    return await Visit.create(visitData);
  }

  // Отримання відвідування за його ID
  async getVisitById(id) {
    return await Visit.findById(id).populate('trainer client');
  }

  // Оновлення відвідування за ID
  async updateVisit(id, visitData) {
    return await Visit.findByIdAndUpdate(id, visitData, { new: true });
  }

  async getVisitByTrainingId(trainingId) { 
    return await Visit.find({ training: trainingId })
    .populate('trainer client'); 
  }

  // Видалення відвідування за ID
  async deleteVisit(id) {
    return await Visit.findByIdAndDelete(id);
  }

  // Отримання всіх відвідувань
  async getAllVisits() {
    return await Visit.find().populate('trainer client');
  }

}
// // Отримання відвідувань за клієнтом
// async getVisitsByClient(clientId) {
//   return await Visit.find({ client: clientId }).populate('trainer client');
// }
// // Отримання відвідувань за тренером
// async getVisitsByTrainer(trainerId) {
//   return await Visit.find({ trainer: trainerId }).populate('trainer client');
// }