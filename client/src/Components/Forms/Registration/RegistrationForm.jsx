import React from "react";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import { Box, Button, Grid, Typography } from "@mui/material";
import FormInput from "../../Common/FormInput";
import { useDispatch } from "react-redux";
import { register } from "../../../Redux/thunks/AuthThunks";

const RegistrationForm = () => {
  const dispatch = useDispatch();

  // Початкові значення форми
  const initialValues = {
    fullName: "",
    specialization: "",
    contactInfo: "",
    email: "",
    password: "",
    role: "",
  };

  // Валідація за допомогою Yup
  const validationSchema = Yup.object().shape({
    fullName: Yup.string().required("Full Name is required"),
    specialization: Yup.string().required("Specialization is required"),
    contactInfo: Yup.string(),
    email: Yup.string().email("Invalid email").required("Email is required"),
    password: Yup.string()
      .min(6, "Password must be at least 6 characters")
      .required("Password is required"),
    role: Yup.string()
      .oneOf(["trainer", "manager"], "Role must be trainer or manager")
      .required("Role is required"),
  });

  // Обробник надсилання форми
  const handleSubmit = (values, { setSubmitting, resetForm }) => {
    dispatch(register(values))
      .then(() => {
        resetForm();
      })
      .finally(() => {
        setSubmitting(false);
      });
  };

  return (
    <Box p={3}>
      <Typography variant="h5" gutterBottom>
        Register New Staff
      </Typography>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting, values, errors, touched, handleChange, handleBlur }) => (
          <Form>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <FormInput
                  label="Full Name"
                  name="fullName"
                  value={values.fullName}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={touched.fullName && errors.fullName}
                />
              </Grid>
              <Grid item xs={12}>
                <FormInput
                  label="Specialization"
                  name="specialization"
                  value={values.specialization}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={touched.specialization && errors.specialization}
                />
              </Grid>
              <Grid item xs={12}>
                <FormInput
                  label="Contact Info"
                  name="contactInfo"
                  value={values.contactInfo}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={touched.contactInfo && errors.contactInfo}
                />
              </Grid>
              <Grid item xs={12}>
                <FormInput
                  label="Email"
                  name="email"
                  type="email"
                  value={values.email}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={touched.email && errors.email}
                />
              </Grid>
              <Grid item xs={12}>
                <FormInput
                  label="Password"
                  name="password"
                  type="password"
                  value={values.password}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={touched.password && errors.password}
                />
              </Grid>
              <Grid item xs={12}>
                <FormInput
                  label="Role (trainer/manager)"
                  name="role"
                  value={values.role}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={touched.role && errors.role}
                />
              </Grid>
              <Grid item xs={12}>
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  fullWidth
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Registering..." : "Register"}
                </Button>
              </Grid>
            </Grid>
          </Form>
        )}
      </Formik>
    </Box>
  );
};

export default RegistrationForm;