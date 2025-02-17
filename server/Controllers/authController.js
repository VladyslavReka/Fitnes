import AuthService from '../Services/AuthService.js';
import MongoStaffRepository from '../Repositories/MongoStaffRepository.js';
import StaffService from '../Services/StaffService.js';

// Ініціалізація репозиторію та сервісу
const staffRepo = new MongoStaffRepository();
const authService = new AuthService(staffRepo);
const staffService = new StaffService(staffRepo);

export default class AuthController {
  // Реєстрація нового співробітника
  async register(req, res) {
    try {
      const newStaff = await authService.registerStaff(req.body);
      res.status(201).json(newStaff);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }

  // Авторизація співробітника
  async login(req, res) {
    try {
      const { email, password } = req.body;
      const { token, staff } = await authService.login(email, password);
      res.status(200).json({ token, staff });
    } catch (error) {
      res.status(401).json({ message: error.message });
    }
  }

  async getMe(req, res) {
    try {
      const staff = await staffService.getStaffById(req.user.id);
      res.status(200).json(staff);
    } catch (error) {
      res.status(404).json({ message: error.message });
    }
  }
}