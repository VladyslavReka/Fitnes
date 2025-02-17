import React, { useEffect } from 'react';
import { fetchCurrentUser } from './Redux/thunks/AuthThunks';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Login from './Pages/Login/Login';
import ClientListPage from './Pages/ClientListPage/ClientListPage';
import ClientPage from './Pages/ClientPage/ClientPage';
import MembershipsPage from './Pages/MembershipPage/MembershipPage';
import StaffListPage from './Pages/StaffListPage/StaffListPage';
import TrainerPage from './Pages/StaffPage/StaffPage';
import AllTrainingsPage from './Pages/TrainingListPage/TrainingListPage';
import { Layout } from './Components/Layout';
import Loader from './Components/Common/Loader';

function App() {
  const dispatch = useDispatch();
  const { user, isLoading } = useSelector((state) => state.auth);
  useEffect(() => {
    dispatch(fetchCurrentUser());
  }, [dispatch]);

  if (isLoading) { return <Loader />; }

  return (
    <Routes>
      <Route path="/" element={<Login />} />
      {user && (
        <>
          {user.role === 'trainer' && 
          <Route path="/" element={<Layout />}>
          <Route path="/trainer/:trainerId" element={<TrainerPage />} />
          </Route>}
          {user.role === 'manager' && (
                  <Route path="/" element={<Layout />}>
                    <Route path="/trainings" element={<AllTrainingsPage />} />
                    <Route path="/staff/:trainerId" element={<TrainerPage />} />
                    <Route path="/clients" element={<ClientListPage />} />
                    <Route path="/staff" element={<StaffListPage />} />
                    <Route path="/client/:clientId" element={<ClientPage />} />
                    <Route path="/memberships" element={<MembershipsPage />} />
                  </Route>
                )}
        </>
      )}
    </Routes>
  );
}

export default App;
