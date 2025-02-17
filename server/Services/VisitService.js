export default class VisitService {
  constructor(visitRepo) {
    this.visitRepo = visitRepo;
  }

  // Додавання нового відвідування
  async addVisit(visitData) {
    const {client, trainer } = visitData;

    if ( !trainer || !client ) {
      throw new Error('Missing required fields for creating a visit.');
    }

    return await this.visitRepo.createVisit(visitData);
  }

  async getVisitByTrainingId(trainingId) {
    const visit = this.visitRepo.getVisitByTrainingId(trainingId);
    if (!visit) {
      throw new Error(`Visit with ID ${visit} not found.`);
    }
    return visit;
  }

  // Отримання відвідування за ID
  async findVisitById(visitId) {
    const visit = await this.visitRepo.getVisitById(visitId);

    if (!visit) {
      throw new Error(`Visit with ID ${visitId} not found.`);
    }

    return visit;
  }

  // Оновлення існуючого відвідування
  async updateVisit(visitId, visitData) {
    const existingVisit = await this.visitRepo.getVisitById(visitId);

    if (!existingVisit) {
      throw new Error(`Visit with ID ${visitId} not found.`);
    }

    return await this.visitRepo.updateVisit(visitId, visitData);
  }

  // Видалення відвідування за ID
  async deleteVisit(visitId) {
    const existingVisit = await this.visitRepo.getVisitById(visitId);

    if (!existingVisit) {
      throw new Error(`Visit with ID ${visitId} not found.`);
    }

    return await this.visitRepo.deleteVisit(visitId);
  }

  // Отримання всіх відвідувань
  async listAllVisits() {
    return await this.visitRepo.getAllVisits();
  }
}
// // Отримання відвідувань за клієнтом
// async getVisitsByClient(clientId) {
//   if (!clientId) {
//     throw new Error('Client ID is required to fetch visits.');
//   }

//   return await this.visitRepo.getVisitsByClient(clientId);
// }

// // Отримання відвідувань за тренером
// async getVisitsByTrainer(trainerId) {
//   if (!trainerId) {
//     throw new Error('Trainer ID is required to fetch visits.');
//   }

//   return await this.visitRepo.getVisitsByTrainer(trainerId);
// }

// // Отримання відвідувань за датою
// async getVisitsByDate(date) {
//   if (!date) {
//     throw new Error('Date is required to fetch visits.');
//   }

//   return await this.visitRepo.getVisitsByDate(date);
// }

// // Отримання відвідувань за період
// async getVisitsByPeriod(startDate, endDate) {
//   if (!startDate || !endDate) {
//     throw new Error('Start date and end date are required to fetch visits.');
//   }

//   return await this.visitRepo.getVisitsByPeriod(startDate, endDate);
// }

// // Генерація звіту за відвідуваннями
// async generateVisitReport(startDate, endDate) {
//   if (!startDate || !endDate) {
//     throw new Error('Start date and end date are required to generate a report.');
//   }

//   const visits = await this.visitRepo.getVisitsByPeriod(startDate, endDate);

//   const report = {
//     totalVisits: visits.length,
//     byClient: {},
//     byTrainer: {},
//   };

//   visits.forEach((visit) => {
//     const clientId = visit.client._id.toString();
//     const trainerId = visit.trainer._id.toString();

//     // Статистика за клієнтами
//     if (!report.byClient[clientId]) {
//       report.byClient[clientId] = {
//         fullName: visit.client.fullName,
//         totalVisits: 0,
//       };
//     }
//     report.byClient[clientId].totalVisits += 1;

//     // Статистика за тренерами
//     if (!report.byTrainer[trainerId]) {
//       report.byTrainer[trainerId] = {
//         fullName: visit.trainer.fullName,
//         totalVisits: 0,
//       };
//     }
//     report.byTrainer[trainerId].totalVisits += 1;
//   });

//   return report;
// }