import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Alert, Box, Typography } from "@mui/material";
import Button from '../../Components/Common/Button';
import FormInput from "../../Components/Common/FormInput";
import Loader from "../../Components/Common/Loader";
import { login } from "../../Redux/thunks/AuthThunks";
import { fetchCurrentUser } from "../../Redux/thunks/AuthThunks";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isLoading, error, user } = useSelector((state) => state.auth);
  
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [formError, setFormError] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setFormError(null); // Очищаємо помилки при зміні поля
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.email || !formData.password) {
      setFormError("Please fill in all required fields.");
      return;
    }

    try {
      await dispatch(login(formData)).unwrap();
      const loggedInUser = await dispatch(fetchCurrentUser()).unwrap();
      if (loggedInUser.role === 'trainer') 
        { navigate(`/trainer/${loggedInUser._id}`); 
    } else if (loggedInUser.role === 'manager') { 
      navigate("/trainings"); 
    }
    } catch (err) {
      setFormError(err.message || "Login failed.");
    }
  };

  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      minHeight="100vh"
      bgcolor="#f5f5f5"
    >
      <Box
        component="form"
        onSubmit={handleSubmit}
        bgcolor="white"
        p={4}
        borderRadius={2}
        boxShadow={3}
        width="100%"
        maxWidth="400px"
      >
        <Typography variant="h5" mb={2} textAlign="center">
          Login
        </Typography>

        {formError && <Alert severity="error" sx={{ mb: 2 }}>{formError}</Alert>}

        <FormInput
          label="Email"
          name="email"
          type="email"
          value={formData.email}
          onChange={handleChange}
          error={formError && !formData.email ? "Email is required" : ""}
        />
        
        <FormInput
          label="Password"
          name="password"
          type="password"
          value={formData.password}
          onChange={handleChange}
          error={formError && !formData.password ? "Password is required" : ""}
          sx={{ mt: 2 }}
        />

        <Button
          type="submit"
          fullWidth
          size="large"
          disabled={isLoading}
          sx={{ backgroundColor:"#9575cd", mt: 3 }}
        >
          {isLoading ? <Loader size={20} message="" /> : "Log In"}
        </Button>
      </Box>
    </Box>
  );
};

export default Login;