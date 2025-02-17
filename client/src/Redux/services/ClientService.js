import axios from '../axios.js';

class ClientService {
    getAllClients() {
        return axios.get('/client/clients');
    }

    addClient(clientData) {
        return axios.post('/client/clients', clientData);
    }

    getClientById(id) {
        return axios.get(`/client/clients/${id}`);
    }

    updateClient(id, clientData) {
        return axios.put(`/client/clients/${id}`, clientData);
    }

    deleteClient(id) {
        return axios.delete(`/client/clients/${id}`);
    }

    searchClients(params) {
        console.log('Sending search request with params:', params);
        return axios.get('/client/client/search', { params });
    }

    extendMembership(clientId) {
        return axios.post(`/client/clients/${clientId}/extend-membership`);
    }

    changeMembership(clientId, newMembershipId) {
        return axios.post(`/client/clients/${clientId}/change-membership`, { newMembershipId });
    }
}

export default new ClientService();