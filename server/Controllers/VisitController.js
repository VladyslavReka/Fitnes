import VisitService from '../Services/VisitService.js';
import MongoVisitRepository from '../Repositories/MongoVisitRepository.js';

const visitRepository = new MongoVisitRepository();
const visitService = new VisitService(visitRepository);

export default class VisitController {
  async addVisit(req, res) {
    try {
      const visitData = req.body;
      const newVisit = await visitService.addVisit(visitData);
      res.status(201).json(newVisit);
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  }

  async findVisitById(req, res) {
    try {
      const visit = await visitService.findVisitById(req.params.id);
      res.json(visit);
    } catch (err) {
      res.status(404).json({ error: err.message });
    }
  }

  async updateVisit(req, res) {
    try {
      const updatedVisit = await visitService.updateVisit(req.params.id, req.body);
      res.json(updatedVisit);
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  }


async getVisitByTrainingId(req, res) {
  try {
    const visit = await visitService.getVisitByTrainingId(req.params.trainingId);
    res.json(visit);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
}

  // Видалення відвідування за ID
  async deleteVisit(req, res) {
    try {
      const { id } = req.body;
      await visitService.deleteVisit(id);
      res.json({ message: 'Visit deleted' });
    } catch (err) {
      res.status(404).json({ error: err.message });
    }
  }

  // Отримання всіх відвідувань
  async listAllVisits(req, res) {
    try {
      const visits = await visitService.listAllVisits();
      res.json(visits);
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  }
}
// // Отримання відвідувань за клієнтом
// async getVisitsByClient(req, res) {
//   try {
//     const visits = await visitService.getVisitsByClient(req.params.clientId);
//     res.json(visits);
//   } catch (err) {
//     res.status(400).json({ error: err.message });
//   }
// }

// // Отримання відвідувань за тренером
// async getVisitsByTrainer(req, res) {
//   try {
//     const visits = await visitService.getVisitsByTrainer(req.params.trainerId);
//     res.json(visits);
//   } catch (err) {
//     res.status(400).json({ error: err.message });
//   }
// }

// // Отримання відвідувань за датою
// async getVisitsByDate(req, res) {
//   try {
//     const visits = await visitService.getVisitsByDate(req.query.date);
//     res.json(visits);
//   } catch (err) {
//     res.status(400).json({ error: err.message });
//   }
// }

// // Отримання відвідувань за період
// async getVisitsByPeriod(req, res) {
//   try {
//     const visits = await visitService.getVisitsByPeriod(req.query.startDate, req.query.endDate);
//     res.json(visits);
//   } catch (err) {
//     res.status(400).json({ error: err.message });
//   }
// }

// // Генерація звіту за відвідуваннями
// async generateVisitReport(req, res) {
//   try {
//     const report = await visitService.generateVisitReport(req.query.startDate, req.query.endDate);
//     res.json(report);
//   } catch (err) {
//     res.status(400).json({ error: err.message });
//   }
// }