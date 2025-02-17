export default class IClientRepo {
  createClient(client) {}
  getClientById(id) {}
  updateClient(id, client) {}
  createClientMembership(clientMembershipData) {}
  updateClientMembership(clientMembershipId, updates) {}
  getClientMembershipByClientId(clientId) {}
  deleteClient(id) {}
  getAllClients() {}
  getClientsByMembershipType(membershipTypeId) {}
  searchClients(query) {}
}