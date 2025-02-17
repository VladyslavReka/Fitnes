import ClientService from "../Services/ClientService.js";
import MongoClientRepository from "../Repositories/MongoClientRepository.js";
import MongoMembershipRepository from "../Repositories/MongoMembershipRepository.js";

const clientRepo = new MongoClientRepository();
const membershipRepo = new MongoMembershipRepository();
const clientService = new ClientService(clientRepo, membershipRepo);

export default class ClientController {
  async getAllClients(req, res) {
    try {
      const clients = await clientService.getAllClients();
      res.status(200).json(clients);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  // Додати нового клієнта
  async addClient(req, res) {
    try {
      const newClient = await clientService.addClient(req.body);
      res.status(201).json(newClient);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }

  // Отримати клієнта за ID
  async getClientById(req, res) {
    try {
      const client = await clientService.getClientById(req.params.id);
      res.status(200).json(client);
    } catch (error) {
      res.status(404).json({ message: error.message });
    }
  }

  // Оновити інформацію про клієнта
  async updateClient(req, res) {
    try {
      const updatedClient = await clientService.updateClient(req.params.id, req.body);
      res.status(200).json(updatedClient);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }

  // Видалити клієнта за ID
  async deleteClient(req, res) {
    try {
      await clientService.deleteClient(req.params.id);
      res.status(204).send(); // No Content, успішне видалення
    } catch (error) {
      res.status(404).json({ message: error.message });
    }
  }

  // Пошук клієнтів за параметрами
  async searchClients(req, res) {
    try {
      console.log('Received search request with query:', req.query);
      const results = await clientService.searchClients(req.query);
      console.log('Search results:', results);
      res.status(200).json(results);
    } catch (error) {
      console.error('Error in searchClients:', error);
      res.status(500).json({ message: error.message });
    }
  }

  async extendMembership(req, res) {
    try {
      const { clientId } = req.params;
      console.log('Received clientId:', clientId);
      const updatedMembership = await clientService.extendMembership(clientId);
      console.log('Updated Membership Returned:', updatedMembership);
      res.status(200).json(updatedMembership);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  async changeMembership(req, res) {
    try {
      const { clientId } = req.params;
      const { newMembershipId } = req.body;
      const updatedMembership = await clientService.changeMembership(clientId, newMembershipId);
      res.status(200).json(updatedMembership);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }
}