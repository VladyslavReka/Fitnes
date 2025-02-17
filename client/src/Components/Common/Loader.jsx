import React from "react";
import { CircularProgress, Box, Typography } from "@mui/material";
import PropTypes from "prop-types";

const Loader = ({ size = 40, message = "Loading...", color = "primary", showMessage = true, ...props }) => {
  return (
    <Box
      display="flex"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
      minHeight="100px"
      {...props} // Додаємо додаткові пропси до Box
    >
      <CircularProgress size={size} color={color} />
      {showMessage && (
        <Typography variant="body2" color="textSecondary" mt={1}>
          {message}
        </Typography>
      )}
    </Box>
  );
};

Loader.propTypes = {
  size: PropTypes.number, // Розмір індикатора
  message: PropTypes.string, // Текст повідомлення
  color: PropTypes.oneOf(["primary", "secondary", "inherit"]), // Колір індикатора
  showMessage: PropTypes.bool, // Чи показувати повідомлення
};

export default Loader;