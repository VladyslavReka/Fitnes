import axios from '../axios';

class MembershipService {
    getAllMemberships() {
        return axios.get('/membership/memberships');
    }

    addMembership(membershipData) {
        return axios.post('/membership/memberships', membershipData);
    }

    getMembershipById(id) {
        return axios.get(`/membership/memberships/${id}`);
    }

    updateMembership(id, membershipData) {
        return axios.put(`/membership/memberships/${id}`, membershipData);
    }

    deleteMembership(id) {
        return axios.delete(`/membership/memberships/${id}`);
    }
}

export default new MembershipService();