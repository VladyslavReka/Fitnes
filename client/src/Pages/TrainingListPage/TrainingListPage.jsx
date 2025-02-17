import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Box, Typography, Button } from '@mui/material';
import SearchBar from '../../Components/Common/SearchBar';
import Pagination from '../../Components/Common/Pagination';
import TrainingList from '../../Components/Wrapper/TrainingList';
import Modal from '../../Components/Common/Modal';
import AddTrainingForm from '../../Components/Forms/Training/AddTrainingForm';
import { getAllTrainings, searchTrainings, addTraining } from '../../Redux/thunks/TrainingThunks';
import { getAllStaff } from '../../Redux/thunks/StaffThunks';
import { getAllClients } from '../../Redux/thunks/ClientThunks';

const AllTrainingsPage = () => {
  const dispatch = useDispatch();
  const { trainingList: trainings = [], totalTrainings, isLoading } = useSelector((state) => state.trainings);
  const trainers = useSelector((state) => state.staff.staffList || []);
  const clients = useSelector((state) => state.clients.clients || []);

  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const itemsPerPage = 10;

  useEffect(() => {
    dispatch(getAllStaff());
    dispatch(getAllClients());
    dispatch(getAllTrainings());
  }, [dispatch]);

  useEffect(() => {
    if (!searchQuery) {
      dispatch(getAllTrainings({ page: currentPage, limit: itemsPerPage }));
    } else {
      dispatch(searchTrainings({ query: searchQuery, page: currentPage, limit: itemsPerPage }));
    }
  }, [dispatch, currentPage, searchQuery]);

  const handleSearch = (query) => {
    setSearchQuery(query);
    setCurrentPage(1);
  };

  const handleClearSearch = () => {
    setSearchQuery('');
    setCurrentPage(1);
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleAddTraining = async (values) => {
    try {
      await dispatch(addTraining(values)).unwrap();
      setIsModalOpen(false);
    } catch (error) {
      console.error(error);
    }
  };

  const totalPages = Math.ceil(totalTrainings / itemsPerPage) || 1;

  return (
    <Box sx={{ padding: 3 }}>
      <Typography variant='h4' align='center' gutterBottom>
        Всі тренування
      </Typography>
      
      <SearchBar
        placeholder='Пошук за тренером, клієнтом чи типом тренування'
        onSearch={handleSearch}
        onClear={handleClearSearch}
      />

      <Box display='flex' justifyContent='flex-end' my={2}>
        <Button variant='contained' sx={{ backgroundColor: '#9575cd', color: 'white' }} onClick={() => setIsModalOpen(true)}>
          Додати тренування
        </Button>
      </Box>
      
      <Box my={3}>
        {isLoading ? (
          <Typography variant='h6' align='center'>
            Завантаження тренувань...
          </Typography>
        ) : (
          <>
            {console.log('Trainings to display:', trainings)} {/* Логування тренувань */}
            {trainings.length > 0 ? (
              <TrainingList trainings={trainings} />
            ) : (
              <Typography variant='h6' align='center' color='textSecondary'>
                Тренувань не знайдено.
              </Typography>
            )}
          </>
        )}
      </Box>
      
      <Box mt={3}>
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      </Box>
      
      <Modal isOpen={isModalOpen} title='Додати нове тренування' onClose={() => setIsModalOpen(false)}>
        <AddTrainingForm
          trainers={trainers}
          clients={clients}
          onSubmit={handleAddTraining}
          isLoading={isLoading}
        />
      </Modal>
    </Box>
  );
};

export default AllTrainingsPage;



