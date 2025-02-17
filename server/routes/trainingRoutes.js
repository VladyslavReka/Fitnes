import express from 'express';
import TrainingController from '../Controllers/TrainingController.js';
import {verifyToken} from '../Middleware/access.js';

const router = express.Router();
const trainingController = new TrainingController();

// Ендпоінти для роботи з заняттями
router.get('/trainings', verifyToken, trainingController.getAllTrainings);
router.post('/trainings', verifyToken, trainingController.addTraining);
router.get('/trainings/:id', verifyToken, trainingController.getTrainingById);
router.put('/trainings/:id', verifyToken, trainingController.updateTraining);
router.put('/:trainingId/complete', verifyToken, trainingController.completeTraining);
router.delete('/trainings/:id', verifyToken, trainingController.deleteTraining);
router.get('/search', verifyToken, trainingController.searchTrainings);
router.get('/trainings/completed', verifyToken, trainingController.getCompletedTrainings);
router.get('/trainings/date', verifyToken, trainingController.getTrainingsByDate);
router.get('/trainings/period', verifyToken, trainingController.getTrainingsByPeriod);
router.get('/trainings/trainer-period', verifyToken, trainingController.getTrainingsByTrainerAndPeriod);
router.get('/trainings/client-period', verifyToken, trainingController.getTrainingsByClientAndPeriod);
router.get('/client/:id', verifyToken, trainingController.getTrainingsByClient);
router.get('/trainer/:id', verifyToken, trainingController.getTrainingsByTrainer);

export default router;