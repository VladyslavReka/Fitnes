import TrainingService from '../Services/TrainingService.js';
import MongoTrainingRepository from '../Repositories/MongoTrainingRepository.js';

const trainingRepository = new MongoTrainingRepository();
const trainingService = new TrainingService(trainingRepository);

export default class TrainingController {
  async getAllTrainings(req, res) {
    try {
      const trainings = await trainingService.getAllTrainings();
      res.json(trainings);
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  }

  // Додати нове заняття
  async addTraining(req, res) {
    try {
      const newTraining = await trainingService.addTraining(req.body);
      res.status(201).json(newTraining);
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  }

  // Отримати заняття за ID
  async getTrainingById(req, res) {
    try {
      const training = await trainingService.getTrainingById(req.params.id);
      res.json(training);
    } catch (err) {
      res.status(404).json({ error: err.message });
    }
  }

  // Оновити інформацію про заняття
  async updateTraining(req, res) {
    try {
      const updatedTraining = await trainingService.updateTraining(req.params.id, req.body);
      res.json(updatedTraining);
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  }

  // Видалити заняття за ID
  async deleteTraining(req, res) {
    try {
      await trainingService.deleteTraining(req.params.id);
      res.json({ message: 'Training deleted' });
    } catch (err) {
      res.status(404).json({ error: err.message });
    }
  }

  // Пошук занять за параметрами
  async searchTrainings(req, res) {
    try {
      const trainings = await trainingService.searchTrainings(req.query);
      res.json(trainings);
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  }

  async completeTraining (req, res) {
    try {
      const completedTraining = await trainingService.completeTraining(req.params.trainingId);
      res.json(completedTraining);
    } catch (error) {
      res.status(400).json({ error: err.message });
    }
  }

  async getCompletedTrainings(req, res) {
    try {
      const { startDate, endDate } = req.query;
      const trainings = await trainingService.getCompletedTrainingsByPeriod(startDate, endDate);
      res.json(trainings);
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  }
  
// trainingController.js

async searchTrainings (req, res) {
  const { query, page, limit } = req.query;
  try {
    const { trainings, total } = await trainingService.searchTrainings(query, parseInt(page), parseInt(limit));
    res.json({ trainings, total });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

  async getTrainingsByDate(req, res) {
    try {
      const { date } = req.query;
      const trainings = await trainingService.getTrainingsByDate(date);
      res.json(trainings);
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  }
  
  async getTrainingsByPeriod(req, res) {
    try {
      const { startDate, endDate } = req.query;
      const trainings = await trainingService.getTrainingsByPeriod(startDate, endDate);
      res.json(trainings);
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  }
  
  async getTrainingsByTrainerAndPeriod(req, res) {
    try {
      const { trainerId, startDate, endDate } = req.query;
      const trainings = await trainingService.getTrainingsByTrainerAndPeriod(trainerId, startDate, endDate);
      res.json(trainings);
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  }
  
  async getTrainingsByClientAndPeriod(req, res) {
    try {
      const { clientId, startDate, endDate } = req.query;
      const trainings = await trainingService.getTrainingsByClientAndPeriod(clientId, startDate, endDate);
      res.json(trainings);
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  }

  // Отримати тренування за клієнтом
async getTrainingsByClient(req, res) {
  try {
    const { clientId } = req.query; // clientId передається через query параметри
    const trainings = await trainingService.getTrainingsByClient(clientId);
    res.json(trainings);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
}

// Отримати тренування за тренером
async getTrainingsByTrainer(req, res) {
  try {
    const { trainerId } = req.query; // trainerId передається через query параметри
    const trainings = await trainingService.getTrainingsByTrainer(trainerId);
    res.json(trainings);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
}
}