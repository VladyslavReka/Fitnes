import express from 'express';
import ClientController from '../Controllers/ClientController.js';
import {verifyToken} from '../Middleware/access.js';

const clientController = new ClientController();
const router = express.Router();

router.get('/clients', clientController.getAllClients);
router.post('/clients', clientController.addClient);
router.get('/clients/:id', clientController.getClientById);
router.put('/clients/:id', clientController.updateClient);
router.delete('/clients/:id', clientController.deleteClient);
router.get('/client/search', clientController.searchClients);
router.post('/clients/:clientId/extend-membership', clientController.extendMembership);
router.post('/clients/:clientId/change-membership', clientController.changeMembership);

export default router;