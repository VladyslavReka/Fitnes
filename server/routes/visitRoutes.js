import express from 'express';
import VisitController from '../Controllers/VisitController.js';
import {verifyToken} from '../Middleware/access.js';

const router = express.Router();
const visitController = new VisitController();

// Ендпоінти для роботи з відвідуваннями
router.post('/visits', verifyToken, visitController.addVisit);
router.get('/visits/:id', verifyToken, visitController.findVisitById);
router.put('/visits/:id', verifyToken, visitController.updateVisit);
router.delete('/delete', verifyToken, visitController.deleteVisit);
router.get('/visits', verifyToken, visitController.listAllVisits);
router.get('/:trainingId', verifyToken, visitController.getVisitByTrainingId);

export default router;
// router.get('/visits/client/:clientId', visitController.getVisitsByClient);
// router.get('/visits/by-date', visitController.getVisitsByDate);
// router.get('/visits/by-period', visitController.getVisitsByPeriod);
// router.get('/visits/report', visitController.generateVisitReport);