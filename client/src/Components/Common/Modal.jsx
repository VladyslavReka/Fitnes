import React from "react";
import PropTypes from "prop-types";
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, Typography, Box } from "@mui/material";

const Modal = ({
  isOpen,
  title,
  children,
  onClose,
  onConfirm,
  confirmText = "Confirm",
  cancelText = "Cancel",
  showActions = true,
}) => {
  return (
    <Dialog open={isOpen} onClose={onClose} fullWidth maxWidth="sm">
      {/* Заголовок модального вікна */}
      {title && (
        <DialogTitle>
          <Typography variant="h6" component="div">
            {title}
          </Typography>
        </DialogTitle>
      )}

      {/* Контент модального вікна */}
      <DialogContent dividers>
        <Box sx={{ py: 2 }}>
          {children}
        </Box>
      </DialogContent>

      {/* Кнопки для підтвердження або скасування */}
      {showActions && (
        <DialogActions>
          {onClose && (
            <Button onClick={onClose} color="error" variant="outlined">
              {cancelText}
            </Button>
          )}
          {onConfirm && (
            <Button onClick={onConfirm} color="primary" variant="contained">
              {confirmText}
            </Button>
          )}
        </DialogActions>
      )}
    </Dialog>
  );
};

Modal.propTypes = {
  isOpen: PropTypes.bool.isRequired, // Відкритий чи закритий модал
  title: PropTypes.string, // Заголовок модального вікна
  children: PropTypes.node, // Контент, який буде відображено всередині
  onClose: PropTypes.func, // Функція для закриття модального вікна
  onConfirm: PropTypes.func, // Функція для підтвердження дії
  confirmText: PropTypes.string, // Текст кнопки підтвердження
  cancelText: PropTypes.string, // Текст кнопки скасування
  showActions: PropTypes.bool, // Чи відображати кнопки дій
};

export default Modal;
