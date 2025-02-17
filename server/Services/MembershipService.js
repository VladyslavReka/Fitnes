export default class MembershipService {
  constructor(membershipRepo) {
    this.membershipRepo = membershipRepo;
  }

  // Отримати всі абонементи
  async getAllMemberships() {
    return await this.membershipRepo.getAllMemberships();
  }

  // Додати новий абонемент
  async addMembership(membershipData) {
    const { type, duration, price } = membershipData;
    if (!type || !duration || !price) {
      throw new Error('Missing required fields for creating a membership.');
    }
    return await this.membershipRepo.createMembership(membershipData);
  }

  // Отримати абонемент за ID
  async getMembershipById(membershipId) {
    const membership = await this.membershipRepo.getMembershipById(membershipId);
    if (!membership) {
      throw new Error(`Membership with ID ${membershipId} not found.`);
    }
    return membership;
  }

  // Оновити інформацію про абонемент
  async updateMembership(membershipId, membershipData) {
    const existingMembership = await this.membershipRepo.getMembershipById(membershipId);

    if (!existingMembership) {
      throw new Error(`Membership with ID ${membershipId} not found.`);
    }
    return await this.membershipRepo.updateMembership(membershipId, membershipData);
  }

  // Видалити абонемент за ID
  async deleteMembership(membershipId) {
    const existingMembership = await this.membershipRepo.getMembershipById(membershipId);
    if (!existingMembership) {
      throw new Error(`Membership with ID ${membershipId} not found.`);
    }
    return await this.membershipRepo.deleteMembership(membershipId);
  }

  // Звітність: отримати кількість активних абонементів
  async countActiveMemberships() {
    return await this.membershipRepo.countActiveMemberships();
  }

  // Звітність: отримати кількість завершених абонементів
  async countExpiredMemberships() {
    return await this.membershipRepo.countExpiredMemberships();
  }

  // Звітність: отримати кількість продовжених абонементів
  async countExtendedMemberships() {
    return await this.membershipRepo.countExtendedMemberships();
  }

  // Звітність: отримати абонементи, які закінчуються в межах періоду
  async getMembershipsExpiringInPeriod(startDate, endDate) {
    if (!startDate || !endDate) {
      throw new Error('Start date and end date are required for this report.');
    }
    return await this.membershipRepo.getMembershipsExpiringInPeriod(startDate, endDate);
  }

  // Звітність: обчислити виручку за період
  async calculateRevenueInPeriod(startDate, endDate) {
    if (!startDate || !endDate) {
      throw new Error('Start date and end date are required for revenue calculation.');
    }
    return await this.membershipRepo.calculateRevenueInPeriod(startDate, endDate);
  }
}