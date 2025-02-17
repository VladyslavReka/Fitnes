export default class StaffService {
  constructor(staffRepo) {
    this.staffRepo = staffRepo;
  }

  // Отримати всіх співробітників
  async getAllStaff() {
    return await this.staffRepo.getAllStaff();
  }

  // Отримати співробітника за ID
  async getStaffById(staffId) {
    const staff = await this.staffRepo.getStaffById(staffId);

    if (!staff) {
      throw new Error(`Staff member with ID ${staffId} not found.`);
    }

    return staff;
  }

  // Оновити інформацію про співробітника
  async updateStaff(staffId, staffData) {
    const existingStaff = await this.staffRepo.getStaffById(staffId);

    if (!existingStaff) {
      throw new Error(`Staff member with ID ${staffId} not found.`);
    }

    return await this.staffRepo.updateStaff(staffId, staffData);
  }

  // Видалити співробітника за ID
  async deleteStaff(staffId) {
    const existingStaff = await this.staffRepo.getStaffById(staffId);

    if (!existingStaff) {
      throw new Error(`Staff member with ID ${staffId} not found.`);
    }

    return await this.staffRepo.deleteStaff(staffId);
  }

  // Пошук співробітників за параметрами
  async searchStaff(query) {
    return await this.staffRepo.searchStaff(query);
  }

  // Отримати співробітників за спеціалізацією
  async getStaffBySpecialization(specialization) {
    const staff = await this.staffRepo.getStaffBySpecialization(specialization);

    if (!staff || staff.length === 0) {
      throw new Error(`No staff members found with specialization: ${specialization}`);
    }

    return staff;
  }
}