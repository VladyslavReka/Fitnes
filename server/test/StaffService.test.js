import { expect } from 'chai';
import sinon from 'sinon';
import StaffService from '../Services/StaffService.js';
import MongoStaffRepository from '../Repositories/MongoStaffRepository.js';

describe('StaffService', function() {
  let staffRepo, staffService;

  beforeEach(() => {
    staffRepo = sinon.createStubInstance(MongoStaffRepository);
    staffService = new StaffService(staffRepo);
  });

  afterEach(() => {
    sinon.restore();
  });

  describe('getAllStaff', () => {
    it('should return all staff members', async () => {
      const mockStaff = [{ fullName: 'John Doe' }, { fullName: 'Jane Smith' }];
      staffRepo.getAllStaff.resolves(mockStaff);

      const staff = await staffService.getAllStaff();

      expect(staff).to.equal(mockStaff);
      expect(staffRepo.getAllStaff.calledOnce).to.be.true;
    });
  });

  describe('getStaffById', () => {
    it('should return a staff member by ID', async () => {
      const mockStaff = { fullName: 'John Doe' };
      staffRepo.getStaffById.resolves(mockStaff);

      const staff = await staffService.getStaffById('some-id');

      expect(staff).to.equal(mockStaff);
      expect(staffRepo.getStaffById.calledOnceWith('some-id')).to.be.true;
    });

    it('should throw an error if staff member is not found', async () => {
      staffRepo.getStaffById.resolves(null);

      try {
        await staffService.getStaffById('some-id');
      } catch (error) {
        expect(error.message).to.equal('Staff member with ID some-id not found.');
      }
      expect(staffRepo.getStaffById.calledOnceWith('some-id')).to.be.true;
    });
  });

  describe('updateStaff', () => {
    it('should update a staff member', async () => {
      const mockStaff = { fullName: 'John Doe' };
      const updatedStaff = { fullName: 'John Smith' };
      staffRepo.getStaffById.resolves(mockStaff);
      staffRepo.updateStaff.resolves(updatedStaff);

      const result = await staffService.updateStaff('some-id', updatedStaff);

      expect(result).to.equal(updatedStaff);
      expect(staffRepo.getStaffById.calledOnceWith('some-id')).to.be.true;
      expect(staffRepo.updateStaff.calledOnceWith('some-id', updatedStaff)).to.be.true;
    });

    it('should throw an error if staff member is not found', async () => {
      staffRepo.getStaffById.resolves(null);

      try {
        await staffService.updateStaff('some-id', { fullName: 'John Smith' });
      } catch (error) {
        expect(error.message).to.equal('Staff member with ID some-id not found.');
      }
      expect(staffRepo.getStaffById.calledOnceWith('some-id')).to.be.true;
    });
  });

  describe('deleteStaff', () => {
    it('should delete a staff member', async () => {
      const mockStaff = { fullName: 'John Doe' };
      staffRepo.getStaffById.resolves(mockStaff);
      staffRepo.deleteStaff.resolves(true);

      const result = await staffService.deleteStaff('some-id');

      expect(result).to.be.true;
      expect(staffRepo.getStaffById.calledOnceWith('some-id')).to.be.true;
      expect(staffRepo.deleteStaff.calledOnceWith('some-id')).to.be.true;
    });

    it('should throw an error if staff member is not found', async () => {
      staffRepo.getStaffById.resolves(null);

      try {
        await staffService.deleteStaff('some-id');
      } catch (error) {
        expect(error.message).to.equal('Staff member with ID some-id not found.');
      }
      expect(staffRepo.getStaffById.calledOnceWith('some-id')).to.be.true;
    });
  });
  describe('searchStaff', () => {
    it('should search for staff members by query', async () => {
      const mockStaff = [{ fullName: 'John Doe' }, { fullName: 'Jane Smith' }];
      const query = { specialization: 'Trainer' };
      staffRepo.searchStaff.resolves(mockStaff);
  
      const result = await staffService.searchStaff(query);
  
      expect(result).to.equal(mockStaff);
      expect(staffRepo.searchStaff.calledOnceWith(query)).to.be.true;
    });
  });
  
  describe('getStaffBySpecialization', () => {
    it('should return staff members by specialization', async () => {
      const mockStaff = [{ fullName: 'John Doe' }, { fullName: 'Jane Smith' }];
      staffRepo.getStaffBySpecialization.resolves(mockStaff);
  
      const result = await staffService.getStaffBySpecialization('Trainer');
  
      expect(result).to.equal(mockStaff);
      expect(staffRepo.getStaffBySpecialization.calledOnceWith('Trainer')).to.be.true;
    });
  
    it('should throw an error if no staff members are found', async () => {
      staffRepo.getStaffBySpecialization.resolves([]);
  
      try {
        await staffService.getStaffBySpecialization('Trainer');
      } catch (error) {
        expect(error.message).to.equal('No staff members found with specialization: Trainer');
      }
      expect(staffRepo.getStaffBySpecialization.calledOnceWith('Trainer')).to.be.true;
    });
  });
});
