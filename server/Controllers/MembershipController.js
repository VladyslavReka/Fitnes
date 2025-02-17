import MembershipService from '../Services/MembershipService.js';
import MongoMembershipRepository from '../Repositories/MongoMembershipRepository.js';

const membershipRepository = new MongoMembershipRepository();
const membershipService = new MembershipService(membershipRepository);

export default class MembershipController {
  async getAllMemberships(req, res) {
    try {
      const memberships = await membershipService.getAllMemberships();
      res.json(memberships);
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  }

  // Додати новий абонемент
  async addMembership(req, res) {
    try {
      const newMembership = await membershipService.addMembership(req.body);
      res.status(201).json(newMembership);
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  }

  // Отримати абонемент за ID
  async getMembershipById(req, res) {
    try {
      const membership = await membershipService.getMembershipById(req.params.id);
      res.json(membership);
    } catch (err) {
      res.status(404).json({ error: err.message });
    }
  }

  // Оновити інформацію про абонемент
  async updateMembership(req, res) {
    try {
      const updatedMembership = await membershipService.updateMembership(req.params.id, req.body);
      res.json(updatedMembership);
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  }

  // Видалити абонемент за ID
  async deleteMembership(req, res) {
    try {
      await membershipService.deleteMembership(req.params.id);
      res.json({ message: 'Membership deleted' });
    } catch (err) {
      res.status(404).json({ error: err.message });
    }
  }

  // Звітність: отримати кількість активних абонементів
  async countActiveMemberships(req, res) {
    try {
      const count = await membershipService.countActiveMemberships();
      res.json({ activeMemberships: count });
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  }

  // Звітність: отримати кількість завершених абонементів
  async countExpiredMemberships(req, res) {
    try {
      const count = await membershipService.countExpiredMemberships();
      res.json({ expiredMemberships: count });
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  }

  // Звітність: отримати кількість продовжених абонементів
  async countExtendedMemberships(req, res) {
    try {
      const count = await membershipService.countExtendedMemberships();
      res.json({ extendedMemberships: count });
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  }

  // Звітність: отримати абонементи, які закінчуються в межах періоду
  async getMembershipsExpiringInPeriod(req, res) {
    try {
      const { startDate, endDate } = req.query;
      const memberships = await membershipService.getMembershipsExpiringInPeriod(startDate, endDate);
      res.json(memberships);
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  }

  // Звітність: обчислити виручку за період
  async calculateRevenueInPeriod(req, res) {
    try {
      const { startDate, endDate } = req.query;
      const revenue = await membershipService.calculateRevenueInPeriod(startDate, endDate);
      res.json({ revenue });
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  }
}