import StaffService from '../Services/StaffService.js';
import MongoStaffRepository from '../Repositories/MongoStaffRepository.js';

const staffRepository = new MongoStaffRepository();
const staffService = new StaffService(staffRepository);

export default class StaffController {
  async getAllStaff(req, res) {
    try {
      const staff = await staffService.getAllStaff();
      res.json(staff);
    } catch (err) {
      console.error('Error in getAllStaff:', err); // Додати логування
      res.status(400).json({ error: err.message });
    }
  }

  // Отримати співробітника за ID
  async getStaffById(req, res) {
    try {
      console.log('Fetching staff by ID:', req.params.id); // Логування
      const staff = await staffService.getStaffById(req.params.id);
      if (!staff) {
        res.status(404).json({ error: 'Staff not found' });
      } else {
        res.json(staff);
      }
    } catch (err) {
      console.error('Error in getStaffById:', err); // Додати логування
      res.status(500).json({ error: err.message });
    }
  }

  // Оновити інформацію про співробітника
  async updateStaff(req, res) {
    try {
      const updatedStaff = await staffService.updateStaff(req.params.id, req.body);
      res.json(updatedStaff);
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  }

  // Видалити співробітника за ID
  async deleteStaff(req, res) {
    try {
      await staffService.deleteStaff(req.params.id);
      res.json({ message: 'Staff member deleted' });
    } catch (err) {
      console.error('Error in deleteStaff:', err); // Додати логування
      res.status(404).json({ error: err.message });
    }
  }

  // Пошук співробітників за параметрами
  async searchStaff(req, res) {
    try {
      const { query } = req.query;
      const staff = await staffService.searchStaff(query);
      res.json(staff);
    } catch (err) {
      console.error('Error in searchStaff:', err);
      res.status(400).json({ error: err.message });
    }
  }

  // Отримати співробітників за спеціалізацією
  async getStaffBySpecialization(req, res) {
    try {
      const staff = await staffService.getStaffBySpecialization(req.params.specialization);
      if (!staff || staff.length === 0) {
        res.status(404).json({ error: 'No staff found with this specialization' });
      } else {
        res.json(staff);
      }
    } catch (err) {
      console.error('Error in getStaffBySpecialization:', err); // Додати логування
      res.status(500).json({ error: err.message });
    }
  }
}


// import StaffService from '../Services/StaffService.js';
// import MongoStaffRepository from '../Repositories/MongoStaffRepository.js';

// const staffRepository = new MongoStaffRepository();
// const staffService = new StaffService(staffRepository);

// export default class StaffController {
//   async getAllStaff(req, res) {
//     try {
//       const staff = await staffService.getAllStaff();
//       res.json(staff);
//     } catch (err) {
//       console.error('Error in getAllStaff:', err);
//       // res.status(400).json({ error: err.message });
//       res.status(400).json({ error: err.message });
//     }
//   }

//   // Отримати співробітника за ID
//   async getStaffById(req, res) {
//     try {
//       const staff = await staffService.getStaffById(req.params.id);
//       if (!staff) {
//         return res.status(404).json({ error: 'Staff not found' });
//       }
//       res.json(staff);
//     } catch (err) {
//       console.error('Error in getStaffById:', err);
//       res.status(500).json({ error: err.message });
//       // res.status(404).json({ error: err.message });
//     }
//   }

//   // Оновити інформацію про співробітника
//   async updateStaff(req, res) {
//     try {
//       const updatedStaff = await staffService.updateStaff(req.params.id, req.body);
//       res.json(updatedStaff);
//     } catch (err) {
//       res.status(400).json({ error: err.message });
//     }
//   }

//   // Видалити співробітника за ID
//   async deleteStaff(req, res) {
//     try {
//       await staffService.deleteStaff(req.params.id);
//       res.json({ message: 'Staff member deleted' });
//     } catch (err) {
//       console.error('Error in deleteStaff:', err);
//       res.status(404).json({ error: err.message });
//     }
//   }

//   // Пошук співробітників за параметрами
//   async searchStaff(req, res) {
//     try {
//       const { query } = req.query;
//       const staff = await staffService.searchStaff(query);
//       res.json(staff);
//     } catch (err) {
//       console.error('Error in searchStaff:', err);
//       res.status(400).json({ error: err.message });
//     }
//   }

//   // Отримати співробітників за спеціалізацією
//   async getStaffBySpecialization(req, res) {
//     try {
//       const staff = await staffService.getStaffBySpecialization(req.params.specialization);
//       res.json(staff);
//     } catch (err) {
//       res.status(404).json({ error: err.message });
//     }
//   }
// }