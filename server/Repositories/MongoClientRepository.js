import Client from '../Models/client.js';
import ClientMembership from '../Models/clientMembership.js';
import IClientRepo from './Interfaces/IClientRepo.js';

export default class MongoClientRepository extends IClientRepo {
  async createClient(client) {
    return await Client.create(client);
  }

  async getClientById(id) {
    return await Client.findById(id).populate('membershipType visits');
  }

  async updateClient(id, client) {
    return await Client.findByIdAndUpdate(id, client, { new: true });
  }

  async createClientMembership(clientMembershipData) {
    return await ClientMembership.create(clientMembershipData);
  }

  async updateClientMembership(clientMembershipId, updates) {
    return await ClientMembership.findByIdAndUpdate(clientMembershipId, updates, { new: true });
  }

  async getClientMembershipByClientId(clientId) {
    return await ClientMembership.findOne({ clientId }).populate('membershipId');
  }

  async deleteClient(id) {
    return await Client.findByIdAndDelete(id);
  }
  
  async getAllClients() {
    return await Client.find().populate('membershipType visits');
  }

  async getClientsByMembershipType(membershipTypeId) {
    return await Client.find({ membershipType: membershipTypeId }).populate('membershipType visits');
  }

  async searchClients(query) {
    try {
      const searchCriteria = {};
  
      if (query.name) {
        searchCriteria.fullName = { $regex: query.name, $options: 'i' };
      }
  
      if (query.dateOfBirth) {
        searchCriteria.dateOfBirth = query.dateOfBirth;
      }
  
      if (query.membershipType) {
        searchCriteria.membershipType = query.membershipType;
      }
  
      if (query.contactInfo) {
        searchCriteria.contactInfo = { $regex: query.contactInfo, $options: 'i' };
      }

      const results = await Client.find(searchCriteria).populate('membershipType visits');
      return results;
    } catch (error) {
      throw error;
    }
  }
}