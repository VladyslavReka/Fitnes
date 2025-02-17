  import Membership from '../Models/membership.js';
  import ClientMembership from '../Models/clientMembership.js';
  import IMembershipRepo from './Interfaces/IMembershipRepo.js';

  export default class MongoMembershipRepository extends IMembershipRepo {
    async createMembership(membership) {
      return await Membership.create(membership);
    }
  
    async getMembershipById(id) {
      return await Membership.findById(id);
    }
  
    async updateMembership(id, membership) {
      return await Membership.findByIdAndUpdate(id, membership, { new: true });
    }
  
    async deleteMembership(id) {
      return await Membership.findByIdAndDelete(id);
    }
  
    async getAllMemberships() {
      return await Membership.find();
    }
  
    async getActiveMemberships() {
      return await ClientMembership.find({ status: 'active' });
    }
  
    // Звітність: кількість активних абонементів
    async countActiveMemberships() {
      return await ClientMembership.countDocuments({ status: 'active' });
    }
  
    // Звітність: кількість завершених абонементів
    async countExpiredMemberships() {
      return await ClientMembership.countDocuments({ status: 'expired' });
    }
  
    // Звітність: абонементи, які закінчуються в межах періоду
    async getMembershipsExpiringInPeriod(startDate, endDate) {
      return await Membership.find({
        status: 'active',
        startDate: {
          $lte: new Date(endDate),
          $gte: new Date(startDate),
        },
      });
    }
  
    // Звітність: загальна виручка за період
  //   async calculateRevenueInPeriod(startDate, endDate) {
  //     const memberships = await Membership.find({
  //       startDate: {
  //         $gte: new Date(startDate),
  //         $lte: new Date(endDate),
  //       },
  //     });
  
  //     return memberships.reduce((total, membership) => total + membership.price, 0);
  //   }
}

