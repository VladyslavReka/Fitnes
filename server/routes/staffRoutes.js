import express from 'express';
import StaffController from '../Controllers/StaffController.js';
import {verifyToken} from '../Middleware/access.js';

const router = express.Router();
const staffController = new StaffController();

// Ендпоінти для роботи зі співробітниками
router.get('/staff', staffController.getAllStaff);
router.get('/staff/:id', staffController.getStaffById);
router.put('/staff/:id', staffController.updateStaff);
router.delete('/staff/:id', staffController.deleteStaff);
router.get('/search', staffController.searchStaff);
router.get('/staff/specialization/:specialization', staffController.getStaffBySpecialization);

export default router;