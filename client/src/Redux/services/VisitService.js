import axios from '../axios';

class VisitService {
    addVisit(visitData) {
        return axios.post('/visit/visits', visitData);
    }

    findVisitById(id) {
        return axios.get(`/visit/visits/${id}`);
    }

    updateVisit(id, visitData) {
        return axios.put(`/visit/visits/${id}`, visitData);
    }

    deleteVisit(id) {
        return axios.delete(`/visit/delete`, { data: { id } });
    }

    listAllVisits() {
        return axios.get('/visit/visits');
    }
    
    getVisitByTrainingId(trainingId) {
        return axios.get(`/visit/${trainingId}`);
    }
}

export default new VisitService();
// getVisitsByClient(clientId) {
//     return axios.get(`/visits/client/${clientId}`);
// }


// getVisitsByDate(date) {
//     return axios.get('/visits/by-date', { params: { date } });
// }

// getVisitsByPeriod(startDate, endDate) {
//     return axios.get('/visits/by-period', { params: { startDate, endDate } });
// }

// generateVisitReport(startDate, endDate) {
//     return axios.get('/visits/report', { params: { startDate, endDate } });
// }