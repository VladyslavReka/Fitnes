import React from "react";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import { Box, Button, Grid, Typography, MenuItem } from "@mui/material";
import FormInput from "../../Common/FormInput";
import { useDispatch } from "react-redux";
import { updateStaff } from "../../../Redux/thunks/StaffThunks";
import Loader from "../../Common/Loader";

const EditStaffForm = ({ initialData, onClose }) => {
  const dispatch = useDispatch();

  if (!initialData) {
    return <Typography variant="body1">Завантаження даних тренера...</Typography>;
  }

  // Початкові значення форми
  const initialValues = {
    fullName: initialData.fullName || "",
    specialization: initialData.specialization || "",
    contactInfo: initialData.contactInfo || "",
    email: initialData.email || "",
    role: initialData.role || "trainer",
    password: "",
  };

  // Валідація за допомогою Yup
  const validationSchema = Yup.object().shape({
    fullName: Yup.string().required("Full Name is required"),
    specialization: Yup.string().required("Specialization is required"),
    contactInfo: Yup.string(),
    password: Yup.string(),
    email: Yup.string().email("Invalid email").required("Email is required"),
    role: Yup.string()
      .oneOf(["trainer", "manager"], "Role must be trainer or manager")
      .required("Role is required"),
  });

  // Обробник надсилання форми
  const handleSubmit = (values, { setSubmitting }) => {
    dispatch(updateStaff({ id: initialData._id, staffData: values }))
      .then(() => {
        if (onClose) onClose();
      })
      .finally(() => {
        setSubmitting(false);
      });
  };

  return (
    <Box p={3}>
      <Typography variant="h5" gutterBottom>
        Edit Trainer
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
                  select
                  label="Role (trainer/manager)"
                  name="role"
                  value={values.role}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={touched.role && errors.role}
                >
                  <MenuItem value="trainer">Trainer</MenuItem>
                  <MenuItem value="manager">Manager</MenuItem>
                </FormInput>
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
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  fullWidth
                  disabled={isSubmitting}
                >
                  {isSubmitting ? <Loader /> : "Save Changes"}
                </Button>
              </Grid>
            </Grid>
          </Form>
        )}
      </Formik>
    </Box>
  );
};

export default EditStaffForm;


