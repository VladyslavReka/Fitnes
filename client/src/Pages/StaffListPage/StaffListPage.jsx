import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getAllStaff, searchStaff } from "../../Redux/thunks/StaffThunks";
import { Box, Typography, Grid, Card, CardContent, Button } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import SearchBar from "../../Components/Common/SearchBar";
import Pagination from "../../Components/Common/Pagination";
import Loader from "../../Components/Common/Loader";
import RegistrationModal from "../../Components/Forms/Registration/RegistrationModal";

const StaffListPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { staffList: staff = [], status, error } = useSelector((state) => state.staff);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const itemsPerPage = 6;

  useEffect(() => {
    if (searchQuery) {
      console.log('Searching staff with query:', searchQuery);
      dispatch(searchStaff({ query: searchQuery }));
    } else {
      dispatch(getAllStaff());
    }
  }, [dispatch, searchQuery]);

  const handleSearch = (query) => {
    setSearchQuery(query);
    setCurrentPage(1);
  };

  const handleNavigateToDetails = (id) => {
    navigate(`/staff/${id}`);
  };

  const handleClearSearch = () => {
    setSearchQuery("");
    setCurrentPage(1);
  };

  const handleAddStaff = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const totalPages = Math.ceil(staff.length / itemsPerPage);
  const displayedStaff = staff.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <Box p={3}>
      <Typography variant="h4" gutterBottom>
        Staff List
      </Typography>

      <Box mb={2} display="flex" justifyContent="space-between" alignItems="center">
        <SearchBar
          placeholder="Search by name or specialization"
          onSearch={handleSearch}
          onClear={handleClearSearch}
        />
        <Button
          startIcon={<AddIcon />}
          sx={{ backgroundColor: '#9575cd', color: 'white' }}
          variant="contained"
          onClick={handleAddStaff}
        >
          Add Staff
        </Button>
      </Box>

      {status === 'loading' ? (
        <Loader message="Loading staff..." />
      ) : error ? (
        <Typography color="error">{error}</Typography>
      ) : (
        <Grid container spacing={2}>
          {displayedStaff.map((member) => (
            <Grid item xs={12} sm={6} md={4} key={member._id}>
              <Card onClick={() => handleNavigateToDetails(member._id)} style={{ cursor: "pointer" }}>
                <CardContent>
                  <Typography variant="h6">{member.fullName}</Typography>
                  <Typography variant="body2" color="textSecondary">
                    Specialization: {member.specialization}
                  </Typography>
                  <Typography variant="body2" color="textSecondary">
                    Role: {member.role}
                  </Typography>
                  <Typography variant="body2" color="textSecondary">
                    Email: {member.email}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}

      <Box mt={2}>
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={(page) => setCurrentPage(page)}
        />
      </Box>

      <RegistrationModal isOpen={isModalOpen} onClose={handleCloseModal} />
    </Box>
  );
};

export default StaffListPage;

