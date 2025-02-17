import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

export default class AuthService {
  constructor(staffRepo) {
    this.staffRepo = staffRepo; // MongoStaffRepository використовується тут
  }

  // Реєстрація нового співробітника
  async registerStaff(staffData) {
    const { email, password, fullName, specialization, role, contactInfo } = staffData;

    // Перевірка обов'язкових полів
    if (!email || !password || !fullName || !specialization || !role) {
      throw new Error('Missing required fields for staff registration.');
    }

    // Перевірка, чи існує користувач з таким же email
    const existingStaff = await this.staffRepo.getStaffByEmail(email);
    if (existingStaff) {
      throw new Error('Email is already in use.');
    }

    // Хешування пароля
    const hashedPassword = await bcrypt.hash(password, 10);

    // Створення нового співробітника
    const newStaff = {
      email,
      password: hashedPassword,
      fullName,
      specialization,
      role,
      contactInfo,
    };

    // Збереження в базу даних
    return await this.staffRepo.createStaff(newStaff);
  }

  // Авторизація співробітника
  async login(email, password) {
    const staff = await this.staffRepo.getStaffByEmail(email);
    if (!staff) {
      throw new Error('Invalid email');
    }

    // Перевірка пароля
    const isMatch = await bcrypt.compare(password, staff.password);
    if (!isMatch) {
      throw new Error('Invalid password.');
    }

    // Генерація JWT токена
    const token = jwt.sign(
      { id: staff._id, role: staff.role },
      process.env.JWT_SECRET,
      { expiresIn: '12h' }
    );

    return { token, staff };
  }
}