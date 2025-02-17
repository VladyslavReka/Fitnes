import { expect } from 'chai';
import sinon from 'sinon';
import ClientService from '../Services/ClientService.js';
import MongoClientRepository from '../Repositories/MongoClientRepository.js';
import MongoMembershipRepository from '../Repositories/MongoMembershipRepository.js';

describe('ClientService', function() {
  let clientRepo, membershipRepo, clientService;

  beforeEach(() => {
    clientRepo = sinon.createStubInstance(MongoClientRepository);
    membershipRepo = sinon.createStubInstance(MongoMembershipRepository);
    clientService = new ClientService(clientRepo, membershipRepo);
  });

  afterEach(() => {
    sinon.restore();
  });

  describe('getAllClients', () => {
    it('should return all clients', async () => {
      const mockClients = [{ fullName: 'John Doe' }, { fullName: 'Jane Smith' }];
      clientRepo.getAllClients.resolves(mockClients);

      const clients = await clientService.getAllClients();

      expect(clients).to.equal(mockClients);
      expect(clientRepo.getAllClients.calledOnce).to.be.true;
    });
  });

  describe('addClient', () => {
    it('should add a new client and create a membership', async () => {
      const mockClientData = {
        fullName: 'John Doe',
        dateOfBirth: '1990-01-01',
        address: '123 Main St',
        contactInfo: '123-456-7890',
        membershipType: 'some-membership-id',
      };

      const mockMembership = { _id: 'some-membership-id', duration: 12 };
      membershipRepo.getMembershipById.resolves(mockMembership);

      const mockClient = { _id: 'some-client-id', ...mockClientData };
      clientRepo.createClient.resolves(mockClient);

      const result = await clientService.addClient(mockClientData);

      expect(result).to.equal(mockClient);
      expect(membershipRepo.getMembershipById.calledOnceWith('some-membership-id')).to.be.true;
      expect(clientRepo.createClient.calledOnceWith(sinon.match(mockClientData))).to.be.true;
      expect(clientRepo.createClientMembership.calledOnce).to.be.true;
    });

    it('should throw an error if required fields are missing', async () => {
      const mockClientData = {
        fullName: 'John Doe',
        address: '123 Main St',
        contactInfo: '123-456-7890',
        membershipType: 'some-membership-id',
      };

      try {
        await clientService.addClient(mockClientData);
      } catch (error) {
        expect(error.message).to.equal('Missing required fields for creating a client.');
      }
    });

    it('should throw an error if membership is not found', async () => {
      const mockClientData = {
        fullName: 'John Doe',
        dateOfBirth: '1990-01-01',
        address: '123 Main St',
        contactInfo: '123-456-7890',
        membershipType: 'some-membership-id',
      };

      membershipRepo.getMembershipById.resolves(null);

      try {
        await clientService.addClient(mockClientData);
      } catch (error) {
        expect(error.message).to.equal('Membership with ID some-membership-id not found.');
      }
    });
  });

  describe('getClientById', () => {
    it('should return a client by ID', async () => { 
   const mockClient = { fullName: 'John Doe', toObject: () => ({ fullName: 'John Doe' }) }; 
   const mockMembership = { 
   status: 'active', endDate: new Date() }; 
   clientRepo.getClientById.resolves(mockClient); 
   clientRepo.getClientMembershipByClientId.resolves(mockMembership); 
   const client = await clientService.getClientById('some-client-id'); 
   expect(client).to.deep.equal({ ...mockClient.toObject(), 
    membershipStatus: mockMembership.status, 
    membershipEndDate: mockMembership.endDate, }); 
    expect(clientRepo.getClientById.calledOnceWith('some-client-id')).to.be.true; 
    expect(clientRepo.getClientMembershipByClientId.calledOnceWith('some-client-id')).to.be.true; }); 
   it('should throw an error if client is not found', async () => { 
    clientRepo.getClientById.resolves(null); 
   try { 
   await clientService.getClientById('some-client-id'); 
   } catch (error) {
   expect(error.message).to.equal('Client with ID some-client-id not found.'); }});

  describe('updateClient', () => {
    it('should update a client', async () => {
      const mockClient = { fullName: 'John Doe' };
      const updatedClient = { fullName: 'John Smith' };
      clientRepo.getClientById.resolves(mockClient);
      clientRepo.updateClient.resolves(updatedClient);

      const result = await clientService.updateClient('some-client-id', updatedClient);

      expect(result).to.equal(updatedClient);
      expect(clientRepo.getClientById.calledOnceWith('some-client-id')).to.be.true;
      expect(clientRepo.updateClient.calledOnceWith('some-client-id', updatedClient)).to.be.true;
    });

    it('should throw an error if client is not found', async () => {
      clientRepo.getClientById.resolves(null);

      try {
        await clientService.updateClient('some-client-id', { fullName: 'John Smith' });
      } catch (error) {
        expect(error.message).to.equal('Client with ID some-client-id not found.');
      }
    });
  });

  describe('deleteClient', () => {
    it('should delete a client', async () => {
      const mockClient = { fullName: 'John Doe' };
      clientRepo.getClientById.resolves(mockClient);
      clientRepo.deleteClient.resolves(true);

      const result = await clientService.deleteClient('some-client-id');

      expect(result).to.be.true;
      expect(clientRepo.getClientById.calledOnceWith('some-client-id')).to.be.true;
      expect(clientRepo.deleteClient.calledOnceWith('some-client-id')).to.be.true;
    });

    it('should throw an error if client is not found', async () => {
      clientRepo.getClientById.resolves(null);

      try {
        await clientService.deleteClient('some-client-id');
      } catch (error) {
        expect(error.message).to.equal('Client with ID some-client-id not found.');
      }
    });
  });

  describe('searchClients', () => {
    it('should search for clients by query', async () => {
      const mockClients = [{ fullName: 'John Doe' }, { fullName: 'Jane Smith' }];
      const query = { name: 'Doe' };
      clientRepo.searchClients.resolves(mockClients);

      const result = await clientService.searchClients(query);

      expect(result).to.equal(mockClients);
      expect(clientRepo.searchClients.calledOnceWith(query)).to.be.true;
    });
  });

  describe('extendMembership', () => {
    it('should extend an expired membership', async () => {
      const mockClientMembership = {
        _id: 'some-membership-id',
        clientId: 'some-client-id',
        membershipId: { duration: 12 },
        status: 'expired',
      };
      clientRepo.getClientMembershipByClientId.resolves(mockClientMembership);
      clientRepo.updateClientMembership.resolves({
        ...mockClientMembership,
        startDate: new Date(),
        endDate: new Date(new Date().setMonth(new Date().getMonth() + 12)),
        status: 'active',
      });

      const result = await clientService.extendMembership('some-client-id');

      expect(result.status).to.equal('active');
      expect(clientRepo.getClientMembershipByClientId.calledOnceWith('some-client-id')).to.be.true;
      expect(clientRepo.updateClientMembership.calledOnce).to.be.true;
    });
});
})
})
