import React, { useState, useEffect } from "react";
import { Modal, Box, TextField, Button } from "@mui/material";

const EditClientModal = ({ open, onClose, client, onSave }) => {
  const [formData, setFormData] = useState({
    fullName: "",
    dateOfBirth: "",
    address: "",
    contactInfo: "",
  });

  useEffect(() => {
    if (client) {
      setFormData({
        fullName: client.fullName || "",
        dateOfBirth: client.dateOfBirth ? new Date(client.dateOfBirth).toISOString().substr(0, 10) : "",
        address: client.address || "",
        contactInfo: client.contactInfo || "",
      });
    }
  }, [client]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = () => {
    onSave(formData);
  };

  return (
    <Modal open={open} onClose={onClose}>
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: 400,
          bgcolor: "background.paper",
          boxShadow: 24,
          p: 4,
          borderRadius: 2,
        }}
      >
        <h2>Редагувати клієнта</h2>
        <TextField
          fullWidth
          margin="normal"
          label="Повне ім'я"
          name="fullName"
          value={formData.fullName}
          onChange={handleChange}
        />
        <TextField
          fullWidth
          margin="normal"
          label="Дата народження"
          name="dateOfBirth"
          type="date"
          value={formData.dateOfBirth}
          onChange={handleChange}
        />
        <TextField
          fullWidth
          margin="normal"
          label="Адреса"
          name="address"
          value={formData.address}
          onChange={handleChange}
        />
        <TextField
          fullWidth
          margin="normal"
          label="Контакт"
          name="contactInfo"
          value={formData.contactInfo}
          onChange={handleChange}
        />
        <Box sx={{ display: "flex", justifyContent: "flex-end", gap: 2, marginTop: 2 }}>
          <Button variant="outlined" onClick={onClose}>
            Відмінити
          </Button>
          <Button variant="contained" onClick={handleSubmit}>
            Зберегти
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};

export default EditClientModal;
