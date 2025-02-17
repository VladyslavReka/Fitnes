import axios from '../axios';

class StaffService {
    getAllStaff() {
        return axios.get('/staff/staff');
    }

    getStaffById(id) {
        return axios.get(`/staff/staff/${id}`);
    }

    updateStaff(id, staffData) {
        return axios.put(`/staff/staff/${id}`, staffData);
    }

    deleteStaff(id) {
        return axios.delete(`/staff/staff/${id}`);
    }

    searchStaff(queryParams) {
        return axios.get('/staff/search', { params: queryParams });
    }

    getStaffBySpecialization(specialization) {
        return axios.get(`/staff/specialization/${specialization}`);
    }
}

export default new StaffService();