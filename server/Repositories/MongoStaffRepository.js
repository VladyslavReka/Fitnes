import Staff from '../Models/staff.js';
import IStaffRepo from './Interfaces/IStaffRepo.js';

export default class MongoStaffRepository extends IStaffRepo {
  // Створення нового співробітника (менеджера або тренера)
  async createStaff(staffData) {
    return await Staff.create(staffData);
  }

  // Отримання співробітника за ID
  async getStaffById(id) {
    return await Staff.findById(id);
  }

  // Оновлення даних співробітника
  async updateStaff(id, staffData) {
    return await Staff.findByIdAndUpdate(id, staffData, { new: true });
  }

  // Видалення співробітника
  async deleteStaff(id) {
    return await Staff.findByIdAndDelete(id);
  }

  // Отримання всіх співробітників
  async getAllStaff() {
    return await Staff.find();
  }

  // Отримання співробітників за спеціалізацією
  async getStaffBySpecialization(specialization) {
    return await Staff.find({ specialization });
  }

  // Пошук співробітників за запитом
  async searchStaff(query) {
    const regex = new RegExp(query, 'i');
    const results = await Staff.find({
      $or: [
        { fullName: regex },
        { specialization: regex },
        { email: regex },
      ],
    });
    return results;
  }

  // Отримання співробітника за email (для авторизації)
  async getStaffByEmail(email) {
    return await Staff.findOne({ email });
  }
}