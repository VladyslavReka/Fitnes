import React from "react";
import PropTypes from "prop-types";
import { Button as MuiButton } from "@mui/material";

const Button = ({
  children,
  onClick,
  color = "primary", // primary, secondary, error, success, warning, info
  variant = "contained", // contained, outlined, text
  size = "medium", // small, medium, large
  disabled = false,
  startIcon = null,
  endIcon = null,
  fullWidth = false,
  className = "",
  ...props
}) => {
  return (
    <MuiButton
    sx={{ backgroundColor: '#9575cd', color: 'white' }} 
      onClick={onClick}
      color={color}
      variant={variant}
      size={size}
      disabled={disabled}
      startIcon={startIcon}
      endIcon={endIcon}
      fullWidth={fullWidth}
      className={className}
      {...props}
    >
      {children}
    </MuiButton>
  );
};

Button.propTypes = {
  children: PropTypes.node.isRequired, // Текст або елемент всередині кнопки
  onClick: PropTypes.func, // Обробник кліку
  color: PropTypes.oneOf([
    "primary",
    "secondary",
    "error",
    "success",
    "warning",
    "info",
  ]), // Колір кнопки
  variant: PropTypes.oneOf(["contained", "outlined", "text"]), // Стиль кнопки
  size: PropTypes.oneOf(["small", "medium", "large"]), // Розмір кнопки
  disabled: PropTypes.bool, // Заблокована кнопка
  startIcon: PropTypes.node, // Іконка перед текстом
  endIcon: PropTypes.node, // Іконка після тексту
  fullWidth: PropTypes.bool, // Кнопка на всю ширину контейнера
  className: PropTypes.string, // Додаткові CSS класи
};

export default Button;