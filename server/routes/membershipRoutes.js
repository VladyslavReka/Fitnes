import express from 'express';
import MembershipController from '../Controllers/MembershipController.js';
import {verifyToken} from '../Middleware/access.js';

const router = express.Router();
const membershipController = new MembershipController();

// Ендпоінти для роботи з абонементами
router.get('/memberships', verifyToken, membershipController.getAllMemberships);
router.post('/memberships', verifyToken, membershipController.addMembership);
router.get('/memberships/:id', verifyToken, membershipController.getMembershipById);
router.put('/memberships/:id', verifyToken, membershipController.updateMembership);
router.delete('/memberships/:id', verifyToken, membershipController.deleteMembership);

// Звітність
router.get('/memberships/report/active', membershipController.countActiveMemberships);
router.get('/memberships/report/expired', membershipController.countExpiredMemberships);
router.get('/memberships/report/expiring', membershipController.getMembershipsExpiringInPeriod);

export default router;