import React from "react";
import PropTypes from "prop-types";
import { TextField } from "@mui/material";

const FormInput = ({
  label,
  name,
  value,
  onChange,
  onBlur,
  type = "text",
  placeholder = "",
  error = "",
  fullWidth = true,
  disabled = false,
  helperText = "",
  ...props
}) => {
  return (
    <TextField
      label={label}
      name={name}
      value={value}
      onChange={onChange}
      onBlur={onBlur}
      type={type}
      placeholder={placeholder}
      error={Boolean(error)}
      fullWidth={fullWidth}
      disabled={disabled}
      helperText={error || helperText}
      variant="outlined"
      margin="normal"
      InputLabelProps={{
        shrink: type === "date" ? true : undefined, // Піднімаємо мітку для полів типу date
      }}
      {...props}
    />
  );
};

FormInput.propTypes = {
  label: PropTypes.string.isRequired, // Текст мітки
  name: PropTypes.string.isRequired, // Ім'я поля
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]), // Значення поля
  onChange: PropTypes.func.isRequired, // Функція для обробки змін
  onBlur: PropTypes.func, // Функція для обробки події "blur"
  type: PropTypes.string, // Тип поля (text, email, password тощо)
  placeholder: PropTypes.string, // Підказка всередині поля
  error: PropTypes.string, // Помилка валідації
  fullWidth: PropTypes.bool, // Чи займає все доступне місце
  disabled: PropTypes.bool, // Заблокувати поле
  helperText: PropTypes.string, // Текст підказки
};

export default FormInput;

