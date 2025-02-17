import React from 'react';
import { AppBar, Toolbar, Typography, Button, Box } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../../Redux/slices/AuthSlice.js';
import { useNavigate } from 'react-router-dom';

const Navbar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user, token } = useSelector((state) => state.auth);

  const handleLogout = () => {
    dispatch(logout());
    window.localStorage.removeItem('token');
    navigate('/');
  };

  return (
    <AppBar position="static" sx={{ backgroundColor: '#aaa2f5' }}>
      <Toolbar>
        <Typography variant="h6" sx={{ 
          flexGrow: 1,
          fontFamily: 'Playwrite TZ Guides, cursive',
          fontSize: 25
          }}>
          Fitness Club
        </Typography>

        <Box sx={{ display: 'flex', gap: 2 }}>
          {token && (
            <>
              {user?.role === 'trainer' ? (
                <Button color="inherit" onClick={handleLogout}>
                  Log out
                </Button>
              ) : (
                <>
                  <Button color="inherit" onClick={() => navigate('/trainings')}>
                    Trainings
                  </Button>
                  <Button color="inherit" onClick={() => navigate('/clients')}>
                    Client List
                  </Button>
                  <Button color="inherit" onClick={() => navigate('/staff')}>
                    Staff List
                  </Button>
                  <Button color="inherit" onClick={() => navigate('/memberships')}>
                    Memberships
                  </Button>
                  <Button color="inherit" onClick={handleLogout}>
                    Log out
                  </Button>
                </>
              )}
            </>
          )}
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
