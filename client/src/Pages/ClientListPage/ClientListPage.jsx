import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Box, Typography, Grid, MenuItem, Select, InputLabel, FormControl } from '@mui/material';
import Button from '../../Components/Common/Button';
import SearchBar from '../../Components/Common/SearchBar';
import Pagination from '../../Components/Common/Pagination';
import Modal from '../../Components/Common/Modal';
import FormInput from '../../Components/Common/FormInput';
import Loader from '../../Components/Common/Loader';
import { addClient, getAllClients, searchClients } from '../../Redux/thunks/ClientThunks';
import { getAllMemberships } from '../../Redux/thunks/MembershipThunks';

const ClientListPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { clients = [], status, error } = useSelector((state) => state.clients);
  const memberships = useSelector((state) => state.memberships.memberships || []);

  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const clientsPerPage = 10;
  const [isModalOpen, setModalOpen] = useState(false);
  const [newClient, setNewClient] = useState({
    fullName: '',
    dateOfBirth: '',
    address: '',
    contactInfo: '',
    membershipType: '',
  });

  useEffect(() => {
    dispatch(getAllClients());
    dispatch(getAllMemberships());
  }, [dispatch]);

  const handleSearch = (query) => {
    setSearchQuery(query);
    if (query.trim() === '') {
      dispatch(getAllClients());
    } else {
      dispatch(searchClients({ name: query }));
    }
  };

  const handleClearSearch = () => {
    setSearchQuery('');
    dispatch(getAllClients());
  };

  const handleModalOpen = () => setModalOpen(true);
  const handleModalClose = () => {
    setModalOpen(false);
    setNewClient({ fullName: '', membershipType: '', contactInfo: '' });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewClient({ ...newClient, [name]: value });
  };

  const handleAddClient = () => {
    dispatch(addClient(newClient));
    handleModalClose();
  };

  const totalPages = Array.isArray(clients) ? Math.ceil(clients.length / clientsPerPage) : 0;
  const paginatedClients = Array.isArray(clients) ? clients.slice(
    (currentPage - 1) * clientsPerPage,
    currentPage * clientsPerPage
  ) : [];

  return (
    <Box sx={{ padding: 3 }}>
      <Grid container spacing={2} sx={{ marginBottom: 2 }}>
        <Grid item xs={12} md={11}>
          <SearchBar
            placeholder="Search clients..."
            onSearch={handleSearch}
            onClear={handleClearSearch}
          />
        </Grid>
        <Grid item xs={12} md={1} sx={{ display: 'flex', justifyContent: 'flex-end' }}>
          <Button onClick={handleModalOpen} color="primary">
            Add Client
          </Button>
        </Grid>
      </Grid>

      {status === 'loading' ? (
        <Loader size={20} message="" />
      ) : error ? (
        <Typography color="error">{error}</Typography>
      ) : (
        <Box>
          <Box sx={{ marginBottom: 2 }}>
            {paginatedClients.map((client) => (
              <Box
                key={client._id} // Використовуємо унікальний ключ client._id
                sx={{
                  padding: 2,
                  border: '1px solid #ddd',
                  borderRadius: 1,
                  marginBottom: 1,
                  cursor: 'pointer',
                  backgroundColor: '#f9f9f9',
                  '&:hover': { backgroundColor: '#f1f1f1' },
                }}
                onClick={() => navigate(`/client/${client._id}`)}
              >
                <Typography variant="h6">{client.fullName}</Typography>
                <Typography variant="body2">
                  Membership: {client.membershipType?.type || ''}
                </Typography>
                <Typography variant="body2">Contact: {client.contactInfo}</Typography>
                <Typography variant="body2">Address: {client.address}</Typography>
              </Box>
            ))}
          </Box>
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
          />
        </Box>
      )}

      {/* Модальне вікно для додавання клієнта */}
      <Modal
        isOpen={isModalOpen}
        title="Add New Client"
        onClose={handleModalClose}
        onConfirm={handleAddClient}
        confirmText="Add"
      >
        <FormInput
          label="Full Name"
          name="fullName"
          value={newClient.fullName}
          onChange={handleInputChange}
          required
        />
        <FormInput
          label="Date of Birth"
          name="dateOfBirth"
          type="date"
          value={newClient.dateOfBirth}
          onChange={handleInputChange}
          required
        />
        <FormInput
          label="Address"
          name="address"
          value={newClient.address}
          onChange={handleInputChange}
        />
        <FormInput
          label="Contact Info"
          name="contactInfo"
          value={newClient.contactInfo}
          onChange={handleInputChange}
        />
        <FormControl fullWidth variant="outlined" margin="normal">
          <InputLabel>Membership Type</InputLabel>
          <Select
            name="membershipType"
            value={newClient.membershipType || ''}
            onChange={handleInputChange}
            label="Membership Type"
          >
            {memberships.map((membership) => (
              <MenuItem key={membership._id} value={membership._id}>
                {membership.type}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Modal>
    </Box>
  );
};

export default ClientListPage;

