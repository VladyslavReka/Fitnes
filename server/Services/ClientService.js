export default class ClientService {
  constructor(clientRepo, membershipRepo) {
    this.clientRepo = clientRepo;
    this.membershipRepo = membershipRepo;
  }

  // Отримати всіх клієнтів
  async getAllClients() {
    try {
      return await this.clientRepo.getAllClients();
    } catch (error) {
      console.error('Error in clientService.getAllClients:', error);
      throw error;
    }
  }

  // Додати нового клієнта
  async addClient(clientData) {
    const { fullName, dateOfBirth, address, contactInfo, membershipType } = clientData;
    if (!fullName || !dateOfBirth || !address || !contactInfo || !membershipType) {
      throw new Error('Missing required fields for creating a client.');
    }
    const membership = await this.membershipRepo.getMembershipById(membershipType);
    if (!membership) {
      throw new Error(`Membership with ID ${membershipType} not found.`);
    }
    const client = await this.clientRepo.createClient({
      fullName,
      dateOfBirth,
      address,
      contactInfo,
      membershipType,
    });
    const startDate = new Date();
    const endDate = new Date(startDate);
    endDate.setMonth(endDate.getMonth() + membership.duration);

    await this.clientRepo.createClientMembership({
      clientId: client._id,
      membershipId: membership._id,
      startDate,
      endDate,
      status: 'active',
    });
    return client;
  }

  async getClientById(clientId) {
    const client = await this.clientRepo.getClientById(clientId);
    const membership = await this.clientRepo.getClientMembershipByClientId(clientId);

    if (!client) {
      throw new Error(`Client with ID ${clientId} not found.`);
    }

    return {
      ...client.toObject(),
      membershipStatus: membership?.status || 'unknown',
      membershipEndDate: membership?.endDate || null,
    };
  }

  async updateClient(clientId, clientData) {
    const existingClient = await this.clientRepo.getClientById(clientId);

    if (!existingClient) {
      throw new Error(`Client with ID ${clientId} not found.`);
    }

    return await this.clientRepo.updateClient(clientId, clientData);
  }

  async deleteClient(clientId) {
    const existingClient = await this.clientRepo.getClientById(clientId);

    if (!existingClient) {
      throw new Error(`Client with ID ${clientId} not found.`);
    }

    return await this.clientRepo.deleteClient(clientId);
  }

  // Пошук клієнтів за параметрами
  async searchClients(query) {
    return await this.clientRepo.searchClients(query);
  }

  // Продовжити абонемент
    async extendMembership(clientId) {
      try {
        const clientMembership = await this.clientRepo.getClientMembershipByClientId(clientId);
  
        if (!clientMembership) {
          throw new Error(`No membership found for client ID ${clientId}.`);
        }
  
        if (clientMembership.status !== 'expired') {
          throw new Error('Only expired memberships can be extended.');
        }
  
        const startDate = new Date();
        const endDate = new Date(startDate);
        endDate.setMonth(endDate.getMonth() + clientMembership.membershipId.duration);
  
        const updatedMembership = await this.clientRepo.updateClientMembership(clientMembership._id, {
          startDate,
          endDate,
          status: 'active',
        });
        return updatedMembership;
      } catch (error) {
        throw new Error(`Failed to extend membership: ${error.message}`);
      }
    }

  // Змінити тип абонемента
    async changeMembership(clientId, newMembershipId) {
      try {
        const clientMembership = await this.clientRepo.getClientMembershipByClientId(clientId);
  
        if (!clientMembership) {
          throw new Error(`No membership found for client ID ${clientId}.`);
        }
        const newMembership = await this.membershipRepo.getMembershipById(newMembershipId);
        if (!newMembership) {
          throw new Error(`Membership with ID ${newMembershipId} not found.`);
        }
        const startDate = new Date();
        const endDate = new Date(startDate);
        endDate.setMonth(endDate.getMonth() + newMembership.duration);

        const updatedMembership = await this.clientRepo.updateClientMembership(clientMembership._id, {
          membershipId: newMembership._id,
          startDate,
          endDate,
          status: 'active',
        });
        const updatedClient = await this.clientRepo.updateClient(clientId, {
          membershipType: newMembership._id,
        });
  
        return updatedMembership;
      } catch (error) {
        throw new Error(`Failed to change membership: ${error.message}`);
      }
    }
  }
  


