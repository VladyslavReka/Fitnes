import React from "react";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import FormInput from "../../Common/FormInput";
import Button from "../../Common/Button";
import { Box } from "@mui/material";

const MembershipForm = ({ initialValues, onSubmit, isEditing }) => {
  const validationSchema = Yup.object({
    type: Yup.string()
      .required("Тип абонемента є обов'язковим")
      .max(50, "Тип абонемента має бути до 50 символів"),
    duration: Yup.number()
      .required("Тривалість є обов'язковою")
      .positive("Тривалість має бути позитивною")
      .integer("Тривалість має бути цілим числом"),
    price: Yup.number()
      .required("Ціна є обов'язковою")
      .positive("Ціна має бути позитивною"),
  });

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={onSubmit}>
      {({ values, handleChange, handleBlur, errors, touched, isSubmitting }) => (
        <Form>
          <Box display="flex" flexDirection="column" gap={2}>
            <FormInput label="Тип абонемента"
              name="type"
              value={values.type}
              onChange={handleChange}
              onBlur={handleBlur}
              error={touched.type && errors.type}
              placeholder="Введіть тип (наприклад, стандартний)"/>
            <FormInput label="Тривалість (місяців)"
              name="duration"
              type="number"
              value={values.duration}
              onChange={handleChange}
              onBlur={handleBlur}
              error={touched.duration && errors.duration}
              placeholder="Введіть тривалість"/>
            <FormInput label="Ціна"
              name="price"
              type="number"
              value={values.price}
              onChange={handleChange}
              onBlur={handleBlur}
              error={touched.price && errors.price}
              placeholder="Введіть ціну"/>
            <Button type="submit" disabled={isSubmitting}>
              {isEditing ? "Оновити абонемент" : "Додати абонемент"}
            </Button>
          </Box>
        </Form>
      )}
    </Formik>
  );
};

MembershipForm.defaultProps = {
  initialValues: {
    type: "",
    duration: "",
    price: "",
  },
  isEditing: false,
};

export default MembershipForm;