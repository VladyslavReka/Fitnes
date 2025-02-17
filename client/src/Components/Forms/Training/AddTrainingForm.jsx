import React from "react";
import { Box, MenuItem, Typography } from "@mui/material";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import FormInput from "../../Common/FormInput";
import Button from "../../Common/Button";

// Схема валідації для форми
const validationSchema = Yup.object().shape({
  date: Yup.date().required("Введіть дату тренування"),
  time: Yup.string()
    .matches(/^([01]\d|2[0-3]):([0-5]\d)$/, "Час має бути у форматі HH:mm")
    .required("Введіть час тренування"),
  trainer: Yup.string().required("Виберіть тренера"),
  client: Yup.string().required("Виберіть клієнта"),
  trainingType: Yup.string().required("Виберіть тип тренування"),
});

const AddTrainingForm = ({ trainers, clients, onSubmit, isLoading }) => {
  return (
    <Box
      sx={{
        maxWidth: 600,
        margin: "0 auto",
        padding: 2,
        boxShadow: 3,
        borderRadius: 2,
        backgroundColor: "#fff",
      }}
    >
      <Typography variant="h5" align="center" gutterBottom>
        Додати тренування
      </Typography>
      <Formik
        initialValues={{
          date: "",
          time: "",
          trainer: "",
          client: "",
          trainingType: "",
        }}
        validationSchema={validationSchema}
        onSubmit={(values, { resetForm }) => {
          onSubmit(values);
          resetForm();
        }}
      >
        {({
          values,
          errors,
          touched,
          handleChange,
          handleBlur,
          handleSubmit,
        }) => (
          <Form onSubmit={handleSubmit}>
            <FormInput
              label="Дата тренування"
              name="date"
              type="date"
              value={values.date}
              onChange={handleChange}
              onBlur={handleBlur}
              error={touched.date && errors.date}
            />
            <FormInput
              label="Час тренування"
              name="time"
              type="time"
              value={values.time}
              onChange={handleChange}
              onBlur={handleBlur}
              error={touched.time && errors.time}
            />
            <FormInput
              label="Тренер"
              name="trainer"
              select
              value={values.trainer}
              onChange={handleChange}
              onBlur={handleBlur}
              error={touched.trainer && errors.trainer}
            >
              {trainers.map((trainer) => (
                <MenuItem key={trainer._id} value={trainer._id}>
                  {trainer.fullName}
                </MenuItem>
              ))}
            </FormInput>
            <FormInput
              label="Клієнт"
              name="client"
              select
              value={values.client}
              onChange={handleChange}
              onBlur={handleBlur}
              error={touched.client && errors.client}
            >
              {clients.map((client) => (
                <MenuItem key={client._id} value={client._id}>
                  {client.fullName}
                </MenuItem>
              ))}
            </FormInput>
            <FormInput
              label="Тип тренування"
              name="trainingType"
              select
              value={values.trainingType}
              onChange={handleChange}
              onBlur={handleBlur}
              error={touched.trainingType && errors.trainingType}
            >
              <MenuItem value="cardio">Кардіо</MenuItem>
              <MenuItem value="strength">Силове</MenuItem>
              <MenuItem value="flexibility">Гнучкість</MenuItem>
              <MenuItem value="balance">Баланс</MenuItem>
            </FormInput>
            <Box display="flex" justifyContent="center" mt={2}>
              <Button
                type="submit"
                color="primary"
                variant="contained"
                size="large"
                disabled={isLoading}
              >
                {isLoading ? "Додається..." : "Додати тренування"}
              </Button>
            </Box>
          </Form>
        )}
      </Formik>
    </Box>
  );
};

export default AddTrainingForm;
